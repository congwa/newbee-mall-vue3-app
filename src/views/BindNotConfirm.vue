<!--
 * @Description: 未进入游戏绑定
 * @Date: 2020-12-01 19:11:52
 * @LastEditTime: 2020-12-08 11:40:26
 * @FilePath: /giftBag/src/views/BindNotConfirm.vue
-->

<template>
    <div>
        <div style="text-align:center; padding:20px 40px;">
            <div >
                <i class="weui-icon-warn weui-icon_msg-primary"></i>
            </div>
            <div class="tips-center">等待游戏验证</div>
            <div class="tips-desc">角色所在服：“{{roleId}}”，角色名：“{{gameName}}”，请进入游戏确认</div>
            <div>
                <van-button class="btn" block type="success" @click="enter">进入游戏</van-button>
                <van-button type="warning" class="btn" block @click="confirmUnbind" :disabled="loading">重新绑定</van-button>
            </div>
        </div>
        <Winxin ref="weixinRef"> </Winxin>
    </div>
</template>

<script>
import { reactive, onMounted, toRefs, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import {bind} from '@/service/user.js';
import Winxin from '@/components/Weixin.vue';
import { BindStatus } from '@/common/js/status.js';
import { Dialog } from 'vant';

export default {
  name: 'bindNotConfirm',
  components: { Winxin},
  setup() {
    const state = reactive({
      roleId: '', // 游戏角色id
      loading: false,
      gameName: null
    })
    const store = useStore();
    const mapState = store.state;
    const router = useRouter();
    const weixinRef = ref(null);


    onMounted(async () => {
        state.roleId = mapState.roleId; 
        state.gameName = mapState.gameName;
    })

    const enter = async () => {
        weixinRef.value.showWinClick();
    }

     const confirmUnbind = async () => {
      Dialog.confirm({
        title: '',
        message: `您确定进行重新解绑?`,
        beforeClose,
      });
    }

    const beforeClose = async (action, done) => {
      console.log(done);
      // eslint-disable-next-line no-undef
        try {
          if (action === 'confirm') {
             await unbind();
             return true;
          } else {
            return true;
          }
        } catch (error) {
            return true;
        }
    };

    const unbind = async () => {
        state.loading = true;
        const data = await bind({
          type: 'rebind',
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
      enter,
      unbind,
      weixinRef,
      confirmUnbind
    }
  },
}
</script>

<style lang="less" scoped >
.weui-icon-warn  {
    width: 120px;
    height: 120px;
}
.tips-center {
    font-size: 30px;
    font-weight: bold;
    margin: 5px;
}

.tips-desc {
   margin: 15px;
}

.btn {
  margin-top: 20px;
}
</style>