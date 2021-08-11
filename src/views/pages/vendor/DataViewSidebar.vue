<!-- =========================================================================================
  File Name: AddNewDataSidebar.vue
  Description: Add New Data - Sidebar component
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template>
  <vs-sidebar click-not-close position-right parent="body" default-index="1" color="primary" class="add-new-data-sidebar items-no-padding" spacer v-model="isSidebarActiveLocal">
    <div class="mt-6 flex items-center justify-between px-6">
      <h4>{{ Object.entries(this.data).length === 0 ? "إضافة" : "تعديل" }} شركة</h4>
      <feather-icon icon="XIcon" @click.stop="isSidebarActiveLocal = false" class="cursor-pointer"></feather-icon>
    </div>
    <vs-divider class="mb-0"></vs-divider>

    <component :is="scrollbarTag" class="scroll-area--data-list-add-new" :settings="settings" :key="$vs.rtl">

      <div class="p-6">
        <!-- NAME -->
        <vs-input label="اسم مالك الشركة" v-model="name" class="mt-5 w-full" name="name" icon-pack="feather" icon="icon-user" icon-no-border v-validate="'required'" />
        <span class="text-danger text-sm" v-show="errors.has('name')">{{ errors.first('name') }}</span>

       <!-- CompanyName -->
        <vs-input label="اسم الشركة" v-model="companyName" class="mt-5 w-full" icon-pack="feather" icon="icon-briefcase" icon-no-border name="companyName" v-validate="'required'" />
        <span class="text-danger text-sm" v-show="errors.has('companyName')">{{ errors.first('companyName') }}</span>

        <!-- CompanyName -->
        <vs-input label="كود الشركة" v-model="code" class="mt-5 w-full" icon-pack="feather" icon="icon-briefcase" icon-no-border name="code"  />

        <!-- Phone -->
        <vs-input label="رقم جوال الشركة" v-model="phone" class="mt-5 w-full" icon-pack="feather" icon="icon-smartphone" icon-no-border name="phone"  v-validate="'required|numeric|min:11|max:11'"   />
        <span class="text-danger text-sm" v-show="errors.has('phone')">{{ errors.first('phone') }}</span>

        <!-- Phone -->
        <vs-input label="رقم جوال الموظف" v-model="employeePhone" class="mt-5 w-full" icon-pack="feather" icon="icon-smartphone" icon-no-border name="employeePhone"  v-validate="'numeric|min:11|max:11'"   />
        <span class="text-danger text-sm" v-show="errors.has('employeePhone')">{{ errors.first('employeePhone') }}</span>

        <!-- productTypes -->
        <label >اختر التصنيف الرئيسي</label>
        <v-select multiple autocomplete  v-model.number="primaryCategory" class="mt-5 w-full" :options="primaryCategories" name="primaryCategory" :dir="$vs.rtl ? 'rtl' : 'ltr'" v-validate="'required'" />
        <span class="text-danger text-sm" v-show="errors.has('primaryCategory')">{{ errors.first('primaryCategory') }}</span>

        <!-- productTypes -->
        <label >اختر المنتج</label>
        <v-select multiple autocomplete  v-model.number="makerType" class="mt-5 w-full" :options="productTypes" name="makerType" :dir="$vs.rtl ? 'rtl' : 'ltr'" v-validate="'required'" />
        <span class="text-danger text-sm" v-show="errors.has('makerType')">{{ errors.first('makerType') }}</span>

        <!-- brand type -->
        <label >اختر نوع الماركة</label>
        <v-select multiple autocomplete  v-model.number="brandType" class="mt-5 w-full" :options="brandTypes" name="brandType" :dir="$vs.rtl ? 'rtl' : 'ltr'" v-validate="'required'" />
        <span class="text-danger text-sm" v-show="errors.has('brandType')">{{ errors.first('brandType') }}</span>

        <label >اختر التصنيف الثانوي</label>
        <v-select multiple autocomplete  v-model.number="categoryType" class="mt-5 w-full" :options="categoryTypes" name="categoryType" :dir="$vs.rtl ? 'rtl' : 'ltr'" v-validate="'required'" />
        <span class="text-danger text-sm" v-show="errors.has('categoryType')">{{ errors.first('categoryType') }}</span>

        <!--  quality Type-->
        <vs-select  autocomplete label="نوع الجودة" v-model.number="qualityType"  class="mt-5 w-full " name="qualityType" :dir="$vs.rtl ? 'rtl' : 'ltr'" v-validate="'required'">
          <vs-select-item :key="index" :value="item" :text="$t('qualityTypes.' + item)" v-for="(item,index) in Object.keys(qualityTypes)" />
        </vs-select>

        <!-- Address -->
        <vs-textarea label="عنوان مقر الشركة" v-model="address" class="mt-5 w-full"  width="300px" name="address"  v-validate="'required'" />
        <span class="text-danger text-sm" v-show="errors.has('address')">{{ errors.first('address') }}</span>




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
import vSelect from 'vue-select'
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
    vSelect
  },
  data () {
    return {
      dataId: null,
      name: null,
      companyName: null,
      code:null,
      phone:null,
      employeePhone:null,
      address:null,
      description:null,
      makerType:[],
      brandType:[],
      primaryCategory:[],
      categoryType:[],
      qualityType:null,
      dataError:null,
      brandTypes:[
        {id:1, label: 'ماركة'},
        {id: 2, label: 'بدون ماركة'},
      ] ,
      categoryTypes:[
        {id:1, label: 'رياضي'},
        {id: 2, label: 'رسمي'},
        {id: 3, label: 'كاجوال'},
        {id: 4, label: 'ملبوسات منزلية'},
      ],
      qualityTypes:ar.qualityTypes,
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
        const { id,name, companyName,code,phone ,employeePhone,address,description,brandType,primaryCategory,makerType,categoryType,qualityType} = JSON.parse(JSON.stringify(this.data))
        this.dataId = id
        this.name = name
        this.companyName = companyName
        this.code=code
        this.phone=phone
        this.employeePhone=employeePhone
        this.address=address
        this.description=description
        this.brandType=brandType
        this.primaryCategory=primaryCategory
        this.makerType=makerType
        this.categoryType=categoryType
        this.qualityType=qualityType
        this.initValues()
      }
      // Object.entries(this.data).length === 0 ? this.initValues() : { this.dataId, this.dataName, this.dataCategory, this.dataOrder_status, this.dataPrice } = JSON.parse(JSON.stringify(this.data))
    }
  },
  computed: {
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
      return !this.errors.any() && this.name && this.companyName && this.phone && this.address && this.description
    },
    scrollbarTag () { return this.$store.getters.scrollbarTag },

    primaryCategories () {
      return this.$store.state.product.categoryTypes.map((category) =>({id:category.id ,label:category.categoryName}))
    },
    productTypes () {
      return this.$store.state.vendor.productTypes.map((product) =>({id:product.id ,label:product.name}))
    },
  },
  methods: {
    initValues () {
      if (this.data.id) return
      this.dataId = null
      this.name = null
      this.companyName = null
      this.code=null
      this.phone=null
      this.employeePhone=null
      this.address=null
      this.description=null
      this.brandType=[]
      this.makerType=[]
      this.primaryCategory=[]
      this.categoryType=[]
      this.qualityType=null

    },
    submitData () {
      this.$validator.validateAll().then(result => {
        if (result) {
          const obj = {
            id: this.dataId,
            name: this.name,
            companyName: this.companyName,
            code:this.code,
            phone:this.phone,
            employeePhone:this.employeePhone,
            address:this.address,
            description:this.description,
            brandType:this.brandType,
            makerType:this.makerType,
            primaryCategory:this.primaryCategory,
            categoryType:this.categoryType,
            qualityType:this.qualityType
          }

          if (this.dataId !== null && this.dataId >= 0) {
            this.$store.dispatch('vendor/updateItem', obj).catch(err => { console.error(err) })
             this.$emit('closeSidebar')
             this.initValues()
          } else {
            delete obj.id
            // obj.popularity = 0
            this.$store.dispatch('vendor/addItem', obj)
              .then(()=>{
                 this.$emit('closeSidebar')
                 this.initValues()
              })
              .catch(err => {
                let errors = err.response.data.errors;
                console.error(err.response.data.errors)
               Object.keys(errors).forEach(item => {
                  console.log("item:", item);
                  this.dataError = this.$t(`errorMessage.${item}`);
                });
                this.showDeleteSuccess()
              })
          }


        }
      })
    },
    showDeleteSuccess () {
      this.$vs.notify({
        color: 'danger',
        title: 'حذف العنصر',
        text: this.dataError
      })
    },

  },
  mounted () {
     this.$store.dispatch('vendor/fetchProductTypeItems', { subCategoryId: null})
    this.$store.dispatch('product/fetchCategoryItems', {seasonsTypes: null})
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

