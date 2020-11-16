import Vue from 'vue'
import format from 'date-fns/format'
Vue.filter('formatPhoneNumber', function (phoneNumberString) {
  const cleaned = ('' + phoneNumberString).replace(/\D/g, '')
  const match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/)

  if (match) {
    const intlCode = match[1] ? '+1 ' : ''

    return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('')
  }
  return phoneNumberString
})
Vue.filter('normalizeDate', (date, formatType = 'yyyy-MM-dd') =>
  format(date, formatType)
)
Vue.filter('monthDayYear', (date, formatType = 'MM/dd/yyyy') =>
  format(date, formatType)
)
Vue.filter('phone', (phone = '') =>
  phone.replace(/[^0-9]/g, '').replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3')
)
Vue.filter('currency', num => {
  num = Number.isNaN(parseFloat(num)) ? 0 : num

  return parseFloat(num).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD'
  })
})