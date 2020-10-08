<template>
    <div
        class="theme--light v-input v-input--is-readonly v-text-field"
    >
        <div class="v-input__control">
            <div class="v-input__slot">
                <div class="v-text-field__slot">
                    <google-autocomplete
                        class="input"
                        :placeholder="placeholder"
                        :select-first-on-enter="selectFirstOnEnter"
                        :value="address"
                        @place_changed="sendingData"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: "GMap",
    props: {
      address: {
        type: String,
        default: ''
      },
      placeholder: {
        type: String,
        default: ''
      },
      selectFirstOnEnter: {
        type: Boolean,
        default: true
      }
    },
    methods:{
      sendingData(place){
        this.$emit('place-changed', place)
      }
    }
  }
</script>
