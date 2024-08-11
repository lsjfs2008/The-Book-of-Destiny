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
/*///5,setTimeout
setTimeout(()=>{somefunc()},5000)
setTimeout(somefunc(),5000)
//两者会有微妙的差异。
//为免除种种意料之外的麻烦，写成前一种比较省事。
/**/
////
/*///6,bind(this)
class cesi {
  constructor() {
    this.sj = "cesi数据"
    this.k=6
    this.bindcs = new bindcesi(3,this)
    this.start()
  }
  start() {
    console.log("cesi开始")
    this.f(5)
  };
  f(x) {
    console.log("cesi：",`第${x}次测试`,  'this.sj:',this.sj,"this.k:",this.k)
  }
}
class pare{
  constructor(k) {
    this.k=k*9
  }
}
class bindcesi extends pare{
  constructor(k,that) {
    super(k)
    this.sj = "绑定测试数据0"
    this.bf(1)
    this.f=this.bf.bind(that)
    this.f(2)
    this.sj = "新绑定数据"
    this.bf(3)
    this.start()
  }
  bf(x) {
    this.k=this.k+10
    if(x===2){this.sj = "新绑定数据"+"x2时"}
    console.log(`第${x}次测试`, 'this.sj:',this.sj,"this.k:",this.k)
  };
  start() {
    console.log("bindstart")
    this.k=7
    this.sj="试试改变"
    console.log(this.k,this.sj);
    this.f(4)
  };
}
new cesi()
// bind使得函数f下的this，将会指向that.并且将无法使用其本体的this数据，比如本体的其它函数。其对this的改变也会传递至原that,因其指向同一个数据。
//this.bf(3)记下的log非常有启发性。它让我意识到，this.f=this.bf.bind(that)其实是新建了一个函数，其名为f,内容与bf相同，唯一差别是其内的this指向.
//f与bf皆可使用。使用f时，this指向that(cesi的this)。使用bf时，this指向bindsesi的this。'cesi的this'并没有“顶替”'bindsesi的this'。在其它没有'bind(that)'的函数包括bf中，'bindsesi的this'照常使用与被改变。
二：self,that
//使用function构造的类函数可以使用,比如self绑定this,that直接使用。从而实现同时使用两个不同来源的this…………理论上可行。还需测试。但是实现继承的代码有些啰嗦的感觉。
//测试类，做一些测试
function cesi(){
  let self=this
  this.sj="测试数据"
  this.f=function(){
    console.log("测试：",self.sj);
  }
  this.bindcs=new bindcesi(self)
}
function bindcesi(that){
  let self=this
  this.sj="绑定/引用测试数据"
  this.f=function(){
    console.log("测试：",self.sj);
  }
  this.start=function(){
    console.log("start");
    this.f()
    that.f()
  }
this.start()
}
new cesi()
三：Object.assign,重名问题需要考虑
class cesi {
  constructor() {
    this.sj = "cesi数据"
    this.k=6
    this.bindcs = new bindcesi(3,this)
    this.start()
  }
  start() {
    console.log("cesi开始")
    this.f(5)
  };
  f(x) {
    console.log("cesi：",`第${x}次测试`,  'this.sj:',this.sj,"this.k:",this.k)
  }
}
class pare{
  constructor(k) {
    this.k=k*9
  }
}
class bindcesi extends pare{
  constructor(k,that) {
    super(k)
    this.sj = "绑定测试数据0"
    this.f(1)
    Object.assign(this, that)
    this.f(2)
    this.sj = "新绑定数据"
    this.f(3)
    this.start()
  }
  f(x) {
    this.k=this.k+10
    console.log(`第${x}次测试`, 'this.sj:',this.sj,"this.k:",this.k)
  };
  start() {
    console.log("bindstart")
    this.f(4);
  };
}
new cesi()
//使用Object.assign(this, that)相当于把对象that并入了this。1,同名数据被顶替。方法没顶替。2，这边对数据的改变并不影响原对象。
/**/
////