<template>
  <div id="data-list-list-view" class="data-list-container">

    <data-view-sidebar :isSidebarActive="addNewDataSidebar" @closeSidebar="toggleDataSidebar" :data="sidebarData" />

    <vs-prompt title="Export To Excel" class="export-options" @cancle="clearFields" @accept="exportToExcel" accept-text="Export" @close="clearFields" :active.sync="activePrompt">
      <vs-input v-model="fileName" placeholder="Enter File Name.." class="w-full" />
      <v-select v-model="selectedFormat" :options="formats" class="my-4" />
      <div class="flex">
        <span class="mr-4">Cell Auto Width:</span>
        <vs-switch v-model="cellAutoWidth">Cell Auto Width</vs-switch>
      </div>
    </vs-prompt>
    <vs-table ref="table" multiple v-model="selected" pagination :max-items="itemsPerPage" search :data="customers">

      <div slot="header" class="flex flex-wrap-reverse items-center flex-grow justify-between">

        <div class="flex flex-wrap-reverse items-center data-list-btn-container">

          <div class="btn-add-new p-3 mb-4 mr-4 rounded-lg cursor-pointer flex items-center justify-center text-lg font-medium text-base text-primary border border-solid border-primary" @click="activePrompt=true">
            <span class="ml-2 text-base text-primary">تصدير</span>
          </div>
          <!-- ADD NEW -->
          <div class="btn-add-new p-3 mb-4 mr-4 rounded-lg cursor-pointer flex items-center justify-center text-lg font-medium text-base text-primary border border-solid border-primary" @click="addNewData">
            <feather-icon icon="PlusIcon" svgClasses="h-4 w-4" />
            <span class="ml-2 text-base text-primary">إضافة زبون</span>
          </div>
        </div>

        <!-- ITEMS PER PAGE -->
        <vs-dropdown vs-trigger-click class="cursor-pointer mb-4 mr-4 items-per-page-handler">
          <div class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
            <span class="mr-2">{{ currentPage * itemsPerPage - (itemsPerPage - 1) }} - {{ customers.length - currentPage * itemsPerPage > 0 ? currentPage * itemsPerPage : customers.length }} of {{ queriedItems }}</span>
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
        <vs-th sort-key="id">رقم الزبون</vs-th>
        <vs-th sort-key="name">اسم الزبون</vs-th>
        <vs-th sort-key="companyName">اسم الشركة</vs-th>
        <vs-th sort-key="shippingName">شركة الشحن </vs-th>
        <vs-th sort-key="shippingCode">الكود</vs-th>
        <vs-th sort-key="phone">رقم الجوال</vs-th>
        <vs-th sort-key="email">البريد الإلكتروني</vs-th>
        <vs-th sort-key="categoryId">الأختصاص</vs-th>
        <vs-th sort-key="subCategoryId">أصناف البيع</vs-th>
        <vs-th sort-key="saleType">نوع البيع</vs-th>
        <vs-th sort-key="status">الحالة</vs-th>
        <vs-th sort-key="address">العنوان</vs-th>
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
            <p class="product-category">{{ tr.shippingName | title }}</p>
          </vs-td>
          <vs-td>
            <p class="product-category">{{ tr.shippingCode | title }}</p>
          </vs-td>
          <vs-td>
            <a class="product-name font-medium truncate" target="_blank" :href="PhoneWhatsapp(tr.phone)" >{{ tr.phone }}</a>
          </vs-td>
          <vs-td>
            <p class="product-name font-medium truncate">{{ tr.email }}</p>
          </vs-td>
          <vs-td>
            <p class="product-name font-medium truncate" >{{ getCategoryTypesLabel(tr.categoryId) }}</p>
          </vs-td>
          <vs-td>
            <p class="product-name font-medium truncate" >{{ getSubCategoryTypesLabel(tr.subCategoryId) }}</p>
          </vs-td>
          <vs-td>
            <p class="product-name font-medium truncate">{{ getSaleLabel(tr.saleType ) }}</p>
          </vs-td>
          <vs-td>
            <vs-chip :color="getOrderStatusColor(tr.status)" class="product-order-status">{{$t('statusOptions.' + tr.status) }}</vs-chip>
          </vs-td>

          <vs-td>
            <p class="product-name font-medium truncate">{{ tr.address }}</p>
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
import moduleDataList from '@/store/customer/moduleCustomer.js'
import vSelect from 'vue-select'

export default {
  components: {
    DataViewSidebar,
    vSelect
  },
  data () {
    return {
      fileName: '',
      formats:['xlsx', 'csv', 'txt'],
      cellAutoWidth: true,
      selectedFormat: 'xlsx',
      headerTitle: [  'Name',  'Email','Phone'],
      headerVal: [  'name',  'email','phone'],
      selected: [],
      itemsPerPage: 10,
      isMounted: false,
      removeItem:null,
      // Data Sidebar
      addNewDataSidebar: false,
      sidebarData: {},
      activePrompt: false
    }
  },
  computed: {
    currentPage () {
      if (this.isMounted) {
        return this.$refs.table.currentx
      }
      return 0
    },
    customers () {
      return this.$store.state.customer.customers
    },
    queriedItems () {
      return this.$refs.table ? this.$refs.table.queriedResults.length : this.customers.length
    }
  },
  methods: {
    exportToExcel () {
      import('../export/Export2Excel').then(excel => {
        const list = this.customers
        const data = this.formatJson(this.headerVal, list)
        excel.export_json_to_excel({
          header: this.headerTitle,
          data,
          filename: this.fileName,
          autoWidth: this.cellAutoWidth,
          bookType: this.selectedFormat
        })
        this.clearFields()
      })
    },
    formatJson (filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if(j==='status')
        {
          return this.$t('statusOptions.' + v[j])
        }
        if(j==='categoryId'){
          return v[j].map((item)=>(this.$store.state.customer.categoryTypes.find(({id})=>id==item).categoryName)).join(' , ')
        }
        if(j==='subCategoryId'){
          return v[j].map((item)=>(this.$store.state.customer.subCategoryTypes.find(({id})=>id==item).name)).join(' , ')
        }
        return v[j]
      }))
    },
    clearFields () {
      this.filename = ''
      this.cellAutoWidth = true
      this.selectedFormat = 'xlsx'
    },

    PhoneWhatsapp(phone){
      //return  `https://api.whatsapp.com/send?phone=${phone}`
      return  `https://wa.me/${phone}`
    },

    getCategoryTypesLabel(items){
     return  items.map((item)=>(this.$store.state.customer.categoryTypes.find(({id})=>id==item).categoryName)).join(' , ')
    },

    getSubCategoryTypesLabel(items){
      return  items.map((item)=>(this.$store.state.customer.subCategoryTypes.find(({id})=>id==item).name)).join(' , ')
    },

    getSaleLabel(items){
      let label='';
      if(items==null) return label;
      items.forEach((item,index)=>{
        if(index!==0){
          label=label + ' , ' + item.label
        }
        else {
          label=label + item.label
        }
      })
      return label;
    },

    getOrderStatusColor(status) {
      if (status === 1)   return 'success'
      if (status === 2) return 'danger'
      if (status === 3)  return 'warning'
      if (status === 4)  return 'primary'
      return 'primary'
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
      this.$store.dispatch('customer/removeItem', this.removeItem)
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


    toggleDataSidebar (val = false) {
      this.addNewDataSidebar = val
    }
  },
  created () {
    if (!moduleDataList.isRegistered) {
      this.$store.registerModule('customer', moduleDataList)
      moduleDataList.isRegistered = true
    }
    this.$store.dispatch('customer/fetchDataListItems')
  },
  mounted () {
    this.isMounted = true
    this.$store.dispatch('customer/fetchCategoryItems', { seasonsTypes: null})
    this.$store.dispatch('customer/fetchSubCategoryItems', { categoryId: null})
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

