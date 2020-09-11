export const validations = {
  data: () => ({
    valid: false,
    nameRules: [
      v => !!v || 'Name is required',
      v => (v && v.trim().length !== 0) || 'Name is required'
    ],
    textRules: [
      v => !!v || 'Field is required',
      v => (v && v.trim().length !== 0) || 'Field is required'
    ],
    tagRules: [
      v => v !== null || 'Tag is required',
      v => (v && v.length !== 0) || 'Please select 1 or more tags'
    ],
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ],
    quantityRules: [
      v => (v && v >= 0) || 'Please choose a number equal or greater than 0'
    ],
    selectRules: [
      v => !!v || 'Please choose an option',
    ],
    date: new Date().toISOString().substr(0, 10),
    menu: false,
    modal: false,
    menu2: false,
  }),
  methods: {
    validate() {
      this.$refs.form.validate()
    },
    reset() {
      this.$refs.form.reset()
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    },
  },
};
