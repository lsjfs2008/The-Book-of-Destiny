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
        // this.wbbindsbevent=this.wbsbevent
        this.canvas.addEventListener('wheel',this.wbbindsbevent)
        this.canvas.addEventListener('mousedown',this.wbbindsbevent)
        this.canvas.addEventListener('dblclick',this.wbbindsbevent)
    }
//1,文本画布监听
wbsbevent(e){
    // console.log(e);
    //滚轮移动文本
    if(e.type==='wheel'){
        // console.log(e.deltaY);
        // console.log(this.j);
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
             this.j.ijump(dj)
            //  this.j.render(1)
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
                if(e.deltaY>0){this.j.ichange(1)}else{this.j.ichange(0)}
                // if(e.deltaY>0){this.j.qi+=1}else{this.j.qi-=1}
                // if(this.j.qi<0){this.j.qi=0}
                // if(this.j.qi>this.j.q.length-1){this.j.qi=this.j.q.length-1}
            }
        // this.j.render(1)
    }//滚轮移动文本
        //节点点击跳转
        if(e.type==='mousedown'){
            // console.log(e);
            let x=e.clientX - this.canvas.getBoundingClientRect().left;
            // let y=e.clientY - this.canvas.getBoundingClientRect().top;
            let dj=this.hhsxdj(x)
            this.j.ijump(dj)
            // this.j.qi=dj
            // console.log(this.j.qi);
            // this.j.render(1)
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
//////三，地图画布类/对象
class dtHuabu extends Huabu{
    constructor(prid,sq,that){
        super(prid,sq)
        this.j=that     //留待缩减传参量…………
        // this.bindsbevent=this.sbevent.bind(that)     //这种方法固然方便，但也妨碍了使用本体的this数据。。虽然这里并没有。
        this.bindsbevent=this.sbevent.bind(this)
        this.canvas.addEventListener('wheel',this.bindsbevent)
        this.canvas.addEventListener('mousedown',this.bindsbevent)
        this.canvas.addEventListener('dblclick',this.bindsbevent)
    }
////1,画布监听
sbevent(e){
    let x=e.clientX - this.canvas.getBoundingClientRect().left;
    let y=e.clientY - this.canvas.getBoundingClientRect().top;
    let cc=this.j.cc
    let c=this.j.c
    let vs=this.j.vs
    let ms=this.j.map.img.siz
    //鼠标拖动地图。
    if(e.type==="mousemove"){
        if (jsd.mapisDragging) {
            let x= e.clientX - canvas.getBoundingClientRect().left;
            let y= e.clientY - canvas.getBoundingClientRect().top;
            let dx=x-jsd.offsetX
            let dy=y-jsd.offsetY
            jsd.offsetX=x
            jsd.offsetY=y
            jsd.c=this.j.dt.move(c,dx,dy)
            // console.log(x,y,dx,dy);
            this.j.render()
        }
    }
    //1区，地图区：
    // if(vs[0]>0){
    if(inarea(x,y,cc[0])){
        //地图缩放按钮：
    if(inarea(x,y,this.j.dt.btn.p.s)){
        if(e.type==="mousedown"){
            let s=this.j.dt.btn.p.s
            // console.log(x,y,s);
            let h=s[3]
            let dy=y-s[1]
            let k=1
            let dh=4/h
            k=Math.floor(dy*dh)
            jsd.c=this.j.dt.zoom(c,x,y,k)
            this.j.render()
        }
    }else{
        //鼠标拖动地图,
        if(e.type==="mousedown"){
            jsd.mapisDragging = true;   //保留jsd.mapisDragging作为全局变量，以便全局监听松开鼠标的动作。
            jsd.offsetX = x
            jsd.offsetY = y
            canvas.style.cursor = 'grabbing';
        canvas.addEventListener('mousemove',this.bindsbevent)
        }
        //滚轮缩放地图
        if(e.type==='wheel'){
            let k=0
            if (e.deltaY>0){k=2}
            jsd.c=this.j.dt.zoom(c,x,y,k)
            this.j.render()
        }
        //双击地图自动聚焦目标地点（为地图中心或尽量靠近中心）
        if(e.type==='dblclick'){
            // console.log('db');
            jsd.c=this.j.dt.focus(c,x,y)
            this.j.render()
        }
    }
    // }
    }//1区，地图区//
    // if(e.type==="mousemove"){
    //     if (jsd.mapisDragging) {
    //         let x= e.clientX - canvas.getBoundingClientRect().left;
    //         let y= e.clientY - canvas.getBoundingClientRect().top;
    //         let dx=x-jsd.offsetX
    //         let dy=y-jsd.offsetY
    //         jsd.offsetX=x
    //         jsd.offsetY=y
    //         jsd.c=jsd.bg[0].move(c,dx,dy)
    //         // console.log(x,y,dx,dy);
    //         this.render()
    //     }
    // }
        //  //双击，当前移动模式在默认与自定义之间切换：两种移动模式：默认跳转到下一个节点。自定义留待多线对比时再做。
        //  if(e.type==='dblclick'){
        //      let vi=jsd.buju.wbvs.wbqtt[0]
        //      if(this.j.zdy[vi]>0){this.j.zdy[vi]=0}else{this.j.zdy[vi]=1}
        //      this.sxrender(this.wbhuabu.canvas)
        //  }//双击
    }//1,画布监听//
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