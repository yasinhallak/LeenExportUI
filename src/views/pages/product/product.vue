<template>
  <div id="data-list-list-view" class="data-list-container">

    <data-view-sidebar :isSidebarActive="addNewDataSidebar" @closeSidebar="toggleDataSidebar" :data="sidebarData" />

    <vs-table ref="table" multiple v-model="selected" pagination :max-items="itemsPerPage" search :data="products">

      <div slot="header" class="flex flex-wrap-reverse items-center flex-grow justify-between">

        <div class="flex flex-wrap-reverse items-center data-list-btn-container">

          <!-- ADD NEW -->
          <div class="btn-add-new p-3 mb-4 mr-4 rounded-lg cursor-pointer flex items-center justify-center text-lg font-medium text-base text-primary border border-solid border-primary" @click="addNewData">
            <feather-icon icon="PlusIcon" svgClasses="h-4 w-4" />
            <span class="ml-2 text-base text-primary">إضافة منتج</span>
          </div>
        </div>

        <!-- ITEMS PER PAGE -->
        <vs-dropdown vs-trigger-click class="cursor-pointer mb-4 mr-4 items-per-page-handler">
          <div class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
            <span class="mr-2">{{ currentPage * itemsPerPage - (itemsPerPage - 1) }} - {{ products.length - currentPage * itemsPerPage > 0 ? currentPage * itemsPerPage : products.length }} of {{ queriedItems }}</span>
            <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
          </div>
          <!-- <vs-button class="btn-drop" type="line" color="primary" icon-pack="feather" icon="icon-chevron-down"></vs-button> -->
          <vs-dropdown-menu>

            <vs-dropdown-item @click="itemsPerPage=4">
              <span>4</span>
            </vs-dropdown-item>
            <vs-dropdown-item @click="itemsPerPage=10">
              <span>10</span>
            </vs-dropdown-item>
            <vs-dropdown-item @click="itemsPerPage=15">
              <span>15</span>
            </vs-dropdown-item>
            <vs-dropdown-item @click="itemsPerPage=20">
              <span>20</span>
            </vs-dropdown-item>
          </vs-dropdown-menu>
        </vs-dropdown>
      </div>

      <template slot="thead">
        <vs-th sort-key="id">رقم المنتج</vs-th>
        <vs-th sort-key="seasonsTypes">نوع الفصل</vs-th>
        <vs-th sort-key="categoryName">  اسم التصنيف الرئيسي </vs-th>
        <vs-th sort-key="subCategoryName">  اسم التصنيف الفرعي </vs-th>
        <vs-th sort-key="productTypeName">نوع المنتج</vs-th>
        <vs-th sort-key="title">عنوان المنتج</vs-th>
        <vs-th sort-key="material">نوعية الخامة</vs-th>
        <vs-th sort-key="vendorName">اسم الشركة المنتجة</vs-th>
        <vs-th sort-key="productSize">المقاسات المتاحة</vs-th>
        <vs-th sort-key="count">عدد السيريه</vs-th>
        <vs-th sort-key="price">سعر المبيع</vs-th>
        <vs-th sort-key="productCost">سعر الرأسمال</vs-th>
        <vs-th sort-key="description">وصف المنتج</vs-th>

        <vs-th>الأوامر</vs-th>
      </template>

      <template slot-scope="{data}">
        <tbody>
        <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
          <vs-td>
            <p class="product-name font-medium truncate">{{tr.id}}</p>
          </vs-td>
          <vs-td>
            <p class="product-name font-medium truncate">{{$t('seasonsTypes.' + tr.seasonsTypes)}}</p>
          </vs-td>
          <vs-td>
            <p class="product-name font-medium truncate">{{ tr.categoryName }}</p>
          </vs-td>
          <vs-td>
            <p class="product-name font-medium truncate">{{ tr.subCategoryName }}</p>
          </vs-td>
          <vs-td>
            <p class="product-name font-medium truncate">{{ tr.productTypeName }}</p>
          </vs-td>
          <vs-td>
            <p class="product-name font-medium truncate">{{ tr.title }}</p>
          </vs-td>
          <vs-td>
            <p class="product-name font-medium truncate">{{ tr.material }}</p>
          </vs-td>
          <vs-td>
            <p class="product-name font-medium truncate">{{ tr.vendorName }}</p>
          </vs-td>
          <vs-td>
            <p class="product-name font-medium truncate"> {{ getSizeLabel(tr.productSize) }}</p>
          </vs-td>
          <vs-td>
            <p class="product-name font-medium truncate">{{ tr.count }}</p>
          </vs-td>
          <vs-td>
            <p class="product-price font-medium truncate">${{ tr.price }}</p>
          </vs-td>
          <vs-td>
            <p class="product-price font-medium truncate">${{ tr.productCost }}</p>
          </vs-td>
          <vs-td>
            <p class="product-name font-medium truncate">{{ tr.description }}</p>
          </vs-td>
          <vs-td class="whitespace-no-wrap">
<!--            <feather-icon icon="EditIcon" svgClasses="w-5 h-5 hover:text-primary stroke-current" @click.stop="editData(tr)" />-->
            <feather-icon icon="TrashIcon" svgClasses="w-5 h-5 hover:text-danger stroke-current" class="ml-2" @click.stop="deleteData(tr.id)" />
          </vs-td>
        </vs-tr>
        </tbody>
      </template>
    </vs-table>
  </div>

</template>


<script>
import DataViewSidebar from './DataViewSidebar.vue'
import moduleDataList from '@/store/product/moduleProduct.js'

export default {
  components: {
    DataViewSidebar
  },
  data () {
    return {
      selected: [],
      // products: [],
      itemsPerPage: 4,
      isMounted: false,

      // Data Sidebar
      addNewDataSidebar: false,
      sidebarData: {}
    }
  },
  computed: {
    currentPage () {
      if (this.isMounted) {
        return this.$refs.table.currentx
      }
      return 0
    },
    products(){
      return this.$store.state.product.products
    },
    queriedItems () {
      return this.$refs.table ? this.$refs.table.queriedResults.length : this.products.length
    }
  },
  methods: {

    getSizeLabel(items){
      let label='';
      items.forEach((item,index)=>{
        if(index!==0){
          label=label + ' , ' + item.name
        }
        else {
          label=label + item.name
        }
      })
      return label;
    },

    addNewData () {
      this.sidebarData = {}
      this.toggleDataSidebar(true)
    },
    deleteData (id) {
      // console.log("this.$vbsdfsd",this.$bvModal)
      // this.$bvModal.msgBoxConfirm("هل انت متأكد من الحذف.", {
      //   title: "الرجاء التأكد من الحذف",
      //   size: "sm",
      //   buttonSize: "sm",
      //   okVariant: "danger",
      //   okTitle: "نعم",
      //   cancelTitle: "لا",
      //   footerClass: "p-2",
      //   hideHeaderClose: false,
      //   centered: true
      // })
      //   .then( (value) => {
      //     if(value)this.$store.dispatch('product/removeItem', id).catch(err => { console.error(err) })
      //   })
      this.$store.dispatch('product/removeItem', id).catch(err => { console.error(err) })

    },
    editData (data) {
      // this.sidebarData = JSON.parse(JSON.stringify(this.blankData))
      this.$store.dispatch('product/updateModalState',true);
      this.sidebarData = data
      this.toggleDataSidebar(true)
    },
    getOrderStatusColor (status) {
      if (status === 'on_hold')   return 'warning'
      if (status === 'delivered') return 'success'
      if (status === 'canceled')  return 'danger'
      return 'primary'
    },
    getPopularityColor (num) {
      if (num > 90)  return 'success'
      if (num > 70)  return 'primary'
      if (num >= 50) return 'warning'
      if (num < 50)  return 'danger'
      return 'primary'
    },
    toggleDataSidebar (val = false) {
      this.addNewDataSidebar = val
    }
  },
  created () {
    if (!moduleDataList.isRegistered) {
      this.$store.registerModule('product', moduleDataList)
      moduleDataList.isRegistered = true
    }
    this.$store.dispatch('product/fetchDataListItems')
  },
  mounted () {
    this.isMounted = true
  }
}
</script>

<style lang="scss">
#data-list-list-view {
  .vs-con-table {

    /*
      Below media-queries is fix for responsiveness of action buttons
      Note: If you change action buttons or layout of this page, Please remove below style
    */
    @media (max-width: 689px) {
      .vs-table--search {
        margin-left: 0;
        max-width: unset;
        width: 100%;

        .vs-table--search-input {
          width: 100%;
        }
      }
    }

    @media (max-width: 461px) {
      .items-per-page-handler {
        display: none;
      }
    }

    @media (max-width: 341px) {
      .data-list-btn-container {
        width: 100%;

        .dd-actions,
        .btn-add-new {
          width: 100%;
          margin-right: 0 !important;
        }
      }
    }

    .product-name {
      max-width: 23rem;
    }

    .vs-table--header {
      display: flex;
      flex-wrap: wrap;
      margin-left: 1.5rem;
      margin-right: 1.5rem;
      > span {
        display: flex;
        flex-grow: 1;
      }

      .vs-table--search{
        padding-top: 0;

        .vs-table--search-input {
          padding: 0.9rem 2.5rem;
          font-size: 1rem;

          &+i {
            left: 1rem;
          }

          &:focus+i {
            left: 1rem;
          }
        }
      }
    }

    .vs-table {
      border-collapse: separate;
      border-spacing: 0 1.3rem;
      padding: 0 1rem;

      tr{
        box-shadow: 0 4px 20px 0 rgba(0,0,0,.05);
        td{
          padding: 20px;
          &:first-child{
            border-top-left-radius: .5rem;
            border-bottom-left-radius: .5rem;
          }
          &:last-child{
            border-top-right-radius: .5rem;
            border-bottom-right-radius: .5rem;
          }
        }
        td.td-check{
          padding: 20px !important;
        }
      }
    }

    .vs-table--thead{
      th {
        padding-top: 0;
        padding-bottom: 0;

        .vs-table-text{
          text-transform: uppercase;
          font-weight: 600;
        }
      }
      th.td-check{
        padding: 0 15px !important;
      }
      tr{
        background: none;
        box-shadow: none;
      }
    }

    .vs-table--pagination {
      justify-content: center;
    }
  }
}
</style>


