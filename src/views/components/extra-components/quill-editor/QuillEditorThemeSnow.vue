<!-- =========================================================================================
    File Name: QuillEditorThemeSnow.vue
    Description: Quill editor with snow theme
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template>
    <vx-card title="حسابات المحل" >
        <quill-editor v-model="content"></quill-editor>
    </vx-card>
</template>

<script>
// require styles

import 'quill/dist/quill.snow.css'

import { quillEditor } from 'vue-quill-editor'

export default {
  data () {
    return {
      content: null
    }
  },
  components: {
    quillEditor,
  }
}
</script>
