

<template>
  <div id="page-user-edit ">
    <vx-card >
      <div slot="no-body" class="tabs-container px-6 pt-6">
        <vs-tabs  class="tab-action-btn-fill-conatiner direction">
          <vs-tab label="خدمة واتس أب" icon-pack="feather" >
            <div class="tab-text">
             <div class="p-6">
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
              <div class="p-12 flex mb-12 direction">
                <!-- customers -->
                <div style="color: #1f74ff;" class="w-full  h-12  ">
                  <label  >اختر البلد</label>
                  <v-select multiple  v-model.number="cityNames"  :options="cities" name="cityIds" />
                </div>

                  <vs-select autocomplete v-model.number="categoryKeyword" class="w-full h-12"  label="اختر اختصاص البيع" name="categoryKeyword"  >
                    <vs-select-item :key="item.id" :value="item.id" :text="item.categoryName" v-for="item in categoryTypes" />
                  </vs-select>

                <!-- customers -->
                <div style="color: #1f74ff;" class="w-full h-12 ">
                  <label  >اختر اسم الزبون</label>
                  <v-select multiple  v-model.number="customerIds"  :options="customers" name="customerIds"  />
                </div>
                <!-- Description -->

              </div>
              <vs-textarea label="نص الرسالة" v-model="description" class=" w-full"  name="description"   />
              <div class="flex flex-wrap items-center " slot="footer">
                <vs-button  @click="submitData" :disabled="!isFormValid" >إرسال</vs-button>
              </div>

            </div>
          </vs-tab>
        </vs-tabs>
      </div>
    </vx-card>
  </div>
</template>

<script>

import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import vSelect from 'vue-select'
import moduleDataList from '@/store/product/moduleProduct.js'
// uploadImg map component
import uploadImg from "../../shared/uploadImg";


export default {
  components: {
    VuePerfectScrollbar,
    uploadImg,
    vSelect
  },
  data () {
    return {
      description:null,
      categoryKeyword:null,
      customerIds:[],
      cityNames:[],
      photosAccept: "image/png,image/gif,image/jpeg,image/webp",
      photosExtensions: "gif,jpg,jpeg,png,webp",
      photos:[],
    }
  },
  computed: {

    isFormValid () {
      return !this.errors.any()  && this.photos.length !=0
    },

    categoryTypes () {
      return this.$store.state.product.categoryTypes
    },

    customers(){
      return this.$store.state.product.customers.map((item) =>({id:item.id ,label:item.name}))
    },
    cities(){
      const result= [...new Set(this.$store.state.product.customers.map(item =>item.address)) ]
      return  result.map((item) =>({label:item}))
    }
  },
  methods: {

    initValues () {
      this.description=null
      this.categoryKeyword=null
      this.customerIds=[]
      this.cityNames=[]
      this.photos=[]
    },

    submitData () {
      this.$validator.validateAll().then(result => {
        if (result) {
          const obj = {
            photos:this.photos.map((photo,index) =>({guid:String(photo.response  ? photo.response : photo.id),order:index+1}) ),
            categoryKeyword:this.categoryKeyword,
            customerIds:this.customerIds !=null ?this.customerIds.map(item=>(item.id)):null ,
            cityNames:this.cityNames!=null?this.cityNames.map(item=>item.label):null,
            description:this.description
          }
          if (this.dataId !== null && this.dataId >= 0) {
            this.$store.dispatch('product/updateItem', obj).catch(err => { console.error(err) })
          } else {
            delete obj.id
            // obj.popularity = 0
            this.$store.dispatch('product/sendWhatsApp', obj).then((response) => {
              console.log("response",response)
              if(response.data){
                this.showSuccessMessage()
              }
              // commit('ADD_ITEM',  response.data)
            })
              .catch((error) => { console.error(error) })
          }

        }
      })
    },
    showSuccessMessage () {
      this.$vs.notify({
        position: 'top-right',
        color: 'success',
        title: 'رسالة واتس أب',
        text: 'تم إرسال الرسالة بنجاح'
      })
      this.initValues()
    },

  },
  created () {
    if (!moduleDataList.isRegistered) {
      this.$store.registerModule('product', moduleDataList)
      moduleDataList.isRegistered = true
    }
    this.$store.dispatch('product/fetchDataListItems')
  },
  mounted () {
    this.$store.dispatch('product/fetchCustomerItems')
    this.$store.dispatch('product/fetchCategoryItems', {seasonsTypes: null})
  }
}

</script>
<style lang="scss">

.direction{
  direction: rtl;
}

</style>


































<!--<template>-->
<!--  <div id="page-user-edit">-->

<!--    <vx-card >-->

<!--      <div slot="no-body" class="tabs-container px-6 pt-6">-->

<!--        <vs-tabs class="tab-action-btn-fill-conatiner">-->
<!--          <vs-tab label="Account" icon-pack="feather" icon="icon-user">-->
<!--            <div class="tab-text">-->
<!--             -->
<!--            </div>-->
<!--          </vs-tab>-->

<!--        </vs-tabs>-->

<!--      </div>-->

<!--    </vx-card>-->
<!--  </div>-->
<!--</template>-->
<!--<script>-->

<!--// uploadImg map component-->
<!--import uploadImg from "../../shared/uploadImg";-->
<!--import VuePerfectScrollbar from "vue-perfect-scrollbar";-->
<!--import vSelect from "vue-select";-->
<!--import moduleDataList from '@/store/product/moduleProduct.js'-->

<!--export default {-->
<!--name: "whatsApp",-->
<!--  components: {-->
<!--    VuePerfectScrollbar,-->
<!--    uploadImg,-->
<!--    vSelect-->
<!--  },-->
<!--  data () {-->
<!--    return {-->
<!--      dataId: null,-->
<!--      title: null,-->
<!--      keyword:null,-->
<!--      categoryKeyword:null,-->
<!--      customerIds:null,-->
<!--      cityNames:[],-->
<!--      photosAccept: "image/png,image/gif,image/jpeg,image/webp",-->
<!--      photosExtensions: "gif,jpg,jpeg,png,webp",-->
<!--      photos:[],-->
<!--      settings: { // perfectscrollbar settings-->
<!--        maxScrollbarLength: 60,-->
<!--        wheelSpeed: .60-->
<!--      },-->
<!--    }-->
<!--  },-->
<!--  computed: {-->
<!--    activeUserInfo () {-->
<!--      return this.$store.state.AppActiveUser-->
<!--    },-->
<!--    isSidebarActiveLocal: {-->
<!--      get () {-->
<!--        return this.isSidebarActive-->
<!--      },-->
<!--      set (val) {-->
<!--        if (!val) {-->
<!--          this.$emit('closeSidebar')-->
<!--          // this.$validator.reset()-->
<!--          // this.initValues()-->
<!--        }-->
<!--      }-->
<!--    },-->
<!--    isFormValid () {-->
<!--      return !this.errors.any() && this.title  && this.productCost  && this.categoryId  && this.subCategoryId && this.productTypeId && this.vendorId && this.photos.length !=0-->
<!--    },-->
<!--    scrollbarTag () { return this.$store.getters.scrollbarTag },-->

<!--    categoryTypes () {-->
<!--      return this.$store.state.product.categoryTypes-->
<!--    },-->

<!--    customers(){-->
<!--      return this.$store.state.product.customers.map((item) =>({id:item.id ,label:item.name}))-->
<!--    },-->
<!--    cities(){-->
<!--      const result= [...new Set(this.$store.state.product.customers.map(item =>item.address)) ]-->
<!--      return  result.map((item) =>({label:item}))-->
<!--    }-->
<!--  },-->
<!--  methods: {-->

<!--    initValues () {-->
<!--      if (this.data.id) return-->
<!--      this.dataId = null-->
<!--        this.title = null-->
<!--      this.photos=[]-->
<!--      this.keyword=null-->
<!--      this.categoryKeyword=null-->
<!--      this.customerIds=null-->
<!--      this.cityNames=[]-->
<!--    },-->

<!--    submitData () {-->
<!--      this.$validator.validateAll().then(result => {-->
<!--        if (result) {-->
<!--          const obj = {-->
<!--            id: this.dataId,-->
<!--            photos:this.photos.map((photo,index) =>({guid:String(photo.response  ? photo.response : photo.id),order:index+1}) ),-->
<!--            keyword:this.keyword,-->
<!--            categoryKeyword:this.categoryKeyword,-->
<!--            customerIds:this.customerIds !=null ?this.customerIds.map(item=>(item.id)):null ,-->
<!--            cityNames:this.cityNames!=null?this.cityNames.map(item=>item.label):null-->
<!--          }-->

<!--          if (this.dataId !== null && this.dataId >= 0) {-->
<!--            this.$store.dispatch('product/updateItem', obj).catch(err => { console.error(err) })-->
<!--          } else {-->
<!--            delete obj.id-->
<!--            // obj.popularity = 0-->
<!--            this.$store.dispatch('product/addItem', obj).catch(err => { console.error(err) })-->
<!--          }-->

<!--          this.$emit('closeSidebar')-->
<!--          this.initValues()-->
<!--        }-->
<!--      })-->
<!--    },-->



<!--  },-->
<!--  created () {-->
<!--    if (!moduleDataList.isRegistered) {-->
<!--      this.$store.registerModule('product', moduleDataList)-->
<!--      moduleDataList.isRegistered = true-->
<!--    }-->
<!--    this.$store.dispatch('product/fetchDataListItems')-->
<!--  },-->
<!--  mounted () {-->
<!--    this.$store.dispatch('product/fetchCustomerItems')-->
<!--    this.$store.dispatch('product/fetchCategoryItems', {seasonsTypes: null})-->
<!--  }-->
<!--}-->
<!--</script>-->

<!--<style lang="scss">-->

<!--.direction{-->
<!--  direction: ltr;-->
<!--}-->
<!--.own-side{-->
<!--  max-width: 100%;-->
<!--  width: 80%;-->
<!--  .vs-sidebar{-->
<!--    max-width: 100%;-->
<!--    width: 80%;-->
<!--    z-index: 100000;-->
<!--    direction: rtl;-->
<!--    .all-centerx{-->
<!--      direction: ltr;-->
<!--      width: 170px;-->
<!--      display: inline-block;-->
<!--      @media (max-width: 567px) {-->
<!--        width: 220px;-->
<!--      }-->

<!--      .centerx {-->
<!--        margin: 7px;-->
<!--        padding: 3px;-->
<!--        background-color: whitesmoke;-->
<!--        border-radius: 5px;-->
<!--        .vs-input-number{-->
<!--          display: flex;-->
<!--          justify-content: space-around;-->
<!--          margin: 0;-->
<!--          padding: 0;-->
<!--          span{-->
<!--            min-width: 32px;-->
<!--          }-->
<!--        }-->

<!--      }-->

<!--    }-->
<!--    .sum{-->
<!--      .vs-input-number button.vs-input-number&#45;&#45;button-plus, .vs-input-number button.vs-input-number&#45;&#45;button-less{-->
<!--        display: none !important;-->
<!--      }-->
<!--    }-->
<!--  }-->

<!--  .catslab{-->
<!--    width: 33.333%;-->
<!--    padding:0 5px;-->
<!--    display: inline-block;-->
<!--    label{-->
<!--      color: #1f74ff;-->
<!--      font-size: 12px;-->
<!--      display: inline-block;-->
<!--      width: 100%;-->
<!--      text-align: right;-->
<!--      margin-bottom: 8px;-->
<!--    }-->
<!--  }-->
<!--  .catslab.custom{-->
<!--    width: 50%;-->
<!--  }-->
<!--}-->


<!--.add-new-data-sidebar {-->
<!--  ::v-deep .vs-sidebar&#45;&#45;background {-->
<!--    z-index: 52010;-->
<!--  }-->

<!--  ::v-deep .vs-sidebar {-->
<!--    z-index: 52010;-->

<!--    .img-upload {-->
<!--      margin-top: 2rem;-->

<!--      .con-img-upload {-->
<!--        padding: 0;-->
<!--      }-->

<!--      .con-input-upload {-->
<!--        width: 100%;-->
<!--        margin: 0;-->
<!--      }-->
<!--    }-->
<!--  }-->
<!--}-->

<!--.scroll-area&#45;&#45;data-list-add-new {-->
<!--  // height: calc(var(&#45;&#45;vh, 1vh) * 100 - 4.3rem);-->
<!--  height: calc(var(&#45;&#45;vh, 1vh) * 100 - 16px - 45px - 82px);-->

<!--  &:not(.ps) {-->
<!--    overflow-y: auto;-->
<!--  }-->
<!--}-->
<!--</style>-->
