<template>
	<view>
		<view class="uni-btn-v uni- uni-common-mt">
			<button type="primary" class="page-body-button" v-for="(value,key) in providerList" @click="tologin(value)" :key="key">{{value.name}}</button>
		</view>
	</view>
</template>
<script>
	const tools = require('../../common/tools.js');
	export default {
		data() {
			return {
				providerList: []
			}
		},
		onLoad() {
			uni.getProvider({
				service: 'oauth',
				success: (result) => {
					this.providerList = result.provider.map((value) => {
						let providerName = '';
						switch (value) {
							case 'weixin':
								providerName = '微信登录'
								break;
							case 'qq':
								providerName = 'QQ登录'
								break;
							case 'sinaweibo':
								providerName = '新浪微博登录'
								break;
							case 'xiaomi':
								providerName = '小米登录'
								break;
							case 'alipay':
								providerName = '支付宝登录'
								break;
							case 'baidu':
								providerName = '百度登录'
								break;
							case 'toutiao':
								providerName = '头条登录'
								break;
						}
						return {
							name: providerName,
							id: value
						}
					});

				},
				fail: (error) => {
					console.log('获取登录通道失败', error);
				}
			});
		},
		methods: {
			tologin(provider) {
				console.log(provider)
				uni.login({
					provider: provider.id,
					// #ifdef MP-ALIPAY
					scopes: 'auth_user', //支付宝小程序需设置授权类型
					// #endif
					success: (res) => {
						console.log('login success:', res);
						uni.getUserInfo({
							provider: provider.id,
							success: function(infoRes) {
								console.log(infoRes);
								uni.setStorageSync('nickName', infoRes.userInfo.nickName);
								uni.setStorageSync('avatarUrl',infoRes.userInfo.avatarUrl);
							}
						});

						let params = {
							code: res.code
						}
						tools.request("/api/login/authLogin.json", params).then(function(data) {
							console.log(data)
							console.log(data.sessionId)
							// data.sessionId
							
							uni.setStorageSync('sessionId', data.sessionId);
							uni.showToast({
								title: '登录成功',
								icon: 'none'
							})

							uni.navigateTo({
								url: "/pages/bindPhone/bindPhone"
							})
						})
					},
					fail: (err) => {
						console.log('login fail:', err);
					}
				});
			}
		}
	}
</script>

<style>
	button {
		background-color: #007aff;
		color: #ffffff;
	}
</style>
