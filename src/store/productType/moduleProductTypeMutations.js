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
    state.productTypes.unshift(item)
  },
  SET_PRODUCTS (state, products) {
    state.productTypes = products
  },
  // SET_LABELS(state, labels) {
  //   state.eventLabels = labels
  // },
  UPDATE_PRODUCT (state, product) {

    const productIndex = state.productTypes.findIndex((p) => p.id === product.id)
    Object.assign(state.productTypes[productIndex], product)
  },
  Set_CategoryType(state,items){
    state.categoryTypes=items;
  },
  Set_SubCategoryType(state,items){
    state.subCategoryTypes=items;
  },

  updateModalState(state,payload){
    state.isUpdated=payload
  },
  REMOVE_ITEM (state, itemId) {
    const ItemIndex = state.productTypes.findIndex((p) => p.id === itemId)
    state.productTypes.splice(ItemIndex, 1)
  }
}
