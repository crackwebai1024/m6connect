<template>
  <div class="mb-5">
    <div class="actions-container mr-5">
      <v-btn
        color="grey darken-4"
        icon
      >
        <v-icon class="grey--text text--darken-2">
          mdi-filter
        </v-icon>
      </v-btn>
      <v-btn
        color="grey darken-4"
        icon
        @click="showSearchInputFunction"
      >
        <v-icon class="grey--text text--darken-2">
          mdi-magnify
        </v-icon>
      </v-btn>
    </div>
    <div>
      <h4 class="mb-4 ml-1">
        {{ department.name }}
      </h4>
      <input
        v-show="showSearchInput"
        ref="searchInput"
        v-model="searchInput"
        class="search-input"
        placeholder="Start Typing to Search"
        type="text"
      >
      <v-btn
        v-for="user in filteredUsers"
        :key="'user-' + department.name + user.id"
        class="capitalize d-flex justify-start my-0 pointer px-2 py-6 w-full"
        color="transparent"
        elevation="0"
        @click="startChat(user.id)"
      >
        <v-badge
          bottom
          class="mr-3"
          color="green accent-3"
          dot
          offset-x="10"
          offset-y="10"
        >
          <v-avatar size="36">
            <v-img :src="user.pic" />
          </v-avatar>
        </v-badge>
        <div class="align-start d-flex flex-column">
          <p class="font-weight-bold mb-0">
            {{ user.name }}
          </p>
          <span class="grey--text text--darken-1 text-caption">{{ user.departmentName }}</span>
        </div>
      </v-btn>
      <div v-if="filteredUsers.length === 0">
        No results found
      </div>
    </div>
    <div v-if="lastDepartment">
      <v-divider class="blue-grey lighten-4 mt-4" />
      <v-divider class="blue-grey lighten-4" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'DepartmentChat',
  props: {
    department: {
      type: Object,
      default: () => {}
    },
    lastDepartment: Boolean
  },
  data: () => ({
    showSearchInput: false,
    searchInput: '',
    drawer: true,
    filter: {
      departments: ['All my departments', 'Finances', 'Operations'],
      teams: ['All my teams', 'IT Team XY', 'CPM Team Z']
    }
  }),
  computed: {
    ...mapState(['layout']),
    filteredUsers() {
      return this.department.users.filter(user => user.name.toUpperCase().trim().indexOf(this.searchInput.toUpperCase().trim()) !== -1)
    }
  },
  methods: {
    startChat(id) {
      this.$store.dispatch('GSChat/pushChat', id)
    },
    showSearchInputFunction() {
      this.showSearchInput = !this.showSearchInput
      this.$nextTick(() => this.$refs.searchInput.focus())
    }
  }
}
</script>

<style lang="scss" scoped>
.actions-container {
    position: absolute;
    right: 0;
    z-index: 1;
    margin-top: -5px;
}
.mdi-chevron-right::before {
    background: #ddd;
    border-radius: 100%;
    margin: 6px 6px 6px 10px;
}
.v-expansion-panel-content__wrap {
    padding: 0;
}
</style>
