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
      <h4>{{ Object.entries(this.data).length === 0 ? "إضافة" : "تعديل" }} زبون</h4>
      <feather-icon icon="XIcon" @click.stop="isSidebarActiveLocal = false" class="cursor-pointer"></feather-icon>
    </div>
    <vs-divider class="mb-0"></vs-divider>

    <component :is="scrollbarTag" class="scroll-area--data-list-add-new" :settings="settings" :key="$vs.rtl">

      <div class="p-6">
        <!-- NAME -->
        <vs-input label="اسم الزبون" v-model="name" class="mt-5 w-full" name="name" icon-pack="feather" icon="icon-user" icon-no-border v-validate="'required'" />
        <span class="text-danger text-sm" v-show="errors.has('name')">{{ errors.first('name') }}</span>

        <!-- CompanyName -->
        <vs-input label="اسم الشركة" v-model="companyName" class="mt-5 w-full" icon-pack="feather" icon="icon-briefcase" icon-no-border name="companyName"  />
<!--        <span class="text-danger text-sm" v-show="errors.has('companyName')">{{ errors.first('companyName') }}</span>-->

        <!-- Phone -->
        <vs-input label="رقم الجوال" v-model="phone" class="mt-5 w-full" icon-pack="feather" icon="icon-smartphone" icon-no-border name="phone"  v-validate="'required|numeric'"   />
        <span class="text-danger text-sm" v-show="errors.has('phone')">{{ errors.first('phone') }}</span>
        <!-- Email -->
        <vs-input label="البريد الإلكتروني" v-model="email" class="mt-5 w-full" icon-pack="feather" icon="icon-user" icon-no-border name="email" />
<!--        <span class="text-danger text-sm" v-show="errors.has('email')">{{ errors.first('email') }}</span>-->

        <!-- ShippingName -->
        <vs-input label="شركة الشحن" v-model="shippingName" class="mt-5 w-full" icon-pack="feather" icon="icon-briefcase" icon-no-border name="shippingName" />

        <!-- ShippingCode -->
        <vs-input label="الكود" v-model="shippingCode" class="mt-5 w-full" icon-pack="feather" icon="icon-briefcase" icon-no-border name="shippingCode"  />

        <!-- specialization -->
        <label >الاختصاص</label>
        <v-select multiple  v-model="categoryId" class="mt-5 w-full" :options="categoryTypes" name="categoryId" :dir="$vs.rtl ? 'rtl' : 'ltr'" />
        <span class="text-danger text-sm" v-show="errors.has('categoryId')">{{ errors.first('categoryId') }}</span>

        <!-- saleType -->
        <label >نوع البيع</label>
        <v-select multiple  v-model="selectedType" class="mt-5 w-full" :options="saleOptions" name="saleType" :dir="$vs.rtl ? 'rtl' : 'ltr'" v-validate="'required'" />
        <span class="text-danger text-sm" v-show="errors.has('saleType')">{{ errors.first('saleType') }}</span>
        <label >اختر المنتج</label>
        <v-select multiple autocomplete  v-model.number="productTypeId" class="mt-5 w-full" :options="productTypes" name="productTypeId" :dir="$vs.rtl ? 'rtl' : 'ltr'" v-validate="'required'" />
        <span class="text-danger text-sm" v-show="errors.has('productTypeId')">{{ errors.first('productTypeId') }}</span>

        <!-- status  -->
        <vs-select autocomplete label="الحالة" v-model.number="selectedStatus"  class="mt-5 w-full" name="status" v-validate="'required'">
          <vs-select-item :key="item.id" :value="item.id" :text="item.label" v-for="item in statusOptions" />
          <span class="text-danger text-sm" v-show="errors.has('status')">{{ errors.first('status') }}</span>
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
      name: null,
      companyName: null,
      shippingName:null,
      shippingCode:null,
      phone:null,
      email:null,
      description:null,
      address:null,
      categoryId: [],
      selectedType:[],
      productTypeId:[],
      selectedStatus:null,
      saleOptions: [
        {id: 3, label: 'جملة'},
        {id: 4, label: 'مفرق'},
      ],
      statusOptions:[
        {id:1,label:'زبون أساسي'} ,
        {id:2,label:'زبون محتمل'},
        {id:3,label:'مهمة جديدة'},
        {id:4,label:"تم التحويل إلي الوكيل"}
        ],
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
        const { id,name, companyName,phone ,email,shippingName,shippingCode,categoryId,saleType,productTypeId,status,description,address} = JSON.parse(JSON.stringify(this.data))
        this.dataId = id
        this.name = name
        this.companyName = companyName
        this.shippingName=shippingName
        this.shippingCode=shippingCode
        this.phone=phone
        this.email=email
        this.categoryId=categoryId.map((item)=>({id:item,label:this.categoryTypes.find(({id})=>id===item).label})),
        this.selectedType=saleType
        this.productTypeId= productTypeId.map((item)=>({id:item,label:this.productTypes.find(({id})=>id===item).label}))
        this.selectedStatus=status
        this.description=description
        this.address=address
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
      return !this.errors.any() && this.name && this.phone && this.address && this.categoryId && this.productTypeId && this.selectedStatus
    },
    scrollbarTag () { return this.$store.getters.scrollbarTag },

    productTypes () {
      return this.$store.state.customer.productTypes.map((item) =>({id:item.id ,label:item.name}))
    },
    categoryTypes(){
      return this.$store.state.customer.categoryTypes.map((item) =>({id:item.id ,label:item.categoryName}))
    }

  },
  methods: {
    initValues () {
      if (this.data.id) return
      this.dataId = null
      this.name = null
      this.companyName = null
      this.phone=null
      this.email=null
      this.shippingName=null
      this.shippingCode=null
      this.categoryId=[]
      this.selectedType=null
      this.productTypeId=[]
      this.selectedStatus=null
      this.description=null
      this.address=null
    },
    submitData () {
      this.$validator.validateAll().then(result => {
        if (result) {
          const obj = {
            id: this.dataId,
            name: this.name,
            companyName: this.companyName,
            shippingName:this.shippingName,
            shippingCode:this.shippingCode,
            phone:this.phone,
            email:this.email,
            description:this.description,
            categoryId:this.categoryId.map(item=>(item.id)) ,
            saleType:this.selectedType ,
            productTypeId:this.productTypeId.map(item=>(item.id)),
            status:this.selectedStatus,
            address:this.address
          }

          if (this.dataId !== null && this.dataId >= 0) {
            this.$store.dispatch('customer/updateItem', obj).catch(err => { console.error(err) })
          } else {
            delete obj.id
            // obj.popularity = 0
            this.$store.dispatch('customer/addItem', obj).catch(err => { console.error(err) })
          }

          this.$emit('closeSidebar')
          this.initValues()
        }
      })
    },

  },
  mounted() {

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

