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
            //  this.j.qi=dj
             console.log(dj);
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
        this.q=that.q
        this.qi=that.qi
        this.gs=that.gs
        this.cc=that.cc
        this.c=that.c
        this.sr=that.sr
        this.maps=that.maps
        this.exy=that.exy
        this.language=that.language
        //如果当前qi指定了地图，择取指定地图，不然，从备选maps中生成/择取当前qi地图，不然，从地图库中匹配当前地图
        this.dt=new Mapimg(dings.csdt,this.cc[0])
        this.zqdt()
        this.update()
        // this.ijump=that.ijump()
        // this.bindsbevent=this.sbevent.bind(that)     //这种方法固然方便，但也妨碍了使用本体的this数据。。虽然这里并没有。
        this.bindsbevent=this.sbevent.bind(this)
        this.canvas.addEventListener('wheel',this.bindsbevent)
        this.canvas.addEventListener('mousedown',this.bindsbevent)
        this.canvas.addEventListener('dblclick',this.bindsbevent)
        document.addEventListener('mouseup', () => {
            this.mapisDragging = false;
            this.canvas.style.cursor = 'default';
            this.canvas.removeEventListener('mousemove',this.bindsbevent)
          });//鼠标拖动地图,松开鼠标不需集成。
    }
//更新数据
update(k){
    this.scmapp()
    let sc=this.cc[0]
    let c=[]
    if(!!k){
        if(k==='dt'){
            console.log(this.c);
            c=deepCopy(this.c)
            let mxy=this.dqmapp[this.qi[2]][3]
            // console.log(this.qi,mxy);
            let re=this.dt.zoom(c,this.exy[0],this.exy[1],4,mxy[0],mxy[1])
            this.c=deepCopy(re)
            console.log(this.c);
    // console.log(this.cbf);
            // this.c=deepCopy(this.cbf)
        }
    }else{
        c=[0,0,this.dt.width,this.dt.height,sc[0],sc[1],sc[2],sc[3]]
        this.c=this.dt.zoom(c,0.5*c[6],0.5*c[7],3)
        console.log(this.c);
    }
    // console.log(this.c);
    // console.log(this.cbf);
    //1.等比例缩放图片以匹配显示区域，多余的裁剪。中心定位。
    
    // console.log(c);
    // jsd.mapp=jwdd.xd    //临时（系列）地理点：{key:[地点名，地理上的经度,纬度]} 
    //2.生成地图缩放工具的位置
    if(1){
        this.dt.btn=deepCopy(bians.btns.map)
        let btn=this.dt.btn
        let p=btn.p
        let s=p.s
        s[0]=sc[2]*p.l[0]/p.l[1]
        s[2]=sc[2]*p.w[0]/p.w[1]
        s[3]=sc[3]*p.h[0]/p.h[1]
        if(s[3]<4*s[2]){s[3]=4*s[2]}else{s[2]=0.25*s[3]}
        if(s[3]<p.hm[0]){s[3]=p.hm[0]}
        if(s[3]>p.hm[1]){s[3]=p.hm[1]}
        s[2]=0.25*s[3]
        s[1]=sc[3]*(p.b[1]-p.b[0])/p.b[1]-s[3]
        p.s=s
    }
    
    // 调用render
    // this.dtrender()
    this.dt.img.onload=()=>{this.render()}
}
//绘制
render(){
    let canvas=this.canvas
    let ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    if(jsd.vs[0]>0){
        let c=this.c
        this.dt.drawToCanvas(ctx,c)
    //子节点“动画”
    //绘制所有this.dqmapp中的点。
    let q=this.q
    let qi=this.qi
    let mpp=this.dqmapp
    for (let i=0;i<mpp.length;i++){
        let mp=mpp[i][3]
        let c=this.c
        let xmp=[(mp[0]-c[0])*c[6]/c[2],(mp[1]-c[1])*c[7]/c[3]]
        xmp[0]=Math.round(xmp[0])
        xmp[1]=Math.round(xmp[1])
        // console.log(spk,xmp);
        // ctx.globalAlpha=jsd.buju.globalAlpha.pp
        ctx.globalAlpha=1
        ctx.beginPath();
        ctx.arc(xmp[0],xmp[1],5,0,2*Math.PI);
        ctx.stroke();
        for (let j=0;j<mpp[i][2].length;j++){
            if(qi[0]===mpp[i][2][j]){
                let wb=mpp[i][0]
                let wbp=mpp[i][4]
                let xwbp=[(wbp[0]-c[0])*c[6]/c[2],(wbp[1]-c[1])*c[7]/c[3]]
                xwbp[0]=Math.round(xwbp[0])
                xwbp[1]=Math.round(xwbp[1])
                ctx.font=this.gs.dtp.font
                ctx.fillStyle=this.gs.dtp.s
                let zjd=q[qi[0]].stpr[qi[1]]
                if(!!zjd.p){
                    for (let k=0;k<zjd.p.length;k++){
                        // console.log(wb,q[qi[0]].p[zjd.p[k]]);
                        // console.log(wb===q[qi[0]].p[zjd.p[k]]);
                        if(wb===q[qi[0]].p[zjd.p[k]]){ctx.fillStyle=this.gs.dtp.s1}
                    }
                }
                // console.log(wb,xwbp[0],xwbp[1]);
                ctx.fillText(wb,xwbp[0],xwbp[1]);
                ctx.fillStyle=this.gs.dtp.s
            }
        }

    }
        //1.3,加载悬浮按钮……地图缩放工具
        let mbp=this.dt.btn.p.s
        ctx.drawImage(jsd.mapbtn,mbp[0],mbp[1],mbp[2],mbp[3])
        //  //
    }
}
//配件，生成当前所用地图点dqmapp
scmapp(){
    //3.生成所有节点地名在地图上的位置，地点去重复：this.dqmapp。数据结构：[[地名，[(地点)x,y],[(地名)x,y],[[涉及qi],……]],……]。地名字符去重叠。
        //3.1,初步生成所有节点地点，地名在地图上的位置
        let q=this.q
        let qi=this.qi
        //3.1.1获取所有去重复地点，构成临时lsp数据：[去重复地名p，对应的pp,[涉及的qi]]
        let lsp=[]
        for (let i=0;i<q.length;i++){
            let jd=q[i]
            let jdp=jd.p
            let jdpp=jd.pp
            for (let j=0;j<jdp.length;j++){
                let pn=jdp[j]
                let cf=0
                let cfd=-1
                for (let k=0;k<lsp.length;k++){
                    if(pn===lsp[k][0]){cf=1,cfd=k}
                }
                if(cf===0){
                    let ls=[pn,jdpp[j],[i]]
                    lsp.push(ls)
                }else{lsp[cfd][2].push(i)}
            }
        }
        // console.log(lsp);
        //3.1.2从临时lsp数据生成当前地图的地点位置
        for (let i=0;i<lsp.length;i++){
            let mp=[]
            let yp=lsp[i][1]
        //    if(lsp[i][0]==='当阳'){console.log(yp);}
            if(this.sr.mrmapm===this.map.ming){
                if(yp[0][2]>0){mp=yp[0]}else{mp=hhdtd(yp[1],this.map,'xy')}
            }else{
                // console.log('从临时lsp数据生成当前地图的地点位置');
                if(yp[1][2]>0){mp=hhdtd(yp[1],this.map,'xy')}else{
                    // console.log(lsp[i][0],yp);
                    if(yp[0][2]>0){
                        mp=this.hhnhxy(yp[0],this.map)//临时，此处等比例拟合……
                // console.log(spk,mp);
                    }else{
                        let ls=hhdtd(yp[1],this.map,'xy');mp=this.hhnhxy(ls,this.map)}
                    }
                }
            lsp[i].push(mp)
            let lsmp=deepCopy(mp)
            lsp[i].push(lsmp)
        }
        //3.1.3,地名去重叠
        for (let i=0;i<lsp.length;i++){
            let gs=this.gs.dtp
            ctx.font=gs.font
            let w=ctx.measureText(lsp[i][0]).width
            let h=ctx.measureText('测').width
            // console.log(lsp[i],w);
            let wbi=lsp[i][4]
            let cd=0
            for (let j=0;j<lsp.length;j++){
                let wbj=lsp[j][4]
                if(i!==j){
                    let dx=wbj[0]-wbi[0]
                    let dy=Math.abs(wbj[1]-wbi[1])
                    if(dx>=0&&dx<w&&dy<h){
                        cd=1
                    }
    
                }
            }
            if(cd>0){lsp[i][4][0]=lsp[i][4][0]-w}
        }
        this.dqmapp=lsp
        // console.log(this.dqmapp);
}
//临时配件，输入原xy0，原mrmap,新map,拟合一个新地图上的xy并返回。
hhnhxy(xy0,map){
    //1,获取参考点。
    let q=this.q
    let ckd=[]
    let ckdxy0=[]
    let ckdjw=[]
    let ckdxy=[]
    for (let i=0;i<q.length;i++){
        let jd=q[i]
        let pp=jd.pp
        for (let j=0;j<pp.length;j++){
            if(pp[j][0][2]===1&&pp[j][1][2]===1){
                let cf=0
                for (let k=0;k<ckd.length;k++){
                    if(pp[j][0][0]===ckd[k][0][0]&&pp[j][0][1]===ckd[k][0][1]){cf=1}
                }
                if(cf===0){ckd.push(pp[j]);ckdxy0.push(pp[j][0]);ckdjw.push(pp[j][1])}}
        }
    }
    // console.log(ckd,ckdxy0,ckdjw);
    for (let i=0;i<ckdjw.length;i++){
        let xy=hhdtd(ckdjw[i],map,'xy')
        xy[0]=Math.round(xy[0])
        xy[1]=Math.round(xy[1])
        ckdxy.push(xy)
    }
    // console.log(ckdxy);
    //新老地图的xy伸缩比
    let ssb=[]
    let zsb=[[0,0],[0,0]]
    for (let i=0;i<ckdxy.length;i++){
        let p0=ckdxy0[i]
        let p=ckdxy[i]
        for (let j=i+1;j<ckdxy.length;j++){
            let xy0=ckdxy0[j]
            let xy=ckdxy[j]
            let dx0=xy0[0]-p0[0]
            let dx=xy[0]-p[0]
            let dy0=xy0[1]-p0[1]
            let dy=xy[1]-p[1]
            if(dx<0){dx=-dx,dx0=-dx0}
            if(dy<0){dy=-dy,dy0=-dy0}
            let xb=[dx,dx0]
            let yb=[dy,dy0]
            zsb[0][0]=zsb[0][0]+xb[0]
            zsb[0][1]=zsb[0][1]+xb[1]
            zsb[1][0]=zsb[1][0]+yb[0]
            zsb[1][1]=zsb[1][1]+yb[1]
            let sb=[xb,yb]
            ssb.push(sb)
        }
    }
    // console.log(ssb,zsb);
    //匹配与xy0最近的点//x,y可分离
    let pxy=[0,0]
    let pi=[0,0]
    let dx0=xy0[0]
    let dy0=xy0[1]
    for (let i=0;i<ckdxy0.length;i++){
        let p=ckdxy0[i]
        let dx=Math.abs(p[0]-xy0[0])
        let dy=Math.abs(p[1]-xy0[1])
        if(dx<dx0){pxy[0]=p[0];dx0=dx;pi[0]=i}
        if(dy<dy0){pxy[1]=p[1];dy0=dy;pi[1]=i}
    }
    //拟合新地图点
    if(1){
        let re=[0,0]
        let dx0=xy0[0]-ckdxy0[pi[0]][0]
        let dy0=xy0[1]-ckdxy0[pi[1]][1]
        let dx=dx0*zsb[0][0]/zsb[0][1]
        let dy=dy0*zsb[1][0]/zsb[1][1]
        let x=ckdxy[pi[0]][0]+dx
        let y=ckdxy[pi[1]][1]+dy
        re=[x,y]
        re[0]=Math.round(re[0])
        re[1]=Math.round(re[1])
        // console.log(re);
        return re
    }

}//临时，此处等比例拟合……

//择取地图：如果当前qi指定了地图，择取指定地图，不然，从备选maps中生成/择取当前qi地图，不然，从地图库中匹配当前地图
zqdt(){
    let jd=this.q[this.qi[0]]
    let dy=this.language    //默认地域为所用语言（区域）
    // console.log(this.q);
    // console.log(this.qi);
    // console.log(jd);
    let t=jd.t
    if(!!this.sr.dy){dy=this.sr.dy}    //如果源文本指定了，用它的
    //1,如果当前节点有指定地图，优先使用。
    let zddt=this.jdzddt(jd,dy)
    //2,不然，从备选maps中生成/择取当前qi地图，
    if(zddt===0){
        for (let i=0;i<this.maps.length;i++){
            let m=deepCopy(this.maps[i])
            let year=m.year
            if(t[0][0]>year[0]&&t[0][0]<year[1]){
            if(!!m.tz){
                    let mi=this.hhmi(m.tz,t[0])    //目前只能处理系列地图时间递增的情况。其它无序情况暂略。
                    if(mi>=0){
                        let src=m.img.src[0]+m.tz[mi].src+m.img.src[1]
                        m.img.src=src
                    }
                }
                this.map=m
                zddt=1
                //若指定了多个地图，其中有多个地图符合要求，如何选取最合适的？暂略。
            }
        }
    }
    //3,不然，从地图库中匹配当前地图
    if(zddt===0){}
    //4,不然，使用图库中的默认地图
    if(zddt===0){
        let m=mapku[dy].mr
        m.tgb=hhimgmapb(m)
        this.map=m
        // this.dt.update(m)
    }
    // console.log(this.map);
    this.dt.update(this.map,this.cc[0])
    // this.c=this.dt.c
}
//配件，返回图组中合适的图的序号
hhmi(z,t){
    if(t[0]>z[0].t[0]){
    for (let i=1;i<z.length;i++){
        let zt=z[i].t
        if(zt[0]>t[0]){return i-1}
        if(zt[0]===t[0]){
            if(!!zt[1]&&!t[1]){return i-1}
            if(!!zt[1]&&!!t[1]){if(zt[1]>t[1]){return i-1}}
            return i}
    }
    }
    return -1
}
//配件，节点指定地图：
jdzddt(jd,dy){
    let re=0
    if(!!jd.map){
        if(!!mapku[dy][jd.map]){
            let jdmap=mapku[dy][jd.map]
            jdmap.tgb=hhimgmapb(jdmap)
            console.log(jdmap);
            this.map=jdmap
            // this.dt.update(jdmap)
            this.dtzdlx=1    //地图指定类型。1：节点指定。//地图指定类型：0未指定。1节点指定。2文本指定系列，3文本指定基本地图，4，文本指定地域
            re=1
        }
    }
    return re
}
////1,画布监听
sbevent(e){
    let x=e.clientX - this.canvas.getBoundingClientRect().left;
    let y=e.clientY - this.canvas.getBoundingClientRect().top;
    let cc=this.cc
    let c=this.c
    let mapp=this.dqmapp
    let vs=this.vs
    let ms=this.map.img.siz
    //exy对c逆运算，得到mxy
    let mx=x*c[2]/c[6]+c[0]
    let my=y*c[3]/c[7]+c[1]
    //根据mxy返回一个当前被点击的地图节点
    let dj=this.hhdtdj(mx,my)
    // console.log(dj);
    //鼠标拖动地图。
    if(e.type==="mousemove"){
        // console.log(this.mapisDragging);
        if (!!this.mapisDragging) {
            let x= e.clientX - canvas.getBoundingClientRect().left;
            let y= e.clientY - canvas.getBoundingClientRect().top;
            let dx=x-this.offsetX
            let dy=y-this.offsetY
            this.offsetX=x
            this.offsetY=y
            // console.log('jsd改this.j中',this.offsetX,this.offsetY);
            this.c=this.dt.move(c,dx,dy)
            this.c=this.dt.move(c,dx,dy)
            // console.log(x,y,dx,dy);
            this.render()
        }
    }
    //1区，地图区：
    // if(vs[0]>0){
    if(inarea(x,y,cc[0])&&!this.mapisDragging){
        //地图缩放按钮：
    if(inarea(x,y,this.dt.btn.p.s)){
        if(e.type==="mousedown"){
            let s=this.dt.btn.p.s
            // console.log(x,y,s);
            let h=s[3]
            let dy=y-s[1]
            let k=1
            let dh=4/h
            k=Math.floor(dy*dh)
            jsd.c=this.dt.zoom(c,x,y,k)
            this.render()
        }
    }else if(dj>=0){
        let bxqi=mapp[dj][2]
        // console.log(bxqi);
        let ls=0
        if(e.type==='wheel'){if (e.deltaY>0){ls=this.ddjump(bxqi,0)}else{ls=this.ddjump(bxqi,1)}}
        if(e.type==="mousedown"){ls=this.ddjump(bxqi,1)}
        this.exy=[x,y]
        this.j.ijump(ls,'dt')    //1,来自地图节点的跳转。
    }else{
        //鼠标拖动地图,
        if(e.type==="mousedown"){
            this.mapisDragging = true;
            this.offsetX = x
            this.offsetY = y
            // console.log('jsd改this.j中',this.offsetX,this.offsetY);
            this.canvas.style.cursor = 'grabbing';
        this.canvas.addEventListener('mousemove',this.bindsbevent)
        }
        //滚轮缩放地图
        if(e.type==='wheel'){
            let k=0
            if (e.deltaY>0){k=2}
            this.c=this.dt.zoom(c,x,y,k)
            // console.log('jsd改this.j中');
            this.render()
        }
        //双击地图自动聚焦目标地点（为地图中心或尽量靠近中心）
        if(e.type==='dblclick'){
            // console.log('db');
            jsd.c=this.dt.focus(c,x,y)
            this.render()
        }
    }
    // }
    }//1区，地图区//
    }//1,画布监听//
//根据mxy返回一个当前被点击的地图节点
hhdtdj(mx,my){
    let re=-1
    let mapp=this.dqmapp
    for (let i=0;i<mapp.length;i++){
    let p=mapp[i][3]
    let r=5
    let sp=[p[0]-r,p[1]-r,2*r,2*r]
    if(inarea(mx,my,sp)){
        this.qi[2]=i
        return i}
    }
    return re
}
//地点jump(在发生在某地点的历史事件之间向前或向后跳转)
ddjump(bx,k){
    let qi=this.qi[0]
    let re=bx[0]
    if(k>0){
        for (let i=0;i<bx.length;i++){if(bx[i]>qi){return bx[i]}}
    }else{
        for (let i=bx.length-1;i>0;i--){if(bx[i]<qi){return bx[i]}}
    }
    return re
}

}//三，地图画布类/对象////