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
      axios.post('/subCategory', {...item})
        .then((response) => {
          console.log("response",response)
          commit('ADD_ITEM',  response.data)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  fetchDataListItems ({ commit },item) {
    return new Promise((resolve, reject) => {
      axios.post('/subCategory/list',{...item})
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
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },

  updateItem ({ commit }, item) {
    return new Promise((resolve, reject) => {
      axios.put(`/subCategory/${item.id}`, {...item})
        .then((response) => {
          commit('UPDATE_PRODUCT', response.data)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },

  removeItem ({ commit }, itemId) {
    return new Promise((resolve, reject) => {
      axios.delete(`/subCategory/${itemId}`)
        .then((response) => {
          commit('REMOVE_ITEM', itemId)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  }

}
