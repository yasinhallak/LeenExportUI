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
      axios.post('http://localhost:5000/api/v1/product', {...item})
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
      axios.get('http://localhost:5000/api/v1/product/list')
        .then((response) => {
          commit('SET_PRODUCTS', response.data)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },



  fetchCategoryItems({commit},item){
    return new Promise((resolve, reject)=>{
      axios.post('http://localhost:5000/api/v1/category/list',{...item})
        .then((response) => {
          commit('Set_CategoryType', response.data)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },


  fetchProductTypeItems({commit},item){
    return new Promise((resolve, reject) => {
      axios.post('http://localhost:5000/api/v1/productType/list',{...item})
        .then((response) => {
          commit('Set_ProductTypes', response.data)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },

  fetchCompanyItems({commit}){
    return new Promise((resolve, reject) => {
      axios.get('http://localhost:5000/api/v1/vendor/list')
        .then((response) => {
          commit('Set_Companies', response.data)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },

  // fetchEventLabels({ commit }) {
  //   return new Promise((resolve, reject) => {
  //     axios.get("/api/apps/calendar/labels")
  //       .then((response) => {
  //         commit('SET_LABELS', response.data)
  //         resolve(response)
  //       })
  //       .catch((error) => { reject(error) })
  //   })
  // },
  updateItem ({ commit }, item) {
    return new Promise((resolve, reject) => {
      axios.put(`http://localhost:5000/api/v1/product/${item.id}`, {...item})
        .then((response) => {
          commit('UPDATE_PRODUCT', response.data)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },

  removeItem ({ commit }, itemId) {
    return new Promise((resolve, reject) => {
      axios.delete(`/api/data-list/product/${itemId}`)
        .then((response) => {
          commit('REMOVE_ITEM', itemId)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  }
  // eventDragged({ commit }, payload) {
  //   return new Promise((resolve, reject) => {
  //     axios.post(`/api/apps/calendar/event/dragged/${payload.event.id}`, {payload: payload})
  //       .then((response) => {

  //         // Convert Date String to Date Object
  //         let event = response.data
  //         event.startDate = new Date(event.startDate)
  //         event.endDate = new Date(event.endDate)

  //         commit('UPDATE_EVENT', event)
  //         resolve(response)
  //       })
  //       .catch((error) => { reject(error) })
  //   })
  // },
}
