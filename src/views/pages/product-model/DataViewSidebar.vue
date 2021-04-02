


<template>
  <vs-sidebar click-not-close position-right parent="body" default-index="1" color="primary" class="add-new-data-sidebar items-no-padding own-side" spacer v-model="isSidebarActiveLocal">
    <div class="mt-6 flex items-center justify-between px-6">
      <h4>{{ Object.entries(this.data).length === 0 ? "إضافة" : "تعديل" }} منتج</h4>
      <feather-icon icon="XIcon" @click.stop="isSidebarActiveLocal = false" class="cursor-pointer"></feather-icon>
    </div>
    <vs-divider class="mb-0"></vs-divider>

    <component :is="scrollbarTag" class="scroll-area--data-list-add-new"  :key="$vs.rtl">

      <div class="p-6">
        <!-- productTypes -->
        <vs-select autocomplete label="اختر المنتج"  v-model.number="productTypeId" class="mt-5 catslab" name="productTypeId" v-validate="'required'">
          <vs-select-item :key="item.id" :value="item.id" :text="item.name" v-for="item in productTypes" />
        </vs-select>
        <span class="text-danger text-sm" v-show="errors.has('productTypeId')">{{ errors.first('productTypeId') }}</span>

        <!-- Title -->
        <vs-input label="رقم الموديل" v-model="modelNumber" class="mt-5 catslab" name="modelNumber" icon-pack="feather"  v-validate="'required'" />
        <span class="text-danger text-sm" v-show="errors.has('modelNumber')">{{ errors.first('modelNumber') }}</span>

        <vs-input
          type="number"
          label="العدد الكلي ضمن المستودع"
          v-model.number="inStock"
          class="mt-5  catslab"
          name="InStock" />
        <!-- ProductCost -->
        <vs-input
          icon-pack="feather"
          icon="icon-dollar-sign"
          label="سعر الرأسمال"
          v-model.number="productCost"
          class="mt-5  catslab"
          v-validate="{ required: true, regex: /\d+(\.\d+)?$/ }"
          name="productCost" />
        <span class="text-danger text-sm" v-show="errors.has('productCost')">{{ errors.first('productCost') }}</span>

        <!-- PRICE -->
        <vs-input
          icon-pack="feather"
          icon="icon-dollar-sign"
          label="سعر المبيع"
          v-model.number="price"
          class="mt-5   catslab"
          v-validate="{ required: true, regex: /\d+(\.\d+)?$/ }"
          name="price" />
        <span class="text-danger text-sm" v-show="errors.has('price')">{{ errors.first('price') }}</span>

<!--        &lt;!&ndash; Description &ndash;&gt;-->
<!--        <vs-textarea label="وصف عن المنتج" v-model="description" class="mt-5 w-full"  width="300px" name="description"   />-->

        <div></div>
        <template v-for="(size,index) in productSizes">
            <vs-select  label="اختر المقاس"   v-model="size.name"class="mt-5 catslab" name="productTypeId" v-validate="'required'">
              <vs-select-item :key="index" :value="item" :text="$t('sizes.' + item)" v-for="(item,index) in Object.keys(sizes)" />
            </vs-select>
          <div class="all-centerx">
            <div class="centerx ">
              <vs-input-number  min="0" max="10" label="عدد القطع :" v-model="size.count"/>
            </div>
          </div>
          <div class=" items-center mt-5 catslab" >
            <vs-button  color="danger" type="border"  @click.prevent="removeSizeGroup(index)">حذف</vs-button>
          </div>
        </template>
        <div class="items-center mt-5 catslab">
               <span>
                   <vs-button color="success" type="border"  @click.prevent="addSizeGroup()" >إضافة مقاس</vs-button>
               </span>
        </div>
        <div class="sum">
          <vs-input-number  label=" المجموع:" v-model="sumCount" class="mt-5"   />
        </div>
        <div class="Photos" >
          <div class="progress-bar-box" >
            <template v-for="(item,index) in productColors">
              <vs-select  label="اختر اللون"   v-model.number="item.color"class="mt-5 catslab" name="productTypeId" v-validate="'required'">
                <vs-select-item :key="index" :value="item" :text="$t('colors.' + item)" v-for="(item,index) in Object.keys(colors)" />
              </vs-select>
              <div class="all-centerx">
                <div class="centerx ">
                  <vs-input-number  min="0" max="10" label="عدد القطع :" v-model="item.count"/>
                </div>
              </div>
              <div class=" items-center mt-5 catslab" >
                <vs-button  color="danger" type="border"  @click.prevent="removeColorGroup(index)">حذف</vs-button>
              </div>
            </template>
          </div>
        </div>
        <div class="items-center mt-5 catslab">
               <span>
                   <vs-button color="success" type="border"  @click.prevent="addColorGroup()" >إضافة لون</vs-button>
               </span>
        </div>
      </div>
    </component>

    <div class="flex flex-wrap items-center p-6  justify-between" slot="footer">
      <vs-button class="mr-6" @click="submitData" :disabled="!isFormValid">حفظ</vs-button>
      <vs-button type="border" color="danger" @click="isSidebarActiveLocal = false">إلغاء</vs-button>
    </div>
  </vs-sidebar>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'

import staticJson from "../../../../static/json/static.json";
import ar from "../../../locales/ar.json";

export default {
  props: {
    isSidebarActive: {
      type: Boolean,
      required: true
    },
    data: {
      type: Object,
      default: () => {}
    }
  },
  components: {
    VuePerfectScrollbar
  },
  data () {
    return {
      productColors: [],
      productSizes:[],
      dataId: null,
      inStock:null,
      modelNumber:null,
      sizes:ar.sizes,
      colors:ar.colors,
      price:null,
      productCost:null,
      productTypeId:null,
      settings: { // perfectscrollbar settings
        maxScrollbarLength: 60,
        wheelSpeed: .60
      },
    }
  },
  watch: {
    isSidebarActive (val) {
      if (!val) return
      if (Object.entries(this.data).length === 0) {
        this.initValues()
        this.$validator.reset()
      } else {
        const { id,modelNumber,productTypeId ,count,price,productCost,productSizes,productColors,inStock} = JSON.parse(JSON.stringify(this.data))
        this.dataId = id
        this.modelNumber=modelNumber
        this.productTypeId=productTypeId
        this.count=count
        this.inStock=inStock
        this.price=price
        this.productCost=productCost
        this.productColors=productColors
       this.productSizes= productSizes

      }
      // Object.entries(this.data).length === 0 ? this.initValues() : { this.dataId, this.dataName, this.dataCategory, this.dataOrder_status, this.dataPrice } = JSON.parse(JSON.stringify(this.data))
    }
  },
  computed: {
    sumCount:{
      get: function () {
        let sum=0
         this.productSizes.forEach(item=>{
           sum+=item.count;
         });
        return sum;
      },
      // setter
      set: function (newValue) {

      }

    },
    isSidebarActiveLocal: {
      get () {
        return this.isSidebarActive
      },
      set (val) {
        if (!val) {
          this.$emit('closeSidebar')
          // this.$validator.reset()
          // this.initValues()
        }
      }
    },
    isFormValid () {
      return !this.errors.any() && this.price && this.productCost && this.productTypeId && this.modelNumber
    },
    scrollbarTag () { return this.$store.getters.scrollbarTag },

    productTypes () {
      return this.$store.state.product.productTypes
    }

  },
  methods: {

    addColorGroup(){
      this.productColors.push({
        color: '',
        count: 0
      })
    },
    removeColorGroup (index) {
      this.productColors.splice(index,1)
    },

    addSizeGroup(){
      this.productSizes.push({
        name: '',
        count: 0
      })
    },
    removeSizeGroup (index) {
      this.productSizes.splice(index,1)
    },

    initValues () {
      if (this.data.id) return
      this.dataId = null
      this.price=null
      this.productCost=null
      this.productColors=[]
      this.productSizes=[]
      this.modelNumber=null
      this.productTypeId=null
      this.inStock=null

    },
    submitData () {
      this.$validator.validateAll().then(result => {
        if (result) {
          const obj = {
            id: this.dataId,
            productTypeId:this.productTypeId,
            modelNumber:this.modelNumber,
            count:this.sumCount,
            inStock:this.inStock,
            price:this.price,
            productCost:this.productCost,
            ProductSizes:this.productSizes,
            ProductColors:this.productColors
          }
          if (this.dataId !== null && this.dataId >= 0) {
            this.$store.dispatch('product/updateProductModel', obj).catch(err => { console.error(err) })
          } else {
            delete obj.id
            // obj.popularity = 0
            this.$store.dispatch('product/addProductModel', obj).catch(err => { console.error(err) })
          }
          this.$emit('closeSidebar')
          this.initValues()
        }
      })
    },

  },
  mounted () {
    this.$store.dispatch('product/fetchProductTypeItems', {SubCategoryId: null})
  }
}
</script>

<style lang="scss">
.own-side{
  max-width: 100%;
  width: 80%;
  .vs-sidebar{
    max-width: 100%;
    width: 80%;
    z-index: 100000;
    direction: rtl;
    .all-centerx{
      direction: ltr;
      width: 170px;
      display: inline-block;
      @media (max-width: 567px) {
        width: 220px;
      }
      .centerx {
        margin: 7px;
        padding: 3px;
        background-color: whitesmoke;
        border-radius: 5px;
        .vs-input-number{
          display: flex;
          justify-content: space-around;
          margin: 0;
          padding: 0;
          span{
            min-width: 32px;
          }
        }

      }

    }
    .sum{
      .vs-input-number button.vs-input-number--button-plus, .vs-input-number button.vs-input-number--button-less{
        display: none !important;
      }
    }
  }

  .catslab{
    width: 33.333%;
    padding:0 5px;
    display: inline-block;
    label{
      color: #1f74ff;
      font-size: 12px;
      display: inline-block;
      width: 100%;
      text-align: right;
      margin-bottom: 8px;
    }
  }
  .catslab.custom{
    width: 50%;
  }
}


.add-new-data-sidebar {
  ::v-deep .vs-sidebar--background {
    z-index: 52010;
  }

  ::v-deep .vs-sidebar {
    z-index: 52010;

    .img-upload {
      margin-top: 2rem;

      .con-img-upload {
        padding: 0;
      }

      .con-input-upload {
        width: 100%;
        margin: 0;
      }
    }
  }
}

.scroll-area--data-list-add-new {
  // height: calc(var(--vh, 1vh) * 100 - 4.3rem);
  height: calc(var(--vh, 1vh) * 100 - 16px - 45px - 82px);

  &:not(.ps) {
    overflow-y: auto;
  }
}
</style>






