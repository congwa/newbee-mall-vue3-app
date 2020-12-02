<!--
 * @Description: 绑定还差一步
 * @Date: 2020-12-01 19:12:27
 * @LastEditTime: 2020-12-02 15:40:11
 * @FilePath: /giftBag/src/views/WaitGameCheck.vue
-->



<template>
    <div>
        <div style="text-align:center; padding:20px 40px;">
            <div>
                <i class="weui-icon-success weui-icon_msg"></i>
            </div>
            <div class="tips-center">还差一步</div>
            <div class="tips-desc">已经向游戏角色名为“{{roleId}}”发送绑定确认通知，请进入游戏确认</div>
            <div>
                <a @click="enter" href="javascript:" class="weui-btn weui-btn_primary">进入游戏</a>
            </div>
        </div>
        <Winxin ref="weixinRef" />
    </div>
</template>

<script>
import { reactive, onMounted, toRefs, ref } from 'vue'
import { useStore } from 'vuex';
import Winxin from '@/components/Weixin.vue';
export default {
  name: 'waitGameCheck',
  components: {Winxin},
  setup() {
    const state = reactive({
      roleId: '', // 游戏角色id
      loading: false
    })
    const weixinRef = ref(null);
    const store = useStore();
    const mapState = store.state;
    onMounted(async () => {
        state.roleId = mapState.roleId; 
    })

    const enter = async () => {
        weixinRef.value.showWinClick();
    }

    return {
      ...toRefs(state),
      weixinRef,
      enter
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

.tips-desc {
   margin: 15px;
}
</style>