<template>
  <v-container>
    <card-team-list :info="worker" :key="index" v-for="(worker, index) of workers" />
  </v-container>
</template>


<script>
import CardTeamList from "@/components/CardTeamList";
export default {
  components: {
    CardTeamList,
  },
  name: "ListTeam",
  data: () => ({
    workers: [
      {
        name: "Raul Mercado",
        imageUrl: "https://via.placeholder.com/350/",
        email: "raulmercado@mail.com",
        contactPhone: "2321235465",
      },
      {
        name: "Natalia Portman",
        imageUrl: "https://via.placeholder.com/350/",
        email: "nataliaportman@mail.com",
        contactPhone: "1233546529",
      },
    ],
  }),
};
</script>