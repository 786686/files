<template>
  <div class="container">
    <div class="setting">
    <div class="upload">
      <div>
        <input type="file" id="fileUpload" @change="fileChange($event)">
        <label class="status">上传状态: <span>{{statusText}}</span></label>
      </div>
      <div class="upload-type">
        上传方式二, 使用 STSToken 上传:
        <button @click="stsUpload" :disabled="uploadDisabled">开始上传</button>
        <button @click="pauseUpload" :disabled="pauseDisabled">暂停</button>
        <button :disabled="resumeDisabled" @click="resumeUpload">恢复上传</button>
        <span class="progress">上传进度: <i id="sts-progress">{{stsProgress}}</i> %</span>
      </div>
    </div>
    <div class="info">点播STS参数如何获取，请查阅<a href="https://help.aliyun.com/document_detail/57114.html" target="_blakn">获取STS</a></div>
  </div>
  </div>
</template>
<script>
import { uploadVideo } from "../../service";
  export default {
    data () {
      return {
        timeout: '',
        partSize: '',
        parallel: '',
        retryCount: '',
        retryDuration: '',
        region: 'cn-shenzhen',
        userId: '1303984639806000',        
        file: null,
        stsProgress: 0,
        uploadDisabled: true,
        resumeDisabled: true,
        pauseDisabled: true,
        statusText: '',
        pauseDisabled: true,
        uploader: null
      }
    },
    methods: {
      fileChange (e) {
        this.file = e.target.files[0]
        if (!this.file) {
          alert("请先选择需要上传的文件!")
          return
        }
        var Title = this.file.name
        var userData = '{"Vod":{}}'
        if (this.uploader) {
          this.uploader.stopUpload()
          this.authProgress = 0
          this.statusText = ""
        }
        this.uploader = this.createUploader()
        // 首先调用 uploader.addFile(event.target.files[i], null, null, null, userData)
        console.log(userData)
        this.uploader.addFile(this.file, null, null, null, userData)
        this.uploadDisabled = false
        this.pauseDisabled = true
        this.resumeDisabled = false
      },
      // 开始上传
      stsUpload () {
        // 然后调用 startUpload 方法, 开始上传
        if (this.uploader !== null) {
          this.uploader.startUpload()
          this.uploadDisabled = true
          this.pauseDisabled = false
        }
      },
      // 暂停上传
      pauseUpload () {
        if (this.uploader !== null) {
          this.uploader.stopUpload()
          this.resumeDisabled = false
          this.pauseDisabled = true
        }
      },


      // 恢复上传
      resumeUpload () {
        if (this.uploader !== null) {
          this.uploader.startUpload()
          this.resumeDisabled = true
          this.pauseDisabled = false
        }
      },
      createUploader () {
        let self = this
        let uploader = new AliyunUpload.Vod({
          timeout: self.timeout || 60000,
          partSize: self.partSize || 1048576,
          parallel: self.parallel || 5,
          retryCount: self.retryCount || 3,
          retryDuration: self.retryDuration || 2,
          region: self.region,
          userId: self.userId,
          // 添加文件成功
          addFileSuccess: function (uploadInfo) {
            self.uploadDisabled = false
            self.resumeDisabled = false
            self.statusText = '添加文件成功, 等待上传...'
            console.log("addFileSuccess: " + uploadInfo.file.name)
          },
          // 开始上传
          async onUploadstarted(uploadInfo) {
            console.log(uploadInfo)
            // 如果是 STSToken 上传方式, 需要调用 uploader.setUploadAuthAndAddress 方法
            // 用户需要自己获取 accessKeyId, accessKeySecret,secretToken
            // 下面的 URL 只是测试接口, 用于获取 测试的 accessKeyId, accessKeySecret,secretToken
            let result = await uploadVideo({});
            console.log(result)
            if (result) {
              let info = result.data.data.Credentials;
              console.log(info)
              let accessKeyId = info.AccessKeyId
              let accessKeySecret = info.AccessKeySecret
              let secretToken = info.SecurityToken
              uploader.setSTSToken(uploadInfo, accessKeyId, accessKeySecret, secretToken)
            }
          },
          // 文件上传成功
          onUploadSucceed: function (uploadInfo) {
            console.log("onUploadSucceed: " + uploadInfo.file.name + ", endpoint:" + uploadInfo.endpoint + ", bucket:" + uploadInfo.bucket + ", object:" + uploadInfo.object)
            self.statusText = '文件上传成功!'
          },
          // 文件上传失败
          onUploadFailed: function (uploadInfo, code, message) {
            console.log("onUploadFailed: file:" + uploadInfo.file.name + ",code:" + code + ", message:" + message)
            self.statusText = '文件上传失败!'
          },
          // 取消文件上传
          onUploadCanceled: function (uploadInfo, code, message) {
            console.log("Canceled file: " + uploadInfo.file.name + ", code: " + code + ", message:" + message)
            self.statusText = '文件已暂停上传'
          },
          // 文件上传进度，单位：字节, 可以在这个函数中拿到上传进度并显示在页面上
          onUploadProgress: function (uploadInfo, totalSize, progress) {
            console.log("onUploadProgress:file:" + uploadInfo.file.name + ", fileSize:" + totalSize + ", percent:" + Math.ceil(progress * 100) + "%")
            let progressPercent = Math.ceil(progress * 100)
            self.stsProgress = progressPercent
            self.statusText = '文件上传中...'
          },
          // 上传凭证超时
          async onUploadTokenExpired(uploadInfo) {

             let result = await uploadVideo({});
            if (result) {
              let info = result.data.data.Credentials;
              let accessKeyId = info.AccessKeyId
              let accessKeySecret = info.AccessKeySecret
              let secretToken = info.SecurityToken
              uploader.setSTSToken(uploadInfo, accessKeyId, accessKeySecret, secretToken)
            }
            self.statusText = '文件超时...'
          },
          // 全部文件上传结束
          onUploadEnd: function (uploadInfo) {
            console.log("onUploadEnd: uploaded all the files")
            self.statusText = '文件上传完毕'
          }
        })
        return uploader
      }
    }
  }
</script>



