<template>
    <div class="height-width-100 left-background text-xs-center">
        <div class="pt-5 d-flex justify-center" >
            <span class="display-1 white--text" >
              {{  $t('leftSideScreen.title') }}
              </span>
        </div>
        <div class="d-flex justify-center" >
            <span class="body-2 white--text" >
              {{  $t('leftSideScreen.subtitle') }}
            </span>
        </div>
        <div class="d-flex justify-center" >
          <plan-organize-icon class="size" />
        </div>  
    </div>
</template>

<script>
import PlanOrganizeIcon from '@/assets/svgs/PlanOrganizeIcon'

export default {
  components: {
    PlanOrganizeIcon
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