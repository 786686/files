import XLSX from "xlsx-style"
// 配置
const wopts = {
    bookType: "xlsx",
    bookSST: false,
    type: "binary",
    cellStyles: true
};

function downloadExl(json, config, type) {
    var tmpdata = json[0];
    json.unshift({});
    var keyMap = []; //获取keys
    for (var k in tmpdata) {
        keyMap.push(k);
        json[0][k] = k;
    }
    var tmpdata = [];//用来保存转换好的json
        json.map((v, i) => keyMap.map((k, j) => Object.assign({}, {
          v: v[k],
          position: (j > 25 ? this.getCharCol(j) : String.fromCharCode(65 + j)) + (i + 1)
        }))).reduce((prev, next) => prev.concat(next)).forEach((v, i) => tmpdata[v.position] = {
          v: v.v
        });
        var outputPos = Object.keys(tmpdata); //设置区域,比如表格从A1到D10
        tmpdata["!merges"] = [{
          s: { c: 0, r: 0 },//开始 A1
          e: { c: 9, r: 0 }//结束F1
        },
          {
            s: { c: 0, r: 1 },//开始 A2
            e: { c: 1, r: 1 }//结束B2
          },
          {
            s: { c: 2, r: 1 },//开始 C2
            e: { c:3, r: 1 },//结束D2
          },
          {
            s: { c: 5, r: 1 },//开始 F2
            e: { c:6, r: 1 }
          },
          {
            s: { c: 8, r: 1 },//开始 I2
            e: { c:9, r: 1 }
          },
          {
            s: { c:0, r:5 },//第六行
            e: { c:1, r:5 }
          },
          {
            s: { c:2, r:5 },//第六行
            e: { c:6, r:5 }
          },
          {
            s: { c:0, r:6 },//第七行
            e: { c:1, r:6 }
          },
          {
            s: { c:2, r:6 },//第七行
            e: { c:6, r:6 }
          },
          {
            s: { c:0, r:7 },//第八行
            e: { c:1, r:7 }
          },
          {
            s: { c:2, r:7 },//第八行
            e: { c:6, r:7 }
          },
          {
            s: { c:0, r:8 },//第九行
            e: { c:1, r:8 }
          },
          {
            s: { c:2, r:8 },//第九行
            e: { c:6, r:8 }
          },
        ];//合并单元格
//        边框样式
        let border = {bottom:{style:"thin",color:{rgb: "000000"}},top:{style:"thin",color:{rgb: "000000"}},
          left:{style:"thin",color:{rgb: "000000"}},right:{style:"thin",color:{rgb: "000000"}}};
        //加粗
        let style0 = {border:border, alignment:{horizontal:'center',wrapText: true ,vertical: "center"},font: { sz: 18, bold: true, color: { rgb: "000000" },outline:true } };
        let style1 = {border:border, alignment:{horizontal:'center',wrapText: true,vertical: "center"},font: { sz: 12, bold: true, color: { rgb: "000000" },outline:true } };
        //不加粗
        let style2 = {border:border, alignment:{horizontal:'center',wrapText: true,vertical: "center"},font: { sz: 12,  color: { rgb: "000000" },outline:true }  };
        //蓝底加粗
        let style3 = {border:border, alignment:{horizontal:'center',wrapText: true,vertical: "center"},font: { sz: 12, bold: true, color: { rgb: "000000" },outline:true }, fill: { fgColor: {rgb: "00BFFF" } } ,hpt: 500};
//        第一二行样式
        tmpdata["A1"].s = style0;
        tmpdata["A2"].s = style0;
        tmpdata["B2"].s = style2;
        tmpdata["C2"].s = style2;
        tmpdata["D2"].s = style2;
        tmpdata["E2"].s = style1;
        tmpdata["F2"].s = style2;
        tmpdata["G2"].s = style2;
        tmpdata["H2"].s = style1;
        tmpdata["I2"].s = style2;
        tmpdata["J1"].s = style0;
        tmpdata["J2"].s = style2;
//第三行样式
        tmpdata["A3"].s = style3;
        tmpdata["B3"].s = style3;
        tmpdata["C3"].s = style3;
        tmpdata["D3"].s = style3;
        tmpdata["E3"].s = style3;
        tmpdata["F3"].s = style3;
        tmpdata["G3"].s = style3;
        tmpdata["H3"].s = style3;
        tmpdata["I3"].s = style3;
        tmpdata["J3"].s = style3;
//  第四行样式
        tmpdata["A4"].s = style2;
        tmpdata["B4"].s = style2;
        tmpdata["C4"].s = style2;
        tmpdata["D4"].s = style2;
        tmpdata["E4"].s = style2;
        tmpdata["F4"].s = style2;
        tmpdata["G4"].s = style2;
        tmpdata["H4"].s = style2;
        tmpdata["I4"].s = style2;
        tmpdata["J4"].s = style2;
//剩余行样式
        for(let i = 6;i<=9;i++){
          tmpdata["A"+i].s = style3;
          tmpdata["B"+i].s = style3;
          tmpdata["C"+i].s = style2;
          tmpdata["D"+i].s = style2;
          tmpdata["E"+i].s = style2;
          tmpdata["F"+i].s = style2;
          tmpdata["G"+i].s = style2;
        }

        tmpdata["!cols"]=[//设置列宽度
          {wpx: 50},//
          {wpx: 50},//
          {wpx: 50},//
          {wpx: 50},//
          {wpx: 50},//
          {wpx: 50},//
          {wpx: 50},//
          {wpx: 50},//
          {wpx: 50},//
          {wpx: 50},//
          {wpx: 50},//
          {wpx: 50},//
          {wpx: 50},//
          {wpx: 50},//
          {wpx: 50},//
          {wpx: 50},//
          {wpx: 50},//
          {wpx: 50},//
          {wpx: 50},//
          {wpx: 50},//
          {wpx: 50},//
          {wpx: 50},//
        //   wch
        ];
        tmpdata["!rows"]=[//设置行高度
          {hct: 1000},//序号
          {hct: 1000},//发票抬头
          {hct: 1000},//开票内容
          {hct: 1000},//发票金额
        ];
        // tmpdata["!margins"] = { left: 20, right: 20, top: 20, bottom: 20, header: 50, footer: 50 }
    var tmpWB = {
        SheetNames: ["mySheet"], //工作表名数组
        Sheets: {
            // mySheet: tmpdata//
            // mySheet:  XLSX.utils.json_to_sheet(json)
            // mySheet:  XLSX.utils.json_to_sheet(tmpdata)
            mySheet: Object.assign({},
                tmpdata, //!ref设置工作表的范围 如 必须 否则不显示
                {
                    "!ref": outputPos[0] + ":" + outputPos[outputPos.length - 1] //设置填充区域
                }
            )
            // 
        }
    };
    
    // console.log(tmpdata)
    // console.log(XLSX.utils.json_to_sheet(json))
    console.log(tmpWB.Sheets.mySheet);
    const tmpDown = new Blob(
        [
            s2ab(
                XLSX.write(
                    tmpWB, {
                        bookType: type == undefined ? "xlsx" : type,
                        bookSST: false,
                        type: "binary"
                        // type: "base64"
                        // type: "string"
                        // type: "buffer"
                        // type: "file"
                        // type: "binary"
                    } //这里的数据是用来定义导出的格式类型
                )
            )
        ], {
            type: "application/octet-stream"
        }
    );
    // 数据处理完后传入下载
    // this.saveAs(new Blob([this.s2ab(XLSX.write(wb, this.wopts))], { type: "application/octet-stream"}), "这里是下载的文件名" + '.' + (this.wopts.bookType == "biff2" ? "xls" : this. wopts.bookType));
    saveAs(
        tmpDown,
        config._this.fileName +
        "." +
        (wopts.bookType == "biff2" ? "xls" : wopts.bookType)
    );

    
    // var tmpdata = []; //用来保存转换好的json
    // let border = {
    //     bottom: {
    //         style: "medium",
    //         color: {
    //             rgb: "ff0000"
    //         }
    //     },
    //     top: {
    //         style: "medium",
    //         color: {
    //             rgb: "00ff00"
    //         }
    //     },
    //     left: {
    //         style: "medium",
    //         color: {
    //             rgb: "00ff00"
    //         }
    //     },
    //     right: {
    //         style: "medium",
    //         color: {
    //             rgb: "000000"
    //         }
    //     }
    // };


//     tmpdata["!merges"] = [{
//         s: { c: 0, r: 0 },//开始 A1
//         e: { c: 9, r: 0 }//结束F1
//       },
//         {
//           s: { c: 0, r: 1 },//开始 A2
//           e: { c: 1, r: 1 }//结束B2
//         },
//         {
//           s: { c: 2, r: 1 },//开始 C2
//           e: { c:3, r: 1 },//结束D2
//         },
//         {
//           s: { c: 5, r: 1 },//开始 F2
//           e: { c:6, r: 1 }
//         },
//         {
//           s: { c: 8, r: 1 },//开始 I2
//           e: { c:9, r: 1 }
//         },
//         {
//           s: { c:0, r:5 },//第六行
//           e: { c:1, r:5 }
//         },
//         {
//           s: { c:2, r:5 },//第六行
//           e: { c:6, r:5 }
//         },
//         {
//           s: { c:0, r:6 },//第七行
//           e: { c:1, r:6 }
//         },
//         {
//           s: { c:2, r:6 },//第七行
//           e: { c:6, r:6 }
//         },
//         {
//           s: { c:0, r:7 },//第八行
//           e: { c:1, r:7 }
//         },
//         {
//           s: { c:2, r:7 },//第八行
//           e: { c:6, r:7 }
//         },
//         {
//           s: { c:0, r:8 },//第九行
//           e: { c:1, r:8 }
//         },
//         {
//           s: { c:2, r:8 },//第九行
//           e: { c:6, r:8 }
//         },
//       ];//合并单元格
// //        边框样式
//       let border = {bottom:{style:"thin",color:{rgb: "000000"}},top:{style:"thin",color:{rgb: "000000"}},
//         left:{style:"thin",color:{rgb: "000000"}},right:{style:"thin",color:{rgb: "000000"}}};
//       //加粗
//       let style0 = {border:border, alignment:{horizontal:'center',wrapText: true ,vertical: "center"},font: { sz: 18, bold: true, color: { rgb: "000000" },outline:true } };
//       let style1 = {border:border, alignment:{horizontal:'center',wrapText: true,vertical: "center"},font: { sz: 12, bold: true, color: { rgb: "000000" },outline:true } };
//       //不加粗
//       let style2 = {border:border, alignment:{horizontal:'center',wrapText: true,vertical: "center"},font: { sz: 12,  color: { rgb: "000000" },outline:true }  };
//       //蓝底加粗
//       let style3 = {border:border, alignment:{horizontal:'center',wrapText: true,vertical: "center"},font: { sz: 12, bold: true, color: { rgb: "000000" },outline:true }, fill: { fgColor: {rgb: "00BFFF" } } };
// //        第一二行样式
//       tmpdata["A1"].s = style0;
//       tmpdata["A2"].s = style1;
//       tmpdata["B2"].s = style2;
//       tmpdata["C2"].s = style2;
//       tmpdata["D2"].s = style2;
//       tmpdata["E2"].s = style1;
//       tmpdata["F2"].s = style2;
//       tmpdata["G2"].s = style2;
//       tmpdata["H2"].s = style1;
//       tmpdata["I2"].s = style2;
//       tmpdata["J2"].s = style2;
// //第三行样式
//       tmpdata["A3"].s = style3;
//       tmpdata["B3"].s = style3;
//       tmpdata["C3"].s = style3;
//       tmpdata["D3"].s = style3;
//       tmpdata["E3"].s = style3;
//       tmpdata["F3"].s = style3;
//       tmpdata["G3"].s = style3;
//       tmpdata["H3"].s = style3;
//       tmpdata["I3"].s = style3;
//       tmpdata["J3"].s = style3;
// //  第四行样式
//       tmpdata["A4"].s = style2;
//       tmpdata["B4"].s = style2;
//       tmpdata["C4"].s = style2;
//       tmpdata["D4"].s = style2;
//       tmpdata["E4"].s = style2;
//       tmpdata["F4"].s = style2;
//       tmpdata["G4"].s = style2;
//       tmpdata["H4"].s = style2;
//       tmpdata["I4"].s = style2;
//       tmpdata["J4"].s = style2;
// //剩余行样式
//       for(let i = 6;i<=9;i++){
//         tmpdata["A"+i].s = style3;
//         tmpdata["B"+i].s = style3;
//         tmpdata["C"+i].s = style2;
//         tmpdata["D"+i].s = style2;
//         tmpdata["E"+i].s = style2;
//         tmpdata["F"+i].s = style2;
//         tmpdata["G"+i].s = style2;
//       }

//       tmpdata["!cols"]=[//设置列宽度
//         {wpx: 50},//序号
//         {wpx: 180},//发票抬头
//         {wpx: 100},//开票内容
//         {wpx: 100},//发票金额
//         {wpx: 90},//对应工作量月份
//         {wpx: 100},//预计回款时间
//         {wpx: 100},//对应项目名称
//         {wpx: 128},//发票类型
//         {wpx: 100},//税率
//         {wpx: 150},//备注
//       ];
//       tmpdata["!rows"]=[//设置行高度
//         {hpt: 50},//序号
//         {hpt: 150},//发票抬头
//         {hpt: 100},//开票内容
//         {hpt: 100},//发票金额

//       ];


    // let style0 = {
    //     border: border,
    //     alignment: {
    //         horizontal: "center",
    //         wrapText: true,
    //         vertical: "center"
    //     },
    //     font: {
    //         sz: 12,
    //         bold: true,
    //         color: {
    //             rgb: "f00"
    //         },
    //         outline: true
    //     },
    //     fill: {
    //         fgColor:{
    //             rgb:"ffffff"
    //         }
    //     },
    //     border : border
    // };
    // let style1 = {
    //     border: border,
    //     alignment: {
    //         horizontal: "center",
    //         wrapText: true,
    //         vertical: "center"
    //     },
    //     font: {
    //         sz: 12,
    //         bold: true,
    //         color: {
    //             rgb: "000000"
    //         },
    //         outline: true
    //     },
    //     fill: {
    //         fgColor:{
    //             rgb:"ffffff"
    //         }
    //     }
    // };
    // json.map((v, i) =>
    //         keyMap.map((k, j) =>
    //             Object.assign({}, {
    //                 v: v[k],
    //                 position: (j > 25 ? getCharCol(j) : String.fromCharCode(65 + j)) +
    //                     (i + 1)
    //             })
    //         )
    //     ).reduce((prev, next) => prev.concat(next)).forEach((v, i) => {
    //         // 在遍历时修改样式
    //         let s = {
    //             font: {
    //                 sz: 10,
    //                 name: "宋体"//微软雅黑
    //             },
    //             alignment: {
    //                 horizontal: "center",
    //                 wrapText: true,
    //                 vertical: "center"
    //             }
    //         };
    //         // 判断是否是标题
    //         if (config._this.title.includes(v.v) && v.position.length == 2 && v.position[1] == "1") {
    //             s.fill = {
    //                 fgColor: {
    //                     rgb: "008000"
    //                 }
    //             };
    //             s.border = {
    //                 right: {
    //                     style: "thin",
    //                     color: {
    //                         rgb: "000000"
    //                     }
    //                 }
    //             };
    //             // 判断是否是需要红色字体的标题字段
    //             if (config._this.redTitle.includes(v.v)) {
    //                 s.font.color = {
    //                     rgb: "ff0000"
    //                 };
    //             }
    //         }
    //         tmpdata[v.position] = {
    //             v: v.v || "",
    //             s
    //         };
    //     });
    // var outputPos = Object.keys(tmpdata); //设置区域,比如表格从A1到D10



    // //设置每列对应的宽度
    // tmpdata["!merges"] = [
    //     //工作表单元格合并配置项 可选
    //     { 
    //         s: { //s start 开始
    //             c: 0, //cols 开始列
    //             r: 0 //rows 开始行
    //         }, //开始 A1
    //         e: { //e end  结束
    //             c: 22, //cols 结束列
    //             r: 0 //rows 结束行
    //         }
    //     },
    //     {
    //         s: {
    //             c: 0,
    //             r: 1
    //         }, //开始 A2
    //         e: {
    //             c: 22,
    //             r: 1
    //         } //结束B2
    //     },
    //     // {
    //     //     s: {
    //     //         c: 3,
    //     //         r: 1
    //     //     }, //开始 C2
    //     //     e: {
    //     //         c: 4,
    //     //         r: 1
    //     //     } //结束D2
    //     // },
    // ]
    // // !cols工作表列宽配置项 可选
    // tmpdata["!cols"] = config.colwidth;

    // console.log(json)
    // //        第一二行样式
    // tmpdata["A1"].s = style0;
    // tmpdata["A2"].s = style0;
    // tmpdata["C2"].s = style0;

}
// 获取26个英文字母用来表示excel的列
function getCharCol(n) {
    let temCol = "",
        s = "",
        m = 0;
    while (n > 0) {
        m = (n % 26) + 1;
        s = String.fromCharCode(m + 64) + s;
        n = (n - m) / 26;
    }
    return s;
}

function s2ab(s) {
    if (typeof ArrayBuffer !== "undefined") {
        var buf = new ArrayBuffer(s.length);
        var view = new Uint8Array(buf);
        for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;
        return buf;
    } else {
        var buf = new Array(s.length);
        for (var i = 0; i != s.length; ++i) buf[i] = s.charCodeAt(i) & 0xff;
        return buf;
    }
}
// 下载功能
function saveAs(obj, fileName) {
    var tmpa = document.createElement("a");
    tmpa.download = fileName || "未命名";
    // 兼容ie 火狐 下载文件
    if ("msSaveOrOpenBlob" in navigator) {
        window.navigator.msSaveOrOpenBlob(obj, fileName);
    } else if (window.navigator.userAgent.includes("Firefox")) {
        var a = document.createElement("a");
        a.href = URL.createObjectURL(obj);
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
    } else {
        tmpa.href = URL.createObjectURL(obj);
    }
    tmpa.click();
    setTimeout(function () {
        URL.revokeObjectURL(obj);
    }, 100);
}
export default downloadExl;