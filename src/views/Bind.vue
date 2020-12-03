<!--
 * @Description: 绑定账号页
 * @Date: 2020-12-01 16:13:24
 * @LastEditTime: 2020-12-03 15:23:43
 * @FilePath: /giftBag/src/views/Bind.vue
-->

<template>
  <div>
      <div class="title">绑定《守望黎明》游戏账号</div>
      <van-form @submit="confirm">
        <van-field
            v-model="roleId"
            name="游戏角色ID"
            label="游戏角色ID"
            placeholder="请输入游戏角色ID"
            :rules="[{ required: true, message: '' }]"
        />
        <div style="margin: 16px;">
            <van-button round block type="primary" native-type="submit">提交</van-button>
        </div>
        </van-form>
  </div>
</template>

<script>
import { reactive, onMounted, toRefs } from 'vue'
import { bind } from '@/service/user';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { BindStatus } from '@/common/js/status.js';
export default {
  name: 'bind',
  setup() {
    // const router = useRouter()
    const state = reactive({
      roleId: '', 
    })
    const router = useRouter();
    const store = useStore();
    
    onMounted(async () => {

        
    })

    // 确认按钮
    const confirm = async () => {
      console.log('bind',state);
      try {
        const data = await bind({
        type: 'bind',
          gameid: state.roleId,
          openid: store.state.openid
        });
        console.log('bind', data);
        store.commit('bindStatus', BindStatus.NoConfirm);
        store.commit('roleId', state.roleId);
        router.push('/waitGameCheck');
      } catch (error) {
          if(process.env.NODE_ENV == 'development') {
            store.commit('bindStatus', BindStatus.NoConfirm);
            store.commit('roleId', state.roleId);
            router.push('/waitGameCheck');
          }
          throw new Error(error);
      }
    }

    return {
      ...toRefs(state),
      confirm,
    }
  },
}
</script>

<style lang="less" scoped >
  @import '../common/style/mixin';
  .title {
      margin-top: 50px;
      margin-bottom: 20px;
      text-align: center;
      font-size: 20px;
  }
</style>