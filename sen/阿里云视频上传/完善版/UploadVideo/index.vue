<!--
 * Create by Zwl on 2019/11/27
 * @Description:
-->

<template>
  <div class="upload-box">
    <el-upload
      action
      class="img-uploader"
      accept=".mp4"
      :show-file-list="false"
      :http-request="upload"
      :before-upload="beforeAvatarUpload"
    >
      <video v-if="videoUrl" :src="videoUrl" class="img" autoplay controls></video>
      <i v-else class="el-icon-plus img-uploader-icon"></i>
    </el-upload>
  </div>
</template>

<script>
import {  uploadVideo } from "../../service";
// import "@mixins/aliyun-oss-sdk-5.3.1.min.js";

export default {
  name: "UploadVideo",
  data() {
    return {
      videoUrl: "",
      secretKey: "",
      foldPath: "/",
      client: null,
    };
  },
  props: {
    fileSize: {
      type: Number,
      default: 2
    },
    value: {
      type: String
    },
    url: {
      type: String,
      default: ""
    },
    id:{
      type: String,
      default: ""
    }
  },
  mounted() {
    this.videoUrl = this.value;
    this.getOssAuth();
  },
  methods: {
    async getOssAuth() {
      let result = await uploadVideo({});
      if (result) {
        let data = result.data.data.Credentials 
        this.client = new OSS.Wrapper({
          region: "oss-cn-shenzhen", //阿里云获取
          accessKeyId: data.AccessKeyId,
          accessKeySecret: data.AccessKeySecret,
          stsToken: data.SecurityToken,
          bucket: "wxchuangke" //要存储的目录名
        });
      }
    },
    async beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < this.fileSize;
      // ['video/mp4', 'video/ogg', 'video/flv', 'video/avi', 'video/wmv', 'video/rmvb', 'video/mov']
      if (["video/mp4"].indexOf(file.type) == -1) {
        this.$message.error("请上传正确的mp4视频格式!");
        return false;
      }
      if (!isLt2M) {
        this.$message.error("上传视频大小不能超过 " + this.fileSize + "MB!");
        return;
      }
    },
    async upload(files) {
      let that = this;
      let name = files.file.name;
      var suffix = name.substr(name.indexOf("."));// 取出文件后缀名
      let storeAs = "project-"+this.id+suffix;//文件名，覆盖；
        this.client.multipartUpload(storeAs, files.file, {}).then((results) => {
          console.log(results)
          if(files.file.size >= 100 * 1024) {
            that.videoUrl = results.res.requestUrls[0].split("?")[0];
          } else {
            that.videoUrl = results.url;
          }
          that.$emit("change", {'videoUrl':that.videoUrl});
        }).catch((err) => {
          console.log(err);
        });

      return;
      // var file = document.getElementById("fileName").files[0];
      // var val = document.getElementById("fileName").value;
      // var suffix = val.substr(val.indexOf("."));
      // var obj = timestamp();
      // // var storeAs = 'upload-file/' + "/" + obj + suffix;
      // var storeAs = obj + suffix;
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

        // this.videoUrl = result.data.picUrl;
    }
  },
  watch: {
    videoUrl(value) {
      console.log(value);
    }
  }
};
</script>

<style scoped lang="scss">
.upload-box {
  .img-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .img-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .img-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 80px;
    height: 80px;
    line-height: 80px;
    text-align: center;
    border: 1px solid #eee;
  }
  .img {
    width: 80px;
    height: 80px;
    display: block;
  }
}
</style>