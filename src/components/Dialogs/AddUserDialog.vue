<template>
  <v-card class="rounded-lg">
    <v-card-subtitle class="blue pa-5">
      <h2 class="text-heading-6 white--text blue">
        Invite Colleagues, Customers and Vendors
      </h2>
    </v-card-subtitle>
    <v-card-title class="pb-6">
      <v-spacer />
      <!--<v-btn
        color="secondary"
        width="40%"
        x-large
        @click="element='company'"
      >
        In Company
      </v-btn>
      <v-spacer />
      <v-btn
        color="secondary"
        width="40%"
        x-large
        @click="element='vendor'"
      >
        In Vendors
      </v-btn>-->
      <v-spacer />
    </v-card-title>
    <v-card-text>
      <v-text-field
        v-if="typeof this.currentUsers === 'string'"
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
          :key='index'
          v-for="(user, index) in selectedUsers"
          large
          class='px-5 mx-3'
          color='primary lighten-3'
        >
          <!--@click="data.select"
          @click:close="remove(data.item)"-->
          <v-avatar left>
            <v-img v-if="user.profilePic" :src="user.profilePic"></v-img>
            <v-icon v-else>mdi-account</v-icon>
          </v-avatar>
          <b class='primary--text darken-2'>{{ user.user.firstName }} 
          {{ user.user.lastName }}</b>
        </v-chip>
      </v-row>
      <v-autocomplete
          v-model="selectedUsers"
          :items="companies"
          filled
          chips
          color="blue-grey lighten-2"
          label="Select"
          item-text="user.firstName"
          return-object
          multiple
        >
          <template v-slot:item="data">
            <template v-if="typeof data.item !== 'object'">
              <v-list-item-content v-text="data.item"></v-list-item-content>
            </template>
            <template v-else>
              <v-list-item-avatar>
                <v-img v-if="data.item.user.profilePic" :src="data.item.user.profilePic"></v-img>
                <v-icon v-else>mdi-account</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title v-html='data.item.user.firstName + " " + data.item.user.lastName'></v-list-item-title>
                <v-list-item-subtitle v-html="data.item.user.email"></v-list-item-subtitle>
              </v-list-item-content>
            </template>
          </template>
        </v-autocomplete>
        <!--<div
          v-for="(user, ind) of companies"
          :key="ind+'-company-user-dialog'"
          class="align-center d-flex"
        >
          <v-btn
            block
            class="btn-user my-0 my-2 py-6"
            color="transparent"
            depressed
            tile
            @click="user['selected'] = !user['selected']"
          >
            <v-checkbox
              v-model="user['selected']"
              class="mr-2 mt-0"
              color="success"
              hide-details
              :value="user['selected']"
              @click="user['selected'] = !user['selected']"
            />
            
            {{ `${user.user.firstName} ${user.user.lastName}` }}
            <v-spacer />
            <v-chip
              :color="user.joinStatus.toUpperCase() === 'ACTIVE' ? 'green'
                : user.joinStatus.toUpperCase() === 'PENDING' ? 'yellow' : 'red'"
            >
              <span class="white--text">{{ (user.joinStatus).toLowerCase() }}</span>
            </v-chip>
          </v-btn>
        </div>-->
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
