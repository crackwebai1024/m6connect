<template>
  <div :class="`theme--light v-input v-text-field ${ outlined ?  outlinedAndFilledClasses : ''}`">
    <div class="v-input__control">
      <div class="v-input__slot">
        <fieldset aria-hidden="true" v-if="outlined">
          <legend style="width: 0px;">
            <span>
              ​</span>
          </legend>
        </fieldset>
        <div class="v-text-field__slot">
          <google-autocomplete
            class="input"
            :placeholder="placeholder || label"
            :select-first-on-enter="selectFirstOnEnter"
            :value="value"
            @place_changed="sendingData"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GMap',
  props: {
    outlined: {
      type: Boolean,
      default: false
    },
    value: {
      type: String,
      default: ''
    },
    label: {
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

  data: () => ({
    outlinedAndFilledClasses: 'v-text-field--enclosed v-text-field--filled v-text-field--is-booted v-text-field--outlined'
  }),

  methods: {
    sendingData(place) {
      this.$emit('placeUpdate', place)
      const address = {}
      address.address = val.formatted_address

      address.lat = val.geometry.location.lat()
      address.lng = val.geometry.location.lng()
      this.$emit('input', address) 
    },
  }
}
</script>
