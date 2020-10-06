<template>
    <v-card
        class="mx-auto"
        width="300"
    >
        <v-list>
            <v-list-item >
                <v-list-item-title @click="pickingComponent({ })" >My Profile</v-list-item-title>
            </v-list-item>

            <v-list-item class="cursor-pointer" >
                <v-list-item-title @click="pickingComponent({ name: 'company-show' })" >My Company</v-list-item-title>
            </v-list-item>

            <v-list-group >
                <template v-slot:activator>
                    <v-list-item-title >User Mangement</v-list-item-title>
                </template>

                <v-list-item @click="pickingComponent({ name:'user-mangement-table' })" >All Users</v-list-item>
            </v-list-group>

            <div class="px-2" >
                <hr />
            </div>

            <v-list-item >
                <v-list-item-title >IT Applications</v-list-item-title>
            </v-list-item>

            <v-list-item >
                <v-list-item-title >Capital Projects Management</v-list-item-title>
            </v-list-item>
        </v-list>
  </v-card>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
   name: "SettingsSideNave" ,
   methods: {
       ...mapMutations('UserSettingsControl', {
           pickingComponent : 'setSecondColumnComponent'
       }),
   }
}
</script>

<style lang="scss" scoped>
.cursor-pointer {
    cursor: pointer;
}
</style>