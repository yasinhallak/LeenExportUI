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
      <h4>{{ Object.entries(this.data).length === 0 ? "ADD NEW" : "UPDATE" }} ITEM</h4>
      <feather-icon icon="XIcon" @click.stop="isSidebarActiveLocal = false" class="cursor-pointer"></feather-icon>
    </div>
    <vs-divider class="mb-0"></vs-divider>

    <component :is="scrollbarTag" class="scroll-area--data-list-add-new" :settings="settings" :key="$vs.rtl">

      <div class="p-6">
        <!-- Title -->
        <vs-input label="نوعية الخامة" v-model="title" class="mt-5 w-full" name="title" icon-pack="feather" icon="icon-user" icon-no-border v-validate="'required'" />
        <span class="text-danger text-sm" v-show="errors.has('title')">{{ errors.first('title') }}</span>

        <!-- productTypes -->
        <vs-select label="نوع المنتج"  v-model.number="productTypeId" class="mt-5 w-full" name="productTypeId" v-validate="'required'">
          <vs-select-item :key="item.id" :value="item.id" :text="item.name" v-for="item in productTypes" />
        </vs-select>

        <!-- CompanyName -->
        <vs-select label="اسم الشركة المنتجة" v-model.number="vendorId"  class="mt-5 w-full" name="vendorId" v-validate="'required'">
          <vs-select-item :key="item.id" :value="item.id" :text="item.companyName" v-for="item in companies" />
        </vs-select>
        <span class="text-danger text-sm" v-show="errors.has('vendorId')">{{ errors.first('vendorId') }}</span>

        <!-- size -->
        <vs-input label="المقاسات المتاحة" v-model="size" class="mt-5 w-full" icon-pack="feather"  name="size"  v-validate="'required'"   />
        <span class="text-danger text-sm" v-show="errors.has('size')">{{ errors.first('size') }}</span>

        <!-- count -->
<!--        <vs-input label="Count" v-model="count" class="mt-5 w-full" icon-pack="feather"  name="count"  v-validate="'required|numeric'"   />-->
<!--        <span class="text-danger text-sm" v-show="errors.has('count')">{{ errors.first('count') }}</span>-->


            <vs-input-number  min="20" max="40" v-model="count" name="count"  v-validate="'required'" />
            <span class="text-danger text-sm" v-show="errors.has('count')">{{ errors.first('count') }}</span>

        <!-- PRICE -->
        <vs-input
          icon-pack="feather"
          icon="icon-dollar-sign"
          label="سعر المبيع"
          v-model.number="price"
          class="mt-5 w-full"
          v-validate="{ required: true, regex: /\d+(\.\d+)?$/ }"
          name="price" />
        <span class="text-danger text-sm" v-show="errors.has('price')">{{ errors.first('price') }}</span>

        <!-- ProductCost -->
        <vs-input
          icon-pack="feather"
          icon="icon-dollar-sign"
          label="سعر الرأسمال"
          v-model.number="productCost"
          class="mt-5 w-full"
          v-validate="{ required: true, regex: /\d+(\.\d+)?$/ }"
          name="productCost" />
        <span class="text-danger text-sm" v-show="errors.has('productCost')">{{ errors.first('productCost') }}</span>

        <!-- Description -->
        <vs-textarea label="وصف عن المنتج" v-model="description" class="mt-5 w-full"  width="300px" name="description"  v-validate="'required'" />
        <span class="text-danger text-sm" v-show="errors.has('description')">{{ errors.first('description') }}</span>

        <template>
          <vs-upload multiple automatic  text="Upload Multiple" action="https://jsonplaceholder.typicode.com/posts/" @on-success="successUpload" />
        </template>

      </div>
    </component>

    <div class="flex flex-wrap items-center p-6" slot="footer">
      <vs-button class="mr-6" @click="submitData" :disabled="!isFormValid">Submit</vs-button>
      <vs-button type="border" color="danger" @click="isSidebarActiveLocal = false">Cancel</vs-button>
    </div>
  </vs-sidebar>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'

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
      dataId: null,
      title: null,
      size:null,
      description:null,
      price:null,
      productCost:null,
      count:20,
      productTypeId:null,
      vendorId:null,
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
        const { id,title,size ,description,price,productCost,count,productTypeId,vendorId} = JSON.parse(JSON.stringify(this.data))
        this.dataId = id
        this.title = title
        this.size=size
        this.description=description
        this.price=price
        this.productCost=productCost
        this.count=count
        this.productTypeId=productTypeId
        this.vendorId=vendorId
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
      return !this.errors.any() && this.title && this.size && this.description && this.price && this.productCost && this.count && this.productTypeId && this.vendorId
    },
    scrollbarTag () { return this.$store.getters.scrollbarTag },

    productTypes () {
      return this.$store.state.product.productTypes
    },
    companies(){
      return this.$store.state.product.companies
    }
  },
  methods: {
    successUpload(){
      this.$vs.notify({color:'success',title:'Upload Success',text:'Lorem ipsum dolor sit amet, consectetur'})
    },
    initValues () {
      if (this.data.id) return
      this.dataId = null
      this.title = null
      this.size = null
      this.description=null
      this.price=null
      this.productCost=null
      this.count=20
      this.productTypeId=null
      this.vendorId=null

    },
    submitData () {
      this.$validator.validateAll().then(result => {
        if (result) {
          const obj = {
            id: this.dataId,
            title: this.title,
            description: this.description,
            size: this.size,
            price:this.price,
            productCost:this.productCost,
            count:this.count,
            productTypeId:this.productTypeId,
            vendorId:this.vendorId
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

  },
  mounted () {
    this.$store.dispatch('product/fetchProductTypeItems')
    this.$store.dispatch('product/fetchCompanyItems')
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

