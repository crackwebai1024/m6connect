<template>
  <v-card>
    <v-card-text>
      <v-layout
        row
        wrap
      >
        <v-flex md12>
          <v-container
            fluid
            grid-list-md
          >
            <v-layout
              row
              wrap
            >
              <v-flex md12>
                <v-select
                  v-model="settings.defaultStandard"
                  clearable
                  item-text="name"
                  :items="standards"
                  label="Policy and Procedures"
                >
                  <template slot="no-options">
                    type to search for policies and procedures
                  </template>
                </v-select>
              </v-flex>
            </v-layout>

            <v-layout
              row
              wrap
            >
              <v-flex md12>
                <v-btn
                  color="blue"
                  outline
                  @click="cancel"
                >
                  Cancel
                </v-btn>
                <v-btn
                  color="blue"
                  dark
                  :disabled="loading"
                  :loading="loading"
                  @click="save"
                >
                  Save
                </v-btn>
              </v-flex>
            </v-layout>
          </v-container>
        </v-flex>
        <v-flex md12>
          <v-treeview
            v-if="settings.defaultStandard && settings.defaultStandard.files"
            activatable
            hoverable
            :items="settings.defaultStandard.files"
            open-on-click
          >
            <template
              slot="prepend"
              slot-scope="{ item, open }"
            >
              <v-icon v-if="!item.file">
                {{ open ? 'folder_open' : 'folder' }}
              </v-icon>
              <v-icon
                v-else-if="
                  item.file === 'image/jpeg' || item.file === 'image/png'
                "
              >
                image
              </v-icon>
              <v-icon v-else-if="item.file === 'application/pdf'">
                picture_as_pdf
              </v-icon>
              <v-icon v-else>
                description
              </v-icon>
            </template>
            <template
              slot="append"
              slot-scope="{ item, open, leaf }"
            >
              <template>
                <template v-if="item.file">
                  <a
                    :href="item.url"
                    style="padding-top: 6px"
                    target="_blank"
                  >
                    <v-icon small>open_in_new</v-icon>
                  </a>
                </template>
              </template>
            </template>
          </v-treeview>
          <div
            v-else-if="
              settings.defaultStandard &&
                (!settings.defaultStandard.files ||
                  settings.defaultStandard.files.length <= 0)
            "
          >
            No files found
          </div>
        </v-flex>
      </v-layout>
    </v-card-text>
  </v-card>
</template>

<script>
import { db } from '@/utils/Firebase.js'
import { mapState } from 'vuex'

export default {
  name: 'DefaultPolicyProcedure',
  computed: {
    ...mapState('Companies', {
      currentCompany: 'currentCompany'
    })
  },
  data() {
    return {
      settings: {},
      standards: [],
      loading: false
    }
  },
  mounted() {
    this.getStandards()
  },
  methods: {
    getStandards() {
      db.collection('standards')
        .where('active', '==', true)
        .get()
        .then(rows => {
          for (const index in rows.docs) {
            const data = rows.docs[index].data()
            const row = {
              id: rows.docs[index].id,
              number: data.number,
              name: data.title,
              type: data.type,
              files: data.files,
              campus: data.campus,
              notes: data.notes,
              exhibit: data.exhibit,
              createdAt: '',
              updatedAt: '',
              version: data.version
            }
            this.standards.push(row)
          }
        })
    },
    cancel() {
      this.settings.defaultStandard = {}
    },
    save() {
      this.loading = true

      if (
        this.settings.defaultStandard &&
        (!this.settings.defaultStandard.files ||
          this.settings.defaultStandard.files.length <= 0)
      ) {
        delete this.settings.defaultStandard.files
      }

      db.collection('settings')
        .doc(this.currentCompany.id)
        .collection('settings')
        .doc('projects')
        .update({
          defaultStandard: this.settings.defaultStandard
        })
        .then(() => {
          this.loading = false
          this.$snotify.success(
            'The policy and procedure default has been saved',
            'Success'
          )
        })
    }
  },
  firestore() {
    return {
      settings: db
        .collection('settings')
        .doc(this.currentCompany.id)
        .collection('settings')
        .doc('projects')
    }
  }
}
</script>
