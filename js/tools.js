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

//输入界面布局{}数据（以及当前界面尺寸信息），返回图文线三界面尺寸：[[图x,y,w,h]，[文x,y,w,h]，[线x,y,w,h]]
function hhsjmcc(bj,sz){
    let bl=[[0,0,0,0],[0,0,0,0],[0,0,0,0]]
    let re=[[0,0,0,0],[0,0,0,0],[0,0,0,0]]
    if(sz[0]>sz[1]){
      //横屏
      if(compareArrays(bj.vs,[1,1,1])){
        // console.log("均衡模式");
        bl=bj.h111
      }
      if(compareArrays(bj.vs,[1,1,0])){
        bl=bj.h110
      }
      if(compareArrays(bj.vs,[1,0,0])){
        bl=bj.h100
      }
      if(compareArrays(bj.vs,[0,1,1])){
        bl=bj.h011
      }
      if(compareArrays(bj.vs,[0,1,0])){
        bl=bj.h010
      }
      if(compareArrays(bj.vs,[1,0,1])){
        bl=bj.h101
      }
      if(compareArrays(bj.vs,[0,0,1])){
        bl=bj.h001
      }
    }else{
      //竖屏
      if(compareArrays(bj.vs,[1,1,1])){
        bl=bj.s111
      }
      if(compareArrays(bj.vs,[1,1,0])){
        bl=bj.s110
      }
      if(compareArrays(bj.vs,[1,0,0])){
        bl=bj.s100
      }
      if(compareArrays(bj.vs,[0,1,1])){
        bl=bj.s011
      }
      if(compareArrays(bj.vs,[0,1,0])){
        bl=bj.s010
      }
      if(compareArrays(bj.vs,[1,0,1])){
        bl=bj.s101
      }
      if(compareArrays(bj.vs,[0,0,1])){
        bl=bj.s001
      }
    }
    for (let i=0;i<re.length;i++){
      let b=bl[i]
      // console.log(b);
      re[i]=[sz[0]*b[0][0]/b[0][1],sz[1]*b[1][0]/b[1][1],sz[0]*b[2][0]/b[2][1],sz[1]*b[3][0]/b[3][1],]
    }
    // console.log(re);
    return re
}
//使用JSON序列化数组并比较两数组（生成的字符串）是否相等
function compareArrays(arr1, arr2) {
  return JSON.stringify(arr1) === JSON.stringify(arr2);
}
//导出
export {deepCopy,hhsjmcc}