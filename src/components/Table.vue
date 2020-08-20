<template>
  <v-data-table
    :headers="data.headers"
    :items="data.body"
    :items-per-page="7"
    class="elevation-1"
  ></v-data-table>
</template>

<script>  
  export default {
    name:"TableComponent",
    props:{
      data: Object
    }
  }
</script>