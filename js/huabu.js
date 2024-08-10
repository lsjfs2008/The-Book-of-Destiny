//画布类/对象
class Huabu{
    constructor(prid,sq){
      this.canvas = document.createElement('canvas')
      this.ctx = this.canvas.getContext('2d')
      document.getElementById(prid).appendChild(this.canvas)
      this.canvas.width=sq[2]
      this.canvas.height=sq[3]
      this.canvas.style=`position:absolute;left:${sq[0]}px;top:${sq[1]}px;`
    }
  pst(sq){
    this.canvas.width=sq[2]
    this.canvas.height=sq[3]
    this.canvas.style=`position:absolute;left:${sq[0]}px;top:${sq[1]}px;`
  }
}//画布类/对象
//文本画布类/对象
class wbHuabu extends Huabu{
    constructor(prid,sq,that){
        super(prid,sq)
        this.j=that
        this.wbbindsbevent=this.wbsbevent.bind(this)
        this.canvas.addEventListener('wheel',this.wbbindsbevent)
        this.canvas.addEventListener('mousedown',this.wbbindsbevent)
        this.canvas.addEventListener('dblclick',this.wbbindsbevent)
    }
////1,文本画布监听
wbsbevent(e){
    // console.log(e);
    //滚轮移动文本
    if(e.type==='wheel'){
        console.log(e.deltaY);
     this.wbyidong(e.deltaY)
     this.wbrender()
 }//滚轮移动文本
     //单击：折页/书签功能：//节点点击跳转
     if(e.type==='mousedown'){
         // console.log(e);
         let x=e.clientX - this.wbhuabu.canvas.getBoundingClientRect().left;
         let y=e.clientY - this.wbhuabu.canvas.getBoundingClientRect().top;
         // console.log(x,y);
         let xywh=this.cc[1]
         // console.log(xywh);
         let txy=xywh[2]+xywh[3]
         // let txy=xywh[0]+xywh[2]+xywh[1]+xywh[3]
         let dxy0=0.07*txy
         // console.log(dxy0);
         let dxy=txy-x-y
         if(dxy<dxy0){
             if(typeof(Storage)!=="undefined"){
                 console.log('暂且如此。后期不再存储为默认数据，而是保存为自命名书签。');
                 let zmm=jsd.wb[jsd.language].slwb.tt
                 localStorage.setItem(zmm,JSON.stringify(jsd));    //json转为str再保存
             }
         }else{
             let vi=jsd.buju.wbvs.wbqtt[0]
             let ysh=this.ysh[vi]
             let dqh=this.h[vi]
             if(this.zdy[vi]===1){
                 ysh=this.zdyysh[vi]
                 dqh=this.zdyh[vi]
             }
             let dj=hhdjjd(ysh,dqh,y)
             // console.log(ysh,dqh,y);
             // console.log(`第${dj}节点被点击`);
             if(this.zdy[vi]>0){
                 if(vi===0||vi===1){
                     if(this.jd012[vi][dj]===vi){this.jd012[vi][dj]=2}else{this.jd012[vi][dj]=vi}
                 }
                 if(vi===2){
                     this.jd012[vi][dj]=(this.jd012[vi][dj]+1)%3
                 }
             }
             this.qi=dj
             this.render()
             // this.bfwbrender(this.wbhuabu.canvas)
         }//单击选择节点，三相皆变
     }//单击
     //双击，当前显示模式在默认与自定义之间切换：
     if(e.type==='dblclick'){
         let vi=jsd.buju.wbvs.wbqtt[0]
         if(this.zdy[vi]>0){this.zdy[vi]=0}else{this.zdy[vi]=1}
         this.bfwbrender(this.wbhuabu.canvas)
     }//双击
 }//1,文本画布监听//
////1.1,配件，文本移动
wbyidong(y){
    let k=20
    let i=jsd.buju.wbvs.wbqtt[0]
    // console.log(this.zdy[i]);
    if(this.zdy[i]===0){
        if (y>0){this.h[i]=this.h[i]+k}else{this.h[i]=this.h[i]-k}
        if(this.h[i]<0){this.h[i]=0}
        if(this.h[i]>this.hmax[i]){this.h[i]=this.hmax[i]}
    }else{
        if (y>0){this.zdyh[i]=this.zdyh[i]+k}else{this.zdyh[i]=this.zdyh[i]-k}
        if(this.zdyh[i]<0){this.zdyh[i]=0}
        if(this.zdyh[i]>this.zdyhmax[i]){this.zdyh[i]=this.zdyhmax[i]}
    }
}//1.1,配件，文本移动//
}
