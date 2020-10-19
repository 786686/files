let server = require('./server.js');
let tools = {
	request(url,param,requestTimes,loginBool) {
		let that = this;
		requestTimes = requestTimes || 1;
		loginBool = loginBool && true;
		return new Promise(function(resolve, reject) {
			that.requestByLogin({
					url: url,
					isRes: true,
					isFormData: true,
					data: param
				},
				res => {
					resolve(res);
				},
				err => {
					reject(err);
				},
				requestTimes,loginBool
			);
		});
	},
	requestByLogin(request, callback, errCallback, requestTimes, loginBool) {
		let that = this;
		// requestTimes = requestTimes || 1;
		// loginBool = loginBool && true;
		let sessionId = uni.getStorageSync('sessionId') || '';
		if (!request.url.includes('sid')) {
			let flag = request.url.includes('?') ? '&' : '?';
			request.url = request.url
			if (loginBool) {
				request.url += `${flag}sessionId=` + sessionId;
			}
		} else {
			var lac = request.url.indexOf("sid");
			request.url = request.url.substr(0, lac + 4);
			request.url = request.url + sessionId;
		}
		if (!request.url.includes('http')) {
			request.url = `${server.domain}${request.url}`;
		}

		request.method = (request.method || 'post').toUpperCase();

		if (request.isFormData) {
			request.header = request.header || {};
			request.header['content-type'] = 'application/x-www-form-urlencoded';
		}

		uni.request({
			url: request.url,
			data: request.data,
			header: request.header,
			method: request.method,
			dataType: request.dataType,
			success: function(res) {
				if (res.data.status == 2000000) {
					let data = null;
					// request.isRes && (data = res.data);
					// !request.isRes && (data = res.data.data);
					data = res.data.data;
					callback && callback(data);
				} else if (res.data.status == -2) {
					let data = null;
					// request.isRes && (data = res.data);
					// !request.isRes && (data = res.data.data);
					data = res.data.data;
					callback && callback(data);
				} else if (res.data.status == -3) {
					if (requestTimes % 5 !== 0) {
						that.login().then(() => {
							setTimeout(function() {
								that.requestByLogin(request, callback, errCallback, requestTimes);
							}, 1000 * requestTimes++);
						});
					}
				} else if (res.data.status == 5000101) {
					if (sessionId != "") {
						uni.showToast({
							title: "用户已过期",
							icon: 'loading'
						});
					} else {
						uni.showToast({
							title: "用户未登录",
							icon: 'loading'
						});
					}
					setTimeout(function() {
						uni.navigateTo({
							url: '/pages/login/login',
						})
					}, 2000);
				} else {
					if (errCallback) {						
						uni.showToast({
							title: res.data.message,
							icon: 'loading'
						});
						errCallback(res)
					}
				}
			}
		});
	}
}

module.exports = tools;