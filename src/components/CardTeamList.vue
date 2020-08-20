<template>
  <v-card class="mb-2">
    <div class="d-flex flex-no-wrap">
      <v-avatar size="100" tile>
        <v-img :src="info.imageUrl"></v-img>
      </v-avatar>
      <div class="pa-3">
        <div>{{ info.name }}</div>
        <div>{{ formatPhoneNumber(info.contactPhone) }}</div>
        <div>{{ info.email }}</div>
      </div>
    </div>
  </v-card>
</template>

<script>
export default {
  name: "CardTeamList",
  props: {
    // Info have name, imageUrl, email and contactPhone
    info: Object,
  },
  methods: {
    formatPhoneNumber(phoneNumberString) {
      var cleaned = ("" + phoneNumberString).replace(/\D/g, "");
      var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
      if (match) {
        var intlCode = match[1] ? "+1 " : "";
        return [intlCode, "(", match[2], ") ", match[3], "-", match[4]].join(
          ""
        );
      }
      return null;
    },
  },
};
</script>

<style scoped lang="scss">
.team-card {
  height: 150px;
}
</style>