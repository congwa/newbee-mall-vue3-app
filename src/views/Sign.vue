<!--
 * @Description:签到
 * @Date: 2020-12-09 14:36:41
 * @LastEditTime: 2020-12-10 22:00:40
 * @FilePath: /giftBag/src/views/Sign.vue
-->
<template>
    <div>
			<div class="bg">
				<div class="title">
					<img src="@/assets/icon.png">
				</div>
				<div class="desc">
					<!-- 《守望黎明》微信签到活动 -->
				</div>
				<div class='price'>
					<!-- <p>累计签到可点亮英雄</p>
					<p>获得<span>超值奖励</span></p> -->
				</div>
				<div class="info">
					<div class="wx-title" :class="!headimgurl? 'wx-title-default': ''">
						<img v-if="headimgurl" :src="headimgurl">
					</div>
					<!-- <div class="wx-title">
						<img  src="@/assets/icon.png">
					</div> -->
					<div class="btns">
						<van-popover theme="dark" v-model:show="showPopover" placement="top">
							<div>{{nickname}}</div>
							<template #reference>
									<div class="btn-wx-name">{{nickname}}</div>
							</template>
						</van-popover>
						<div class="btn-rule" @click="onRule">活动规则</div>
						<div class="current-sign">本月签到:{{count}}天</div>
						<div class="btn-history" @click="onHistory">获奖记录</div>
					</div>

					<div class="btn-sign-content" :class="is_signin? 'btn-sign-content-finish': ''">
						<div class="btn-sign" @click="onSignIn">
							<p>我要</p>
							<p>签到</p>
						</div>
					</div>
				</div>
				

				<div class="box">
						<div class="box-one" :class="`box-sign${index}`" v-for="(day, index) in Days" :key="day.count">
							<div class="top">
								<img :src="count>= day.count? `${publicPath}/${day.url.sign}` : `${publicPath}/${day.url.noSign}`">
							</div>
							<div class="integral">
								{{day.giftText}}
							</div>
						</div>
				</div>
			</div>


					<van-overlay :show="ruleDialog" @click="onRule">
						<div class="wrapper" @click.stop>
							<div class="block ruleDialog-content">
								<div class="dialog-close" @click="onRule"></div>
								<div class="rule-content">
									<div>1.每日签到可积攒天数,达到指定天数可点亮英雄,获得英雄的馈赠。</div>
									<div>2.活动期间，每个微信账号需授权且绑定游戏账号后才可签到，每日仅可签到1次。</div>
									<div>3.各档位奖励单游戏账号每月仅可获得一次（奖励将以邮件形式发放，可在获奖记录查看明细）。</div>
									<div>4.本活动以累计签到形式进行，每月1日凌晨5:00对上月点亮的英雄、累计签到天数进行清零重计。</div>
								</div>
							</div>
						</div>
					</van-overlay>
					<van-overlay :show="historyDialog" @click="onHistory">
						<div class="wrapper">
							<div class="block historyDialog-content" @click.stop>
								<div class="dialog-close" @click="onHistory"></div>
								<div class="history-content">
									<div class="table-title">
										<div>物品名称</div>
										<div>物品内容</div>
										<div>获得时间</div>
									</div>
									<div v-show="historyData.length" class="table-body" v-for="item in historyData" :key="item.time">
										<div>{{item.name}}</div>
										<div>{{item.reward}}</div>
										<div class="history-date">{{item.time}}</div>
									</div>
									<div v-show="!historyData.length" class="table-body">暂无数据</div>
								</div>
							</div>
						</div>
					</van-overlay>
			
	</div>
</template>


<script>
import { reactive, onMounted, toRefs } from 'vue';
import { useStore } from 'vuex';
import { Toast, Dialog } from 'vant';
import { sign } from '@/service/user';

const publicPath =  process.env.BASE_URL;
const Days = [
	{
		url: {
			sign: 'static/1-day.png',
			noSign: 'static/1-day-no.png'
		},
		count: 1,
		giftText: '高级招募券*1'
	},
	{
		url: {
			sign: 'static/4-day.png',
			noSign: 'static/4-day-no.png'
		},
		count: 4,
		giftText: '超级招募券*1'

	},
	{
		url: {
			sign: 'static/7-day.png',
			noSign: 'static/7-day-no.png'
		},
		count: 7,
		giftText: '钻石*500'
	},
	{
		url: {
			sign: 'static/10-day.png',
			noSign: 'static/10-day-no.png'
		},
		count: 10,
		giftText: '超级招募券*1'
	},
	{
		url: {
			sign: 'static/13-day.png',
			noSign: 'static/13-day-no.png'
		},
		count: 13,
		giftText: '高级招募券*2'
	},
	{
		url: {
			sign: 'static/17-day.png',
			noSign: 'static/17-day-no.png'
		},
		count: 17,
		giftText: 'VIP徽章*100'
	},
	{
		url: {
			sign: 'static/21-day.png',
			noSign: 'static/21-day-no.png'
		},
		count: 21,
		giftText: '钻石*1000'
	},
		{
		url: {
			sign: 'static/26-day.png',
			noSign: 'static/26-day-no.png'
		},
		count: 26,
		giftText: '超级招募券*3'
	},
]

export default {
  name: 'sign',
  setup() {
		const state = reactive({
			count: 0, // 累计签到次数
			is_signin: false, // 今日是否签到
			headimgurl: '',   // 头像url
			ruleDialog: false, // 格则弹窗
			historyDialog: false, // 获奖记录弹窗
			gameName: '',
			Days,
			publicPath,
			historyData: [],
			nickname: '',
			showPopover: false
		})
		const store = useStore();
    onMounted(async () => {
			console.log('onMounted');
			const t = Toast.loading({
				duration: 0,
				forbidClick: true,
				message: '登陆验证中',
			});
			try {
				const loginResult = await sign({
					openid: store.state.openId,
					sign: store.state.sign,
					type: 'login'
				}).catch((error) => {
					if(error && error.msg) Dialog({ message: error.msg });
				})
				t.close();
				if(loginResult) {
					store.commit('gameName', loginResult.name);
					// store.commit('setOpenId', loginResult.openid);
					store.commit('roleId', loginResult.sid);
					state.count = loginResult.count;
					state.is_signin = loginResult.is_signin;
					state.headimgurl = loginResult.headimgurl;
					state.gameName = loginResult.name;
					state.nickname = loginResult.nickname;
				}
			} catch (error) {
				t.close();
			}
		
		})


		const getHistory = async () => {
				const t = Toast.loading({
					duration: 0,
					forbidClick: true,
					message: '获取中',
				});
			try {
				
				const historyData = await sign({
					openid: store.state.openId,
					sign: store.state.sign,
					type: 'getRewardRecord'
				}).catch((error) => {
					t.close();
					if(error && error.msg) Dialog({ message: error.msg });
				})
				t.close();
				console.log(historyData);
				if (historyData) {
						console.log(historyData);
						state.historyData = historyData;
				}	
			} catch (error) {
				t.close();
				if(error && error.msg) Dialog({ message: error.msg });
			}
		}


		const onSignIn = async () => {
			if(state.is_signin) {
				// 已经签到过不可再签到了
				return;
			}
			const t = Toast.loading({
				duration: 0,
				forbidClick: true,
				message: '签到中',
			});
			try {
				const signResult = await sign(
					{
						openid: store.state.openId,
						sign: store.state.sign,
						type: 'signin'
					}
				).catch((error) => {
					t.close();
					if (error && error.msg) {
							Dialog({ message: error.msg });
					}else {
							Dialog({ message: '发生错误，请稍后再试' });
					}
				})
				t.close();
				if (signResult) {
					state.count = signResult.count;
					state.is_signin = true;
				}
			} catch (error) {
					t.close();
			}
		}

		function useDialog() {
			const onRule = () => {
				console.log(!state.ruleDialog);
				state.ruleDialog = !state.ruleDialog;
			}
			const onHistory = () => {
				state.historyDialog = !state.historyDialog;
				if (state.historyDialog) {
						getHistory();
				}
			}
			return {onRule, onHistory};
		}

		const {onRule, onHistory} = useDialog();
		return {
			...toRefs(state),
			onSignIn,
			onRule,
			onHistory
		}
  },
}
</script>

<style lang="less" scoped >
	@import '../common/style/mixin';
	/deep/ .van-popover__wrapper {
		font-size: 0 !important;
	}
	div,p,span {
		color: #f0f0f0;
		font-weight: bold;
		font-size: 15px;
	}
	.wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
	
	.ruleDialog-content {
		@wid: 761px;
		@hei: 467px;
		width: @wid/2;
		height: @hei/2;
		position: relative;
		background-image: url('~@/assets/rule.png');
		background-size: 100% 100%;
		.rule-content {
			margin-top: 80px;
			padding: 0 25px;
			font-size: 10px;
			& >div {
				font-size: 10px;
			}
		}
	}

	.historyDialog-content {
		position: relative;
		background-image: url('~@/assets/history.png');
		background-size: 100% 100%;
		@wid: 788px;
		@hei: 949px;
		width: @wid/2;
		height: @hei/2;
		.history-content {
			margin-top: 80px;
			padding: 0 35px 0 45px;
			.table-title {
				border-top: 2px solid #42413a;
				display: flex;
				justify-content: center;
				align-items: center;
				text-align: center;
				box-sizing: border-box;
				& > div {
					display: flex;
					justify-content: center;
					align-items: center;
					width: 100px;
					height: 23px;
					box-sizing: border-box;
					margin-top: -1px;
					font-size: 13px;
					font-weight: bold;
					font-stretch: normal;
					letter-spacing: 0px;
					color: #443934;
					display: flex;
					&:not(:last-of-type){
						border-right: 2px solid #42413a;
					}
				}
			}
			.table-body {
				color: #443934;
				border-top: 2px solid #42413a;
				display: flex;
				justify-content: center;
				align-items: center;
				text-align: center;
				box-sizing: border-box;
				.history-date {
					letter-spacing: -1px;
				}
				& > div {
					display: flex;
					align-items: center;
					justify-content: center;
					width: 100px;
					height: 23px;
					margin-top: -1px;
					box-sizing: border-box;
					font-size: 13px;
					font-weight: bold;
					font-stretch: normal;
					letter-spacing: 0px;
					color: #443934;
					&:not(:last-of-type){
						border-right: 2px solid #42413a;
					}
				}
			}
		}
	}

	.dialog-close {
		position: absolute;
		top: 0;
		right: 0;
		width: 30px;
		height: 30px;
	}

	.bg {
		background-image: url('~@/assets/background.jpg');
		background-size: 100% 100%;
		background-repeat: no-repeat;
		width: 100%;
		height: 1565px;
		overflow: hidden;
		position: relative;
		
	}
	.title {
		margin-top: 43px;
		text-align: center;
		// .wh(69px, 69px);
		img {
			.wh(69px, 69px);
		}
	}

	.desc {
		background-image: url('~@/assets/shouwang.png');
		background-size: 100% 100%;
		background-repeat: no-repeat;
		margin:0 auto;
		width: 266px;
		height: 49px;
		text-align: center;
		line-height: 49px;
		margin-bottom: 16px;
	}

	.price {
		text-align: center;
		margin: 0 auto;
		margin-bottom: 21px;
		background-image: url('~@/assets/award.png');
		background-size: 100% 100%;
		background-repeat: no-repeat;
		width: 183px;
		height: 51px;
	}
	
	.info {
		margin:0 auto;
		width: 350px;
		height: 77px;
		padding: 9px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		box-sizing: border-box;
		margin-bottom: 24px;
		
		.wx-title {
			background-image: url('~@/assets/weixin.png');
			background-size: 100% 100%;
			background-repeat: no-repeat;
			.wh(52px, 52px);
			padding:2px;
			box-sizing: border-box;
			img {
				.wh(50px, 50px);
			}
		}
		.wx-title-default {
			width: 52px;
			.wh(52px, 52px);
			background-image: url('~@/assets/icon.png');
			background-size: 100% 100%;
		}
		.btns {
			flex: 1;
			display: flex;
			justify-content: space-between;
			align-items: center;
			flex-wrap: wrap;
			margin: 0 3px;
			.btn-wx-name {
				display: inline-block;
				overflow: hidden; //超出的文本隐藏
				text-overflow: ellipsis; //溢出用省略号显示
				white-space: nowrap; //溢出不换行
				
				text-align: center;
			}
			div {
				width: 92px;
				height: 26px;
				display:flex;
				align-items: center;
				justify-content: center;
				flex-wrap: nowrap;
				background-image: url('~@/assets/btn.png');
				background-size: 100% 100%;
				&:active {
						background-image: url('~@/assets/btn-active.png');
						background-size: 100% 100%;
				}
			}
			.current-sign {
				letter-spacing: -2px;
			}
		}
		.btn-sign-content {
			width: 83px;
			height: 53px;
			box-sizing: border-box;
			text-align: center;
			display: flex;
			justify-content: center;
			align-items: center;
			background-image: url('~@/assets/qiandao.png');
			background-size: 100% 100%;
			.btn-sign {
				// margin: 0 auto;
				display: inline-block;
				line-height: 1;
			}
		}
		.btn-sign-content-finish {
			background-image: url('~@/assets/qiandao-f.png');
			background-size: 100% 100%;
		}
	}

	.box {
		top: 350px;
		position: absolute;
		width: 100%;
		.text-style {
			color:  #ffb14b;
			font-size: 10px;
			text-align: center;
			background-image: url('~@/assets/integral-bg.png');
			background-size: 100% 100%;
			width: 96px;
			padding: 0 10px;
			box-sizing: border-box;
			height: 24px;
			margin: 0 auto;
			position: relative;
			display:flex;
			align-items: center;
			justify-content: center;
		}

		.box-sign0 {
			position: absolute;
			img{
				.wh(178.5px, 285.5px);
			}

			.integral {
				.text-style;
				top: -125px;
				left: 5px;
			}
		}
		.box-sign1 {
			top: 90px;
			right: 0;
			position: absolute;
			@wid: 322px;
			@hei: 425px;
			img {
				.wh(@wid/2, @hei/2);
			}

			.integral {
				.text-style;
				top: -50px;
				transform: rotate(6.75deg);
			}
		}
		.box-sign2 {
			top: 220px;
			left: 0;
			position: absolute;
			@wid: 344px;
			@hei: 470px;
			img {
				.wh(@wid/2, @hei/2);
			}
			.integral {
				.text-style;
				top: -70px;
				transform: rotate(-6.3deg);
				left: 5px;
			}
		}
		.box-sign3 {
			top: 340px;
			right: 0;
			position: absolute;
			@wid: 371px;
			@hei: 389px;
			img {
				.wh(@wid/2, @hei/2);
			}
			.integral {
				.text-style;
				top: -40px;
				left: -20px;
				transform: rotate(13.95deg);
			}
		}
		.box-sign4 {
			top: 465px;
			left: 0;
			position: absolute;
			@wid: 352px;
			@hei: 459px;
			img {
				.wh(@wid/2, @hei/2);
			}
			.integral {
				.text-style;
				top: -60px;
				transform: rotate(-4.3deg);
				left: 5px;
			}
		}
		.box-sign5{
			top: 570px;
			right: 0;
			position: absolute;
			@wid: 361px;
			@hei: 531px;
			img {
				.wh(@wid/2, @hei/2);
			}
			.integral {
				.text-style;
				top: -105px;
				transform: rotate(-1.91deg);
				
			}
		}
		.box-sign6 {
			top: 731px;
			left: 0;
			position: absolute;
			@wid: 350px;
			@hei: 594px;
			img {
				.wh(@wid/2, @hei/2);
			}
			.integral {
				.text-style;
				top: -125px;
				transform: rotate(-3.39deg);
				left: 5px;
			}
		}

		.box-sign7 {
			top: 871px;
			right: 0;
			position: absolute;
			@wid: 387px;
			@hei: 407px;
			img {
				.wh(@wid/2, @hei/2);
			}
			.integral {
				.text-style;
				top: -40px;
				transform: rotate(13.1deg);
				left: -20px;
			}
		}
	}

</style>