<template>
  <div class="text-center">
    <v-dialog
      v-model="show"
      width="50vw"
      persistent
    >
      <v-card>
        <v-card-title class="headline blue darken-2 white--text">
          My Company Accounts
          <v-spacer />
          <v-btn icon color="white" @click="$emit('OpenJoinCompanies')" >
            <v-icon>mdi-bank-plus</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text>

          <v-list three-line>
            <template v-for="(item, index) in userCompanies">

              <v-divider
                v-if="index !== 0"
                :key="index"
              ></v-divider>

              <v-list-item
                :key="`item-${index}`"
              >
                <v-list-item-avatar>
                  <img
                    v-if="$h.dg(item, 'company.logo', '')"
                    :src="$h.dg(item, 'company.logo', '')"
                    :alt="item.company.name" 
                    class="mr-1 rounded-circle"
                  >
                  <v-icon 
                    v-else
                    x-large   
                  >
                      mdi-bank
                  </v-icon>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title>
                    {{ item.company.name }}
                  </v-list-item-title>
                </v-list-item-content>

                <v-list-item-action>
                  <v-icon 
                    v-if=" $h.dg(item, 'active') && item.joinStatus === 'ACTIVE' " 
                    color="green darken-2" 
                  >
                    mdi-check-circle
                  </v-icon>

                  <v-btn v-else-if="!$h.dg(item, 'active') && item.joinStatus === 'ACTIVE'" icon color="blue darken-2" >
                    <v-icon>mdi-hand-pointing-left</v-icon>
                  </v-btn>

                  <v-chip 
                    v-else 
                    :color="statusColors[item.joinStatus]" 
                  > 
                    <span class="white--text" >{{ item.joinStatus }}</span>
                  </v-chip>
                </v-list-item-action>

              </v-list-item>
            </template>
          </v-list>

        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="red "
            class="white--text"
            @click="$emit('close')"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
  props: {
    show: {
      default: false,
      type: Boolean
    }
  },
  computed: {
    ...mapGetters('Auth', {
      userCompanies: 'getCurrentUserCompanies'
    }),
    ...mapState('Auth', {
      statusColors: 'statusColors'
    })
  },
}
</script>