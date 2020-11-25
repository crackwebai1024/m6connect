<template>
    <div class="height-width-100 left-background text-xs-center">
        <div class="pt-5 d-flex justify-center" >
            <span class="display-1 white--text" >
              {{ $h.dg(currentCompany, 'name', '') || $t('leftSideScreen.title') }}
              </span>
        </div>
        <div class="d-flex justify-center" >
            <span class="body-2 white--text" >
              {{  $t('leftSideScreen.subtitle') }}
            </span>
        </div>
        <div class="d-flex justify-center" >
          <img 
            v-if="$h.dg(currentCompany, 'logo', '').length" 
            class="size mt-5" 
            :src="$h.dg(currentCompany, 'logo', '')" 
            alt="Company Logo"
          >

          <plan-organize-icon v-else class="size" />
        </div>  
    </div>
</template>

<script>
import PlanOrganizeIcon from '@/assets/svgs/PlanOrganizeIcon'
import { mapState } from 'vuex'

export default {
  components: {
    PlanOrganizeIcon
  },

  computed: {
    ...mapState('Companies', {
      companiesList: 'list',
    })
  },

  data: () => ({
    currentCompany: {}
  }),

  watch: {
    companiesList(val) {
      const selectedCompany = val.find( v => v.id === process.env.VUE_APP_CURRENT_COMPANY_ID )

      if( selectedCompany ) this.currentCompany = { ...selectedCompany }
    }
  },
}
</script>

<style lang="scss" scoped >
.height-width-100 {
  height: 100%;
  width: 100%;
}

.left-background {
  background-color: #04314e;
}

.size {
  width: 70%;
  height: auto;
}

.left-img {
  height: 35rem; 
  width: auto;
}
</style>