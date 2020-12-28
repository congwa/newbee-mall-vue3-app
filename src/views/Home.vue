

<template>
  <div>
    init
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
export default {
  name: 'home',
  setup() {
    const router = useRouter()
    const state = reactive({

    })

    return {
      ...toRefs(state),
    }
  },
}
</script>

<style lang="less" scoped >
 
</style>