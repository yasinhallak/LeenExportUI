/*=========================================================================================
  File Name: moduleCalendarActions.js
  Description: Calendar Module Actions
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

import axios from '@/axios.js'

export default {
  addItem ({ commit }, item) {
    console.log("item",item)
    return new Promise((resolve, reject) => {
      axios.post('/product', {...item})
        .then((response) => {
          console.log("response",response)
          commit('ADD_ITEM',  response.data)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  sendWhatsApp ({ commit }, item) {
    console.log("item",item)
    return new Promise((resolve, reject) => {
      axios.post('/customer/whatsapp', {...item})
        .then((response) => {
         // console.log("response",response)
         // commit('ADD_ITEM',  response.data)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  fetchDataListItems ({ commit }) {
    return new Promise((resolve, reject) => {
      axios.get('/product/list')
        .then((response) => {
          commit('SET_PRODUCTS', response.data)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },

  fetchCategoryItems({commit},item){
    return new Promise((resolve, reject)=>{
      axios.post('/category/list',{...item})
        .then((response) => {
          commit('Set_CategoryType', response.data)
          commit('Set_SubCategoryType', [])
          commit('Set_ProductTypes', [])
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },

  fetchSubCategoryItems({commit},item){
    return new Promise((resolve, reject) => {
      axios.post('/subCategory/list',{...item})
        .then((response) => {
          commit('Set_SubCategoryType', response.data)
          commit('Set_ProductTypes', [])

          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },

  fetchProductTypeItems({commit},item){
    return new Promise((resolve, reject) => {
      axios.post('/productType/list',{...item})
        .then((response) => {
          commit('Set_ProductTypes', response.data)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },

  fetchCompanyItems({commit}){
    return new Promise((resolve, reject) => {
      axios.get('/vendor/list')
        .then((response) => {
          commit('Set_Companies', response.data)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },

  fetchCustomerItems ({ commit }) {
    return new Promise((resolve, reject) => {
      axios.get('/customer/list')
        .then((response) => {
          commit('Set_Customers', response.data)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },


  updateItem ({ commit }, item) {
    return new Promise((resolve, reject) => {
      axios.put(`/product/${item.id}`, {...item})
        .then((response) => {
          commit('UPDATE_PRODUCT', response.data)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },

  removeItem ({ commit }, itemId) {
    return new Promise((resolve, reject) => {
      axios.delete(`/product/${itemId}`)
        .then((response) => {
          commit('REMOVE_ITEM', itemId)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },

  updateModalState({commit},payload){
    commit('updateModalState',payload)
  },


  // product model
  addProductModel ({ commit }, item) {
    console.log("item",item)
    return new Promise((resolve, reject) => {
      axios.post('/product-model', {...item})
        .then((response) => {
          console.log("response",response)
          commit('Add_Product',  response.data)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  updateProductModel ({ commit }, item) {
    return new Promise((resolve, reject) => {
      axios.put(`/product-model/${item.id}`, {...item})
        .then((response) => {
          commit('Update_Product', response.data)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  fetchProductModel({commit}){
    return new Promise((resolve, reject) => {
      axios.get('/product-model/list')
        .then((response) => {
          commit('Set_Product', response.data)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  removeProductModel ({ commit }, itemId) {
    return new Promise((resolve, reject) => {
      axios.delete(`/product-model/${itemId}`)
        .then((response) => {
          commit('REMOVE_Product', itemId)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },

  // salesDepartment
  addSaleDepartment ({ commit }, item) {
    return new Promise((resolve, reject) => {
      axios.post('/salesDepartment', {...item})
        .then((response) => {
          console.log("response",response)
          commit('Add_SaleDepartment',  response.data)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  updateSaleDepartment  ({ commit }, item) {
    return new Promise((resolve, reject) => {
      axios.put(`/salesDepartment/${item.id}`, {...item})
        .then((response) => {
          commit('Update_SaleDepartment', response.data)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  fetchSaleDepartment ({commit}){
    return new Promise((resolve, reject) => {
      axios.get('/salesDepartment/list')
        .then((response) => {
          commit('Set_SaleDepartment', response.data)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  removeSaleDepartment  ({ commit }, itemId) {
    return new Promise((resolve, reject) => {
      axios.delete(`/salesDepartment/${itemId}`)
        .then((response) => {
          commit('REMOVE_SaleDepartment', itemId)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  // shop editor
  addEditor ({ commit }, item) {
    return new Promise((resolve, reject) => {
      console.log("item",item)
      axios.post('/ShopEditor', {...item})
        .then((response) => {
          commit('Add_Editor',  response.data)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },

  updateEditor ({ commit }, item) {
    return new Promise((resolve, reject) => {
      axios.put(`/ShopEditor/${item.id}`, {...item})
        .then((response) => {
          commit('Update_Editor', response.data)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },

  fetchShopEditor({commit}){
    return new Promise((resolve, reject) => {
      axios.get('/ShopEditor/list')
        .then((response) => {
          commit('Set_Editors', response.data)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },

  removeEditor ({ commit }, itemId) {
    return new Promise((resolve, reject) => {
      axios.delete(`/ShopEditor/${itemId}`)
        .then((response) => {
          commit('REMOVE_Editor', itemId)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },

}
