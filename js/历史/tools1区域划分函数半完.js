import {pst} from './jmsj.js' 
//深度复制
function deepCopy(original) {
    let copy;
    if (original instanceof Array) {
      copy = [];
      for (let i = 0; i < original.length; i++) {
        copy[i] = deepCopy(original[i]);
      }
      return copy;
    } else if (original instanceof Object) {
      copy = {};
      for (let attr in original) {
        if (original.hasOwnProperty(attr)) {
          copy[attr] = deepCopy(original[attr]);
        }
      }
      return copy;
    } else {
      return original;
    }
  }
//调整界面大小//横屏或竖屏
function resize(){
	var screenheight=window.innerHeight;
    var screenwidth=window.innerWidth;
    var zhudiv=document.getElementById("zhudiv");
    zhudiv.style.position="relative";
    if (pst.hporsp===0){
        if (screenwidth<1.2*screenheight){
            screenheight=Math.floor(0.5625*screenwidth);
        }
        zhudiv.style.top=0.5*(window.innerHeight-screenheight)+"px";
    }else{
        if (screenwidth>0.7*screenheight){
            screenwidth=Math.floor(0.5625*screenheight);
        }
        zhudiv.style.left=0.5*(window.innerWidth-screenwidth)+"px";
    }
	zhudiv.style.width=screenwidth+"px";
	zhudiv.style.height=screenheight+"px";
    //顺便设定一下根元素的fontsize
    // document.documentElement.style.fontSize=0.1*screenheight+"px";
    //顺便返回界面的宽度和高度
    let re=[screenwidth,screenheight];
    console.log("re:",re);
    return re;    
}
//输入界面布局{}数据（以及当前界面尺寸信息），返回图文线三界面尺寸：[[图x,y,w,h]，[文x,y,w,h]，[线x,y,w,h]]
function hhsjmcc(bj,sz){
    let re=[[0,0,0,0],[0,0,0,0],[0,0,0,0]]
    if(sz[0]>sz[1]){
      //横屏
      let bl=bj.blh
      if(compareArrays(bj.vs,[1,1,1])){
        console.log("均衡模式");
        re[0]=[0,0,sz[0]*bl[0][0]/bl[0][1],sz[1]*bl[1][0]/bl[1][1]]
        re[1]=[sz[0]*bl[0][0]/bl[0][1],0,sz[0]-sz[0]*bl[0][0]/bl[0][1],sz[1]*bl[1][0]/bl[1][1]]
        re[2]=[0,sz[1]*bl[1][0]/bl[1][1],sz[0],sz[1]-sz[1]*bl[1][0]/bl[1][1]]
      }
      if(compareArrays(bj.vs,[1,1,0])){
        re[0]=[0,0,sz[0]*bl[0][0]/bl[0][1],sz[1]]
        re[1]=[sz[0]*bl[0][0]/bl[0][1],0,sz[0]-sz[0]*bl[0][0]/bl[0][1],sz[1]]
        re[2]=[0,sz[1],sz[0],0]
      }
      if(compareArrays(bj.vs,[1,0,0])){
        re[0]=[0,0,sz[0],sz[1]]
        re[1]=[sz[0],0,0,sz[1]]
        re[2]=[0,sz[1],sz[0],0]
      }
      if(compareArrays(bj.vs,[0,1,1])){
        re[0]=[0,0,0,sz[1]*bl[1][0]/bl[1][1]]
        re[1]=[0,0,sz[0],sz[1]*bl[1][0]/bl[1][1]]
        re[2]=[0,sz[1]*bl[1][0]/bl[1][1],sz[0],sz[1]-sz[1]*bl[1][0]/bl[1][1]]
      }
      if(compareArrays(bj.vs,[0,1,0])){
        re[0]=[0,0,0,sz[1]]
        re[1]=[0,0,sz[0],sz[1]]
        re[2]=[0,sz[1],sz[0],0]
      }
      if(compareArrays(bj.vs,[1,0,1])){
        re[0]=[0,0,sz[0],sz[1]*bl[1][0]/bl[1][1]]
        re[1]=[sz[0],0,0,sz[1]*bl[1][0]/bl[1][1]]
        re[2]=[0,sz[1]*bl[1][0]/bl[1][1],sz[0],sz[1]-sz[1]*bl[1][0]/bl[1][1]]
      }
      if(compareArrays(bj.vs,[0,0,1])){
        re[0]=[0,0,0,0]
        re[1]=[sz[0],0,0,0]
        re[2]=[0,0,sz[0],sz[1]]
      }
    }else{
      //竖屏
      let bl=bj.bls
    }
    // console.log(re);
    return re
}
//使用JSON序列化数组并比较两数组（生成的字符串）是否相等
function compareArrays(arr1, arr2) {
  return JSON.stringify(arr1) === JSON.stringify(arr2);
}
//导出
export {deepCopy,resize,hhsjmcc}