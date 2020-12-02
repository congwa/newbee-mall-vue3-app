import { createRouter, createWebHashHistory} from 'vue-router';
import store from '@/store';
import { BindStatus} from '../common/js/status';
import { bind } from '@/service/user';

const Bind = () => import('../views/Bind.vue');
const BindNotConfirm = () => import('../views/BindNotConfirm.vue');
const ErrorComponent = () => import('../views/Error.vue');
const BindSuccess = () => import('../views/BindSuccess.vue');
const WaitGameCheck = () => import('../views/WaitGameCheck.vue');

const router = createRouter({
  history: createWebHashHistory(), // hash模式：createWebHashHistory，history模式：createWebHistory
  routes: [
    {
      path: '/',
      redirect: '/bind'
    },
    {
      path: '/bind',
      name: 'bind',
      component: Bind,
      meta: {
        index: 1
      }
    },
    {
      path: '/bindSuccess',
      name: 'bindSuccess',
      component: BindSuccess,
      meta: {
        index: 1
      }
    },
    {
      path: '/bindNotConfirm',
      name: 'bindNotConfirm',
      component: BindNotConfirm,
      meta: {
        index: 1
      }
    },
    {
      path: '/waitGameCheck',
      name: 'waitGameCheck',
      component: WaitGameCheck,
      meta: {
        index: 1
      }
    },
    {
      path: '/error',
      name: 'error',
      component: ErrorComponent,
      meta: {
        index: 1
      }
    }
  ]
})

const HandleBindStatus = {
  '': {
    async handle(to, from ,next) {
      
        let openId = store.state.openId;
        
        const data = await bind({
         openid: openId,
         type: 'query'
        });
        console.log('openID', openId);
        console.log('query', data);
        store.commit('bindStatus', data.status);
        data.sid && store.commit('roleId', data.sid);
        data.gamename && store.commit('gameName', data.gamename);
        // 重新进行定向
        HandleBindStatus[store.state.bindStatus].handle.call(this, to, from, next);
    }
  },
  [BindStatus.No]: {
    async handle(to, from , next) {
      if(to.path === '/bind') {
        next();
      } else {
        next('/bind');
      }
    }
  }, 
  [BindStatus.Yes]: {
      async handle(to, from, next) {
          next();
      }
  },
  [BindStatus.NoConfirm]: {
    async handle(to, from, next) {
      if(to.path === '/bindNotConfirm' || to.path === '/waitGameCheck') {
        next();
      } else {
        next('/waitGameCheck');
      }
    }
  }
}

router.beforeEach((to, from, next) => {
    console.log('路由to：',to);
    console.log('路由from', from);
    console.log('store', store);
    if(!store.state.openId) {
      if(process.env.NODE_ENV == 'development') {
        store.commit('setOpenId', 'o-b5Hwa78WpJu_9jseYmDhtZeZu0');
      } else {
        let queryObj = to.$route.query;
        console.log('路由参数', queryObj);
        store.commit('setOpenId', queryObj.openid);
      }
    }
    console.log('store.state.BindStatus', store.state.bindStatus);

    HandleBindStatus[store.state.bindStatus].handle.call(this, to, from, next);
})


export default router;