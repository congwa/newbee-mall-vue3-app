<!--
 * @Description: 
 * @Date: 2020-12-02 14:44:29
 * @LastEditTime: 2020-12-17 12:29:25
 * @FilePath: /giftBag/src/components/Weixin.vue
-->

<template>
  <div>
    <div v-if="isWinxin" class="weixin-tip" style="position: fixed; left:0; top:0; bottom:0; background: rgba(0,0,0,0.8); filter:alpha(opacity=80);  height: 100%; width: 100%; z-index: 99999999;">
        <p style="text-align: center; margin-top: 10%; padding:0 5%;">
            <img src="http://img-10048861.file.myqcloud.com/open_565_411.png" style="width:100%;" alt="微信打开" width="100%"/>
        </p>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue';
export default {
    setup() {
        const state = reactive({
            isWinxin: false
        });

        const showWinClick = () => {
            function is_weixin() {
                var ua = navigator.userAgent.toLowerCase();
                if (ua.match(/MicroMessenger/i) == "micromessenger") {
                    return true;
                } else {
                    return false;
                }
            }
            var isWeixin = is_weixin();
            console.log('在微信中', isWeixin);
            if (isWeixin) {
                state.isWinxin = true;
            } else {
                if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {  //判断iPhone|iPad|iPod|iOS
                    // let tourl='warz://';
                    let tourl ='https://ls.im30.net';
                    location.href = tourl;
                } else if (/(Android)/i.test(navigator.userAgent)) {   //判断Android
                    // let tourl='lastwars://';
                    let tourl ='https://ls.im30.net';
                    location.href = tourl;
                } else {  //pc
                    let tourl ='https://ls.im30.net';
                    location.href = tourl;
                }
            }
            
        }

        return {
            ...toRefs(state),
            showWinClick
        }
    }
}
</script>

<style>

</style>