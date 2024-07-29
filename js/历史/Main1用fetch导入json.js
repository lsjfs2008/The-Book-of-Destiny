//主进程，设置处画面，获取屏幕尺寸，导入json数据
const screenWidth = window.innerWidth
const screenHeight = window.innerHeight
// let canvas = document.createElement('canvas')
// canvas.width = screenWidth
// canvas.height = screenHeight
// const ctx = canvas.getContext('2d')
//const jsnd=fetch('data.json').then(res=>res.json()).then(data=>{console.log(data);return data}).catch(err=>{console.log(err);})
// console.log(jsnd);
function CMain(){
    // console.log(jsnd);
    //网页内容不可选中
    document.onselectstart=function(){return false}
    //网页内容禁止鼠标右键
    document.oncontextmenu=function(){return false}
    //内容禁止鼠标拖动
    document.ondragstart=function(){return false}
    //网页内容禁止复制文本
    document.onselect=function(){return false}
/*随时更新主div界面尺寸 */
// zhudiv();
// window.onresize = function() {
// 	resize();
//     }
}

/*创建/修改主div的构造函数 */
function zhudiv(){
    resize();
    //加载菜单栏/标题封面
    youximenudiv();
    //测试用，直接加载游戏。
    //fmplay();    
}
//加载菜单栏/标题封面
function youximenudiv(){
    console.log("yxmenudiv");
    let yxmenudiv=document.createElement("div");
    yxmenudiv.id="yxmenudivid";
    yxmenudiv.style="position: absolute; left: 0; bottom:0; width: 100%; height: 100%;z-index: 999;";
    document.getElementById("zhujm").appendChild(yxmenudiv);
    //加载标题封面
    jzimg(jsnd.img.fm);
    //加载按钮（//透明）
    jzanniu(jsnd.btn.yxmenubtn);
    //加载点击监听
    document.getElementById(jsnd.btn.yxmenubtn.imgid[0]).addEventListener("click",function(){fmanniu(0);});
    document.getElementById(jsnd.btn.yxmenubtn.imgid[1]).addEventListener("click",function(){fmanniu(1);});
    document.getElementById(jsnd.btn.yxmenubtn.imgid[2]).addEventListener("click",function(){fmanniu(2);});
}
function fmanniu(e){
    if(e===0){fmplay()}     
    if(e===1){fmhelp()}     
    if(e===2){playmoregame()} 
}
// //点击区域/是否点在本区域
function djqy(x,y,q){
    let re=0
    if(x>q[0]&&x<q[2]+q[0]&&y>q[1]&&y<q[3]+q[1]){re=1}
    return re
}
//调整界面大小//横屏或竖屏
function resize(){
	var screenheight=window.innerHeight;
    var screenwidth=window.innerWidth;
    var zhudiv=document.getElementById("zhujm");
    zhudiv.style.position="relative";
    if (yxcst.hporsp===0){
        if (screenwidth<1.2*screenheight){
            screenheight=0.5625*screenwidth;
        }
        zhudiv.style.top=0.5*(window.innerHeight-screenheight)+"px";
    }else{
        if (screenwidth>0.7*screenheight){
            screenwidth=0.5625*screenheight;
        }
        zhudiv.style.left=0.5*(window.innerWidth-screenwidth)+"px";
    }
	zhudiv.style.width=screenwidth+"px";
	zhudiv.style.height=screenheight+"px";
    //顺便设定一下根元素的fontsize
    document.documentElement.style.fontSize=0.1*screenheight+"px";
    //顺便记录下界面的宽度和高度
    yxvar.jmw=screenwidth;
    yxvar.jmh=screenheight;
    //console.log(yxvar.jmh);
	//console.log(yxvar.jmw);
    //console.log(document.documentElement.style.fontSize);
}
function fmplay(){
    document.getElementById("yxmenudivid").style.visibility="hidden";
    //diqiu();
    // 场景
  var scene = new THREE.Scene();
 
  // 摄像机
  var camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,000);
 
  // 渲染器
  var renderer = new THREE.WebGLRenderer();
  renderer.setSize(yxvar.jmw,yxvar.jmh);
  //document.body.appendChild(renderer.domElement);
  document.getElementById("zhujm").appendChild(renderer.domElement);
  // 物体
  var geometry = new THREE.BoxGeometry(1,1,1);
  var material = new THREE.MeshBasicMaterial({color:0x00ff00});
  var cube = new THREE.Mesh(geometry,material);
  scene.add(cube);
 
  camera.position.z = 5;
  // 动画
  var animate = function(){
   requestAnimationFrame(animate);
   cube.rotation.x += 0.01;
   cube.rotation.y += 0.01;
   renderer.render(scene,camera);  //渲染
  };
  animate();
    console.log("play");
}
function fmhelp(){
    console.log("help");
}
function playmoregame(){
    window.open("img/background.jpg");
}