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
  name: 'M6Chat',
  components: {
    DepartmentChat
  },
  data: () => ({
    departments: [
      {
        name: 'My Connections',
        users: [
          {
            id: 1,
            name: 'John Doe',
            pic: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
            departmentName: 'IT Department'
          },
          {
            id: 2,
            name: 'Example User',
            pic: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
            departmentName: 'IT Department'
          },
          {
            id: 3,
            name: 'Another Example',
            pic: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
            departmentName: 'IT Department'
          },
          {
            id: 4,
            name: 'John',
            pic: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
            departmentName: 'IT Department'
          },
          {
            id: 5,
            name: 'Example User 2',
            pic: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
            departmentName: 'IT Department'
          },
          {
            id: 6,
            name: 'Another Example 2',
            pic: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
            departmentName: 'IT Department'
          }
        ]
      },
      {
        name: 'People in my Company',
        users: [
          {
            id: 7,
            name: 'John Doe',
            pic: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
            departmentName: 'IT Department'
          },
          {
            id: 8,
            name: 'John Doe xyz',
            pic: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
            departmentName: 'IT Department'
          },
          {
            id: 9,
            name: 'John Doe 9875',
            pic: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
            departmentName: 'IT Department'
          }
        ]
      },
      {
        name: 'People in Vendors',
        users: [
          {
            id: 10,
            name: 'John Doe 4321',
            pic: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
            departmentName: 'IT Department'
          },
          {
            id: 11,
            name: 'John Doe 1234',
            pic: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
            departmentName: 'IT Department'
          }
        ]
      }
    ]
  }),
  computed: {
    ...mapGetters('GSChat', {
      gsToken: 'gsToken',
      chats: 'chats'
    }),
    ...mapGetters('Auth', { user: 'getUser' })
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
