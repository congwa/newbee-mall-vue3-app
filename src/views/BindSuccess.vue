<!--
 * @Description: 绑定成功
 * @Date: 2020-12-01 19:10:58
 * @LastEditTime: 2020-12-02 12:23:33
 * @FilePath: /giftBag/src/views/BindSuccess.vue
-->


<template>
<div>
  <div style="text-align:center; padding:20px 40px;">>
      <div>
          <i class="weui-icon-success weui-icon_msg"></i>
      </div>
      <div class="tips-center">{{roleId}} 已经绑定成功</div>
      <div>
        <a v-if="!loading" @click="unbind" href="javascript:" class="weui-btn weui-btn_primary">解绑</a>
        <a v-else href="javascript:" class="weui-btn weui-btn_primary weui-btn_loading"><span class="weui-primary-loading weui-primary-loading_transparent"><i class="weui-primary-loading__dot"></i></span>解绑</a>
      </div>
  </div>
</div>
  
</template>

<script>
import { reactive, onMounted, toRefs } from 'vue'
import { useStore } from 'vuex';
import { bind } from '@/service/user';
import { useRouter} from 'vue-router';
export default {
  name: 'bindSuccess',
  setup() {
    const state = reactive({
      roleId: '', // 游戏角色id
      loading: false
    })
    const store = useStore();
    const mapState = store.state;
    const router = useRouter();
    onMounted(async () => {
        state.roleId = mapState.roleId; 
    })

    const unbind = async () => {
        this.loading = true;
        const data = await bind({
          type: 'unbind',
          openid: mapState.openId
        });
        this.loading = false;
        if (data) {
          router.push('/bind');
        }
    }

    return {
      ...toRefs(state),
      unbind
    }
  },
}
</script>

<style lang="less" scoped >
.weui-icon-success  {
  width: 120px;
  height: 120px;
}
.tips-center {
    font-size: 30px;
    font-weight: bold;
    margin: 5px;
}

</style>