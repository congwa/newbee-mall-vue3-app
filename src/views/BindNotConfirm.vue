<!--
 * @Description: 未进入游戏绑定
 * @Date: 2020-12-01 19:11:52
 * @LastEditTime: 2020-12-04 11:57:14
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
                <a @click="enter" href="javascript:" class="weui-btn weui-btn_primary">进入游戏</a>
                <a v-if="!loading" @click="unbind" href="javascript:" class="weui-btn weui-btn_disabled weui-btn_default">解除绑定</a>
                <a v-else href="javascript:" class="weui-btn weui-btn_default weui-btn_loading"><span class="weui-primary-loading"><i class="weui-primary-loading__dot"></i></span>解除绑定</a>
            </div>
        </div>
        <Winxin ref="weixinRef"> </Winxin>
    </div>
</template>

<script>
import { reactive, onMounted, toRefs, ref } from 'vue'
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import {bind} from '@/service/user.js';
import Winxin from '@/components/Weixin.vue';
import { BindStatus } from '@/common/js/status.js';

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
      enter,
      unbind,
      weixinRef
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
</style>