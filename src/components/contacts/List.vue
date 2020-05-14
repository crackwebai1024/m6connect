<template>
  <v-row
    align="center"
    class="m6_contact_list"


  >
    <v-col
      cols="12"
      :md4="!main"
      :md5="main"
    >
      <v-img
        alt="avatar"
        max-height="112px"
        position="center center"
        :src="contact.profilePic || '//vuetifyjs.com/apple-touch-icon-180x180.png'"
      />
    </v-col>
    <v-col class="px-2"
           cols="12"
           :md7="main"
           :md8="!main"
    >
      <v-row


      >
        <v-col
          v-if="main"
          cols="12"
        >
          <v-icon
            class="m6_icon_xs"
          >
            edit
          </v-icon> <small>Edit Profile</small>
        </v-col>
        <v-col
          class="m6_contact_list_body"
          cols="12"
        >
          <v-icon
            v-if="!main && starred"
            color="orange"
          >
            star
          </v-icon>
          <p class="mb-0">
            {{ contact.name }}
          </p>
          <p class="mb-0">
            {{ contact.phone }}
          </p>
          <p class="mb-0">
            {{ contact.email }}
          </p>
        </v-col>
        <v-col
          v-if="main"
          class="text-right"
          cols="12"
        >
          <small>Sign Out</small>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
// eslint-disable-next-line no-unused-vars
import { Contact } from '@/shared/interfaces'
@Component
export default class ContactList extends Vue {
  @Prop({ required: true, type: Object }) readonly contact!: Contact

  @Prop({
    required: false,
    type: Boolean,
    default: false
  }) readonly main!: boolean

  @Prop({
    required: false,
    type: Boolean,
    default: true
  }) readonly starred!: boolean
}
</script>
