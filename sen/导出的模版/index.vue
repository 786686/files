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

  export default {
    name: 'home',
    data() {
      return {
        initData: '',
        userInfo: {},
        totalInfo: []
      }
    },
    mounted() {
      let list = [
        {name:"z",id:12},
        {name:"h",id:34},
        {name:"a",id:45},
        {name:"o",id:56},
      ]
      let arr = [["序号", "所属院系", "用户名"]];
      for(let i in list){
        let tempArr = [];
        tempArr.push(parseInt(i)+1)
        tempArr.push(list[i].name)
        tempArr.push(list[i].id)
        arr.push(tempArr);
      };
      let currentTime = this.formatExportDate();
      this.$downloadExl([[],[],[]],"下载的文件名称","表格标题","无","1234","广州","",[])
      // this.$downloadExl(arr,"下载的文件名称","表格标题","无","","广州","",[])
      // this.$outputXlsxFile(arr, [{wch: 20}, {wch: 20}, {wch: 20}, {wch: 20}, {wch: 20}, {wch: 20}, {wch: 20}, {wch: 20}, {wch: 20}], '角色管理'+currentTime);
      // this.getIndexData();
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
