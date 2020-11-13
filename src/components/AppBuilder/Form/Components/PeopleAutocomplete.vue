<template>
    <div>
        <v-autocomplete 
            :outlined="outlined"
            :filled="filled"
            :label="label"
            item-text="fullname"
            item-value="id"
            :items="processedUser"
            :multiple="multiple"
            :chips="chips"
            :clearable="clearable"
            v-model="userList"
        />
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    props: {
        value: {
            type: Array,
            default: () => ([])
        },

        label: {
            type: String,
            default: ""
        },

        filled: {
            type: Boolean,
            default: false
        },

        outlined: {
            type: Boolean,
            default: false
        },
        
        multiple: {
            type: Boolean,
            default: false
        },

        chips: {
            type: Boolean,
            default: false
        },

        clearable: {
            type: Boolean,
            default: false
        }
    },

    data: () => ({ 
    }),

    computed: {
        ...mapGetters('Companies', {
            users: 'getCurrentCompanyUsers' 
        }),

        userList: {
            get() {
                return this.value || []
            },
            set(data) {
                this.$emit('input', data)
            }
        },

        processedUser() {
            return this.users
                .map( u => ({ 
                    ...u, 
                    fullname: this.$h.dg(u, 'user.firstName', '')  
                    + ' ' + 
                    this.$h.dg(u, 'user.lastName', '')
                }))
        }
    }
}
</script>