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
        <!-- seasonsTypes -->
<!--        <vs-select v-model.number="seasonsTypes" @change="changeSeasonsTypes" label="اختر الفصل" class="mt-5 catslab" name="seasonsTypes" v-validate="'required'">-->
<!--          <vs-select-item :key="item.value" :value="item.value" :text="item.text" v-for="item in category_choices" />-->
<!--        </vs-select>-->
<!--        <span class="text-danger text-sm" v-show="errors.has('seasonsTypes')">{{ errors.first('seasonsTypes') }}</span>-->
        <!-- CATEGORY -->
        <vs-select v-model="categoryId" @change="changeCategoryTypes" label="اختر التصنيف الرئيسي" class="mt-5 catslab" name="categoryId" v-validate="'required'">
          <vs-select-item :key="index" :value="item.id" :text="item.categoryName" v-for="(item,index) in categoryTypes" />
        </vs-select>
        <span class="text-danger text-sm" v-show="errors.has('categoryId')">{{ errors.first('categoryId') }}</span>

        <!-- productTypes -->
        <vs-select v-model="subCategoryId"  @change="changeSubCategoryTypes"  label="اختر التصنيف الفرعي"   class="mt-5 catslab" name="subCategoryId" v-validate="'required'">
          <vs-select-item :key="item.id" :value="item.id" :text="item.name" class="mt-5 catslab" v-for="item in subCategoryTypes" />
        </vs-select>
        <span class="text-danger text-sm" v-show="errors.has('subCategoryId')">{{ errors.first('subCategoryId') }}</span>

        <!-- productTypes -->
        <vs-select label="اختر المنتج"  v-model="productTypeId" class="mt-5 catslab" name="productTypeId" v-validate="'required'">
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

        <vs-select  autocomplete label="اسم الشركة المنتجة" v-model.number="vendorId"  class="mt-5 catslab" name="vendorId" v-validate="'required'">
          <vs-select-item :key="index" :value="item.id" :text="item.companyName" v-for="(item,index) in companies" />
        </vs-select>
        <span class="text-danger text-sm" v-show="errors.has('vendorId')">{{ errors.first('vendorId') }}</span>

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

        <!-- Description -->
        <vs-textarea label="وصف عن المنتج" v-model="description" class="mt-5 w-full"  width="300px" name="description"   />

        <div></div>

        <div class="all-centerx">
          <div class="centerx" >
            <vs-input-number  min="0" max="10" label="S:" v-model="S"/>
          </div>
          <div class="centerx">
          <vs-input-number  min="0" max="10" label="M  :" v-model="M" />
        </div>
          <div class="centerx">
          <vs-input-number  min="0" max="10" label="L  :" v-model="L" />
        </div>
          <div class="centerx">
          <vs-input-number  min="0" max="10" label="XL :" v-model="XL" />
        </div>
          <div class="centerx">
          <vs-input-number  min="0" max="10" label="2XL:" v-model="XXL" />
        </div>
          <div class="centerx">
          <vs-input-number  min="0" max="10" label="3XL:" v-model="XXXL" />
        </div>
          <div class="centerx">
          <vs-input-number  min="0" max="10" label="4XL:" v-model="XXXXL"/>
        </div>
          <div class="centerx">
          <vs-input-number  min="0" max="10" label="5XL:" v-model="XXXXXL" />
        </div>
          <div class="centerx">
          <vs-input-number  min="0" max="10" label="6XL:" v-model="XXXXXXL" />
         </div>

        </div>

        <div class="all-centerx">
          <div class="centerx">
            <vs-input-number  min="0" max="10" label="27:" v-model="shose27"/>
          </div>
          <div class="centerx">
            <vs-input-number  min="0" max="10" label="28:" v-model="shose28"/>
          </div>
          <div class="centerx">
            <vs-input-number  min="0" max="10" label="29:" v-model="shose29"/>
          </div>
          <div class="centerx">
            <vs-input-number  min="0" max="10" label="30:" v-model="shose30"/>
          </div>
          <div class="centerx">
            <vs-input-number  min="0" max="10" label="31:" v-model="shose31"/>
          </div>
          <div class="centerx">
            <vs-input-number  min="0" max="10" label="32:" v-model="shose32"/>
          </div>
          <div class="centerx">
            <vs-input-number  min="0" max="10" label="33:" v-model="shose33"/>
          </div>
          <div class="centerx">
            <vs-input-number  min="0" max="10" label="34:" v-model="shose34"/>
          </div>
          <div class="centerx">
            <vs-input-number  min="0" max="10" label="35:" v-model="shose35"/>
          </div>
          <div class="centerx">
            <vs-input-number  min="0" max="10" label="36:" v-model="shose36"/>
          </div>

       </div>

        <div class="all-centerx">
          <div class="centerx">
            <vs-input-number  min="0" max="10" label="37:" v-model="shose37"/>
          </div>
          <div class="centerx">
            <vs-input-number  min="0" max="10" label="38:" v-model="shose38"/>
          </div>
          <div class="centerx">
            <vs-input-number  min="0" max="10" label="39:" v-model="shose39"/>
          </div>
          <div class="centerx">
            <vs-input-number  min="0" max="10" label="40:" v-model="shose40"/>
          </div>
          <div class="centerx">
            <vs-input-number  min="0" max="10" label="41:" v-model="shose41"/>
          </div>
          <div class="centerx">
            <vs-input-number  min="0" max="10" label="42:" v-model="shose42"/>
          </div>
          <div class="centerx">
            <vs-input-number  min="0" max="10" label="43:" v-model="shose43"/>
          </div>
          <div class="centerx">
            <vs-input-number  min="0" max="10" label="44:" v-model="shose44"/>
          </div>
          <div class="centerx">
            <vs-input-number  min="0" max="10" label="45:" v-model="shose45"/>
          </div>
          <div class="centerx">
            <vs-input-number  min="0" max="10" label="46:" v-model="shose46"/>
          </div>
        </div>

        <div class="all-centerx">
          <div class="centerx">
            <vs-input-number  min="0" max="10" label="47:" v-model="shose47"/>
          </div>
          <div class="centerx">
            <vs-input-number  min="0" max="10" label="48:" v-model="shose48"/>
          </div>
          <div class="centerx">
            <vs-input-number  min="0" max="10" label="49:" v-model="shose49"/>
          </div>
          <div class="centerx">
            <vs-input-number  min="0" max="10" label="50:" v-model="shose50"/>
          </div>
          <div class="centerx">
            <vs-input-number  min="0" max="10" label="51:" v-model="shose51"/>
          </div>
          <div class="centerx">
            <vs-input-number  min="0" max="10" label="52:" v-model="shose52"/>
          </div>
          <div class="centerx">
            <vs-input-number  min="0" max="10" label="53:" v-model="shose53"/>
          </div>
          <div class="centerx">
            <vs-input-number  min="0" max="10" label="54:" v-model="shose54"/>
          </div>
          <div class="centerx">
            <vs-input-number  min="0" max="10" label="55:" v-model="shose55"/>
          </div>
        </div>

        <div class="all-centerx">
          <div class="centerx">
            <div class="centerx">
              <vs-input-number  min="0" max="10" label="56  :" v-model="shose56"/>
            </div>
            <vs-input-number  min="0" max="10" label="Year 1:" v-model="year1"/>
          </div>
          <div class="centerx">
            <vs-input-number  min="0" max="10" label="Year 2:" v-model="year2"/>
          </div>
          <div class="centerx">
            <vs-input-number  min="0" max="10" label="Year 3:" v-model="year3"/>
          </div>
          <div class="centerx">
            <vs-input-number  min="0" max="10" label="Year 4:" v-model="year4"/>
          </div>
          <div class="centerx">
            <vs-input-number  min="0" max="10" label="Year 5:" v-model="year5"/>
          </div>
          <div class="centerx">
            <vs-input-number  min="0" max="10" label="Year 6:" v-model="year6"/>
          </div>
          <div class="centerx">
            <vs-input-number  min="0" max="10" label="Year 7:" v-model="year7"/>
          </div>
          <div class="centerx">
            <vs-input-number  min="0" max="10" label="Year 8:" v-model="year8"/>
          </div>

        </div>
        <div class="all-centerx">
          <div class="centerx">
            <vs-input-number  min="0" max="10" label="Year 9:" v-model="year9"/>
          </div>
          <div class="centerx">
            <vs-input-number  min="0" max="10" label="Year 10:" v-model="year10"/>
          </div>
          <div class="centerx">
            <vs-input-number  min="0" max="10" label="Year 11:" v-model="year11"/>
          </div>
          <div class="centerx">
            <vs-input-number  min="0" max="10" label="Year 12:" v-model="year12"/>
          </div>
          <div class="centerx">
            <vs-input-number  min="0" max="10" label="Year 13:" v-model="year13"/>
          </div>
          <div class="centerx">
            <vs-input-number  min="0" max="10" label="Year 14:" v-model="year14"/>
          </div>
          <div class="centerx">
            <vs-input-number  min="0" max="10" label="Year 15:" v-model="year15"/>
          </div>
          <div class="centerx">
            <vs-input-number  min="0" max="10" label="Year 16:" v-model="year16"/>
          </div>
          <div class="centerx">
            <vs-input-number  min="0" max="10" label="Year 18:" v-model="year18"/>
          </div>

        </div>

        <div class="centerx">
          <vs-input-number  min="0" max="100" label=" المجموع:" v-model="sumCount" class="mt-5"   />
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
      size:staticJson.size,
      S:0,
      M:0,
      L:0,
      XL:0,
      XXL:0,
      XXXL:0,
      XXXXL:0,
      XXXXXL:0,
      XXXXXXL:0,
      shose27:0,
      shose28:0,
      shose29:0,
      shose30:0,
      shose31:0,
      shose32:0,
      shose33:0,
      shose34:0,
      shose35:0,
      shose36:0,
      shose37:0,
      shose38:0,
      shose39:0,
      shose40:0,
      shose41:0,
      shose42:0,
      shose43:0,
      shose44:0,
      shose45:0,
      shose46:0,
      shose47:0,
      shose48:0,
      shose49:0,
      shose50:0,
      shose51:0,
      shose52:0,
      shose53:0,
      shose54:0,
      shose55:0,
      shose56:0,
      year1:0,
      year2:0,
      year3:0,
      year4:0,
      year5:0,
      year6:0,
      year7:0,
      year8:0,
      year9:0,
      year10:0,
      year11:0,
      year12:0,
      year13:0,
      year14:0,
      year15:0,
      year16:0,
      year18:0,
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
        this.initValueSize()
        const { id,categoryId,subCategoryId,productTypeId,title,material,vendorId ,count,price,productCost,description,images,productSize} = JSON.parse(JSON.stringify(this.data))
        this.dataId = id
        setTimeout( ()=>{this.categoryId=categoryId},500)
        setTimeout( ()=>{this.subCategoryId=subCategoryId},1000)
        setTimeout( ()=>{this.productTypeId=productTypeId},1500)
        this.title = title
        this.material=material
        this.count=count
        this.price=price
        this.vendorId=vendorId
        this.productCost=productCost
        this.description=description
        this.photos=images
        productSize.forEach(x=>{
          if(x.name=="S")this.S=x.count
          if(x.name=="M") this.M=x.count
          if(x.name=="L")this.L=x.count
          if(x.name=="X")this.X=x.count
          if(x.name=="XL")this.XL=x.count
          if(x.name=="2XL")this.XXL=x.count
          if(x.name=="3XL")this.XXXL=x.count
          if(x.name=="4XL")this.XXXXL=x.count
          if(x.name=="5XL")this.XXXXXL=x.count
          if(x.name=="6XL")this.XXXXXXL=x.count
          if(x.name=="27")this.shose27=x.count
          if(x.name=="28")this.shose28=x.count
          if(x.name=="29")this.shose29=x.count
          if(x.name=="30")this.shose30=x.count
          if(x.name=="31")this.shose31=x.count
          if(x.name=="32")this.shose32=x.count
          if(x.name=="33")this.shose33=x.count
          if(x.name=="34")this.shose34=x.count
          if(x.name=="35")this.shose35=x.count
          if(x.name=="36")this.shose36=x.count
          if(x.name=="37")this.shose37=x.count
          if(x.name=="38")this.shose38=x.count
          if(x.name=="39")this.shose39=x.count
          if(x.name=="40")this.shose40=x.count
          if(x.name=="41")this.shose41=x.count
          if(x.name=="42")this.shose42=x.count
          if(x.name=="43")this.shose43=x.count
          if(x.name=="44")this.shose44=x.count
          if(x.name=="45")this.shose45=x.count
          if(x.name=="46")this.shose46=x.count
          if(x.name=="47")this.shose47=x.count
          if(x.name=="48")this.shose48=x.count
          if(x.name=="49")this.shose49=x.count
          if(x.name=="50")this.shose50=x.count
          if(x.name=="51")this.shose51=x.count
          if(x.name=="52")this.shose52=x.count
          if(x.name=="53")this.shose53=x.count
          if(x.name=="54")this.shose54=x.count
          if(x.name=="55")this.shose55=x.count
          if(x.name=="56")this.shose56=x.count
          if(x.name=="year1")this.year1=x.count
          if(x.name=="year2")this.year2=x.count
          if(x.name=="year3")this.year3=x.count
          if(x.name=="year4")this.year4=x.count
          if(x.name=="year5")this.year5=x.count
          if(x.name=="year6")this.year6=x.count
          if(x.name=="year7")this.year7=x.count
          if(x.name=="year8")this.year8=x.count
          if(x.name=="year9")this.year9=x.count
          if(x.name=="year10")this.year10=x.count
          if(x.name=="year11")this.year11=x.count
          if(x.name=="year12")this.year12=x.count
          if(x.name=="year13")this.year13=x.count
          if(x.name=="year14")this.year14=x.count
          if(x.name=="year15")this.year15=x.count
          if(x.name=="year16")this.year16=x.count
          if(x.name=="year18")this.year18=x.count

        })

      }
      // Object.entries(this.data).length === 0 ? this.initValues() : { this.dataId, this.dataName, this.dataCategory, this.dataOrder_status, this.dataPrice } = JSON.parse(JSON.stringify(this.data))
    }
  },
  computed: {
    sumCount:{
      get: function () {
        return this.S + this.M + this.L + this.XL + this.XXL + this.XXXL + this.XXXXL + this.XXXXXL + this.XXXXXXL+this.shose27 + this.shose28 +
               this.shose29 + this.shose30 +this.shose31 +this.shose32 +this.shose33 +this.shose34 +this.shose35 +
               this.shose36 +this.shose37 +this.shose38 +this.shose39 +this.shose40 +this.shose41 +this.shose42 +
               this.shose43 +this.shose44 +this.shose45 +this.shose46 +this.shose47 +this.shose48 +this.shose49 +
               this.shose50 +this.shose51 +this.shose52 +this.shose53 +this.shose54 +this.shose55  +this.shose56 +
               this.year1 +this.year2 +this.year3 +this.year4 +this.year5 +this.year6 +this.year7 +this.year8 + this.year9+
               this.year10 +this.year11 +this.year12 +this.year13 +this.year14 +this.year15 +this.year16 +this.year18;
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
      return !this.errors.any() && this.title  && this.price && this.productCost  && this.categoryId  && this.subCategoryId && this.productTypeId && this.vendorId && this.photos.length !=0
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

    initValues () {
     if (this.data.id) return
      this.dataId = null
      this.title = null
      this.material=null
      this.description=null
      this.price=null
      this.productCost=null
      this.categoryId=null
      this.subCategoryId=null
      this.productTypeId=null
      this.vendorId=null
      this.photos=[]
      this.initValueSize()
    },

    initValueSize(){
      this.S = 0
      this.M = 0
      this.L = 0
      this.XL = 0
      this.XXL = 0
      this.XXXL = 0
      this.XXXXL = 0
      this.XXXXXL = 0
      this.XXXXXXL = 0
      this.shose27 = 0
      this.shose28 = 0
      this.shose29 = 0
      this.shose30 = 0
      this.shose31 = 0
      this.shose32 = 0
      this.shose33 = 0
      this.shose34 = 0
      this.shose35 = 0
      this.shose36 = 0
      this.shose37= 0
      this.shose38 = 0
      this.shose39 = 0
      this.shose40 = 0
      this.shose41 = 0
      this.shose42 = 0
      this.shose43 = 0
      this.shose44 = 0
      this.shose45 = 0
      this.shose46 = 0
      this.shose47 = 0
      this.shose48 = 0
      this.shose49 = 0
      this.shose50 = 0
      this.shose51 = 0
      this.shose52 = 0
      this.shose53 = 0
      this.shose54 = 0
      this.shose55 = 0
      this.shose56 = 0
      this.year1 = 0
      this.year2 = 0
      this.year3 = 0
      this.year4 = 0
      this.year5 = 0
      this.year6 = 0
      this.year7 = 0
      this.year8 = 0
      this.year9 = 0
      this.year10 = 0
      this.year11 = 0
      this.year12 = 0
      this.year13 = 0
      this.year14 = 0
      this.year15 = 0
      this.year16 = 0
      this.year18 = 0
      this.sumCount=0
    },

    submitData () {
      this.$validator.validateAll().then(result => {
        if (result) {
          let productSizes=[]
          if(this.S) productSizes.push({"name":"S","Count":this.S})
          if(this.M) productSizes.push({"name":"M","Count":this.M})
          if(this.L) productSizes.push({"name":"L","Count":this.L})
          if(this.XL)productSizes.push({"name":"XL","Count":this.XL})
          if(this.XXL)productSizes.push({"name":"2XL","Count":this.XXL})
          if(this.XXXL)productSizes.push({"name":"3XL","Count":this.XXXL})
          if(this.XXXXL) productSizes.push({"name":"4XL","Count":this.XXXXL})
          if(this.XXXXXL)productSizes.push({"name":"5XL","Count":this.XXXXXL})
          if(this.XXXXXXL)productSizes.push({"name":"6XL","Count":this.XXXXXXL})
          if(this.shose27)productSizes.push({"name":"27","Count":this.shose27})
          if(this.shose28)productSizes.push({"name":"28","Count":this.shose28})
          if(this.shose29)productSizes.push({"name":"29","Count":this.shose29})
          if(this.shose30)productSizes.push({"name":"30","Count":this.shose30})
          if(this.shose31)productSizes.push({"name":"31","Count":this.shose31})
          if(this.shose32)productSizes.push({"name":"32","Count":this.shose32})
          if(this.shose33)productSizes.push({"name":"33","Count":this.shose33})
          if(this.shose34)productSizes.push({"name":"34","Count":this.shose34})
          if(this.shose35)productSizes.push({"name":"35","Count":this.shose35})
          if(this.shose36)productSizes.push({"name":"36","Count":this.shose36})
          if(this.shose37)productSizes.push({"name":"37","Count":this.shose37})
          if(this.shose38)productSizes.push({"name":"38","Count":this.shose38})
          if(this.shose39)productSizes.push({"name":"39","Count":this.shose39})
          if(this.shose40)productSizes.push({"name":"40","Count":this.shose40})
          if(this.shose41)productSizes.push({"name":"41","Count":this.shose41})
          if(this.shose42)productSizes.push({"name":"42","Count":this.shose42})
          if(this.shose43)productSizes.push({"name":"43","Count":this.shose43})
          if(this.shose44)productSizes.push({"name":"44","Count":this.shose44})
          if(this.shose45)productSizes.push({"name":"45","Count":this.shose45})
          if(this.shose46)productSizes.push({"name":"46","Count":this.shose46})
          if(this.shose47)productSizes.push({"name":"47","Count":this.shose47})
          if(this.shose48)productSizes.push({"name":"48","Count":this.shose48})
          if(this.shose49)productSizes.push({"name":"49","Count":this.shose49})
          if(this.shose50)productSizes.push({"name":"50","Count":this.shose50})
          if(this.shose51)productSizes.push({"name":"51","Count":this.shose51})
          if(this.shose52)productSizes.push({"name":"52","Count":this.shose52})
          if(this.shose53)productSizes.push({"name":"53","Count":this.shose53})
          if(this.shose54)productSizes.push({"name":"54","Count":this.shose54})
          if(this.shose55)productSizes.push({"name":"55","Count":this.shose55})
          if(this.shose56)productSizes.push({"name":"56","Count":this.shose56})
          if(this.year1)productSizes.push({"name":"year1","Count":this.year1})
          if(this.year2)productSizes.push({"name":"year2","Count":this.year2})
          if(this.year3)productSizes.push({"name":"year3","Count":this.year3})
          if(this.year4)productSizes.push({"name":"year4","Count":this.year4})
          if(this.year5)productSizes.push({"name":"year5","Count":this.year5})
          if(this.year6)productSizes.push({"name":"year6","Count":this.year6})
          if(this.year7)productSizes.push({"name":"year7","Count":this.year7})
          if(this.year8)productSizes.push({"name":"year8","Count":this.year8})
          if(this.year9)productSizes.push({"name":"year9","Count":this.year9})
          if(this.year10)productSizes.push({"name":"year10","Count":this.year10})
          if(this.year11)productSizes.push({"name":"year11","Count":this.year11})
          if(this.year12)productSizes.push({"name":"year12","Count":this.year12})
          if(this.year13)productSizes.push({"name":"year13","Count":this.year13})
          if(this.year14)productSizes.push({"name":"year14","Count":this.year14})
          if(this.year15)productSizes.push({"name":"year15","Count":this.year15})
          if(this.year16)productSizes.push({"name":"year16","Count":this.year16})
          if(this.year18)productSizes.push({"name":"year18","Count":this.year18})

          const obj = {
            id: this.dataId,
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
            photos:this.photos.map(photo => String(photo.response  ? photo.response : photo.id)),
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
      width: 16.15%;
      display: inline-block;
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






