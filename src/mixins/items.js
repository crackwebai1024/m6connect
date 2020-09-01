export const items = {
  data: () => ({
    dialog: false,
    // true for create new item, false to update an item info
    dialogMode: true,
    dataPeople: [
      { name: 'Name 1', email: 'name1@gmail.com', phone: '987362367'},
      { name: 'Name 2', email: 'name2@gmail.com', phone: ''},
      { name: 'Name 3', email: 'name3@gmail.com', phone: '999555415'}
    ],
    items: [],
    nameRules: [
      v => !!v || 'Name is required',
    ],
    tagRules: [
      v => v !== null || 'Tag is required',
      v => (v && v.length !== 0) || 'Tag is required'
    ],
  }),
  computed: {
    titleDialog() {
      return !this.dialogMode ? 'Update ' + this.itemsName + ' info' : 'Create ' + this.itemsName
    },
    titleAction() {
      return !this.dialogMode ? 'Update' : 'Save'
    }
  },
  methods: {
    clickAction() {
      this.dialogMode ? this.saveItem() : this.updateItem()
    },
    saveItem() {
      if(this.infoValid) {
        let id = parseInt(Date.now() * Math.random())
        let newItem = {}
        let info = [newItem,this.itemInfo];
        newItem = Object.assign(...info);
        newItem.id = id
        this.items.push(newItem)
        this.closeDialog()
      }
    },
    updateItem() {
      if(this.infoValid) {
        this.items.forEach((item) => {
        if(item.id == this.itemInfo.id) {
            let info = [item,this.itemInfo];
            item = Object.assign(...info);
        }
        });
        this.$refs.formItem.reset()
        this.dialog = false
      }
    },
    customFilter (item, queryText) {
      const textOne = item.name.toLowerCase()
      const searchText = queryText.toLowerCase()
      return textOne.indexOf(searchText) > -1
    },
    showUpdateDialog(data) {
      let info = [this.itemInfo,data];
      this.itemInfo = Object.assign(...info);
      this.dialog = true
      this.dialogMode = false
    },
    deleteItem() {
      let indexDeletedItem = this.items.findIndex((element) => element.id == this.itemInfo.id)
      this.items.splice(indexDeletedItem, 1);
      this.closeDialog()
    },
    closeDialog() {
      this.$refs.formItem.reset()
      this.dialog = false
    }
  }
};