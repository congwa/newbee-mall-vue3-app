<!--
 * @Description: 未进入游戏绑定
 * @Date: 2020-12-01 19:11:52
 * @LastEditTime: 2020-12-02 15:36:47
 * @FilePath: /giftBag/src/views/BindNotConfirm.vue
-->

<template>
    <div>
        <div style="text-align:center; padding:20px 40px;">
            <div >
                <i class="weui-icon-warn weui-icon_msg-primary"></i>
            </div>
            <div class="tips-center">等待游戏验证</div>
            <div class="tips-desc">账号ID：“{{roleId}}”，请进入游戏确认</div>
            <div>
                <a @click="enter" href="javascript:" class="weui-btn weui-btn_primary">进入游戏</a>
                <a v-if="!loading" href="javascript:" class="weui-btn weui-btn_disabled weui-btn_default">解除绑定</a>
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

export default {
  name: 'bindNotConfirm',
  components: { Winxin},
  setup() {
    const state = reactive({
      roleId: '', // 游戏角色id
      loading: false
    })
    const store = useStore();
    const mapState = store.state;
    const router = useRouter();
    const weixinRef = ref(null);


    onMounted(async () => {
        state.roleId = mapState.roleId; 
    })

    const enter = async () => {
        weixinRef.value.showWinClick();
    }

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