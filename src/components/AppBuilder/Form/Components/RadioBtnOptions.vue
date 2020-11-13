<template>
    <div>
        <label >{{ label }}</label>
        <v-radio-group v-model="radio" >
            <v-radio  
                label="Yes"
                :value="true"
            />

            <v-radio 
                label="No"
                :value="false"
            />
        </v-radio-group>
    </div>
</template>

<script>
export default {
    props: {
        value: {
            type: Boolean,
            default: null
        },
        label: {
            type: String,
            default: ""
        }
    },

    computed: {
        radio: {
            get() {
                return this.value || null
            },
            set(data) {
                this.$emit('input', data)
            }
        }
    }
}
</script>