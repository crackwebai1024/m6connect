<template>
  <v-container>
    <card-team-list :info="worker" :key="index" v-for="(worker, index) of get_workers()" />
  </v-container>
</template>


<script>
import { mapGetters, mapActions } from 'vuex'
import CardTeamList from "@/components/CardTeamList";
export default {
  components: {
    CardTeamList,
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