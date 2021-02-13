<template>
<!--  <b-spinner style="width: 3rem; height: 3rem;" label="Large Spinner"></b-spinner>-->
<!--  <infinite-loading :spinner="bubbles"></infinite-loading>-->
  <span style="background-color: red"> جاري التحميل</span>
</template>

<script>
  import InfiniteLoading from 'vue-infinite-loading';

  export default {
    name:"over-lay-loading",
    components: {
      InfiniteLoading,
    },
  };
</script>
