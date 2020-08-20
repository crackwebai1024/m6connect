<template>
<v-container>
  <header-component :info="{height:'50px', title:'Team', icon:'mdi-map-marker'}"/>
  <v-container>
    <card-team-list :info="worker" :key="index" v-for="(worker, index) of get_workers()" />
  </v-container>
</v-container>
</template>


<script>
import { mapGetters, mapActions } from 'vuex'
import CardTeamList from "@/components/CardTeamList";
import HeaderComponent from "@/components/Home/HeaderComponent";

export default {
  components: {
    CardTeamList,
    HeaderComponent
  },
  name: "ListTeam",
  computed: {
      ...mapGetters(['get_workers'])
  },methods:{
      ...mapActions(['set_workers'])
  },created(){
      this.set_workers()
  }
};
</script>