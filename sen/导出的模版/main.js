import Vue from 'vue'
import 'normalize.css/normalize.css'// A modern alternative to CSS resets
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n
import VCharts from 'v-charts'
import axios from 'axios'
import CKEditor from '@ckeditor/ckeditor5-vue';
import '@/styles/index.scss' // global css 全局css
// import '@/mixins/es6-promise.min.js' // global css 全局css
import '@/mixins/aliyun-oss-sdk-5.3.1.min.js' // global css 全局css
// import '@/mixins/aliyun-upload-sdk-1.5.0.min.js' // global css 全局css
// import '@/mixins/aliyun-oss-sdk-4.4.4.min.js' // global css 全局css

import App from './App'
import router from './router'
import store from './store'
import cookie from 'js-cookie'
import {filterEmptyChat} from "./utils/filter";
import ckSelect from '@/components/DownSel/ckSelect';
import ckEditor from '@/components/Ckeditor/index';
import uploadImg from '@/components/UploadImg/index';
import uploadFile from '@/components/UploadFile/index';
import uploadVideo from '@/components/UploadVideo/index';
import message from "./utils/message.js";
import "./utils/xlsxUtils.js";


import Mixins from '@/mixins/mixins'
import '@/icons' // icon
// import '@/permission' // permission control

Vue.use(ElementUI, { locale });
Vue.use(VCharts);
Vue.use(CKEditor);
Vue.mixin(Mixins);
Vue.filter('filterEmptyChat',filterEmptyChat);
Vue.component('ckSelect',ckSelect);
Vue.component('ckEditor',ckEditor);
Vue.component('uploadImg',uploadImg);
Vue.component('uploadFile',uploadFile);
Vue.component('uploadVideo',uploadVideo);
Vue.prototype.$axios = axios;
Vue.prototype.$cookie = cookie;
Vue.prototype.$messageOK = message;  // 公共message提示
Vue.config.productionTip = false;


// 注册一个全局守卫，作用是在路由跳转前，对路由进行判断，防止未登录的用户跳转到其他需要登录的页面去
router.beforeEach((to, from, next) => {
	let token = cookie.get('token');
	if (token && token != 'undefined') {
		if(to.path === '/login'){
			next({
				path: '/home'
			})
		}else{
			next();
		}
	} else {
		if (to.path !== '/login') {
			next({
				path: '/login'
			})
		} else {
			next();
		}
	}
});


//兼容IE11
if (!FileReader.prototype.readAsBinaryString) {
    FileReader.prototype.readAsBinaryString = function (fileData) {
       var binary = "";
       var pt = this;
       var reader = new FileReader();      
       reader.onload = function (e) {
           var bytes = new Uint8Array(reader.result);
           var length = bytes.byteLength;
           for (var i = 0; i < length; i++) {
               binary += String.fromCharCode(bytes[i]);
           }
        //pt.result  - readonly so assign binary
        pt.content = binary;
        pt.onload()
    }
    reader.readAsArrayBuffer(fileData);
    }
}

import XLSX from 'xlsx'
/**
* 导出数据报表xlsx文件
* 已注入所有Vue实例，
* template模板里调用 $$outputXlsxFile
* 组件方法里调用 this.$outputXlsxFile
* 例：this.$outputXlsxFile([['字段1', '字段2'], [1, 2]], [{wch: 10}, {wch: 50}], '测试导出') 得到 测试导出.xlsx 文件
* 第一个参数是导出的数组对象，第二个参数是设置字段宽度，第三个参数是文件名
*/
const outputXlsxFile = (data, wscols, xlsxName) => {
/* convert state to workbook */
const ws = XLSX.utils.aoa_to_sheet(data)
ws['!cols'] = wscols
const wb = XLSX.utils.book_new()
XLSX.utils.book_append_sheet(wb, ws, xlsxName)
/* generate file and send to client */
XLSX.writeFile(wb, xlsxName + ".xlsx")
}


import JsXlsx from 'js-xlsx'
import XlsxStyle from 'xlsx-style'

/**
 * 导出列表方法
 * @param {*} data  需要导出的数据  数组形式  [[表头]，[数据1]，[数据2]...]
 * @param {*} fileName 下载的文件名称
 * @param {*} titleName 表格标题
 * @param {*} time  表格时间范围
 * @param {*} keyMap   排序标准
 * @param {*} district   地区名称
 * @param {*} condition  筛选条件
 * @param {*} specialObj   特殊要求，全站搜索使用
 */

const downloadExl = function(data, fileName,titleName,time = '无',keyMap,district,condition,specialObj = []) {
    const self = this;
    data.unshift({});//空出标题等行
    data.unshift({});
    data.unshift({});
    data.unshift({});
    data = xlsxUtils.format2Sheet(data, 0, 0, keyMap);//偏移3行按keyMap顺序转换
    var wb = xlsxUtils.format2WB(data, undefined, undefined);
    const range = keyMap.length - 1;
    const wopts = { bookType: 'xlsx', bookSST: false, type: 'binary' };
    var dataInfo = wb.Sheets[wb.SheetNames[0]];
    
    dataInfo["A1"].v = district + '广播电视安全播出监管中心'; //设置表格标题
    dataInfo["A2"] = {v: titleName}; //设置表格标题
    dataInfo["A3"] = {v: '日期：' + time}; //设置表格日期
    dataInfo["A4"] = {v: condition}; //设置筛选条件
    dataInfo["!merges"] = [{//合并第一行数据[B1,C1,D1,E1]
        s: {//s为开始
            c: 0,//开始列
            r: 0,//开始取值范围
        },
        e: {//e结束
            c: range,//结束列
            r: 0//结束范围
        }
        },{//合并第一行数据[B2,C2,D2,E2]
        s: {//s为开始
            c: 0,//开始列
            r: 1,//开始取值范围
        },
        e: {//e结束
            c: range,//结束列
            r: 1//结束范围
        }
    },{//合并第一行数据[B3,C3,D3,E3]
        s: {//s为开始
            c: 0,//开始列
            r: 2,//开始取值范围
        },
        e: {//e结束
            c: range,//结束列
            r: 2//结束范围
        }
    },{//合并第一行数据[B3,C3,D3,E3]
        s: {//s为开始
            c: 0,//开始列
            r: 3,//开始取值范围
        },
        e: {//e结束
            c: range,//结束列
            r: 3//结束范围
        }
    }
    ];

    if(specialObj){
    let rowNum = 5;
    _.each(specialObj,(data,index)=>{
        if(data.num){
        dataInfo['A' + rowNum].v = data.name + '列表';
        dataInfo['A' + rowNum].s = {  //设置副标题样式
            font: {
            name: '宋体',
            sz: 14,
            color: {rgb: "#FFFF0000"},
            bold: false,
            italic: false,
            underline: false
            },
            alignment: {
            horizontal: "center" ,
            vertical: "center"
            }
        };
        dataInfo["!merges"].push(
            {
            s: {//s为开始
                c: 0,//开始列
                r: rowNum - 1,//开始取值范围
            },
            e: {//e结束
                c: range,//结束列
                r: rowNum - 1//结束范围
            }
        }
        )
        _.each(dataInfo,(data,key)=>{
            if(key.replace(/[^0-9]/ig,"") == (rowNum +1)){

            dataInfo[key].s = {
                font: {
                name: '宋体',
                sz: 11,
                color: {rgb: "#FFFF0000"},
                bold: true,
                italic: false,
                underline: false
                },
                alignment: {
                horizontal: "center" ,
                vertical: "center"
                }
            };
            }
        })
        rowNum += data.num + 1;
        }
    })
    }

dataInfo["A1"].s = {  //设置主标题样式
    font: {
        name: '宋体',
        sz: 18,
        color: {rgb: "#FFFF0000"},
        bold: true,
        italic: false,
        underline: false
    },
    alignment: {
        horizontal: "center" ,
        vertical: "center"
    }
    };
dataInfo["A2"].s = {  //设置副标题样式
    font: {
        name: '宋体',
        sz: 16,
        color: {rgb: "#FFFF0000"},
        bold: false,
        italic: false,
        underline: false
    },
    alignment: {
        horizontal: "center" ,
        vertical: "center"
    }
    };
dataInfo["A3"].s = {  //设置日期样式
    font: {
        name: '宋体',
        sz: 11,
        color: {rgb: "#FFFF0000"},
        bold: false,
        italic: false,
        underline: false
    }
    };
dataInfo["A4"].s = { 
    font: {
        name: '宋体',
        sz: 11,
        color: {rgb: "#FFFF0000"},
        bold: false,
        italic: false,
        underline: false
    }
    };
    if(specialObj.length == 0){
    _.each(dataInfo,(data,key)=>{          //设置表头样式      由于表头是第四行，所以判断其表格单元格编号是否是 4
        if(key.replace(/[^0-9]/ig,"") == 5){

        dataInfo[key].s = {
            font: {
            name: '宋体',
            sz: 11,
            color: {rgb: "#FFFF0000"},
            bold: true,
            italic: false,
            underline: false
            },
            alignment: {
            horizontal: "center" ,
            vertical: "center"
            }
        };

        }else if(key.replace(/[^0-9]/ig,"") != 1 && key.replace(/[^0-9]/ig,"") != 2 && key.replace(/[^0-9]/ig,"") != 3){
        dataInfo[key].s = {
            font: {
            name: '宋体',
            // sz: 11,
            color: {rgb: "#FFFF0000"},
            // bold: false,
            // italic: false,
            // underline: false
            }
            // alignment: {
            //   horizontal: "center" ,
            //   vertical: "center"
            // }
        };
        }
    })
    }
    
    // 下载功能
    function saveAs(obj, fileName) {
        var tmpa = document.createElement("a");
        tmpa.download = fileName || "下载";
        // 兼容ie 
        if ("msSaveOrOpenBlob" in navigator) {
        window.navigator.msSaveOrOpenBlob(obj, "下载的文件名"+ ".xlsx");
        } else {
        tmpa.href = URL.createObjectURL(obj);
        }
        tmpa.click();
        setTimeout(function() {
        URL.revokeObjectURL(obj);
        }, 100);
    }
    function s2ab(s) {
        if (typeof ArrayBuffer !== 'undefined') {
            var buf = new ArrayBuffer(s.length);
            var view = new Uint8Array(buf);
            for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
            return buf;
        } else {
            var buf = new Array(s.length);
            for (var i = 0; i != s.length; ++i) buf[i] = s.charCodeAt(i) & 0xFF;
            return buf;
        }
    };
    saveAs(xlsxUtils.format2Blob(wb), fileName +".xlsx");
    // self.saveAs(xlsxUtils.format2Blob(wb), fileName +".xlsx");
};

Vue.prototype.$downloadExl = downloadExl
Vue.prototype.$outputXlsxFile = outputXlsxFile

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
