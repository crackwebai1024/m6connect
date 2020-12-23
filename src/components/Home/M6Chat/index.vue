<template>
  <div
    :class="{'d-none': $vuetify.breakpoint.xsAndDown, 'dont-show-scroll h-full px-2 py-5 vertical-scroll w-side': true }"
  >
    <template
      v-for="(department, index) in departments"
    >
      <department-chat
        v-if="department.type !== 'connections'"
        :key="'department-' + index"
        :department="department"
        :last-department=" index !== departments.length - 1 "
        :light-mode="lightMode"
      />
      <connections
        v-else-if="department.channels.length"
        :key="'department-' + index"
        :department="department"
        :last-department=" index !== departments.length - 1 "
        :light-mode="lightMode"
      />
    </template>
  </div>
</template>

<script>
import DepartmentChat from './DepartmentChat'
import Connections from './Connections'
import { mapGetters } from 'vuex'
export default {
  // eslint-disable-next-line vue/match-component-file-name
  name: 'M6Chat',
  components: {
    DepartmentChat,
    Connections
  },
  props: {
    lightMode: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      watchers: []
    }
  },
  computed: {
    ...mapGetters('GSChat', {
      gsToken: 'gsToken',
      chats: 'chats',
      connections: 'connections'
    }),
    ...mapGetters('Auth', { user: 'getUser' }),
    ...mapGetters('Companies', { companyUsers: 'getCurrentCompanyUsers' }),
    listUsers() {
      return this.companyUsers.filter(user => user.user.id !== this.user.id)
    },
    departments() {
      return [
        {
          name: 'My Connections',
          channels: this.connections,
          type: 'connections'
        },
        {
          name: 'People in my Company',
          users: this.listUsers
        },
        {
          name: 'People in Vendors',
          users: []
        }
      ]
    }
  }
}
</script>
