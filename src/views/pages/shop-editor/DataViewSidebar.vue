


<template>
  <vs-sidebar click-not-close position-right parent="body" default-index="1" color="primary" class="add-new-data-sidebar items-no-padding own-side" spacer v-model="isSidebarActiveLocal">
    <div class="mt-6 flex items-center justify-between px-6">
      <h4>{{ Object.entries(this.data).length === 0 ? "إضافة" : "تعديل" }} </h4>
      <feather-icon icon="XIcon" @click.stop="isSidebarActiveLocal = false" class="cursor-pointer"></feather-icon>
    </div>
    <vs-divider class="mb-0"></vs-divider>
    <component :is="scrollbarTag" class="scroll-area--data-list-add-new" :settings="settings" :key="$vs.rtl">
        <div id="extra-component-quill-editor-demo">
          <template >
            <vx-card title="حسابات المحل"  >
              <quill-editor v-model="content"></quill-editor>
            </vx-card>
          </template>
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
// require styles

import 'quill/dist/quill.snow.css'

import { quillEditor } from 'vue-quill-editor'

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
    quillEditor,
  },
  data () {
    return {
      dataId: null,
      content:null,
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
        const { id,content} = JSON.parse(JSON.stringify(this.data))
        this.dataId = id
        this.content=content
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
      return !this.errors.any() && this.content
    },
    scrollbarTag () { return this.$store.getters.scrollbarTag },

    productTypes () {
      return this.$store.state.product.productTypes
    },

  },
  methods: {

    initValues () {
      if (this.data.id) return
      this.dataId = null
      this.content=null

    },

    submitData () {
      this.$validator.validateAll().then(result => {
        if (result) {
          const obj = {
            id: this.dataId,
            content:this.content
          }
          if (this.dataId !== null && this.dataId >= 0) {
            this.$store.dispatch('product/updateEditor', obj).catch(err => { console.error(err) })
          } else {
            delete obj.id
            this.$store.dispatch('product/addEditor', obj).catch(err => { console.error(err) })
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
    direction: ltr;
    .all-centerx{
      direction: ltr;
      width: 170px;
      display: inline-block;
      @media (max-width: 567px) {
        width: 220px;
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







