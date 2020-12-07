<!--
 * @Description: 绑定账号页
 * @Date: 2020-12-01 16:13:24
 * @LastEditTime: 2020-12-04 21:54:50
 * @FilePath: /giftBag/src/views/Bind.vue
-->

<template>
  <div>
      <div class="title">绑定《守望黎明》游戏账号</div>
      <van-form @submit="search">
        <van-field
            v-model="roleId"
            name="游戏角色ID"
            label="游戏角色ID"
            placeholder="请输入游戏角色ID"
            :rules="[{ required: true, message: '' }]"
        />
        <div style="margin: 16px;">
            <van-button class="btn" round block type="primary" native-type="search" :disabled="loading">查询</van-button>
        </div>
        </van-form>
  </div>
</template>

<script>
import { reactive, onMounted, toRefs } from 'vue'
import { bind , bind as searchRequest} from '@/service/user';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { BindStatus } from '@/common/js/status.js';
import { Dialog } from 'vant';
export default {
  name: 'bind',
  setup() {
    // const router = useRouter()
    const state = reactive({
      roleId: '', 
      loading: false
    })
    const router = useRouter();
    const store = useStore();
    
    onMounted(async () => {

        
    })

    const search = async () => {
      try {
        state.loading = true;
        const data = await searchRequest({
          type: 'getUserInfo',
          openid: store.state.openId,
          gameid: state.roleId,
        })
         state.loading = false;
        Dialog.confirm({
          title: '确认信息',
          message: `游戏区:${data.sid}\n游戏名:${data.gamename}`,
          beforeClose,
        });
      } catch (error) {
        state.loading = false;
        if(error.msg) {
          Dialog.confirm({
            title: '',
            message: `${error.msg}`,
          });
        }
        
      }
    }

    const beforeClose = async (action, done) => {
      console.log(done);
      // eslint-disable-next-line no-undef
        try {
          if (action === 'confirm') {
             const result = await confirm(); 
             return result;
          } else {
            return true;
          }
        } catch (error) {
            return true;
        }
    };

    // 确认按钮
    const confirm = async () => {
      console.log('bind',state);
      try {
        state.loading = true;
        const data = await bind({
        type: 'bind',
          gameid: state.roleId,
          openid: store.state.openId
        });
        state.loading = false;
        console.log('bind', data);
        store.commit('bindStatus', BindStatus.NoConfirm);
        store.commit('roleId', state.roleId);
        router.push('/waitGameCheck');
        return true;
      } catch (error) {
        state.loading = false;
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
      search,
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