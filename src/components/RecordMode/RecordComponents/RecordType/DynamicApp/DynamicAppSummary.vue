<template>
  <v-container style='height: 100%' class="card-custom-shadow d-flex py-2 relative rounded white">
    <div
      v-show="info['prefix']"
      class="red absolute align-center card-content__tag d-flex font-weight-regular justify-center text-body-1 white--text"
    >
      {{ info['prefix'] ? info['prefix'] : apps.filter(app => app.id === info['app_id'])[0]['prefix'] }}
    </div>
    <div class="d-inline-flex flex-column" style='width: 100%'>
      <v-row
      >
        <v-col class='flex-shrink-1 py-0 flex-grow-0 pr-9 pt-3 pl-5'>
          <v-badge offset-y="23" offset-x="23" bordered avatar overlap :color='getStatusColor'>
            <v-avatar color='grey lighten-2' size='100'>
                <v-img
                v-if="info.image"
                :alt="info.image"
                max-height="75px"
                class='rounded-full'
                :src="info.image"
              />
              <v-img
                v-else-if="info.iconLink"
                :alt="info.iconLink"
                max-height="75px"
                class='rounded-full'
                :src="info.iconLink"
              />

              <v-icon
                v-else
                class='rounded-full'
                size="75"
              >
                mdi-store
              </v-icon>
            </v-avatar>
          </v-badge>
        </v-col>
        <v-col class='d-flex align-center flex-grow-1 flex-shrink-0'>
          <div>
              <v-row class=''>
                <div class="mb-0 text-h6 font-weight-bold black--text lineheight-sm">
                {{ info['title'] | truncate(15) }}
                </div>
              </v-row>
              <v-row class=''>
                <div class="font-weight-regular mb-0 text-title lineheight-sm">{{ info['record_number'] }}</div>
              </v-row>
          </div>
        </v-col>
      </v-row>
      <v-row class='px-5 pb-1 text-body'>
        <v-col>
          {{info['description'] | truncate}}
        </v-col>
      </v-row>
      <v-row class='px-5 d-flex align-end mb-auto'>
        <v-col>
          Author
        </v-col>
        <v-spacer></v-spacer>
        <v-col>{{info['created_at'] | normalizeDate}}</v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'DynamicAppSummary',
  components: {
  },
  props: {
    info: {
      type: Object,
      default: {}
    }
  },
  data: () => ({
  }),
  computed: {
    ...mapGetters('DynamicAppsModule', {
      apps: 'getApps'
    }),
    getStatusColor() {
      if (!this.info?.status) return 'grey'
      switch (this.info.status) {
        case 'Published':
          return 'light-green accent-4'
          break;
        case 'Draft':
          return 'yellow'
          break;
        default:
          return 'grey'
          break;
      }
    }
  },
  filters: {
    truncate(v = '', length = 100) {
      return typeof(v) == 'string' && v.length > length ? `${v.substring(0,length)}...` : v
    }
  },
  methods: {
    dateFormater(e) {
      const date = new Date(e)
      const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ]
      const year = date.getFullYear()
      const month = date.getMonth()
      const day = date.getDate()
      const hour = date.getHours()
      const mins = date.getMinutes()
      return `${months[month - 1]} ${day} ${year}, ${hour} : ${mins}`
    },
    getBadgeColor() {
      if (this.info.status) {
        if (this.info.status.toUpperCase() === 'PUBLISHED') return 'green accent-4'
        if (this.info.status.toUpperCase() === 'GREY') return 'yellow'
        if (this.info.status.toUpperCase() === 'ARCHIVED') return 'grey'
      } else {
        return 'grey'
      }
    }
  }
}
</script>

<style>
.lineheight-sm {
  line-height: 1;
}
.height-100 {
  height: 100%;
}
</style>