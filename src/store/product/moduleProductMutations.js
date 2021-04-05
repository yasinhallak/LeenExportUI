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


  // product model

  Add_Product(state,item){
    state.productModels.unshift(item)
  },

  Update_Product(state,item){
    const productIndex = state.productModels.findIndex((p) => p.id === item.id)
    Object.assign(state.productModels[productIndex], item)
  },

  Set_Product(state,items){
    state.productModels = items
  },

  REMOVE_Product (state, itemId) {
    const ItemIndex = state.productModels.findIndex((p) => p.id === itemId)
    state.productModels.splice(ItemIndex, 1)
  },

  // sale department
  Add_SaleDepartment(state,item){
    state.salesDepartment.unshift(item)
  },

  Update_SaleDepartment(state,item){
    const productIndex = state.salesDepartment.findIndex((p) => p.id === item.id)
    Object.assign(state.salesDepartment[productIndex], item)
  },

  Set_SaleDepartment(state,items){
    state.salesDepartment = items
  },

  REMOVE_SaleDepartment (state, itemId) {
    const ItemIndex = state.salesDepartment.findIndex((p) => p.id === itemId)
    state.salesDepartment.splice(ItemIndex, 1)
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
