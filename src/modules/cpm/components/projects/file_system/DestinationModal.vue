<template>
  <v-dialog
    v-model="show"
    max-width="600"
    persistent
    scrollable
  >
    <v-card>
      <v-card-title>
        <span class="headline">{{ $t('cpm.projects.titleDestination') }}</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row justify="space-between">
            <v-col>
              <v-treeview
                activatable
                hoverable
                item-key="path"
                :items="$h.dg(project, 'files.children', project.files || [])"
              >
                <template
                  slot="prepend"
                  slot-scope="{ item }"
                >
                  <v-icon
                    v-if="!item.file"
                    color="blue"
                  >
                    mdi-folder
                  </v-icon>
                </template>

                <template
                  slot="label"
                  slot-scope="{ item }"
                >
                  <span @click="selectFile(item)">{{ item.name }}</span>
                </template>
                <template
                  slot="append"
                  slot-scope="{ item }"
                >
                  <v-icon
                    v-if="!item.file && !itemSelected.includes(item)"
                    color="blue"
                    @click="selectFile(item)"
                  >
                    mdi-checkbox-blank-outline
                  </v-icon>

                  <v-icon
                    v-if="!item.file && itemSelected.includes(item)"
                    color="blue"
                    @click="unselectFile(item)"
                  >
                    mdi-check-box-outline
                  </v-icon>
                </template>
              </v-treeview>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-row>
          <v-col cols="8" />
          <v-col cols="6">
            <v-btn
              text
              @click="$emit('close')"
            >
              {{ $t('general.cancel') }}
            </v-btn>
            <v-btn
              text
              @click="selectFolder"
            >
              {{ $t('general.selectFolder') }}
            </v-btn>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>

export default {
  props: {
    project: {
      type: Object,
      default: () => {}
    },
    show: {
      type: Boolean,
      default: false
    }
  },
  data: function () {
    return {
      itemSelected: []
    }
  },
  methods: {
    selectFile(item) {
      this.itemSelected.push(item)
    },
    unselectFile(item) {
      const index = this.itemSelected.indexOf(item)
      if (index !== -1) {
        this.itemSelected.splice(index, 1)
      }
    },
    selectFolder() {
      if (!this.itemSelected.length) {
        this.$snotify.error(this.$t('cpm.projects.selectOneOrMore'), this.$t('alerts.error'))
      } else {
        this.$emit('onDestinationSelected', this.itemSelected)
      }
    }
  }
}
</script>

