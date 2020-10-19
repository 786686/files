<template>
  <div class="app-container">
    <div class="filter-box">
      <el-form :inline="true" :model="formInline" class="demo-form-inline" label-width="120px">
        <div class="">
          <el-form-item label="课程名称">
            <el-select v-model="formInline.course_id" placeholder="全部">
              <el-option label="全部" value=""></el-option>
              <el-option
                v-for="item in selectCourse"
                :key="item.course_id"
                :label="item.name"
                :value="item.course_id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="课程类别">
            <el-select v-model="formInline.cat_id" placeholder="全部">
              <el-option label="全部" value=""></el-option>
              <el-option
                v-for="item in selectCategory"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          
          <el-form-item label="学号">
            <el-input v-model="formInline.student_no" placeholder="请输入学号"></el-input>
          </el-form-item>
          <el-form-item label="学生姓名">
            <el-input v-model="formInline.student_name" placeholder="请输入学生姓名"></el-input>
          </el-form-item>
          <el-form-item label="学制">
            <el-select v-model="formInline.school_system" placeholder="全部">
              <el-option label="全部" value=""></el-option>
              <el-option label="3年制专科" value="1"></el-option>
              <el-option label="4年制本科" value="2"></el-option>
              <el-option label="5年制本科" value="3"></el-option>
              <el-option label="其他" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="formInline.study_status" placeholder="全部">
              <el-option label="全部" value=""></el-option>
              <el-option label="未开始" value="0"></el-option>
              <el-option label="进行中" value="1"></el-option>
              <el-option label="已完成" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="年级">
          <ck-select type="grade" v-model="formInline.grade_id" placeholder="请选择年级" ></ck-select>
          </el-form-item>
          <el-form-item label="院系">
            <ck-select type="department" v-model="formInline.department_id" placeholder="请选择院系" selWidth="100%" @valueChange="queryDepChange"></ck-select>
          </el-form-item>
          <el-form-item label="专业">
            <ck-select type="major" v-model="formInline.major_id" placeholder="请选择专业" :pid="formInline.department_id" @valueChange="majorChange" selWidth="100%"></ck-select>
          </el-form-item>
          <el-form-item label="班级">
            <ck-select type="class" v-model="formInline.class_id" placeholder="请选择班级" :pid="formInline.major_id" selWidth="100%"></ck-select>
          </el-form-item>
          <el-form-item label="开始学习时间">
            <!-- <el-date-picker
              v-model="studyTime"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              @change="changeStudyTime">
            </el-date-picker> -->

            <el-date-picker
              v-model="formInline.study_begin_time_start"
              type="datetime"
              placeholder="选择开始日期时间"
              format="yyyy-MM-dd HH:mm"
              value-format="yyyy-MM-dd HH:mm"
              :picker-options="pickerOptions01">
            </el-date-picker>
            <span>-</span>
            <el-date-picker
              v-model="formInline.study_begin_time_end"
              type="datetime"
              placeholder="选择结束日期时间"
              format="yyyy-MM-dd HH:mm"
              value-format="yyyy-MM-dd HH:mm"
              :picker-options="pickerOptions02">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="完成时间">
            <!-- <el-date-picker
              v-model="learnTime"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              @change="changeLearnTime">
            </el-date-picker> -->

            <el-date-picker
              v-model="formInline.study_end_time_start"
              type="datetime"
              placeholder="选择开始日期时间"
              format="yyyy-MM-dd HH:mm"
              value-format="yyyy-MM-dd HH:mm"
              :picker-options="pickerOptions03">
            </el-date-picker>
            <span>-</span>
            <el-date-picker
              v-model="formInline.study_end_time_end"
              type="datetime"
              placeholder="选择结束日期时间"
              format="yyyy-MM-dd HH:mm"
              value-format="yyyy-MM-dd HH:mm"
              :picker-options="pickerOptions04">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search"  @click="dataQuery">搜索</el-button>
            <el-button type="primary" @click="exportData" >导出</el-button>
            <el-button type="primary" @click="getStudentScore('','score')">结算学分</el-button>
            <el-button type="primary" @click="goToAudit">补课审核</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
     <div class="table-box" ref="tableBox">
      <el-table ref="multipleTable"
       :data="initDatas.list" 
       tooltip-effect="dark" 
       style="width: 100%;" 
      
       @selection-change="handleSelectionChange" >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="index" label="序号" width="55"></el-table-column>
        <el-table-column prop="course" label="课程名称" ></el-table-column>
        <el-table-column prop="category" label="课程类别"></el-table-column>
        <el-table-column prop="student_no" label="学号"></el-table-column>
        <el-table-column prop="realname" label="学生姓名"></el-table-column>
        <el-table-column prop="time_rate" label="课程进度"></el-table-column>
        <el-table-column prop="task_rate" label="完成进度"></el-table-column>
        <el-table-column prop="grade" label="年级"></el-table-column>
        <el-table-column prop="department_name" label="院系名称"></el-table-column>
        <el-table-column prop="major_name" label="专业名称"></el-table-column>
        <el-table-column prop="class_name" label="班级"></el-table-column>
        <el-table-column prop="system" label="学制"></el-table-column>
        <el-table-column prop="start_time" label="课程下发时间"></el-table-column>
        <el-table-column prop="end_time" label="要求完成时间"></el-table-column>
        <el-table-column prop="study_begin_time" label="开始学习时间"></el-table-column>
        <el-table-column prop="study_end_time" label="完成时间"></el-table-column>
        <el-table-column prop="course_integral" label="总积分"></el-table-column>
        <el-table-column prop="cintegral" label="已获积分"></el-table-column>
        <el-table-column prop="course_credit" label="总学分"></el-table-column>
        <el-table-column prop="credit" label="已修学分"></el-table-column>
        <el-table-column prop="wait_remedial_lesson" label="待补课"></el-table-column>
        <el-table-column prop="remedial_lesson" label="已补课"></el-table-column>
        <el-table-column prop="study_status" label="状态"></el-table-column>
        <el-table-column 
          fixed="right"
          label="操作"
          width="200">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="showDetail(scope.row.student_course_id)">查看</el-button>
            <el-button type="primary" size="mini" @click="getStudentScore(scope.row.student_course_id)">结算学分</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination background layout="prev, pager, next" :page-count="initDatas.pages" class="page-continer" @current-change="changePage"></el-pagination>
    </div>

    <!-- 结算学分 -->
    <el-dialog :close-on-click-modal="false"  title="结算学分" width="50%" :visible.sync="outerVisible">
      <el-row>
        <el-col :span="24">已选择{{ checkListLen }}条数据</el-col>
      </el-row>
      <el-row>
        <el-col :span="8">请选择:</el-col>
        <el-col :span="16"> 
          <el-col :span="24" class="el-line-height"> 
            <el-radio v-model="closeDuration.type" label="1">结算已完成任务部分的学分</el-radio>
          </el-col> 
          <el-col :span="24" class="el-line-height"> 
            <el-radio v-model="closeDuration.type" label="2">结算全部剩余学分</el-radio>
          </el-col> 
          <el-col :span="24" class="el-line-height"> 
            <el-col :span="24">
            <el-radio v-model="closeDuration.type" label="3">自定义结算学分</el-radio>
            <el-input placeholder="" style="width:50px;" v-model="closeDuration.credit"  ></el-input>分
            </el-col>
            <el-col :span="24" style="margin-left:15px">
              <span>(超出总学分部分不做结算)</span>
            </el-col>
          </el-col> 
        </el-col>
      </el-row>
      <el-dialog :close-on-click-modal="false" 
        width="30%"
        title="提示"
        :visible.sync="innerVisible"
        append-to-body>
          <p class="text-center">确认结算学分吗？</p>
          <p class="comfirm-tips">注：学分结算后不可收回；如结算全部剩余学分，则视为该学生学习完成！</p>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="setSummaryStudentScore" >确定</el-button>
            <el-button @click="innerVisible = false">取 消</el-button>
          </div>
      </el-dialog>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="innerVisible = true">确定</el-button>
        <el-button @click="outerVisible = false">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 查看详情 -->
    <el-dialog
      title="个人成绩表"
      :visible.sync="detailDialogVisible"
      width="60%"
      >
        <h2 class="detail-title">万讯创新创业学院线上课程个人成绩表-{{ detailTableData.course }}</h2>
        <el-row>
          <el-col :span="20">
            <p> {{ detailTableData.school_name }}<i>/</i>{{ detailTableData.department_name }}<i>/</i>{{ detailTableData.major_name }}<i>/</i>{{ detailTableData.class_name }}<i>:</i>{{ detailTableData.realname }}<i>({{ detailTableData.student_no }})</i> </p>
          </el-col>
          <el-col :span="4" class="text-right"><el-button type="text" @click="setDetailScore()">结算学分</el-button></el-col>
        </el-row>
        
      <el-table
        :data="detailTableData.list"
        style="width: 100%">
        <el-table-column
          type="index"
          label="序号"
          width="50">
        </el-table-column>
        <el-table-column
          prop="catalog_name"
          label="课程任务"
         >
        </el-table-column>
        <el-table-column
          prop="condition"
          label="完成情况"
          >
        </el-table-column>
        <el-table-column
          prop="task_rate"
          label="完成进度">
        </el-table-column>
        <el-table-column
          prop="task_integral"
          label="总积分">
        </el-table-column>
        <el-table-column
          prop="cintegral"
          label="已获积分">
        </el-table-column>
        <el-table-column
          prop="wait_remedial_lesson"
          label="待补课">
        </el-table-column>
        <el-table-column
          prop="remedial_lesson"
          label="已补课">
        </el-table-column>
         <el-table-column
          prop="status"
          label="状态">
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="detailDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="detailDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import { getSelectCourse, getSelectCategory, getSearchList, setSummaryStudentScore, getStudentDetailScore  } from "../../service";
  import downloadfn from "../../mixins/downExcel";
  export default {
    name: 'record',
    data() {
     
      return {
        formInline: {
          course_id:'',
          cat_id:'',
          department_id: '',
          major_id:'',
          class_id:'',
          student_no:'',
          student_name:'',
          school_system:'',
          study_status:'',
          study_begin_time_start:'',
          study_begin_time_end:'',
          study_end_time_start:'',
          study_end_time_end:'',
          page_no:'',
          page_size:15,

        },
        initDatas:{},
        selectCourse:[],
        selectCategory:[],
        multipleSelection:[],
        closeDuration:{
          ids:[],
          type: '1',
          credit:'',
        },
        tableMaxHeight:0,
        outerVisible:false,
        innerVisible:false,
        options: 28,
        studyTime:'',
        learnTime:'',
        theOne: '',
        checkListLen:1,
        detailDialogVisible: false, // 详情
        detailTableData: [],
        pickerOptions01: {
          disabledDate: (time) => {
            if(this.formInline.study_begin_time_end != '' ) {
              return  time.getTime() > Date.parse(new Date(this.formInline.study_begin_time_end)) ;
            }
          }
        },
        pickerOptions02: {
          disabledDate: (time) => {
            if(this.formInline.study_begin_time_start != '' ){
              return  time.getTime() < Date.parse(new Date(this.formInline.study_begin_time_start)) ;
            }
          }
        },
        pickerOptions03: {
          disabledDate: (time) => {
            if(this.formInline.study_end_time_end != '' ) {
              return  time.getTime() > Date.parse(new Date(this.formInline.study_end_time_end)) ;
            }
          }
        },
        pickerOptions04: {
          disabledDate: (time) => {
            if(this.formInline.study_end_time_start != '' ){
              return  time.getTime() < Date.parse(new Date(this.formInline.study_end_time_start)) ;
            }
          }
        }
      }
    },
    mounted() {
      this.$nextTick(function () {
        this.tableMaxHeight = this.$refs.tableBox.clientHeight - 50;
      });
      this.getSelectCourse();
      this.getSelectCategory();
      this.getList();
    },
    methods:{
      async exportData(){
        let that = this;
        const param = this.formInline;
        param.export = 1;
        let result = await getSearchList(param);
        if(result){
          let list =  result.data;

          // 第一行的表头
          let firstTitle = "广东工贸职业技术学院-教学管理列表";
          // 第二行的导出时间
          let exportTime = "导出数据时间 ："+this.formatDotExportDate();
          // 第三行的导出数据的标题
          let titleArr = ["序号", "课程名称", "课程类别", "学号" ,"学生姓名", "课程进度" ,"完成进度", "年级" , "院系名称", "专业名称" ,"班级" ,"学制" ,"课程下发时间" ,"要求完成时间" ,"开始学习时间" ,"完成时间" ,"总积分" ,"已获积分" ,"总学分", "已修学分" ,"待补课" ,"已补课" ,"状态"];
          
          
          // 定义需要导出字段名的列表，以免在下面遍历
          let fieldArr = [
            "course","category","student_no","realname","time_rate","task_rate","grade","department_name","major_name","class_name","system","start_time","end_time",
            "study_begin_time","study_end_time","course_integral","cintegral","course_credit","credit","wait_remedial_lesson","remedial_lesson","study_status"
          ]
          
          downloadfn(firstTitle,exportTime,titleArr,fieldArr,list);

          // let arr = [["序号", "课程名称", "课程类别", "学号" ,"学生姓名", "课程进度" ,"完成进度", "年级" , "院系名称", "专业名称" ,"班级" ,"学制" ,"课程下发时间" ,"要求完成时间" ,"开始学习时间" ,"完成时间" ,"总积分" ,"已获积分" ,"总学分", "已修学分" ,"待补课" ,"已补课" ,"状态"]];
          // for(let i in list){
          //   let tempArr = [];
          //   tempArr.push(parseInt(i)+1) 
          //   tempArr.push(list[i].course)
          //   tempArr.push(list[i].category)
          //   tempArr.push(list[i].student_no)
          //   tempArr.push(list[i].realname)
          //   tempArr.push(list[i].time_rate)
          //   tempArr.push(list[i].task_rate)
          //   tempArr.push(list[i].grade)
          //   tempArr.push(list[i].department_name)
          //   tempArr.push(list[i].major_name)
          //   tempArr.push(list[i].class_name)
          //   tempArr.push(list[i].system)
          //   tempArr.push(list[i].start_time)
          //   tempArr.push(list[i].end_time)
          //   tempArr.push(list[i].study_begin_time)
          //   tempArr.push(list[i].study_end_time)
          //   tempArr.push(list[i].course_integral)
          //   tempArr.push(list[i].cintegral)
          //   tempArr.push(list[i].course_credit)
          //   tempArr.push(list[i].credit)
          //   tempArr.push(list[i].wait_remedial_lesson)
          //   tempArr.push(list[i].remedial_lesson)
          //   tempArr.push(list[i].study_status)
          //   arr.push(tempArr);
          // };

          // let currentTime = this.formatExportDate();
          // this.$outputXlsxFile(arr, [{wch: 20}, {wch: 20}, {wch: 20}, {wch: 20}, {wch: 20}], '教学管理'+currentTime);
        }
      },
      async getList(){
        let result = await getSearchList(this.formInline);
        if(result){
          this.initDatas = result.data;
        }
      },
      async getSelectCourse(){
        let result = await getSelectCourse();
        if(result){
          this.selectCourse = result.data;
        }
      },
      async getSelectCategory(){
        let result = await getSelectCategory();
        if(result){
          this.selectCategory = result.data;
        }
      },
      async getStudentScore(id,score){
        if(id){
          this.outerVisible = true;
          this.theOne = id;
          this.checkListLen = 1;
          console.log(this.theOne)
        }else{
          this.theOne = '';
          if(this.multipleSelection.length == 0){
            if(score){
             
            this.$message({
              message: '请选择需要结算的学生！',
              type: 'warning'
            });
            return; 
            }
            this.$message({
              message: '请选择待审核的数据！',
              type: 'warning'
            });
          }else{
            this.checkListLen = this.multipleSelection.length;
            this.outerVisible = true;
          }
        }
      },
      async setSummaryStudentScore(){
        if(this.closeDuration.type != 3){
          this.closeDuration.credit = '';
        }
        let _data = {
          ids: this.theOne ? this.theOne : this.multipleSelection.toString(),
          type: this.closeDuration.type,
          credit: this.closeDuration.credit
        }
        let result = await setSummaryStudentScore(_data);
        if(result){
          this.outerVisible = false;
          this.innerVisible = false;
          this.detailDialogVisible = false;
          this.$message({
            message: result.msg ,
            type: 'success'
          });
          this.getList();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val.map((item)=>{
          return item.student_course_id;
        });
      },
      dataQuery(){
        this.formInline.page_no = 1;
        this.formInline.export = 0;
        // return;
        this.getList();
      },
      changePage(index){
        this.formInline.page_no = index;
        this.getList();
      },
      // goToDetail(_id){
      //   this.$router.push({name:'courseStore',query: {course_id:_id}})
      // },
      goToAudit(){
        this.$router.push({name:'courseAudit',query: {id:JSON.parse(localStorage.getItem('schoolId'))}})
      },
      queryDepChange(){
        this.formInline.major_id = '';
        this.formInline.class_id = '';
      },
      majorChange(){
        this.formInline.class_id = '';
      },
      changeStudyTime(e) {
        if (e) {
            this.formInline.study_begin_time_start = e[0];
            this.formInline.study_begin_time_end = e[1];
        } else {
            this.formInline.study_begin_time_start = "";
            this.formInline.study_begin_time_end = "";
        }
      },
      changeLearnTime(e) {
        if (e) {
            this.formInline.study_end_time_start = e[0];
            this.formInline.study_end_time_end = e[1];
        } else {
            this.formInline.study_end_time_start = "";
            this.formInline.study_end_time_end = "";
        }
      },
      showDetail(_id){ // 详情
        this.theOne = _id;
        this.detailDialogVisible = true;
        this.getStudentDetailScore(_id)
      },
      async getStudentDetailScore(_id){
        let result = await getStudentDetailScore({student_course_id:_id});
        if(result){
          this.detailTableData = result.data;
        }
      },
      setDetailScore(){
        this.checkListLen = 1;
        this.outerVisible = true;
      }
    }
  }
</script>

<style lang='scss' scoped>
.text-center{ text-align: center; }
.comfirm-tips{ text-align: left;color: #FF0000;padding: 10px 75px 0;}
.el-line-height{ line-height: 50px; }
.el-line-height .el-radio{ margin-right: 5px; }
.app-container /deep/ .dialog-footer{ text-align:center; }
h2.detail-title{font-size: 18px;color: #333;text-align: center;margin: 20px 0;margin: 0 0 20px;
    font-weight: normal;}
.text-right{ text-align: right; }
</style>
