<template>
	<view>
		<navigator url="/pages/index/index">跳过，直接进入首页</navigator>
		<view class="" style="display: flex;">
			<input type="text" v-model="phone">
			<button type="default" @click="getCode">获取手机验证码</button>
		</view>
		<view>
			<input type="text" placeholder="请输入验证码" v-model="code">
		</view>
		<button type="primary" @click="submit">提交</button>


	</view>
</template>

<script>
	const tools = require('../../common/tools.js');
	export default {
		data() {
			return {
				phone: ""
			}
		},
		mounted() {
			console.log(uni.getStorageSync("sessionId"))
			var a = uni.getStorageSync('sessionId');
			console.log(a)
		},

		methods: {
			getCode() {
				if (this.phone.trim().length == 0) {
					uni.showToast({
						title: '请输入手机号',
						icon: 'none'
					})
					return;
				}

				let params = {
					sessionId: uni.getStorageSync("sessionId"),
					phone: this.phone
				};
				tools.request("/api/login/getBindingCode.json", params).then(function(data) {
					console.log(data)
					uni.showToast({
						title: '已发送手机验证码',
						icon: 'none'
					})
				})
			},
			submit() {

				if (this.code.trim().length == 0) {
					uni.showToast({
						title: '请输入验证码',
						icon: 'none'
					})
					return;
				}

				if (this.phone.trim().length == 0) {
					uni.showToast({
						title: '请输入手机号',
						icon: 'none'
					})
					return;
				}

				let params = {
					sessionId: uni.getStorageSync("sessionId"),
					phone: this.phone,
					code: this.code
				};
				tools.request("/api/login/bindingPhone.json", params).then(function(data) {
					console.log(data)
					uni.navigateTo({
						url: "/pages/index/index"
					})
				})
			}
		}
	}
</script>

<style>
	page {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		background-color: #efeff4
	}

	view {
		font-size: 28upx;
		line-height: inherit
	}

	.example {
		padding: 0 30upx 30upx
	}

	.example-title {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 32upx;
		color: #464e52;
		padding: 30upx;
		margin-top: 20upx;
		position: relative;
		background-color: #fdfdfd
	}

	.example-title__after {
		position: relative;
		color: #031e3c
	}

	.example-title:after {
		content: '';
		position: absolute;
		left: 0;
		margin: auto;
		top: 0;
		bottom: 0;
		width: 10upx;
		height: 40upx;
		border-top-right-radius: 10upx;
		border-bottom-right-radius: 10upx;
		background-color: #031e3c
	}

	.example .example-title {
		margin: 40upx 0
	}

	.example-body {
		border-top: 1px #f5f5f5 solid;
		padding: 30upx;
		background: #fff
	}

	.example-info {
		padding: 30upx;
		color: #3b4144;
		background: #fff
	}

	.example-body {
		padding: 30upx 0;
	}

	.example-box {
		margin-bottom: 30upx;
	}

	.example-box:last-child {
		margin-bottom: 0;
	}

	.image-box {
		width: 100%;
		height: 350upx;
		overflow: hidden;
	}

	.image-box .image {
		width: 100%;
		height: 100%;
	}

	.content-box {
		padding-top: 20upx;
	}

	.footer-box {
		display: flex;
		justify-content: space-between;
		width: 100%;

	}

	.footer-box__item {
		width: 100%;
		display: flex;
		align-items: center;
	}

	.footer-box__item:nth-child(2) {
		justify-content: center;
	}

	.footer-box__item:last-child {
		justify-content: flex-end;
	}
</style>
