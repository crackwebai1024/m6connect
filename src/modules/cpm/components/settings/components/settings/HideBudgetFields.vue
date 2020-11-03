<template>
  <div>
    <v-card>
      <v-card-text>
        <div class="form-group">
          <label>Fields to Hide</label>
          <v-checkbox
            v-for="(field, index) in fields"
            :key="index"
            v-model="field.hide"
            :label="field.label"
          />

          <v-btn
            color="blue"
            dark
            type="submit"
            @click="save"
          >
            {{ submitLoading ? 'Saving...' : 'Save' }}
          </v-btn>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { db } from '@/utils/Firebase.js'
export default {
  data() {
    return {
      element: '',
      currentElement: '',
      settings: {},
      fields: {
        type: { label: 'Type', hide: true }
      },
      submitLoading: false
    }
  },
  mounted() {
    db.collection('settings')
      .doc(window.Drupal.settings.m6_platform_header.company_nid)
      .collection('settings')
      .doc('fields')
      .get()
      .then(settings => {
        if (!settings.exists) {
          db.collection('settings')
            .doc(window.Drupal.settings.m6_platform_header.company_nid)
            .collection('settings')
            .doc('fields')
            .update(
              {
                budget: {}
              }
            )
        } else {
          const data = settings.data()
          if (data.budget) {
            for (const index in data.budget) {
              if (this.fields[index]) {
                this.fields[index].hide = data.budget[index].hide
              }
            }
          }
        }
      })
  },
  methods: {
    save() {
      db.collection('settings')
        .doc(window.Drupal.settings.m6_platform_header.company_nid)
        .collection('settings')
        .doc('fields')
        .update({
          budget: this.fields
        })
        .then(() => {
          this.$snotify.success('The fields have been saved', 'Success')
        })
    }
  }
}
</script>
