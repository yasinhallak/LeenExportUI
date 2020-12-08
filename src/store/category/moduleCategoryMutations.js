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
    //console.log("item",item)
    state.categories.unshift(item)
  },
  SET_PRODUCTS (state, products) {
    state.categories = products
  },
  // SET_LABELS(state, labels) {
  //   state.eventLabels = labels
  // },
  UPDATE_PRODUCT (state, product) {
    console.log("product",product)
    console.log("state.products",state.categories)
    const productIndex = state.categories.findIndex((p) => p.id === product.id)
    Object.assign(state.categories[productIndex], product)
  },
  REMOVE_ITEM (state, itemId) {
    const ItemIndex = state.categories.findIndex((p) => p.id === itemId)
    state.categories.splice(ItemIndex, 1)
  }
}
