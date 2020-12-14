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
    state.subCategories.unshift(item)
  },
  SET_PRODUCTS (state, products) {
    state.subCategories = products
  },
  // SET_LABELS(state, labels) {
  //   state.eventLabels = labels
  // },
  UPDATE_PRODUCT (state, product) {

    const productIndex = state.subCategories.findIndex((p) => p.id === product.id)
    Object.assign(state.subCategories[productIndex], product)
  },
  Set_CategoryType(state,items){
    state.categoryTypes=items;
  },
  REMOVE_ITEM (state, itemId) {
    const ItemIndex = state.subCategories.findIndex((p) => p.id === itemId)
    state.subCategories.splice(ItemIndex, 1)
  }
}
