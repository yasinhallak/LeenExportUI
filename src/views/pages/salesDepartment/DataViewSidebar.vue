
<template>
  <vs-sidebar click-not-close position-right parent="body" default-index="1" color="primary" class="add-new-data-sidebar items-no-padding" spacer v-model="isSidebarActiveLocal">
    <div class="mt-6 flex items-center justify-between px-6">
      <h4>{{ Object.entries(this.data).length === 0 ? "إضافة" : "تعديل" }} مبيع</h4>
      <feather-icon icon="XIcon" @click.stop="isSidebarActiveLocal = false" class="cursor-pointer"></feather-icon>
    </div>
    <vs-divider class="mb-0"></vs-divider>

    <component :is="scrollbarTag" class="scroll-area--data-list-add-new" :settings="settings" :key="$vs.rtl">

      <div class="p-6">
        <!-- productTypes -->
        <vs-select autocomplete label="اختر المنتج"  v-model.number="productTypeId"  class="mt-5 w-full direction" name="productTypeId" v-validate="'required'">
          <vs-select-item :key="item.id" :value="item.productTypeId" :text="item.productName" v-for="item in productModels" />
        </vs-select>
        <span class="text-danger text-sm" v-show="errors.has('productTypeId')">{{ errors.first('productTypeId') }}</span>

        <!-- productTypes -->
        <vs-select autocomplete label="اختر الموديل"   v-model="modelNumber"  class="mt-5 w-full direction" name="productTypeId" v-validate="'required'">
          <vs-select-item :key="item.id" :value="item.modelNumber" :text="item.modelNumber" v-for="item in productModels" />
        </vs-select>
        <span class="text-danger text-sm" v-show="errors.has('productTypeId')">{{ errors.first('productTypeId') }}</span>

        <vs-select autocomplete  label="اختر المقاس" v-model="size"class="mt-5 w-full direction" name="productTypeId" v-validate="'required'">
          <vs-select-item :key="index" :value="item" :text="$t('sizes.' + item)" v-for="(item,index) in Object.keys(sizes)"  />
        </vs-select>

        <vs-select  autocomplete label="اختر اللون"   v-model.number="color"class="mt-5 w-full direction" name="productTypeId" v-validate="'required'">
          <vs-select-item :key="index" :value="item" :text="$t('colors.' + item)" v-for="(item,index) in Object.keys(colors)"  />
        </vs-select>

        <vs-input
          icon-pack="feather"
          icon="icon-dollar-sign"
          label="سعر المبيع"
          v-model.number="sellingPrice"
          class="mt-5  w-full"
          v-validate="{ required: true, regex: /\d+(\.\d+)?$/ }"
          name="SellingPrice" />
        <span class="text-danger text-sm" v-show="errors.has('SellingPrice')">{{ errors.first('SellingPrice') }}</span>

      </div>
    </component>

    <div class="flex flex-wrap items-center p-6" slot="footer">
      <vs-button class="mr-6" @click="submitData" :disabled="!isFormValid">حفظ</vs-button>
      <vs-button type="border" color="danger" @click="isSidebarActiveLocal = false">إلغاء</vs-button>
    </div>
  </vs-sidebar>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import ar from "../../../locales/ar.json";
import vSelect from 'vue-select'

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
    'v-select': vSelect,
  },

  data () {
    return {
      dataId: null,
      modelNumber:null,
      productTypeId:null,
      sellingPrice:null,
      color:null,
      size:null,
      sizes:ar.sizes,
      colors:ar.colors,
      selectedStatus:null,
      settings: { // perfectscrollbar settings
        maxScrollbarLength: 60,
        wheelSpeed: .60
      }
    }
  },
  watch: {
    isSidebarActive (val) {
      if (!val) return
      if (Object.entries(this.data).length === 0) {
        this.initValues()
        this.$validator.reset()
      } else {
        console.log("isSidebarActive",this.data)
        const { id,modelNumber,productTypeId,size,color,sellingPrice} = JSON.parse(JSON.stringify(this.data))
        this.dataId = id
        this.modelNumber = modelNumber
        this.productTypeId=productTypeId
        this.size=size
        this.color=color
        this.sellingPrice=sellingPrice
        this.initValues()
      }
      // Object.entries(this.data).length === 0 ? this.initValues() : { this.dataId, this.dataName, this.dataCategory, this.dataOrder_status, this.dataPrice } = JSON.parse(JSON.stringify(this.data))
    }
  },
  computed: {
    productModels(){
      return this.$store.state.product.productModels
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
      return !this.errors.any() && this.productTypeId && this.modelNumber && this.size && this.color && this.sellingPrice
    },
    scrollbarTag () { return this.$store.getters.scrollbarTag }
  },
  methods: {
    initValues () {
      if (this.data.id) return
      this.dataId = null
      this.modelNumber=null,
        this.productTypeId=null,
        this.sellingPrice=null,
        this.color=null,
        this.size=null
    },
    submitData () {
      this.$validator.validateAll().then(result => {
        if (result) {
          const obj = {
            id: this.dataId,
            modelNumber:this.modelNumber,
            productTypeId:this.productTypeId,
            sellingPrice:this.sellingPrice,
            color:this.color,
            size:this.size
          }

          if (this.dataId !== null && this.dataId >= 0) {
            this.$store.dispatch('product/updateSaleDepartment', obj).catch(err => { console.error(err) })
          } else {
            delete obj.id
            // obj.popularity = 0
            this.$store.dispatch('product/addSaleDepartment', obj).catch(err => { console.error(err) })
          }

          this.$emit('closeSidebar')
          this.initValues()
        }
      })
    },

  },
  mounted () {
    this.$store.dispatch('product/fetchProductModel')
  }
}
</script>

<style lang="scss" scoped>
.add-new-data-sidebar {
  ::v-deep .vs-sidebar--background {
    z-index: 52010;
  }

  ::v-deep .vs-sidebar {
    z-index: 52010;
    width: 400px;
    max-width: 90vw;

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


