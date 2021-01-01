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
      <h4>{{ Object.entries(this.data).length === 0 ? "إضافة" : "تعديل" }} منتج</h4>
      <feather-icon icon="XIcon" @click.stop="isSidebarActiveLocal = false" class="cursor-pointer"></feather-icon>
    </div>
    <vs-divider class="mb-0"></vs-divider>

    <component :is="scrollbarTag" class="scroll-area--data-list-add-new" :settings="settings" :key="$vs.rtl">

      <div class="p-6">
        <!-- seasonsTypes -->
        <vs-select v-model.number="seasonsTypes" @change="changeSeasonsTypes" label="اختر الفصل" class="mt-5 w-full" name="seasonsTypes" v-validate="'required'">
          <vs-select-item :key="item.value" :value="item.value" :text="item.text" v-for="item in category_choices" />
        </vs-select>
        <span class="text-danger text-sm" v-show="errors.has('seasonsTypes')">{{ errors.first('seasonsTypes') }}</span>
        <!-- CATEGORY -->
        <vs-select v-model.number="categoryId" @change="changeCategoryTypes" label="  اختر التصنيف الرئيسي" class="mt-5 w-full" name="categoryId" v-validate="'required'">
          <vs-select-item :key="item.id" :value="item.id" :text="item.categoryName" v-for="item in categoryTypes" />
        </vs-select>
        <span class="text-danger text-sm" v-show="errors.has('categoryId')">{{ errors.first('categoryId') }}</span>

        <!-- productTypes -->
        <vs-select v-model.number="subCategoryId"  @change="changeSubCategoryTypes"  label="اختر التصنيف الفرعي"   class="mt-5 w-full" name="subCategoryId" v-validate="'required'">
          <vs-select-item :key="item.id" :value="item.id" :text="item.name" v-for="item in subCategoryTypes" />
        </vs-select>
        <span class="text-danger text-sm" v-show="errors.has('subCategoryId')">{{ errors.first('subCategoryId') }}</span>

        <!-- productTypes -->
        <vs-select label="اختر المنتج"  v-model.number="productTypeId" class="mt-5 w-full" name="productTypeId" v-validate="'required'">
          <vs-select-item :key="item.id" :value="item.id" :text="item.name" v-for="item in productTypes" />
        </vs-select>
        <span class="text-danger text-sm" v-show="errors.has('productTypeId')">{{ errors.first('productTypeId') }}</span>

        <!-- Title -->
        <vs-input label="عنوان المنتج" v-model="title" class="mt-5 w-full" name="title" icon-pack="feather" icon="icon-user" icon-no-border v-validate="'required'" />
        <span class="text-danger text-sm" v-show="errors.has('title')">{{ errors.first('title') }}</span>

        <!-- Title -->
        <vs-input label="نوعية الخامة" v-model="material" class="mt-5 w-full" name="material" icon-pack="feather" icon="icon-user" icon-no-border v-validate="'required'" />
        <span class="text-danger text-sm" v-show="errors.has('material')">{{ errors.first('material') }}</span>

        <!-- CompanyName -->
        <vs-select label="اسم الشركة المنتجة" v-model.number="vendorId"  class="mt-5 w-full" name="vendorId" v-validate="'required'">
          <vs-select-item :key="item.id" :value="item.id" :text="item.companyName" v-for="item in companies" />
        </vs-select>
        <span class="text-danger text-sm" v-show="errors.has('vendorId')">{{ errors.first('vendorId') }}</span>

        <!-- size -->
<!--        <vs-input label="المقاسات المتاحة" v-model="size" class="mt-5 w-full" icon-pack="feather"  name="size"  v-validate="'required'"   />-->
        <div class="centerx">
          <vs-input-number  min="0" max="10" label="S:" v-model="S" name="S"  v-validate="'required'" />
          <span class="text-danger text-sm" v-show="errors.has('S')">{{ errors.first('S') }}</span>
          <vs-input-number  min="0" max="10" label="M  :" v-model="M" name="M"  v-validate="'required'" />
          <span class="text-danger text-sm" v-show="errors.has('M')">{{ errors.first('M') }}</span>
        </div>
        <div class="centerx">

        </div>
        <div class="centerx">
          <vs-input-number  min="0" max="10" label="L  :" v-model="L" name="L"  v-validate="'required'" />
          <span class="text-danger text-sm" v-show="errors.has('L')">{{ errors.first('L') }}</span>
        </div>
        <div class="centerx">
          <vs-input-number  min="0" max="10" label="XL :" v-model="XL" name="XL"  v-validate="'required'" />
          <span class="text-danger text-sm" v-show="errors.has('XL')">{{ errors.first('XL') }}</span>
        </div>
        <div class="centerx">
          <vs-input-number  min="0" max="10" label="XXL:" v-model="XXL" name="XXL"  v-validate="'required'" />
          <span class="text-danger text-sm" v-show="errors.has('XXL')">{{ errors.first('XXL') }}</span>
        </div>
        <div class="centerx">
          <vs-input-number  min="0" max="10" label="XXXL:" v-model="XXXL" name="XXXL"  v-validate="'required'" />
          <span class="text-danger text-sm" v-show="errors.has('XXXL')">{{ errors.first('XXXL') }}</span>
        </div>
        <div class="centerx">
          <vs-input-number  min="0" max="10" label="XXXXL:" v-model="XXXXL" name="XXXXL"  v-validate="'required'" />
          <span class="text-danger text-sm" v-show="errors.has('XXXXL')">{{ errors.first('XXXXL') }}</span>
        </div>
        <div class="centerx">
          <vs-input-number  min="0" max="10" label="XXXXXL:" v-model="XXXXXL" name="XXXXXL"  v-validate="'required'" />
          <span class="text-danger text-sm" v-show="errors.has('XXXXXL')">{{ errors.first('XXXXXL') }}</span>
        </div>
        <div class="centerx">
          <vs-input-number  min="0" max="10" label="XXXXXXL:" v-model="XXXXXXL" name="XXXXXXL"  v-validate="'required'" />
          <span class="text-danger text-sm" v-show="errors.has('XXXXXXL')">{{ errors.first('XXXXXXL') }}</span>
        </div>
        <div class="centerx">
            <vs-input-number  min="0" max="100" label="عدد المنتجات ضمن السيريه:" v-model="sumCount" name="count"  v-validate="'required'" />
            <span class="text-danger text-sm" v-show="errors.has('count')">{{ errors.first('count') }}</span>
        </div>
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

<!--        <template>-->


<!--          <vs-upload multiple automatic-->
<!--                     fileName="file"-->
<!--                     text="Upload Multiple"-->
<!--                     action="https://leenexport.com/api/v1/media/upload"-->
<!--                     @on-success="successUpload"-->
<!--                     @on-delete="deleteImage"/>-->
<!--        </template>-->


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

    <div class="flex flex-wrap items-center p-6" slot="footer">
      <vs-button class="mr-6" @click="submitData" :disabled="!isFormValid">حفظ</vs-button>
      <vs-button type="border" color="danger" @click="isSidebarActiveLocal = false">إلغاء</vs-button>
    </div>
  </vs-sidebar>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'

// uploadImg map component
import uploadImg from "../../shared/uploadImg";

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

      dataId: null,
      seasonsTypes:null,
      title: null,
      material:null,
      size:null,
      S:0,
      M:0,
      L:0,
      XL:0,
      XXL:0,
      XXXL:0,
      XXXXL:0,
      XXXXXL:0,
      XXXXXXL:0,
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
      files:[],
      settings: { // perfectscrollbar settings
        maxScrollbarLength: 60,
        wheelSpeed: .60
      },
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
        console.log("isSidebarActive",this.data)
        const { id,seasonsTypes,categoryId,subCategoryId,productTypeId,title,material,vendorId,size ,count,price,productCost,description} = JSON.parse(JSON.stringify(this.data))
        this.dataId = id
        this.seasonsTypes=seasonsTypes
        this.categoryId=categoryId
        this.subCategoryId=subCategoryId
        this.productTypeId=productTypeId
        this.title = title,
        this.material=material,
        this.vendorId=vendorId
        this.size=size
        this.count=count
        this.price=price
        this.productCost=productCost
        this.description=description
        this.initValues()

      }
      // Object.entries(this.data).length === 0 ? this.initValues() : { this.dataId, this.dataName, this.dataCategory, this.dataOrder_status, this.dataPrice } = JSON.parse(JSON.stringify(this.data))
    }
  },
  computed: {
    sumCount:{
      get: function () {
        return this.S + this.M + this.L + this.XL + this.XXL + this.XXXL + this.XXXXL + this.XXXXXL + this.XXXXXXL ;
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
      return !this.errors.any() && this.title  && this.description && this.price && this.productCost && this.sumCount && this.categoryId  && this.subCategoryId && this.productTypeId && this.vendorId
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

    successUpload(event){
     // this.$vs.notify({color:'success',title:'Upload Success',text:'Lorem ipsum dolor sit amet, consectetur'})
      //get the filePaths from Laravel controller
      let filePaths = event.currentTarget.response
     this.files.push(JSON.parse(filePaths));
      console.log("filePahths",this.files)
    },

    deleteImage(event){
      console.log("enent",event)
    },
    initValues () {
      if (this.data.id) return
      this.dataId = null
      this.title = null
      this.material=null
      this.S = 0
      this.M = 0
      this.L = 0
      this.XL = 0
      this.XXL = 0
      this.XXXL = 0
      this.XXXXL = 0
      this.XXXXXL = 0
      this.XXXXXXL = 0
      this.description=null
      this.price=null
      this.productCost=null
      this.seasonsTypes=null
      this.sumCount=0
      this.categoryId=null
      this.subCategoryId=null
      this.productTypeId=null
      this.vendorId=null
      this.files=[]

    },
    submitData () {
      this.$validator.validateAll().then(result => {
        if (result) {
          let productSizes=[]
          if(this.S){
            productSizes.push({"name":"S","Count":this.S})
          }
          if(this.M){
            productSizes.push({"name":"M","Count":this.M})
          }
          if(this.L){
            productSizes.push({"name":"L","Count":this.L})
          }
          if(this.XL){
            productSizes.push({"name":"XL","Count":this.XL})
          }
          if(this.XXL){
            productSizes.push({"name":"XXL","Count":this.XXL})
          }
          if(this.XXXL){
            productSizes.push({"name":"XXXL","Count":this.XXXL})
          }
          if(this.XXXXL){
            productSizes.push({"name":"XXXXL","Count":this.XXXXL})
          }
          if(this.XXXXXL){
            productSizes.push({"name":"XXXXXL","Count":this.XXXXXL})
          }
          if(this.XXXXXXL){
            productSizes.push({"name":"XXXXXXL","Count":this.XXXXXXL})
          }

          const obj = {
            id: this.dataId,
            seasonsTypes:this.seasonsTypes,
            categoryId:this.categoryId,
            subCategoryId:this.subCategoryId,
            productTypeId:this.productTypeId,
            title: this.title,
            material:this.material,
            vendorId:this.vendorId,
            count:this.sumCount,
            price:this.price,
            productCost:this.productCost,
            description: this.description,
            photos:this.files,
            ProductSizes:productSizes
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

    changeSeasonsTypes(){
      if(!this.$store.state.product.isUpdated){
        this.categoryId=null
        this.subCategoryId=null
        this.productTypeId=null
      }
      this.$store.dispatch('product/fetchCategoryItems', {seasonsTypes: this.seasonsTypes})
    },

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

