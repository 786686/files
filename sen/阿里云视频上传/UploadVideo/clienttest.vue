<template>
  <div class="container">
    <input type="file" id="fileName">
    <!-- <img id="img" src="./bw1.jpg" alt=""> -->
   <button @click="upload()">上传</button>
  </div>
</template>
<script>
import axios from "axios";
import { uploadVideo } from "../../service";

export default {
  data() {
    return {
      client: null
    };
  },
  mounted(){
      this.getOssAuth();
  },
  methods: {
    async getOssAuth() {
      let result = await uploadVideo({});
      if (result) {
        console.log(result.data.data.Credentials.AccessKeyId)
        console.log(result.data.data.Credentials.AccessKeySecret)
        this.client = new OSS.Wrapper({
          region: "oss-cn-shenzhen", //阿里云获取
          accessKeyId: result.data.data.Credentials.AccessKeyId,
          accessKeySecret: result.data.data.Credentials.AccessKeySecret,
          stsToken: result.data.data.Credentials.SecurityToken,
          bucket: "wxchuangke" //要存储的目录名
        });
        console.log(this.client)
        console.log(this.client.accessKeyId)
        // vm.client = new OSS.Wrapper({
				// 				region: 'oss-cn-shenzhen',
				// 				accessKeyId: res.data.data.accessKeyId,
				// 				accessKeySecret: res.data.data.accessKeySecret,
				// 				bucket: "wxchuangke"
				// 			});
        console.log(result);
        // this.secretKey = result.data.data.Credentials.AccessKeySecret;
      }
    },
    upload() {
      var file = document.getElementById("fileName").files[0];
      var val = document.getElementById("fileName").value;
      // 取出文件后缀名
      var suffix = val.substr(val.indexOf("."));
      var obj = this.timestamp();
      // var storeAs = 'upload-file/' + "/" + obj + suffix;
      var storeAs = obj + suffix;
      console.log(storeAs)
      console.log(file)
      // this.client
      //   .multipartUpload(storeAs, file)
      //   .then(function(result) {
      //     var url = result.res.requestUrls[0];
      //     var length = url.lastIndexOf("?");
      //     var imgUrl = url.substr(0, length); //文件最终路径
      //     // $("#img").attr("src",url.substr(0,length))
      //     console.log(url.substr(0, length));
      //   })
      //   .catch(function(err) {
      //     console.log(err);
      //   });


        this.client.multipartUpload(storeAs, file, {

								}).then((results) => {
									console.log(results)
									if(size >= 100 * 1024) {
										resultUpload.push(results.res.requestUrls[0].split("?")[0]);
									} else {
										resultUpload.push(results.url);
									}
								}).catch((err) => {
									console.log(err);
								});
    },
    /**
     * 生成文件名
     * @returns
     */
    timestamp() {
      var time = new Date();
      var y = time.getFullYear();
      var m = time.getMonth() + 1;
      var d = time.getDate();
      var h = time.getHours();
      var mm = time.getMinutes();
      var s = time.getSeconds();
      return "" + y + this.add0(m) + this.add0(d) + this.add0(h) + this.add0(mm) + this.add0(s);
    },

    add0(m) {
      return m < 10 ? "0" + m : m;
    }
  }
};
</script>