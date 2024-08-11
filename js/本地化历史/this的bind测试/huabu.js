//////一，画布类/对象
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
}//一，画布类/对象////
//////二，文本画布类/对象
class wbHuabu extends Huabu{
    constructor(prid,sq,that){
        super(prid,sq)
        this.j=that
        // console.log(that);
        this.wbbindsbevent=this.wbsbevent.bind(this)
        this.canvas.addEventListener('wheel',this.wbbindsbevent)
        this.canvas.addEventListener('mousedown',this.wbbindsbevent)
        this.canvas.addEventListener('dblclick',this.wbbindsbevent)
    }
//1,文本画布监听
wbsbevent(e){
    // console.log(e);
    //滚轮移动文本
    if(e.type==='wheel'){
        console.log(e.deltaY);
     this.wbyidong(e.deltaY)
     this.j.wbrender()
 }//滚轮移动文本
     //单击：折页/书签功能：//节点点击跳转
     if(e.type==='mousedown'){
         // console.log(e);
         let x=e.clientX - this.canvas.getBoundingClientRect().left;
         let y=e.clientY - this.canvas.getBoundingClientRect().top;
         // console.log(x,y);
         let xywh=this.j.cc[1]
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
             let ysh=this.j.ysh[vi]
             let dqh=this.j.h[vi]
             if(this.j.zdy[vi]===1){
                 ysh=this.j.zdyysh[vi]
                 dqh=this.j.zdyh[vi]
             }
             let dj=hhdjjd(ysh,dqh,y)
             // console.log(ysh,dqh,y);
             // console.log(`第${dj}节点被点击`);
             if(this.j.zdy[vi]>0){
                 if(vi===0||vi===1){
                     if(this.j.jd012[vi][dj]===vi){this.j.jd012[vi][dj]=2}else{this.j.jd012[vi][dj]=vi}
                 }
                 if(vi===2){
                     this.j.jd012[vi][dj]=(this.j.jd012[vi][dj]+1)%3
                 }
             }
             this.j.qi=dj
             this.j.render()
             // this.bfwbrender(this.wbhuabu.canvas)
         }//单击选择节点，三相皆变
     }//单击
     //双击，当前显示模式在默认与自定义之间切换：
     if(e.type==='dblclick'){
         let vi=jsd.buju.wbvs.wbqtt[0]
         if(this.j.zdy[vi]>0){this.j.zdy[vi]=0}else{this.j.zdy[vi]=1}
         this.bfwbrender(this.wbhuabu.canvas)
     }//双击
 }//1,文本画布监听
//1.1,配件，文本移动
wbyidong(y){
    let k=20
    let i=jsd.buju.wbvs.wbqtt[0]
    // console.log(this.j.zdy[i]);
    if(this.j.zdy[i]===0){
        if (y>0){this.j.h[i]=this.j.h[i]+k}else{this.j.h[i]=this.j.h[i]-k}
        if(this.j.h[i]<0){this.j.h[i]=0}
        if(this.j.h[i]>this.j.hmax[i]){this.j.h[i]=this.j.hmax[i]}
    }else{
        if (y>0){this.j.zdyh[i]=this.j.zdyh[i]+k}else{this.j.zdyh[i]=this.j.zdyh[i]-k}
        if(this.j.zdyh[i]<0){this.j.zdyh[i]=0}
        if(this.j.zdyh[i]>this.j.zdyhmax[i]){this.j.zdyh[i]=this.j.zdyhmax[i]}
    }
}//1.1,配件，文本移动
//2,显示…………延后
render(){
}//2,显示
}//二，文本画布类/对象////
//////三，时线画布类/对象
class sxHuabu extends Huabu{
    constructor(prid,sq,that){
        super(prid,sq)
        this.j=that     //留待缩减传参量…………
        // this.bindsbevent=this.sbevent.bind(that)
        this.bindsbevent=this.sbevent.bind(this)
        this.canvas.addEventListener('wheel',this.bindsbevent)
        this.canvas.addEventListener('mousedown',this.bindsbevent)
        this.canvas.addEventListener('dblclick',this.bindsbevent)
    }
////1,时线画布监听
sbevent(e){
        // console.log(this);
        // console.log(e);
        //滚轮移动时线//两种模式：人物传记时，固定时区，移动当前时间游标。编年史时，时间游标居中，移动时区。sx.lx:人物线，世界线
        //
        if(e.type==='wheel'){
            if(this.j.sx.lx==='人物线'){
                //两种移动模式：默认跳转到下一个节点。自定义留待多线对比时再做。
                if(e.deltaY>0){this.j.qi+=1}else{this.j.qi-=1}
            }
        this.j.render()
    }//滚轮移动文本
        //节点点击跳转
        if(e.type==='mousedown'){
            let x=e.clientX - this.canvas.getBoundingClientRect().left;
            // let y=e.clientY - this.canvas.getBoundingClientRect().top;
            let dj=this.hhsxdj(x)
            this.j.qi=dj
            console.log(this.j.qi);
            this.j.render()
        }//单击
        //  //双击，当前移动模式在默认与自定义之间切换：两种移动模式：默认跳转到下一个节点。自定义留待多线对比时再做。
        //  if(e.type==='dblclick'){
        //      let vi=jsd.buju.wbvs.wbqtt[0]
        //      if(this.j.zdy[vi]>0){this.j.zdy[vi]=0}else{this.j.zdy[vi]=1}
        //      this.sxrender(this.wbhuabu.canvas)
        //  }//双击
    }//1,时线画布监听//
hhsxdj(x){
    let sqx=this.j.cc[2][0]
    let jdsq=this.j.jdsq
    let re=jdsq.length-1
    if(x>jdsq[jdsq.length-1][0]-sqx){return re}
    for (let i=1;i<jdsq.length;i++){
        if(x<jdsq[i][0]-sqx){re=i-1;return re}
    }
}
}//三，地图画布类/对象////
//////三，时线画布类/对象
class dtHuabu extends Huabu{
    constructor(prid,sq,that){
        super(prid,sq)
        // this.j=that     //留待缩减传参量…………
        this.css="地图画布数据01"
        this.xcs(1)
        this.bindsbevent=this.sbevent.bind(that)
        // this.bindsbevent=this.sbevent.bind(this)
        this.canvas.addEventListener('wheel',this.bindsbevent)
        this.canvas.addEventListener('mousedown',this.bindsbevent)
        this.canvas.addEventListener('dblclick',this.bindsbevent)
        this.xcs(2)
        this.css="地图画布数据02"
        console.log("测试this的跨对象引用，这里是地图画布类：",this.css);
        this.xcs(3)
    }
////1,时线画布监听
sbevent(e){
        // console.log(this);
        // console.log(e);
        //滚轮移动时线//两种模式：人物传记时，固定时区，移动当前时间游标。编年史时，时间游标居中，移动时区。sx.lx:人物线，世界线
        //
        if(e.type==='wheel'){
        //     if(this.j.sx.lx==='人物线'){
        //         //两种移动模式：默认跳转到下一个节点。自定义留待多线对比时再做。
        //         if(e.deltaY>0){this.j.qi+=1}else{this.j.qi-=1}
        //     }
        // this.j.render()
        this.cs(4)
        this.xcs(4)
    }//滚轮移动文本
        //节点点击跳转
        if(e.type==='mousedown'){
            let x=e.clientX - this.canvas.getBoundingClientRect().left;
            // let y=e.clientY - this.canvas.getBoundingClientRect().top;
            let dj=this.hhsxdj(x)
            this.j.qi=dj
            console.log(this.j.qi);
            this.j.render()
        }//单击
        //  //双击，当前移动模式在默认与自定义之间切换：两种移动模式：默认跳转到下一个节点。自定义留待多线对比时再做。
        //  if(e.type==='dblclick'){
        //      let vi=jsd.buju.wbvs.wbqtt[0]
        //      if(this.j.zdy[vi]>0){this.j.zdy[vi]=0}else{this.j.zdy[vi]=1}
        //      this.sxrender(this.wbhuabu.canvas)
        //  }//双击
    }//1,时线画布监听//
hhsxdj(x){
    let sqx=this.j.cc[2][0]
    let jdsq=this.j.jdsq
    let re=jdsq.length-1
    if(x>jdsq[jdsq.length-1][0]-sqx){return re}
    for (let i=1;i<jdsq.length;i++){
        if(x<jdsq[i][0]-sqx){re=i-1;return re}
    }
}
xcs(k){
    console.log("测试this的跨对象引用，这里是地图画布类：",`第${k}次测试`,this.css);
    this.css="地图画布数据1"
    console.log("测试this的跨对象引用，这里是地图画布类：",`第${k}次测试`,this.css);
}
}//三，地图画布类/对象////