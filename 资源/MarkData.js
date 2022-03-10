var fs = require('fs');
function pathjoin (a, b) {
  return a + "/" + b;
}

// 获取指定路径 path 下的，默认深度为 3 的目录 JSON
function getIndexByPath(dir, deep) {
    var dirDevide = dir.split('/');
    var preDir = dirDevide.splice(0, dirDevide.length - 1).join('/');
    var index = [];
    getIndexOfPathByDeep(index, pathjoin(__dirname, preDir), dirDevide[0], deep + 1);
    return index;
}
// 开始对指定 path 递归查找深度为 deep 深度
function getIndexOfPathByDeep(obj, dir, curDir, deep) {
    var curPath = pathjoin(dir, curDir);
    // 达到搜索深度，停止
    if(deep) { 
        if(fs.statSync(curPath).isDirectory()) {
            if (deep - 1) {
							var item = {};            
							obj.push(item);
							item[curDir] = [];
							var lists = fs.readdirSync(curPath);
							for (var i=0; i<lists.length; i++) {
								var list = lists[i];
								getIndexOfPathByDeep(item[curDir], curPath, list, deep - 1);
							}
            }   
        } else {
					obj.push(curDir)
        }
    }

}

var data = getIndexByPath('/', 3);
console.log('Write File...');
fs.writeFile('../data.json', JSON.stringify(data[0]['']), {}, ()=> {
	console.log('OK');
});

// console.log(JSON.stringify(data));