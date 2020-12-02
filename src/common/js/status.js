/*
 * @Description: 
 * @Date: 2020-12-01 18:01:17
 * @LastEditTime: 2020-12-02 11:41:37
 * @FilePath: /giftBag/src/common/js/status.js
 */
 // 绑定状态
export const BindStatus = {
    No: 'unbind',
    Yes: 'bind',
    NoConfirm: 'confirm'
}

export const existBindStatus = (status) => {
    if(!status) {
        return false;
    }
    return true;
}