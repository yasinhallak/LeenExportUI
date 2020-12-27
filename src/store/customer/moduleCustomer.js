/*=========================================================================================
  File Name: moduleDataList.js
  Description: Calendar Module
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


import state from './moduleCustomerState.js'
import mutations from './moduleCustomerMutations.js'
import actions from './moduleCustomerActions.js'
import getters from './moduleCustomerGetters.js'

export default {
  isRegistered: false,
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}

