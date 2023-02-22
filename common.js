
// 防抖方法在vue使用debounce(function,时间)
export function debounce(fn, delay) {
  let timeout = null;
  return function () {
    let args = arguments;
    timeout && window.clearTimeout(timeout);
    timeout = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

// 将字符串中精度缺失的数字转成字符串，例：id1:352677239567885445
export function getToString(baseStr) {
  if (!baseStr || typeof baseStr != 'string') return;
  let jsonData = null;
  try {
    jsonData = JSON.parse(baseStr);
  } catch (err) {
    return null;
  }
  let needReplaceStrs = [];
  loopFindArrOrObj(jsonData, needReplaceStrs);
  needReplaceStrs.forEach(function (replaceInfo) {
    let matchArr = baseStr.match(eval('/"' + replaceInfo.key + '":[0-9]{15,}/'));
    if (matchArr) {
      let str = matchArr[0];
      let replaceStr = str.replace('"' + replaceInfo.key + '":', '"' + replaceInfo.key + '":"');
      replaceStr += '"';
      baseStr = baseStr.replace(str, replaceStr);
    }
  });
  let returnJson = null;
  try {
    returnJson = JSON.parse(baseStr);
  } catch (err) {
    return null;
  }
  return returnJson;
}

//遍历对象类型的
function getNeedRpStrByObj(obj, needReplaceStrs) {
  for (var key in obj) {
    var value = obj[key];
    if (typeof value == 'number' && value > 9007199254740992) {
      needReplaceStrs.push({ key: key });
    }
    loopFindArrOrObj(value, needReplaceStrs);
  }
}

//遍历数组类型的
function getNeedRpStrByArr(arr, needReplaceStrs) {
  for (var i = 0; i < arr.length; i++) {
    var value = arr[i];
    loopFindArrOrObj(value, needReplaceStrs);
  }
}

//递归遍历
function loopFindArrOrObj(value, needRpStrArr) {
  var valueTypeof = Object.prototype.toString.call(value);
  if (valueTypeof == '[object Object]') {
    needRpStrArr.concat(getNeedRpStrByObj(value, needRpStrArr));
  }
  if (valueTypeof == '[object Array]') {
    needRpStrArr.concat(getNeedRpStrByArr(value, needRpStrArr));
  }
}

/**end */


// 时间问题 start
// 获取24时间点
export function get24TimePoints() {
  const data = [];
  for (let i = 0; i <= 24; i++) {
    let tmp1 = "";
    if (i <= 9) {
      tmp1 = "0" + i + ":00";
    } else if (i <= 24) {
      tmp1 = i + ":00";
    }
    if (tmp1) {
      data.push(tmp1);
    }
  }
  return data;
}

//48时间点
export function get48TimePoints() {
  const data = [];
  for (let i = 0; i <= 24; i++) {
    let tmp1 = "";
    if (i <= 9) {
      for (let j = 0; j < 2; j++) {
        const value = j * 30 < 10 ? `0${j * 30}` : `${j * 30}`;
        tmp1 = "0" + i + `:${value}`;
        data.push(tmp1);
      }
    } else if (i <= 23) {
      for (let j = 0; j < 2; j++) {
        const value = j * 30 < 10 ? `0${j * 30}` : `${j * 30}`;
        tmp1 = i + `:${value}`;
        data.push(tmp1);
      }
    } else if (i == 24) {
      tmp1 = i + ":00";
      data.push(tmp1);
    }
  }
  return data;
}

// 96时间点
export function get96TimePoints() {
  const dataList = [];
  let count = 0;
  for (let i = 0; i <= 24; i++) {
    if (i < 10) {
      if (i === 0) {
        for (let j = 1; j < 4; j++) {
          count += 1;
          const data = `0${i}:${j * 15}`;
          dataList.push({
            label: data,
            prop: `p${count * 3}`,
          });
        }
      } else {
        for (let j = 0; j < 4; j++) {
          count += 1;
          let data = "";
          if (j === 0) {
            data = `0${i}:00`;
          } else {
            data = `0${i}:${j * 15}`;
          }
          dataList.push({
            label: data,
            prop: `p${count * 3}`,
          });
        }
      }
    } else if (i < 24) {
      for (let j = 0; j < 4; j++) {
        count += 1;
        let data = "";
        if (j === 0) {
          data = `${i}:00`;
        } else {
          data = `${i}:${j * 15}`;
        }
        dataList.push({
          label: data,
          prop: `p${count * 3}`,
        });
      }
    } else {
      count += 1;
      dataList.push({
        label: `24:00`,
        prop: `p${count * 3}`,
      });
    }
  }
  return dataList;
}

// 288时间点
export function get288TimePoints() {
  const dataList = [];
  let count = 0;
  for (let i = 0; i <= 24; i++) {
    if (i < 10) {
      if (i === 0) {
        for (let j = 1; j <= 11; j++) {
          count += 1;
          let data = "";
          if (j == 1) {
            data = `00:05`;
          } else {
            data = `0${i}:${j * 5}`;
          }
          dataList.push({
            label: data,
            prop: `p${count}`,
          });
        }
      } else {
        for (let j = 0; j < 12; j++) {
          count += 1;
          let data = "";
          if (j === 0) {
            data = `0${i}:00`;
          } else if (j == 1) {
            data = `0${i}:0${j * 5}`;
          } else {
            data = `0${i}:${j * 5}`;
          }
          dataList.push({
            label: data,
            prop: `p${count}`,
          });
        }
      }
    } else if (i < 24) {
      for (let j = 0; j < 12; j++) {
        count += 1;
        let data = "";
        if (j === 0) {
          data = `${i}:00`;
        } else if (j == 1) {
          data = `${i}:0${j * 5}`;
        } else {
          data = `${i}:${j * 5}`;
        }
        dataList.push({
          label: data,
          prop: `p${count}`,
        });
      }
    } else {
      count += 1;
      dataList.push({
        label: `24:00`,
        prop: `p${count}`,
      });
    }
  }
  return dataList;
}
/**end */


// 表格合并
// 把需要合并行的归类 
export function objectSpanMethod({ row, column, rowIndex, columnIndex }) {
  if (columnIndex == 0) {
    // 第一列的合并方法,省
    const row1 = (flitterData(this.tableData).one)[rowIndex]
    const col1 = row1 > 0 ? 1 : 0 // 如果被合并了_row=0则它这个列需要取消
    return {
      rowspan: row1,
      colspan: col1
    }
  }
  if (columnIndex == 1) {
    // 第一列的合并方法,省
    // const row1 = this.tableArr[rowIndex]
    const row1 = (flitterData(this.tableData).two)[rowIndex]
    const col1 = 1 // 如果被合并了_row=0则它这个列需要取消
    return {
      rowspan: row1,
      colspan: col1
    }
  }

}

// arr参数是表格的数据
function flitterData(arr) {
  let spanOneArr = []
  let concatOne = 0

  let spanTwoArr = []
  let concatTwo = 0

  arr.forEach((item, index) => {
    if (index === 0) {
      spanOneArr.push(1);
      spanTwoArr.push(1)
    } else {
      //loadRange 修改
      if (item.loadRange === arr[index - 1].loadRange) { //第一列需合并相同内容的判断条件
        spanOneArr[concatOne] += 1;
        spanOneArr.push(0);
      } else {
        spanOneArr.push(1);
        concatOne = index;
      };


      //dcRange 修改
      if (item.dcRange === arr[index - 1].dcRange) { //第二列需合并相同内容的判断条件
        spanTwoArr[concatTwo] += 1;
        spanTwoArr.push(0);
      } else {
        spanTwoArr.push(1);
        concatTwo = index;
      };

    }
  });
  return {
    one: spanOneArr,
    two: spanTwoArr,
  }
}