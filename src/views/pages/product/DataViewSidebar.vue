<!-- =========================================================================================
  File Name: AddNewDataSidebar.vue
  Description: Add New Data - Sidebar component
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template>
  <vs-sidebar click-not-close position-right parent="body" default-index="1" color="primary" class="add-new-data-sidebar items-no-padding own-side" spacer v-model="isSidebarActiveLocal">
    <div class="mt-6 flex items-center justify-between px-6">
      <h4>{{ Object.entries(this.data).length === 0 ? "إضافة" : "تعديل" }} منتج</h4>
      <feather-icon icon="XIcon" @click.stop="isSidebarActiveLocal = false" class="cursor-pointer"></feather-icon>
    </div>
    <vs-divider class="mb-0"></vs-divider>

    <component :is="scrollbarTag" class="scroll-area--data-list-add-new" :settings="settings" :key="$vs.rtl">

      <div class="p-6">

        <vs-select autocomplete v-model.number="categoryId" @change="changeCategoryTypes" label="اختر التصنيف الرئيسي" class="mt-5 catslab direction" name="categoryId" v-validate="'required'">
          <vs-select-item :key="item.id" :value="item.id" :text="item.categoryName" v-for="item in categoryTypes" />
        </vs-select>
        <span class="text-danger text-sm" v-show="errors.has('categoryId')">{{ errors.first('categoryId') }}</span>

        <!-- productTypes -->
        <vs-select autocomplete v-model.number="subCategoryId"  @change="changeSubCategoryTypes"  label="اختر التصنيف الفرعي"   class="mt-5 catslab direction" name="subCategoryId" v-validate="'required'">
          <vs-select-item :key="item.id" :value="item.id" :text="item.name" class="mt-5 catslab" v-for="item in subCategoryTypes" />
        </vs-select>
        <span class="text-danger text-sm" v-show="errors.has('subCategoryId')">{{ errors.first('subCategoryId') }}</span>

        <!-- productTypes -->
        <vs-select autocomplete label="اختر المنتج"  v-model.number="productTypeId" class="mt-5 catslab direction" name="productTypeId" v-validate="'required'">
          <vs-select-item :key="item.id" :value="item.id" :text="item.name" v-for="item in productTypes" />
        </vs-select>
        <span class="text-danger text-sm" v-show="errors.has('productTypeId')">{{ errors.first('productTypeId') }}</span>

        <!-- Title -->
        <vs-input label="عنوان المنتج" v-model="title" class="mt-5 catslab" name="title" icon-pack="feather" icon="icon-user" icon-no-border v-validate="'required'" />
        <span class="text-danger text-sm" v-show="errors.has('title')">{{ errors.first('title') }}</span>

        <!-- Title -->
        <vs-input label="نوعية الخامة" v-model="material" class="mt-5 catslab" name="material" icon-pack="feather" icon="icon-user" icon-no-border v-validate="'required'" />
        <span class="text-danger text-sm" v-show="errors.has('material')">{{ errors.first('material') }}</span>

        <!-- CompanyName -->
        <vs-select  autocomplete label="اسم الشركة المنتجة" v-model.number="vendorId"  class="mt-5 catslab direction" name="vendorId" v-validate="'required'">
          <vs-select-item :key="item.id" :value="item.id" :text="item.companyName" v-for="item in companies" />
        </vs-select>
        <span class="text-danger text-sm" v-show="errors.has('vendorId')">{{ errors.first('vendorId') }}</span>

        <!-- PRICE -->
        <template v-if="activeUserInfo.userName=='admin'">
          <vs-input
            icon-pack="feather"
            icon="icon-dollar-sign"
            label="سعر المبيع"
            v-model.number="price"
            class="mt-5   catslab"
            v-validate="{ required: true, regex: /\d+(\.\d+)?$/ }"
            name="price" />
          <span class="text-danger text-sm" v-show="errors.has('price')">{{ errors.first('price') }}</span>
        </template>


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

<!--        <vs-input-->
<!--          type="number"-->
<!--          label="العدد الكلي ضمن المستودع"-->
<!--          v-model.number="inStock"-->
<!--          class="mt-5  catslab"-->
<!--          name="InStock" />-->
        <!-- salesTypes -->
        <vs-select  autocomplete label="نوع البيع" v-model.number="salesType"  class="mt-5 catslab direction" name="vendorId" v-validate="'required'">
          <vs-select-item :key="index" :value="item" :text="$t('salesTypes.' + item)" v-for="(item,index) in Object.keys(salesTypes)" />
        </vs-select>
        <!-- Description -->
        <vs-textarea label="وصف عن المنتج" v-model="description" class="mt-5 w-full"  width="300px" name="description"   />

        <div class="mt-6 flex items-center justify-between px-6">
          <h4> القياسات </h4>
        </div>
        <vs-divider class="mb-2"></vs-divider>

        <template v-for="(size,index) in productSizes">
          <vs-select autocomplete label="اختر المقاس"   v-model="size.name"class="mt-5 catslab direction" name="productTypeId" v-validate="'required'">
            <vs-select-item :key="index" :value="item" :text="$t('sizes.' + item)" v-for="(item,index) in Object.keys(sizes)" />
          </vs-select>
          <div class="all-centerx">
            <div class="centerx ">
              <vs-input-number  min="0"  label="عدد القطع :" v-model="size.count"/>
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

        <div class="Photos">
          <div class="progress-bar-box">
            <upload-img :hasMain="true"
                        v-model="photos"
                        :name="'PhotosUploadName'" :photosAccept="photosAccept"
                        :photosExtensions="photosExtensions"
                        ref="uploadPhotos"/>
          </div>
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

// uploadImg map component
import uploadImg from "../../shared/uploadImg";
import staticJson from "../../../../static/json/static.json";
import ar from "@/locales/ar.json";

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
    VuePerfectScrollbar,
    uploadImg
  },
  data () {
    return {
      productSizes:[],
      sizes:ar.sizes,
      dataId: null,
      seasonsTypes:null,
      title: null,
      material:null,
      inStock:null,
      size:staticJson.size,
      salesType:0,
      description:null,
      price:null,
      productCost:null,
      categoryId:null,
      subCategoryId:null,
      productTypeId:null,
      vendorId:null,
      photosAccept: "image/png,image/gif,image/jpeg,image/webp",
      photosExtensions: "gif,jpg,jpeg,png,webp",
      photos:[],
      settings: { // perfectscrollbar settings
        maxScrollbarLength: 60,
        wheelSpeed: .60
      },
      salesTypes: ar.salesTypes,
      category_choices: [
        {text:'ربيع', value:'1'},
        {text:'صيف', value:'2'},
        {text:'خريف', value:'3'},
        {text:'شتاء', value:'4'}
      ],
    }
  },
  watch: {
    isSidebarActive (val) {
      if (!val) return
      if (Object.entries(this.data).length === 0) {
        this.initValues()
        this.$validator.reset()
      } else {
        const { id,categoryId,subCategoryId,productTypeId,title,material,vendorId ,count,price,productCost,description,images,productSize,inStock,salesType} = JSON.parse(JSON.stringify(this.data))
        this.dataId = id
        setTimeout( ()=>{this.categoryId=categoryId},500)
        setTimeout( ()=>{this.subCategoryId=subCategoryId},1000)
        setTimeout( ()=>{this.productTypeId=productTypeId},1500)
        this.title = title
        this.material=material
        this.count=count
        this.inStock=inStock
        this.price=price
        this.vendorId=vendorId
        this.productCost=productCost
        this.salesType=salesType
        this.description=description
        this.photos=images
        this.productSizes=productSize
      }
      // Object.entries(this.data).length === 0 ? this.initValues() : { this.dataId, this.dataName, this.dataCategory, this.dataOrder_status, this.dataPrice } = JSON.parse(JSON.stringify(this.data))
    }
  },
  computed: {
    activeUserInfo () {
      return this.$store.state.AppActiveUser
    },
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
      return !this.errors.any() && this.title  && this.productCost  && this.categoryId  && this.subCategoryId && this.productTypeId && this.vendorId && this.photos.length !=0
    },
    scrollbarTag () { return this.$store.getters.scrollbarTag },

    categoryTypes () {
      return this.$store.state.product.categoryTypes
    },
    subCategoryTypes () {
      return this.$store.state.product.subCategoryTypes
    },

    productTypes () {
      return this.$store.state.product.productTypes
    },
    companies(){
      return this.$store.state.product.companies
    }
  },
  methods: {

    addSizeGroup(){
      this.productSizes.push({
        name: '',
        count: 1
      })
    },
    removeSizeGroup (index) {
      this.productSizes.splice(index,1)
    },

    initValues () {
     if (this.data.id) return
      this.dataId = null
      this.salesType=0,
      this.title = null
      this.material=null
      this.description=null
      this.price=null
      this.productCost=null
      this.categoryId=null
      this.subCategoryId=null
      this.productTypeId=null
      this.vendorId=null
      this.inStock=null
      this.photos=[]
      this.productSizes=[]
      this.sumCount=-0
    },

    submitData () {
      this.$validator.validateAll().then(result => {
        if (result) {
          const obj = {
            id: this.dataId,
            categoryId:this.categoryId,
            salesType:this.salesType,
            subCategoryId:this.subCategoryId,
            productTypeId:this.productTypeId,
            title: this.title,
            material:this.material,
            vendorId:this.vendorId,
            count:this.sumCount,
            inStock:this.inStock,
            price:this.price ==null ? (this.productCost * 10)/100:this.price,
            productCost:this.productCost,
            description: this.description,
            photos:this.photos.map((photo,index) =>({guid:String(photo.response  ? photo.response : photo.id),order:index+1}) ),
            ProductSizes:this.productSizes
          }

          if (this.dataId !== null && this.dataId >= 0) {
            this.$store.dispatch('product/updateItem', obj).catch(err => { console.error(err) })
          } else {
            delete obj.id
            // obj.popularity = 0
            this.$store.dispatch('product/addItem', obj).catch(err => { console.error(err) })
          }

          this.$emit('closeSidebar')
          this.initValues()
        }
      })
    },

    // changeSeasonsTypes(){
    //   if(!this.$store.state.product.isUpdated){
    //     this.categoryId=null
    //     this.subCategoryId=null
    //     this.productTypeId=null
    //   }
    //   this.$store.dispatch('product/fetchCategoryItems', {seasonsTypes: this.seasonsTypes})
    // },

    changeCategoryTypes(){
      if(!this.$store.state.product.isUpdated){
        this.subCategoryId=null
        this.productTypeId=null
      }
      if(this.categoryId){
        this.$store.dispatch('product/fetchSubCategoryItems', {categoryId: this.categoryId})
      }

    },

    changeSubCategoryTypes(){

      if(!this.$store.state.product.isUpdated){
        this.productTypeId=null
      }
      if(this.subCategoryId){
        this.$store.dispatch('product/fetchProductTypeItems', {subCategoryId: this.subCategoryId})
      }

      this.$store.dispatch('product/updateModalState',false);

    }

  },
  mounted () {
     this.$store.dispatch('product/fetchCompanyItems')
     this.$store.dispatch('product/fetchCategoryItems', {seasonsTypes: null})
  }
}
</script>

<style lang="scss">

.direction{
  direction: ltr;
}
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






