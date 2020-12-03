import { Toast } from 'vant'
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
      redirect: '/bind',
      meta: {
        index: 1,
      }
    },
    {
      path: '/bind',
      name: 'bind',
      component: Bind,
      meta: {
        index: 1,
        title: '账号绑定'
      }
    },
    {
      path: '/bindSuccess',
      name: 'bindSuccess',
      component: BindSuccess,
      meta: {
        index: 1,
        title: '绑定成功'
      }
    },
    {
      path: '/bindNotConfirm',
      name: 'bindNotConfirm',
      component: BindNotConfirm,
      meta: {
        index: 1,
        title:'还未确认'
      }
    },
    {
      path: '/waitGameCheck',
      name: 'waitGameCheck',
      component: WaitGameCheck,
      meta: {
        index: 1,
        title: '等待去确认'
      }
    },
    {
      path: '/error',
      name: 'error',
      component: ErrorComponent,
      meta: {
        index: 100,
        title: '发生错误'
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


const HandleMetaIndex = {
  undefined: {
    handle(to, from ,next) {
      next();
      return null;
    }
  },
  1: {
    handle(to, form, next) {
      console.log(store.state);
      console.log('init')
      console.log('openId',store.state.openId);
      console.log('sign',store.state.openId);
      console.log('query openid',to.query.openid );
      console.log('query sign', to.query.sign);
      if(Boolean(!store.state.openId) && Boolean(!store.state.sign) && Boolean(to.query.openid) && Boolean(to.query.sign)) {
        let queryObj = to.query;
        store.commit('setOpenId', queryObj.openid);
        store.commit('sign', queryObj.sign);
        if(process.env.NODE_ENV == 'development') {
          store.commit('setOpenId', 'o-b5Hwa78WpJu_9jseYmDhtZeZu0');
        } 
      } else {
        Toast(`缺少openid或者sign`);
        next('/error');
        return null;
      }
      return true;
    } 
  },
  100: {
    handle(to, from , next) {
      next();
      return null;
    }
  }
}

router.beforeEach((to, from, next) => {
    console.log('路由to：',to);
    console.log('路由from', from);
    console.log('store', store);
    // 改变title
    if (to.meta.title) {
      document.title = to.meta.title;
    }
    let isNext;
    isNext = HandleMetaIndex[to.meta.index].handle.call(this, to, from, next);
    if(!isNext) {
      return null;
    }
    // 拼合openid
    if(!to.query.openid) {
      if(store.state.openId) to.query.openid = store.state.openId;
    }

    if(!to.query.sign) {
      if(store.state.sign) to.query.sign = store.state.sign;
    }

    console.log('store.state.BindStatus', store.state.bindStatus);

    HandleBindStatus[store.state.bindStatus].handle.call(this, to, from, next);
})


export default router;