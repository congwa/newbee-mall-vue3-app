<!--
 * @Description: 绑定成功
 * @Date: 2020-12-01 19:10:58
 * @LastEditTime: 2020-12-04 21:44:25
 * @FilePath: /giftBag/src/views/BindSuccess.vue
-->


<template>
<div>
  <div style="text-align:center; padding:20px 40px;">>
      <div>
          <i class="weui-icon-success weui-icon_msg"></i>
      </div>
      <div class="tips-center">{{gameName}} 已经绑定成功</div>
      <div>
        <van-button type="danger" class="btn" @click="unbind" :disabled="loading">重新绑定</van-button>
      </div>
  </div>
</div>
  
</template>

<script>
import { reactive, onMounted, toRefs } from 'vue'
import { useStore } from 'vuex';
import { bind } from '@/service/user';
import { useRouter} from 'vue-router';
import { BindStatus } from '@/common/js/status.js';
export default {
  name: 'bindSuccess',
  setup() {
    const state = reactive({
      roleId: '', // 游戏角色id
      gameName: '',
      loading: false
    })
    const store = useStore();
    const mapState = store.state;
    const router = useRouter();
    onMounted(async () => {
        state.roleId = mapState.roleId; 
        state.gameName = mapState.gameName;
    })

    const unbind = async () => {
        state.loading = true;
        const data = await bind({
          type: 'unbind',
          openid: mapState.openId
        });
        state.loading = false;
        if (data) {
          store.commit('bindStatus',BindStatus.No);
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

.btn {
  width: 185px;
  margin-left: 55px;
  margin-top: 20px;
  
}
</style>