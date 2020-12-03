<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="items"
      :items-per-page="5"
    >
      <template #item.description_slot="{ item }">
        {{
          $h.dg(item, 'standard_field_description', '').length > 40 ?
            $h.dg(item, 'standard_field_description', '').substr(0,40) + '...' :
            $h.dg(item, 'standard_field_description', '')
        }}
      </template>
      <template #item.standard_image="{ item }">
        <img
          :alt="item.title"
          class="standard-image"
          :src="item.standard_image"
        >
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
export default {
  name: 'RecordsTableIndex',
  props: {
    items: {
      type: Array,
      default: () => ([])
    }
  },
  data: () => ({
    headers: [
      { text: 'Image', value: 'standard_field_image' },
      { text: '#', value: 'standard_field_record_number' },
      { text: 'App', value: 'app_prefix' },
      { text: 'Title', value: 'standard_field_title' },
      { text: 'Description', value: 'description_slot' },
      { text: 'Creator', value: 'standard_field_author' },
      { text: 'Created On', value: 'standard_field_created_at' },
      { text: 'Class', value: 'standard_field_class' },
      { text: 'Category', value: 'standard_field_category' },
      { text: 'Type', value: 'standard_field_type' },
      { text: 'State', value: 'standard_field_state' },
      { text: 'Status', value: 'standard_field_status' },
      { text: 'Action', value: 'action', sortable: false }
    ]
  })
}
</script>

<style lang="scss" scoped>
.standard-image {
    height: 3rem;
    width: auto;
}
</style>
