<!--
 * @Description: 错误
 * @Date: 2020-12-01 20:41:02
 * @LastEditTime: 2020-12-02 12:24:27
 * @FilePath: /giftBag/src/views/Error.vue
-->

<template>
    <div>
         <div style="text-align:center; padding:20px 40px;">
            <div>
                <i class="weui-icon-warn weui-icon_msg"></i>
            </div>
            <div class="tips-center">发生错误，请稍后再试</div>
        </div>
    </div>
 
</template>

<script>
export default {
  name: 'error',
  setup() {
    
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

</style>