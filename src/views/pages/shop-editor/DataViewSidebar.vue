


<template>
  <vs-sidebar click-not-close position-right parent="body" default-index="1" color="primary" class="add-new-data-sidebar items-no-padding own-side" spacer v-model="isSidebarActiveLocal">
    <div class="mt-6 flex items-center justify-between px-6">
      <h4>{{ Object.entries(this.data).length === 0 ? "إضافة" : "تعديل" }} </h4>
      <feather-icon icon="XIcon" @click.stop="isSidebarActiveLocal = false" class="cursor-pointer"></feather-icon>
    </div>
    <vs-divider class="mb-0"></vs-divider>

    <component :is="scrollbarTag" class="scroll-area--data-list-add-new" :settings="settings" :key="$vs.rtl">
        <div id="extra-component-quill-editor-demo">
      <quill-editor-theme-snow></quill-editor-theme-snow>
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

import QuillEditorThemeSnow from '../../components/extra-components/quill-editor/QuillEditorThemeSnow.vue'
export default {
  props: {
    isSidebarActive: {
      type: Boolean,
      required: true
    },
    data: {
      type: String,

    }
  },
  components: {
    VuePerfectScrollbar,
    QuillEditorThemeSnow
  },
  data () {
    return {
      dataId: null,
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
        this.initValueSize()
        const { id,categoryId,subCategoryId,productTypeId,title,material,vendorId ,count,price,productCost,description,images,productSize,inStock} = JSON.parse(JSON.stringify(this.data))
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

        })

      }
      // Object.entries(this.data).length === 0 ? this.initValues() : { this.dataId, this.dataName, this.dataCategory, this.dataOrder_status, this.dataPrice } = JSON.parse(JSON.stringify(this.data))
    }
  },
  computed: {
    sumCount:{
      get: function () {
        return this.S + this.M + this.L + this.XL + this.XXL + this.XXXL + this.XXXXL + this.XXXXXL + this.XXXXXXL+
          this.shose29 + this.shose30 +this.shose31 +this.shose32 +this.shose33 +this.shose34 +this.shose35 +
          this.shose36 +this.shose37 +this.shose38 +this.shose39 +this.shose40 +this.shose41 +this.shose42 +
          this.shose43 +this.shose44 +this.shose45 +this.shose46 +this.shose47 +this.shose48 +this.shose49 +
          this.shose50 +this.shose51 +this.shose52 +this.shose53 +this.shose54 +this.shose55  +this.shose56 +
          this.year1 +this.year2 +this.year3 +this.year4 +this.year5 +this.year6 +this.year7 +this.year8 + this.year9+
          this.year10 +this.year11 +this.year12 +this.year13 +this.year14 +this.year15 +this.year16 ;
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
      return !this.errors.any() && this.title  && this.price && this.productCost &&  this.productTypeId
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



    initValues () {
      if (this.data.id) return
      this.dataId = null
      this.initValueSize()
    },

    initValueSize(){

    },

    submitData () {
      this.$validator.validateAll().then(result => {
        if (result) {
          const obj = {
            id: this.dataId,
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







