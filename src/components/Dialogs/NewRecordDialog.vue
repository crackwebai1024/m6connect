<template>
  <v-card>
    <v-card-title class="grey headline lighten-2">
      Create Record
    </v-card-title>
    <v-card-text class="record-text vertical-scroll">
      <v-autocomplete
        v-model="tab"
        auto-select-first
        item-text="tab"
        item-value="id"
        :items="items"
        label="Please select an APP"
      />
      <div v-if="helperMedia">
        <img
          v-if="helperMedia.split('/').slice(-2)[0] === 'image'"
          alt="helperMedia"
          :src="helperMedia"
          style="height: 100%; width: 100%"
        >
        <video
          v-if="helperMedia.split('/').slice(-2)[0] === 'video'"
          controls
          style="height: 100%; width: 100%"
        >
          <source :src="helperMedia">
          Your browser does not support the video tag.
        </video>
      </div>
      <v-tabs-items v-model="tab">
        <v-tab-item
          v-for="item in items"
          :key="item.tab"
        >
          <component
            :is="item.component"
            :app="item.app"
            @closeModal="closeModal"
            @closingGenericRecord="closingGenericRecord"
          />
        </v-tab-item>
      </v-tabs-items>
    </v-card-text>
  </v-card>
</template>

<script>
import ItAppForm from '@/components/Home/Forms/ItAppForm';
import GenericRecord from '@/components/Home/Forms/GenericRecord';
import { mapActions, mapMutations } from 'vuex'

export default {
  name: 'NewRecordDialog',

  components: {
    ItAppForm,
    GenericRecord
  },

  data: () => ({
    tab: 0,
    items: [
      {
        tab: 'ItApp',
        component: ItAppForm,
        id: 0
      }
    ]
  }),

  computed: {
    helperMedia() {
      if (this.tab === 0) {
        return null
      } else {
        return this.items[this.tab].app.helperMedia.length === 1 ? this.items[this.tab].app.helperMedia[0].helper_media : null
      }
    }
  },

  async mounted() {
    try {
      const res = await this.getAppList()
      for (let x = 0; x < res.length; x++) {
        this.items.push({
          isGeneric: true,
          tab: res[x].title,
          component: 'GenericRecord',
          app: res[x],
          id: x + 1
        })
      }
    } catch (e) {
    }
  },

  methods: {
    ...mapActions('AppBuilder', {
      getAppList: 'getAppList'
    }),

    ...mapMutations('RecordsInstance', {
      setCurrentRecord: 'setCurrentRecord',
      setDisplayShow: 'setDisplayAppBuilderShow'
    }),

    closeModal() {
      this.$emit('closeModal')
    },
    closingGenericRecord() {
      this.closeModal()
    }
  }
}
</script>

<style scoped>
.record-text {
    height: 80vh;
}
</style>
