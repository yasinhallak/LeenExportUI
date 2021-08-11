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
    state.vendors.unshift(item)
  },
  SET_PRODUCTS (state, products) {
    state.vendors = products
  },
  // SET_LABELS(state, labels) {
  //   state.eventLabels = labels
  // },

  Set_ProductTypes (state, products) {
    state.productTypes = products
  },
  UPDATE_PRODUCT (state, product) {

    const productIndex = state.vendors.findIndex((p) => p.id === product.id)
    Object.assign(state.vendors[productIndex], product)
  },

  REMOVE_ITEM (state, itemId) {
    const ItemIndex = state.vendors.findIndex((p) => p.id === itemId)
    state.vendors.splice(ItemIndex, 1)
  }
}
