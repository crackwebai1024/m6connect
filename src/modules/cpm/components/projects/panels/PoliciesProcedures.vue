<template>
  <v-card class="cpm-panel">
    <v-card-title
      class="pa-0"
      primary-title
    >
      <v-toolbar
        color="green"
        dark
        flat
      >
        <h3 class="headline mb-0">
          Policies and Procedures
        </h3>
      </v-toolbar>
    </v-card-title>

    <v-card-text class="card-container">
      <div class="text-center">
        <v-progress-circular
          v-show="loading"
          color="primary"
          indeterminate
          :size="32"
        />
      </div>

      <template v-if="availableStandardsInType.length >0 ">
        <div
          v-for="(standard, index) in availableStandardsInType"
          :key="index"
          style="padding: 7px 0px 7px 0px;"
        >
          <v-row align="center">
            <v-col cols="11">
              <span class="dependency-details">
                <p
                  class="mb-0"
                  style="font-size: 16px;"
                >{{ standard.title }}</p>
                <p
                  class="mb-0"
                  style="font-size: 12px;"
                >{{ standard.exhibit }}</p>
              </span>
            </v-col>

            <v-col
              class="justify-end"
              md="1"
              style="height: 45px;"
            >
              <v-btn
                color="#f44336"
                flat
                icon
                @click="openPolicy(standard)"
              >
                <v-icon>folder</v-icon>
              </v-btn>
            </v-col>
          </v-row>
          <v-divider />
        </div>
      </template>
      <template v-else>
        <div style="padding: 7px 0px 7px 0px;">
          <span class="text-center">No Policies and Procedures Have Been Made Yet</span>
        </div>
      </template>
    </v-card-text>

    <v-dialog
      v-model="dialogFiles"
      max-width="500px"
      persistent
      transition="dialog-transition"
    >
      <v-card>
        <v-card-title
          class="green headline lighten-2"
          primary-title
          style="color: white;"
        >
          Files
        </v-card-title>
        <v-card-text>
          <v-container
            fluid
            grid-list-md
          >
            <v-row>
              <v-col
                v-if="!selectedPolicy.files || (selectedPolicy.files && selectedPolicy.files.length <= 0)"
                md="12"
              >
                No files
              </v-col>
              <v-col
                v-if="selectedPolicy.files && selectedPolicy.files.length > 0"
                md="12"
              >
                <v-treeview
                  v-model="selectedPolicy.tree"
                  activatable
                  :active.sync="selectedPolicy.active"
                  hoverable
                  item-key="path"
                  :items="selectedPolicy.files"
                  :open="selectedPolicy.open"
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
                      v-else-if="item.file === 'image/jpeg' || item.file === 'image/png'"
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
                    slot-scope="{ item }"
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
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-divider />

        <v-card-actions>
          <v-spacer />
          <v-btn
            color="gray"
            flat
            @click="cancel"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import { db } from '@/utils/Firebase'
const defaultSelectedPolicy = {
  tree: [],
  files: [],
  open: []
}
export default {
  props: [],
  data() {
    return {
      loading: false,
      policyStandards: [],
      dialogFiles: false,
      selectedPolicy: { ...defaultSelectedPolicy }
    }
  },
  firestore() {
    return {
      policyStandards: db
        .collection('settings')
        .doc(Drupal.settings.m6_platform.company_nid)
        .collection('settings')
        .doc('policy_and_standards')
    }
  },
  computed: {
    availableStandardsInType() {
      if (this.policyStandards.length <= 0 || !this.policyStandards['cpm']) {
        return []
      }

      this.policyStandards['cpm'].map(standard => {
        if (typeof standard !== 'string') {
          standard.tree = []
          standard.open = []
          standard.active = []
        }
      })
      // standards
      return this.policyStandards['cpm']
    }
  },
  methods: {
    cancel() {
      this.selectedPolicy = { ...defaultSelectedPolicy }
      this.dialogFiles = false
    },
    openPolicy(item) {
      this.selectedPolicy = item
      this.$nextTick(() => {
        this.dialogFiles = true
      })
    }
  }
}
</script>
