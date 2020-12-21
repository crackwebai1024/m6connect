<template>
  <div>
    <v-data-table
      :headers="tableHeaders"
      :items="items"
      :items-per-page="5"
    >
      <template #item.record_number="{ item }">
        <router-link
          class="router-link"
          :to="{ name: 'record.show', params: { id: item.id } }"
        >
          {{ item.record_number }}
        </router-link>
      </template>
      <template #item.title="{ item }">
        <p>
          <router-link
            class="router-link"
            :to="{ name: 'record.show', params: { id: item.id } }"
          >
            {{ item.title }}
          </router-link>
        </p>
      </template>
      <template #item.description="{ item }">
        <p>
          {{
            item.description
          }}
        </p>
      </template>
      <template #item.description_slot="{ item }">
        <p>
          {{
            $h.dg(item, 'standard_field_description', '').length > 40 ?
              $h.dg(item, 'standard_field_description', '').substr(0,40) + '...' :
              $h.dg(item, 'standard_field_description', '')
          }}
        </p>
      </template>
      <template #item.author="{ item }">
        {{ getAuthor(item.author) }}
      </template>
      <template #item.standard_image="{ item }">
        <img
          :alt="item.title"
          class="standard-image"
          :src="item.standard_image"
        >
      </template>
      <template #item.created_at="{ item }">
        {{ new Date(item.created_at).getMonth() + '/' + new Date(item.created_at).getDate() + '/' + new Date(item.created_at).getFullYear() }}
      </template>
      <template #item.action>
        <v-btn
          color="green"
          fab
          icon
          x-small
        >
          <v-icon>mdi-lead-pencil</v-icon>
        </v-btn>
        <v-btn
          color="red"
          fab
          icon
          x-small
        >
          <v-icon>mdi-trash-can-outline</v-icon>
        </v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  // eslint-disable-next-line vue/match-component-file-name
  name: 'RecordsTableIndex',
  props: {
    items: {
      type: Array,
      default: () => ([])
    },
    tableHeaders: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    headers: [
      { text: 'Image', value: 'image' },
      { text: 'Record #', value: 'record_number' },
      { text: 'App', value: 'app_prefix' },
      { text: 'Title', value: 'title' },
      { text: 'Description', value: 'description' },
      { text: 'Creator', value: 'author' },
      { text: 'Created On', value: 'created_at' },
      { text: 'Class', value: 'class' },
      { text: 'Category', value: 'category' },
      { text: 'Type', value: 'type' },
      { text: 'State', value: 'state' },
      { text: 'Status', value: 'status' },
      { text: 'Action', value: 'action', sortable: false }
    ]
  }),

  computed: {
    ...mapGetters('Companies', {
      currentCompanyUsers: 'getCurrentCompanyUsers'
    })
  },

  methods: {
    getAuthor(id) {
      const res = this.currentCompanyUsers.find(u => this.$h.dg(u, 'user.id', '') === id)
      return this.$h.dg(res, 'user.firstName', '') + ' ' + this.$h.dg(res, 'user.lastName', '')
    }
  }
}
</script>

<style lang="scss" scoped>
.standard-image {
  height: 3rem;
  width: auto;
}
.router-link {
  text-decoration: none;
}
</style>
