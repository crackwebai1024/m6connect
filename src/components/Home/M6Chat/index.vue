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
  computed: {
    ...mapGetters('GSChat', {
      gsToken: 'gsToken',
      chats: 'chats',
      connections: 'connections'
    }),
    ...mapGetters('Auth', { user: 'getUser' }),
    ...mapGetters('Companies', { companyUsers: 'getCurrentCompanyUsers' }),
    departments() {
      return [
        {
          name: 'My Connections',
          users: []
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
  watch: {
    user(a) {
      if (!this.gsToken && a.id) {
        this.$store.dispatch('GSChat/getGSToken', this.user).then(() => {
          const user = {
            id: this.user.id,
            name: `${this.user.firstName} ${this.user.lastName}`,
            image: 'https://getstream.io/random_svg/?id=broken-waterfall-5&amp;name=Broken+waterfall'
          }
          this.$store.dispatch('GSChat/setUser', user)
          this.$store.dispatch('GSChat/retrieveChats', this.user.id)
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.panel-people {
    width: 400px;
}
</style>
