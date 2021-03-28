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


  // shop editor

  addEditor ({ commit }, item) {
    return new Promise((resolve, reject) => {
      console.log("item",item)
      axios.post('/product-model', {...item})
        .then((response) => {
          commit('Add_Editor',  response.data)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },

  updateEditor ({ commit }, item) {
    return new Promise((resolve, reject) => {
      axios.put(`/product-model/${item.id}`, {...item})
        .then((response) => {
          commit('Update_Editor', response.data)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },

  fetchShopEditor({commit}){
    return new Promise((resolve, reject) => {
      axios.get('/product-model/list')
        .then((response) => {
          commit('Set_Editors', response.data)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },

  removeEditor ({ commit }, itemId) {
    return new Promise((resolve, reject) => {
      axios.delete(`/product-model/${itemId}`)
        .then((response) => {
          commit('REMOVE_Editor', itemId)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },

}
