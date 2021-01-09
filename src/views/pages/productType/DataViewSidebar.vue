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
      <h4>{{ Object.entries(this.data).length === 0 ? "إضافة" : "تعديل" }} منتج رئيسي</h4>
      <feather-icon icon="XIcon" @click.stop="isSidebarActiveLocal = false" class="cursor-pointer"></feather-icon>
    </div>
    <vs-divider class="mb-0"></vs-divider>

    <component :is="scrollbarTag" class="scroll-area--data-list-add-new" :settings="settings" :key="$vs.rtl">

      <div class="p-6">

        <!-- NAME -->
        <vs-input label="اسم المنتج" v-model="name" class="mt-5 w-full" name="name" v-validate="'required'" />
        <span class="text-danger text-sm" v-show="errors.has('name')">{{ errors.first('name') }}</span>

        <!-- seasonsTypes -->
<!--        <vs-select v-model.number="seasonsTypes" @change="changeSeasonsTypes" label="اختر الفصل" class="mt-5 w-full" name="seasonsTypes" v-validate="'required'">-->
<!--          <vs-select-item :key="item.value" :value="item.value" :text="item.text" v-for="item in category_choices" />-->
<!--        </vs-select>-->
<!--        <span class="text-danger text-sm" v-show="errors.has('seasonsTypes')">{{ errors.first('seasonsTypes') }}</span>-->

        <!-- CATEGORY -->
        <vs-select v-model.number="categoryId" @change="changeCategoryTypes" label="نوع التصنيف الرئيسي" class="mt-5 w-full" name="category" v-validate="'required'">
          <vs-select-item :key="item.id" :value="item.id" :text="item.categoryName" v-for="item in categoryTypes" />
        </vs-select>
        <span class="text-danger text-sm" v-show="errors.has('category')">{{ errors.first('category') }}</span>

        <!-- CATEGORY -->
        <vs-select v-model.number="subCategoryId" label="نوع التصنيف الفرعي" class="mt-5 w-full" name="subCategory" v-validate="'required'">
          <vs-select-item :key="item.id" :value="item.id" :text="item.name" v-for="item in subCategoryTypes" />
        </vs-select>
        <span class="text-danger text-sm" v-show="errors.has('subCategory')">{{ errors.first('subCategory') }}</span>

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
import axios from "@/axios";

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
      name: null,
      seasonsTypes:null,
      categoryId: null,
      subCategoryId:null,
      //categoryTypes:[],
      category_choices: [
        {text:'ربيع', value:'1'},
        {text:'صيف', value:'2'},
        {text:'خريف', value:'3'},
        {text:'شتاء', value:'4'}
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
        const {id, name, categoryId,subCategoryId } = JSON.parse(JSON.stringify(this.data))
        this.dataId = id
        this.name = name
        this.categoryId = categoryId
        this.subCategoryId=subCategoryId
        this.initValues()


      }
      // Object.entries(this.data).length === 0 ? this.initValues() : { this.dataId, this.dataName, this.dataCategory, this.dataOrder_status, this.dataPrice } = JSON.parse(JSON.stringify(this.data))
    },
    // seasonsTypes:function (){
    //   const obj = {
    //     seasonsTypes: this.seasonsTypes,
    //   }
    //   this.$store.dispatch('productType/fetchCategoryItems',obj)
    // }
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
      return !this.errors.any() && this.name && this.categoryId && this.seasonsTypes
    },
    scrollbarTag () { return this.$store.getters.scrollbarTag },

    categoryTypes () {
      return this.$store.state.productType.categoryTypes
    },

    subCategoryTypes(){
      return this.$store.state.productType.subCategoryTypes
    }
  },
  methods: {
    initValues () {
      if (this.data.id) return
      this.dataId = null
      this.name = null
      this.categoryId = null
      this.subCategoryId=null

    },
    submitData () {
      this.$validator.validateAll().then(result => {
        if (result) {
          const obj = {
            id: this.dataId,
            name: this.name,
            subCategoryId: this.subCategoryId,
          }

          if (this.dataId !== null && this.dataId >= 0) {
            this.$store.dispatch('productType/updateItem', obj).catch(err => { console.error(err) })
          } else {
            delete obj.id
            // obj.popularity = 0
            this.$store.dispatch('productType/addItem', obj).catch(err => { console.error(err) })
          }

          this.$emit('closeSidebar')
          this.initValues()
        }
      })
    },

    // changeSeasonsTypes(){
    //   if(!this.$store.state.productType.isUpdated){
    //    //console.log("changeSeasonsTypes")
    //     this.categoryId=null
    //     this.subCategoryId=null
    //   }
    //
    //   this.$store.dispatch('productType/fetchCategoryItems', { seasonsTypes: this.seasonsTypes})
    // },
    changeCategoryTypes(){
      if(!this.$store.state.productType.isUpdated){
       // console.log("changeCategoryTypes")
        this.subCategoryId=null
      }
       if(this.categoryId){
         this.$store.dispatch('productType/fetchSubCategoryItems', {categoryId: this.categoryId})
       }

      this.$store.dispatch('productType/updateModalState',false);

    }

  },
  mounted () {
    this.$store.dispatch('productType/fetchCategoryItems', { seasonsTypes: null})
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

