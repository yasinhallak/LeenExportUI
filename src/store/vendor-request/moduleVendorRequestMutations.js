/*=========================================================================================
  File Name: moduleCalendarMutations.js
  Description: Calendar Module Mutations
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


export default {
  ADD_ITEM (state, item) {
    console.log("item",item)
    state.requests.unshift(item)
  },
  SET_PRODUCTS (state, products) {
    state.requests = products
  },
  // SET_LABELS(state, labels) {
  //   state.eventLabels = labels
  // },
  UPDATE_PRODUCT (state, product) {

    const productIndex = state.requests.findIndex((p) => p.id === product.id)
    Object.assign(state.requests[productIndex], product)
  },

  REMOVE_ITEM (state, itemId) {
    const ItemIndex = state.requests.findIndex((p) => p.id === itemId)
    state.requests.splice(ItemIndex, 1)
  }
}
