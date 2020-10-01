<template>
  <div class="dont-show-scroll h-full pa-5 panel-people vertical-scroll">
    <department-chat
      v-for="(department, index) in departments"
      :key="'department-' + index"
      :department="department"
      :last-department=" index !== departments.length - 1 "
    />
  </div>
</template>

<script>
import DepartmentChat from './DepartmentChat'
import { mapGetters } from 'vuex'
export default {
  // eslint-disable-next-line vue/match-component-file-name
  name: 'M6Chat',
  components: {
    DepartmentChat
  },
  data() {
    return {
      departments: [
        {
          name: 'My Connections'
        },
        {
          name: 'People in my Company',
          users: this.companyUsers
        },
        {
          name: 'People in Vendors',
          users: []
        }
      ]
    }
  },
  computed: {
    ...mapGetters('GSChat', {
      gsToken: 'gsToken',
      chats: 'chats'
    }),
    ...mapGetters('Auth', { user: 'getUser' }),
    ...mapGetters('Companies', { companyUsers: 'getCurrentCompanyUsers' })
  }
}
</script>

<style lang="scss" scoped>
.panel-people {
    width: 400px;
}
</style>
