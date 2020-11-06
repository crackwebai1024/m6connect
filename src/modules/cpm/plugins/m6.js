import Vue from 'vue'
import m6CardDialog from '@/modules/cpm/_partials/M6CardDialog'
import m6DataTable from '@/modules/cpm/_partials/M6DataTable'
import m6ConfirmDelete from '@/modules/cpm/_partials/M6ConfirmDelete.vue'
Vue.component(m6DataTable.name, m6DataTable)
Vue.component(m6CardDialog.name, m6CardDialog)
Vue.component(m6ConfirmDelete.name, m6ConfirmDelete)
