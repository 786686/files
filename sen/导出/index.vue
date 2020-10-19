<template>
  <div class="app-container">
    <div class="login-info">
      <div class="txt">您好，{{userInfo.su_username}}，欢迎使用{{userInfo.school_name}}后台管理系统</div>
      <div class="txt">您上次登录时间：{{userInfo.lasttimestamp}}</div>
    </div>
    <div class="total-box">
      <el-row :gutter="20">
        <el-col :span="8" v-for="item in totalInfo" :key="item.type">
          <div class="content-item" :class="item.type" @click="jumoToUrl(item.url)">
            <div class="statistic-top">
              <div class="total-txt">{{item.name}}</div>
              <div class="total-num">
                <span class="number">{{item.count}}</span>
                <span class="unit">{{item.unit}}</span>
              </div>
            </div>
            <div class="statistic-bottom">{{item.desc}}</div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import {getIndexData} from "../../service";
  import {mapMutations} from 'vuex';

  import downloadfn from "../../mixins/downExcel";

  export default {
    name: 'home',
    data() {
      return {
        initData: '',
        userInfo: {},
        totalInfo: [],

        fileName:"testExcel",
        xmindJSON: [
            {
              "广东工贸职业技术学院-教学管理列表":"导出数据时间 ：2020-03-25 15:50:01",
                Name: "", 
                GBPerfix: "",
                stop: ""
            },
            {
                Code: 1,
                Name: "里斯", 
                GBPerfix: "ABC-F",
                stop: "测试"
            },
            {
                Code: 2,
                Name: "里斯1",
                GBPerfix: "ABC-B",
                stop: "测试1"
            },
            {
                Code: 3,
                Name: "里斯2",
                GBPerfix: "ABC-D",
                stop: "测试1"
            }
        ],
        config: {
            colwidth: [
                { wpx: 20 },
                { wpx: 20 },
                { wpx: 20 },
                { wpx: 20 },
                { wpx: 20 },
                { wpx: 20 },
                { wpx: 20 },
                { wpx: 20 },
                { wpx: 20 },
                { wpx: 20 },
                { wpx: 20 },
                { wpx: 20 },
                { wpx: 20 },
                { wpx: 20 },
                { wpx: 20 },
                { wpx: 20 },
                { wpx: 20 },
                { wpx: 20 },
                { wpx: 20 },
                { wpx: 20 },
                { wpx: 20 },
                { wpx: 20 },
                { wpx: 20 }
            ],
            _this: this
        },
        title: ["功能模块与路径", "用例编号", "前置条件"],

        json:[
          // 合并的第一行就是第一个值，第二行就是第二个值
            // {
            // "广东工贸职业技术学院-教学管理列表": "导出数据时间 ：2020-03-25 15:50:01", "列2": "", "列3": "", "列4": '',"列5": ":", "列6": "",
            //   "列7": "","列8": ":","列9": "","列10": "","列11": "","列12": "","列13": "",
            //   "列14": "","列15": "","列16": "","列17": "",
            //   "列18": "","列19": "","列20": "","列21": "","列22": "","列23": ""
            // },
            // 第三行的标题
            // {
            //   "广东工贸职业技术学院-教学管理列表": "序号", "列2": "课程名称", "列3": "课程类别", "列4": "学号", "列5": "学生姓名", "列6": "课程进度",
            //   "列7": "完成进度","列8": "年级","列9": "院系名称","列10": "专业名称","列11": "班级","列12": "学制","列13": "课程下发时间",
            //   "列14": "要求完成时间","列15": "开始学习时间","列16": "完成时间","列17": "总积分",
            //   "列18": "已获积分","列19": "总学分","列20": "已修学分","列21": "待补课","列22": "已补课","列23": "状态",
            // },
            // 其他就是数据的展示了
          ]
      }
    },
    mounted() {
      
      this.getIndexData();
    },
    methods:{
      ...mapMutations([ 'SET_USERINFO', 'SET_MENU' ]),
      async getIndexData() {
        let result = await getIndexData();
        if (result) {
          this.userInfo = result.data.user;
          this.totalInfo = result.data.res;
          let urlArr = [
            // "studentsummarize",
            // "noticesummarize",
            // "businesssummarize",
            "/SchoolAdmin/Student/lists?index=true",
            "/SchoolAdmin/SchoolNotice/lists?index=true",
            "/SchoolAdmin/CreateContest/lists?index=true",
          ]
          for(let i in this.totalInfo){
            this.totalInfo[i].url = urlArr[i];
          }
          this.$store.commit('SET_USERINFO', this.userInfo);
          this.$store.commit('SET_MENU', result.data.menu);  // 
          localStorage.setItem('myMenu', JSON.stringify(result.data.menu));
          localStorage.setItem('user', JSON.stringify(result.data.user))
          localStorage.setItem('schoolId', JSON.stringify(result.data.user.school_id))
        }
      },
      jumoToUrl(url){
        // this.handleRouter(url)
        this.$router.push({path:url})
      }
    },
  }
</script>

<style lang='scss' scoped>
  .app-container {
    border-top: 1px solid #ddd;
    .login-info {
      font-size: 18px;
      color: #666;
      .txt {
        margin-bottom: 10px;
      }
    }
    .total-box {
      margin-top: 30px;
      .content-item:nth-child(2) {
        color: #ff2222 !important;
      }
      .content-item {
        display: flex;
        flex-direction: column;
        width: 260px;
        height: 190px;
        border-radius: 3px;
        .statistic-top {
          margin: 30px 20px 0;
          flex-grow: 1;
          color: #fff;
          .total-txt {
            position: relative;
            font-size: 18px;
            padding-bottom: 20px;
            &:after {
              content: "";
              width: 40px;
              height: 1px;
              background-color: #fff;
              position: absolute;
              bottom: 0px;
              left: 0px;
            }
          }
          .total-num {
            cursor: pointer;
            padding-top: 20px;
            .number {
              font-size: 30px;
            }
            .unit {
              font-size: 12px;
              margin-left: 10px;
            }
          }
        }
        .statistic-bottom {
          line-height: 50px;
          padding: 0 20px;
          font-size: 14px;
          border-top: 1px solid #eee;
        }
      }
      .student {
            cursor: pointer;
        background-color: #48BBC2;
        border: 1px solid #40AFB6;
        .statistic-top {
          background: url("/Public/vendor/images/archives.png") no-repeat right top;
        }
        .statistic-bottom {
          color: #6EE5EC;
        }
      }
      .notice {
            cursor: pointer;
        background-color: #28A1EE;
        border: 1px solid #2C99DE;
        .statistic-top {
          background: url("/Public/vendor/images/notice.png") no-repeat right top;
        }
        .statistic-bottom {
          color: #96D5FE;
        }
      }
      .competition {
            cursor: pointer;
        background-color: #FFAD4D;
        border: 1px solid #F19F3E;
        .statistic-top {
          background: url("/Public/vendor/images/entrepreneurship_competition_1.png") no-repeat right top;
        }
        .statistic-bottom {
          color: #FCD09E;
        }
      }
    }
  }
</style>
