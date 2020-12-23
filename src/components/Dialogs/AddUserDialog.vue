<template>
  <v-card class="rounded-false">
    <v-card-subtitle class="accent-4 blue pa-5 rounded-false">
      <h2 class="accent-4 blue text-heading-6 white--text">
        Invite Colleagues, Customers and Vendors
      </h2>
    </v-card-subtitle>
    <v-card-text>
      <v-text-field
        v-if="typeof currentUsers === 'string'"
        v-model="roomName"
        dense
        label="Chat Name"
        outlined
      />
      <div
        v-if="element=='company'"
        class="messages-container white"
        style="height: 400px; overflow-y: scroll;"
      >
        <v-row class="mb-3">
          <v-chip
            v-for="(user, index) in selectedUsers"
            :key="index"
            class="mx-3 px-5"
            color="primary lighten-3"
            large
          >
            <v-avatar left>
              <v-img
                v-if="user.profilePic"
                :src="user.profilePic"
              />
              <v-icon v-else>
                mdi-account
              </v-icon>
            </v-avatar>
            <b class="darken-2 primary--text">{{ user.user.firstName }}
              {{ user.user.lastName }}</b>
          </v-chip>
        </v-row>
        <v-autocomplete
          v-model="selectedUsers"
          chips
          color="blue-grey lighten-2"
          filled
          item-text="user.firstName"
          :items="companies"
          label="Select"
          multiple
          return-object
        >
          <template v-slot:item="data">
            <template v-if="typeof data.item !== 'object'">
              <v-list-item-content v-text="data.item" />
            </template>
            <template v-else>
              <v-list-item-avatar>
                <v-img
                  v-if="data.item.user.profilePic"
                  :src="data.item.user.profilePic"
                />
                <v-icon v-else>
                  mdi-account
                </v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title v-html="data.item.user.firstName + &quot; &quot; + data.item.user.lastName" />
                <v-list-item-subtitle v-html="data.item.user.email" />
              </v-list-item-content>
            </template>
          </template>
        </v-autocomplete>
        <h2
          v-if="companies.length === 0"
          class="font-weight-black mt-2 text-center"
        >
          No users found
        </h2>
      </div>
      <div v-else>
        <h2
          class="font-weight-black text-center"
        >
          No users found
        </h2>
      </div>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn
        class="mt-2"
        color="primary"
        outlined
        width="30%"
        @click="res(false)"
      >
        Cancel
      </v-btn>
      <v-btn
        class="mt-2"
        color="success"
        width="30%"
        @click="res(true)"
      >
        Add
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'AddUserDialog',
  props: {
    currentUsers: {
      type: [String, Object],
      default: () => {}
    }
  },
  data: () => ({
    hoverUser: false,
    roomName: '',
    companies: [],
    resList: [],
    selectedUsers: [],
    element: 'company'
  }),
  computed: {
    ...mapGetters('Companies', { companyUsers: 'getCurrentCompanyUsers' })
  },
  mounted() {
    if (typeof this.currentUsers === 'string') {
      const cUser = this.companyUsers.filter(e => e.user.id === this.currentUsers)[0]
      this.companyUsers.splice(this.companyUsers.indexOf(
        cUser
      ), 1)
      this.companies = this.companyUsers
      if (cUser) {
        this.resList.push(cUser.user.id)
      }
    } else {
      this.companyUsers.forEach(item => {
        if (Object.keys(this.currentUsers).filter(e => e === item.user.id).length === 0) {
          item['selected'] = false
          this.companies.push(item)
        } else {
          this.resList.push(item.user.id)
        }
      })
    }
  },
  methods: {
    res(a) {
      if (a) {
        const res = this.resList.slice()
        this.companies.forEach(item => {
          if (item.selected) {
            res.push(item['user']['id'])
            item['selected'] = false
          }
        })
        this.$emit('closeModal', {
          name: this.roomName,
          image: '',
          users: res
        })
      } else {
        this.$emit('closeModal', {
          name: this.roomName,
          image: '',
          users: []
        })
      }
      this.roomName = ''
    }
  }
}
</script>

<style>
  .v-sheet.v-card {
    border-radius: 0 !important
  }
</style>
