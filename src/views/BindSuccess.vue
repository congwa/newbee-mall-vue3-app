<!--
 * @Description: 绑定成功
 * @Date: 2020-12-01 19:10:58
 * @LastEditTime: 2020-12-07 20:41:49
 * @FilePath: /giftBag/src/views/BindSuccess.vue
-->


<template>
<div>
  <div style="text-align:center; padding:20px 40px;">
      <div>
          <i class="weui-icon-success weui-icon_msg"></i>
      </div>
      <div class="tips-center">{{gameName}} <br />已经绑定成功</div>
      <div>
        <van-button type="danger" size="large" class="btn" @click="unbind" :disabled="loading">解除绑定</van-button>
      </div>

      <div style="color: red; margin-top:20px;">{{tips}}</div>
  </div>
</div>
  
</template>

<script>
import { reactive, onMounted, toRefs } from 'vue'
import { useStore } from 'vuex';
import { bind } from '@/service/user';
import { useRouter} from 'vue-router';
import { BindStatus } from '@/common/js/status.js';
import { Dialog } from 'vant';
import { Toast } from 'vant';
export default {
  name: 'bindSuccess',
  setup() {
    const state = reactive({
      roleId: '', // 游戏角色id
      gameName: '',
      loading: false,
      tips: null
    })
    const store = useStore();
    const mapState = store.state;
    const router = useRouter();
    onMounted(async () => {
        state.roleId = mapState.roleId; 
        state.gameName = mapState.gameName;
        confirm();
    })

    const confirm = async () => {
      state.loading = true;
      const t = Toast.loading({
          message: '加载中...',
          forbidClick: true,
          duration: 0
      });
      const data = await bind({
        type: 'getExpire',
         openid: mapState.openId
      }).catch((data) => {
        t.close();
        state.tips = data.msg;
      })
      t.close();
      if (data) {
        state.loading = false;
      }
    }

    const unbind = async () => {
        state.loading = true;
        const data = await bind({
          type: 'unbind',
          openid: mapState.openId
        }).catch((data) => {
          Dialog.confirm({
            title: '',
            message: `${data.msg}`,
          });
        });
        state.loading = false;
        if (data) {
          store.commit('bindStatus',BindStatus.No);
          router.push('/bind');
          Toast.loading({
            message: '解绑成功',
          })
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