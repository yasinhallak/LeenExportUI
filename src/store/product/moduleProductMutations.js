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
    state.products.unshift(item)
  },
  SET_PRODUCTS (state, products) {
    state.products = products
  },

  UPDATE_PRODUCT (state, product) {

    const productIndex = state.products.findIndex((p) => p.id === product.id)
    Object.assign(state.products[productIndex], product)
  },

  Set_CategoryType(state,items){
    state.categoryTypes=items
  },
  Set_SubCategoryType(state,items){
    state.subCategoryTypes=items
  },

  updateModalState(state,payload){
    state.isUpdated=payload
 },

  Set_ProductTypes(state,items){
    state.productTypes = items
  },

  Set_Companies(state,items){
    state.companies = items
  },

  REMOVE_ITEM (state, itemId) {
    const ItemIndex = state.products.findIndex((p) => p.id === itemId)
    state.products.splice(ItemIndex, 1)
  },

  // shop editor

  Add_Editor(state,item){
    state.editors.unshift(item)
  },

  Update_Editor(state,item){
    const productIndex = state.editors.findIndex((p) => p.id === item.id)
    Object.assign(state.editors[productIndex], item)

  },
  Set_Editors(state,items){
    state.editors = items
  },
  REMOVE_Editor (state, itemId) {
    const ItemIndex = state.editors.findIndex((p) => p.id === itemId)
    state.editors.splice(ItemIndex, 1)
  },

}
