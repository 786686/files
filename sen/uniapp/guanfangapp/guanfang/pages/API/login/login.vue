<template>
	<view>
		<!-- <view class="uni-padding-wrap">
			<view class="uni-btn-v uni- uni-common-mt">
				<button type="primary" class="page-body-button" v-for="(value,key) in providerList" @click="tologin(value)" :key="key">{{value.name}}</button>
			</view>
		</view> -->
		<view class="uni-btn-v uni- uni-common-mt">
			<button type="primary" class="page-body-button" v-for="(value,key) in providerList" @click="tologin(value)" :key="key">{{value.name}}</button>
		</view>
	</view>
</template>
<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'

	export default {
		data() {
			return {
				title: 'login',
				providerList: []
			}
		},
		computed: {
			...mapState(['hasLogin'])
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
			...mapMutations(['login']),
			tologin(provider) {
				console.log(provider)
				uni.login({
					provider: provider.id,
                    // #ifdef MP-ALIPAY
                    scopes: 'auth_user',  //支付宝小程序需设置授权类型
                    // #endif
					success: (res) => {
						console.log('login success:', res);
						// 更新保存在 store 中的登录状态
						this.login(provider.id);
						
						uni.getUserInfo({
							provider: provider.id,
							success: function(infoRes) {
								console.log(infoRes);
								// that._data.nickNames = infoRes.userInfo.nickName;
								// that._data.avatarUrl = infoRes.userInfo.avatarUrl;
								
								uni.setStorage({
								    key: 'nickName',
								    data: infoRes.userInfo.nickName,
								    success: function () {
										
								    }
								});
								uni.setStorage({
								    key: 'avatarUrl',
								    data: infoRes.userInfo.avatarUrl,
								    success: function () {
										
								    }
								});
								
								
								uni.switchTab({
									url: '/pages/tabBar/component/component',
								})
							}
						});
						
						// uni.navigateTo({
						//     url: '/pages/about/about'
						// });
						uni.switchTab({
							url: '/pages/tabBar/component/component',
						
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
