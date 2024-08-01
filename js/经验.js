/*//**/
/*/1,json文件异步读取有点费时间。初始数据读取可能不如使用纯存json数据的js文件，从中导出（export）const供主js（import）使用。
/**/
////
/*/2,要在JavaScript中通过key名获取JSON数据，可以使用点.操作符或方括号[]
var json = {
  "name": "John Doe",
  "age": 30,
  "address": {
    "street": "123 Main St",
    "city": "Anytown"
  }
};

var name = json.name; // 获取name属性
var street = json.address.street; // 获取嵌套address对象的street属性
var name2 = json['name']; // 获取name属性
var street2 = json['address']['street']; // 获取嵌套address对象的street属性
//两种方法都可以根据key名获取JSON中的数据。使用点.操作符通常更简洁，但使用方括号[]可以在运行时动态指定属性名。
/**/
////
/*/3,localstorage保存json
在JavaScript中，你可以使用JSON.stringify()方法将JSON对象转换为字符串，然后使用localStorage.setItem()方法将其保存到localStorage中。
当你需要读取数据时，可以使用localStorage.getItem()方法获取字符串，然后使用JSON.parse()将字符串解析回JSON对象。
/**/
////
/*///2.2,可以使用方括号[]动态获取json数据
let obj={
数据1: [1,2,3],
数据2: [2,2,3],
数据3: [3,2,3],
}
for (let i in obj){
            console.log(typeof(i));
            console.log(i);
            console.log(obj[i]);
        }
/**/
////
/*///4,如何消去浏览器的边框的滚动条。
<!DOCTYPE html>
<html>
<head>
    <title>星河史</title>
    <!-- <link rel="stylesheet" href="css/maincs.css" type="text/css"> -->
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, minimal-ui" />
    <!-- <script type="text/javascript" src="js/tools.js"></script> -->
    <!-- <script type="text/javascript" id="myJsonData">src="./data.json"</script> -->
    <style>
        .noscrollbar {
          overflow: hidden;
        }
      </style>
</head>
<body style="width: 100%;height: 100%;margin: 0;padding: 0;overflow: hidden;">
    <div id="zhudiv" class="noscrollbar"></div>
    <script type="module" src="js/index.js"></script>
    <!-- body或class都可禁掉滚动条。class法标掉的滚动条在拉动（缩小）屏幕后还能出现。 -->
</body>
</html>
/**/
////
/**///5,setTimeout
setTimeout(()=>{somefunc()},5000)
setTimeout(somefunc(),5000)
//两者会有微妙的差异。
//为免除种种意料之外的麻烦，写成前一种比较省事。
/**/
////