<template>
  <div id="data-list-list-view" class="data-list-container">

    <data-view-sidebar :isSidebarActive="addNewDataSidebar" @closeSidebar="toggleDataSidebar" :data="sidebarData" />

    <vs-table ref="table" multiple v-model="selected" pagination :max-items="itemsPerPage" search :data="vendors">

      <div slot="header" class="flex flex-wrap-reverse items-center flex-grow justify-between">

        <div class="flex flex-wrap-reverse items-center data-list-btn-container">


          <!-- ADD NEW -->
          <div class="btn-add-new p-3 mb-4 mr-4 rounded-lg cursor-pointer flex items-center justify-center text-lg font-medium text-base text-primary border border-solid border-primary" @click="addNewData">
            <feather-icon icon="PlusIcon" svgClasses="h-4 w-4" />
            <span class="ml-2 text-base text-primary">إضافة شركة</span>
          </div>
        </div>

        <!-- ITEMS PER PAGE -->
        <vs-dropdown vs-trigger-click class="cursor-pointer mb-4 mr-4 items-per-page-handler">
          <div class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
            <span class="mr-2">{{ currentPage * itemsPerPage - (itemsPerPage - 1) }} - {{ vendors.length - currentPage * itemsPerPage > 0 ? currentPage * itemsPerPage : vendors.length }} of {{ queriedItems }}</span>
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
        <vs-th sort-key="id">رقم الشركة</vs-th>
        <vs-th sort-key="name">اسم مالك الشركة</vs-th>
        <vs-th sort-key="companyName">اسم الشركة</vs-th>
        <vs-th sort-key="code">كود الشركة</vs-th>
        <vs-th sort-key="phone">رقم جوال الشركة</vs-th>
        <vs-th sort-key="employeePhone">رقم جوال الموظف</vs-th>
        <vs-th sort-key="address">عنوان الشركة</vs-th>
        <vs-th sort-key="description">وصف عمل الشركة</vs-th>
        <vs-th>الأوامر</vs-th>
      </template>

      <template slot-scope="{data}">
        <tbody>
        <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">

          <vs-td>
            <p class="product-name font-medium truncate">{{ tr.id }}</p>
          </vs-td>
          <vs-td>
            <p class="product-name font-medium truncate">{{ tr.name }}</p>
          </vs-td>
          <vs-td>
            <p class="product-category">{{ tr.companyName | title }}</p>
          </vs-td>
          <vs-td>
            <p class="product-category">{{ tr.code | title }}</p>
          </vs-td>
          <vs-td>
            <a class="product-name font-medium truncate" target="_blank" :href="PhoneWhatsapp(tr.phone)">{{ tr.phone }}</a>
          </vs-td>
          <vs-td>
            <a class="product-name font-medium truncate" target="_blank" :href="PhoneWhatsapp(tr.employeePhone)">{{ tr.employeePhone }}</a>
          </vs-td>
          <vs-td>
            <p class="product-name font-medium truncate">{{ tr.address }}</p>
          </vs-td>

          <vs-td>
            <p class="product-name font-medium truncate">{{ tr.description }}</p>
          </vs-td>
          <vs-td class="whitespace-no-wrap">
            <feather-icon icon="EditIcon" svgClasses="w-5 h-5 hover:text-primary stroke-current" @click.stop="editData(tr)" />
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
import moduleDataList from '@/store/vendor/moduleVendor.js'

export default {
  components: {
    DataViewSidebar
  },
  data () {
    return {
      selected: [],
      // products: [],
      itemsPerPage: 10,
      isMounted: false,
      removeItem:null,
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
    vendors () {
      return this.$store.state.vendor.vendors
    },
    queriedItems () {
      return this.$refs.table ? this.$refs.table.queriedResults.length : this.vendors.length
    }
  },
  methods: {

    PhoneWhatsapp(phone){
     // return  `https://api.whatsapp.com/send?phone=${phone}`
      return  `https://wa.me/9${phone}`
    },

    addNewData () {
      this.sidebarData = {}
      this.toggleDataSidebar(true)
    },

    editData (data) {
      // this.sidebarData = JSON.parse(JSON.stringify(this.blankData))
      this.sidebarData = data
      this.toggleDataSidebar(true)
    },

    deleteData (id) {
      this.removeItem=id;
      this.$vs.dialog({
        type: 'confirm',
        color: 'danger',
        title: 'تأكيد الحذف',
        text: `هل أنت متأكد من حذف هذا العنصر`,
        accept: this.deleteRecord,
        acceptText: 'حذف'
      })
    },
    deleteRecord(){
      /* Below two lines are just for demo purpose */
      this.$store.dispatch('vendor/removeItem', this.removeItem)
        .then(()=>{this.showDeleteSuccess()})
        .catch(err => { console.error(err)})
    },
    showDeleteSuccess () {
      this.$vs.notify({
        color: 'success',
        title: 'حذف العنصر',
        text: 'تم حذف العنصر بنجاح'
      })
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
      this.$store.registerModule('vendor', moduleDataList)
      moduleDataList.isRegistered = true
    }
    this.$store.dispatch('vendor/fetchDataListItems')
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

