const screenWidth = window.innerWidth
const screenHeight = window.innerHeight
let canvas = document.createElement('canvas')
let lssize=[]
const ctx = canvas.getContext('2d')
let wbcanvas=document.createElement('canvas')
let wbctx=wbcanvas.getContext('2d')
// const xsw=screenWidth/720
// const xsh=screenHeight/1280
let jsd={}
class Main{
    constructor() {
        // 维护当前requestAnimationFrame的id
        this.aniId = 0
        // let jsd={}
        this.start()
        //this.render()
        //触碰监控
        canvas.addEventListener('touchstart', ((e) => {
            e.preventDefault()
            const x = e.touches[0].clientX
            const y = e.touches[0].clientY
            if(this.djwx===0){this.djgn(x,y)}    //点击1无效，0有效。
            //点击功能设计：1，根据点击update()数据；
            //2，根据update()的数据判断是否需要render()刷新/重新加载界面；
            //3，点击特定按钮，进入自动演进时间线的伪动画模式loop()
            //this.render()
        }
        ))
        //鼠标监控：
        canvas.addEventListener('mousedown',this.bindsbevent)
        // canvas.addEventListener('mousemove',this.bindsbevent)
        canvas.addEventListener('wheel',this.bindsbevent)
        canvas.addEventListener('dblclick',this.bindsbevent)
        //鼠标拖动地图,松开鼠标不需集成。
        wbcanvas.addEventListener('wheel',this.wbbindsbevent)
        wbcanvas.addEventListener('mousedown',this.wbbindsbevent)
        wbcanvas.addEventListener('dblclick',this.wbbindsbevent)
        document.addEventListener('mouseup', () => {
            jsd.mapisDragging = false;
            canvas.style.cursor = 'default';
            canvas.removeEventListener('mousemove',this.bindsbevent)
          });
    }//构建函数//
start(){
    lssize=resize()
    canvas.width = lssize[0]
    canvas.height = lssize[1]
    document.getElementById('zhudiv').appendChild(canvas)
    document.getElementById('zhudiv').appendChild(wbcanvas)
        //1，加载默认数据，如果有本地存储数据，更新为本地存储数据。
        //尝试调用本地存储的配置数据：
        let localStoragegot=0
        if(typeof(Storage)!=="undefined"){
            // localStorage.setItem('jsd',JSON.stringify(jsd));    //json转为str再保存
            let ls=JSON.parse(localStorage.getItem('jsd'));   //读取再str转为json
            if(!!ls){
                // localStoragegot=1
                localStoragegot=0    //临时，方便获取更新后的默认数据。
                jsd=ls
            }
        }
        //未取得本地存储的配置数据，则获取默认数据：
        if(localStoragegot===0){
            jsd=bians
            let cc=hhsjmcc(jsd.buju[jsd.buju.ms],lssize)    //当前界面尺寸
            jsd.cc=cc
            jsd.vs=jsd.buju[jsd.buju.ms].vs;
            jsd.size=lssize
            //5,选取（默认）语言与文本群(一次可加载多个文本。这里只加载了一个示例文本。)
            jsd.language='chs'
            jsd.wbs=bians.wb[jsd.language].slwb
            //5.2,根据所选语言与文本群，生成时空节点群数据:jsd.jds
            jsd.tt={}
            this.sxjdq=new Sxjdq(jsd.wbs,jsd.language)
        }else{
            let wcjdq=JSON.parse(localStorage.getItem('wcjdq'))
            this.sxjdq=new Sxjdq(wcjdq)
        }//从关注列表与完成数据生成一个时序节点群对象。
        if(1){
            //2,根据布局数据，生成图文线三区域背景图片对象。
            let mapcsxl=[map.sg[1],map.sg[1],map.cs]    //临时，测试地图组。
            jsd.map=mapcsxl[1]    //设定当前地图
            jsd.tgb=hhimgmapb(jsd.map)     //输入当前所用地图信息（包括定位点等。）返回图片xy与高斯xy/地图xy的比。btg:txy/gxy:[tx,gx,ty,gy]。
            // let bg0 = sctp(jsd.map.img) //生成背景图片obj//地图
            let bg0=new Mapimg(jsd.map.img)
            let bg1 = sctp(dings.bgimg[0]) //背景图片//文本
            let bg2 = sctp(dings.bgimg[1]) //背景图片//时间线
            jsd.bg=[bg0,bg1,bg2]    //图文线三区域背景图片。
            //文本（收放）小三角：
            let xsj0=sctp(dings.wbxsj[0])
            let xsj1=sctp(dings.wbxsj[1])
            let xsj2=sctp(dings.wbxsj[2])
            let xsj3=sctp(dings.wbxsj[3])
            let xsj4=sctp(dings.wbxsj[4])
            jsd.xsj=[xsj0,xsj1,xsj2,xsj3,xsj4]
            //3,根据布局数据，生成按钮图片对象
            //生成地图缩放工具
            jsd.mapbtn=sctp(bians.btns.map.img)
            // jsd.mapbtn.addEventListener('click',(e)=>{console.log('地图缩放工具');})
            //4，绑定鼠标事件
            this.bindsbevent=this.sbevent.bind(this)    //绑定this.
            this.wbbindsbevent=this.wbsbevent.bind(this)
            //N,就绪即加载
            window.onload=()=>{this.update()}
            window.onresize=()=>{
            lssize=resize()
            canvas.width = lssize[0]
            canvas.height = lssize[1]
            jsd.cc=hhsjmcc(jsd.buju[jsd.buju.ms],lssize)    //当前界面尺寸
            jsd.siz=lssize
            this.update();
        }//本地版，监控浏览器尺寸改变。//
        }//生成对象与监听等
    //  //
    }//start()//
sbevent(e){
    // console.log(e);
    let x=e.clientX - canvas.getBoundingClientRect().left;
    let y=e.clientY - canvas.getBoundingClientRect().top;
    let cc=jsd.cc
    let c=jsd.c
    let vs=jsd.vs
    let ms=jsd.map.img.siz
    //鼠标拖动地图。
    if(e.type==="mousemove"){
        if (jsd.mapisDragging) {
            let x= e.clientX - canvas.getBoundingClientRect().left;
            let y= e.clientY - canvas.getBoundingClientRect().top;
            let dx=x-jsd.offsetX
            let dy=y-jsd.offsetY
            jsd.offsetX=x
            jsd.offsetY=y
            jsd.c=jsd.bg[0].move(c,dx,dy)
            // console.log(x,y,dx,dy);
            this.render()
        }
    }
    //1区，地图区：
    // if(vs[0]>0){
    if(inarea(x,y,cc[0])){
        //地图缩放按钮：
    if(inarea(x,y,bians.btns.map.p.s)){
        if(e.type==="mousedown"){
            let s=bians.btns.map.p.s
            // console.log(x,y,s);
            let h=s[3]
            let dy=y-s[1]
            let k=1
            let dh=4/h
            k=Math.floor(dy*dh)
            jsd.c=jsd.bg[0].zoom(c,x,y,k)
            this.render()
        }
    }else{
        //鼠标拖动地图,
        if(e.type==="mousedown"){
            jsd.mapisDragging = true;
            jsd.offsetX = x
            jsd.offsetY = y
            canvas.style.cursor = 'grabbing';
        canvas.addEventListener('mousemove',this.bindsbevent)
        }
        //滚轮缩放地图
        if(e.type==='wheel'){
            let k=0
            if (e.deltaY<0){k=2}
            jsd.c=jsd.bg[0].zoom(c,x,y,k)
            this.render()
        }
        //双击地图自动聚焦目标地点（为地图中心或尽量靠近中心）
        if(e.type==='dblclick'){
            // console.log('db');
            jsd.c=jsd.bg[0].focus(c,x,y)
            this.render()
        }
    }
    // }
    }//1区，地图区//
    //2区，文本区
    if(inarea(x,y,cc[1])){
        //滚轮移动文本
        if(e.type==='wheel'){
            let k=15
            let i=jsd.buju.wbvs.wbqtt[0]
            if (e.deltaY>0){this.sxjdq.h[i]=this.sxjdq.h[i]+k}else{this.sxjdq.h[i]=this.sxjdq.h[i]-k}
            if(this.sxjdq.h[i]<0){this.sxjdq.h[i]=0}
            if(this.sxjdq.h[i]>this.sxjdq.hmax[i]){this.sxjdq.h[i]=this.sxjdq.hmax[i]}
            this.wbrender()
        }//滚轮移动文本
        //标题左
        if(inarea(x,y,jsd.tt.xsj[0])){
            if(e.type==="mousedown"){
                // let lsvs=jsd.buju.wbvs.wbq
                jsd.buju.wbvs.wbqtt[0]=(jsd.buju.wbvs.wbqtt[0]+1)%3
                if(jsd.buju.wbvs.wbqtt[0]===4&&!this.sxjdq.jd012[4].length){jsd.buju.wbvs.wbqtt[0]=0}
                // console.log(!this.sxjdq.jd012[4].length);
                // console.log(!1);
                // console.log(jsd.buju.wbvs.wbqtt[0]);
                this.wbbtupdate()
                this.render()
            }
        }//标题左
        //标题右
        if(inarea(x,y,jsd.tt.xsj[1])){
            if(e.type==="mousedown"){
                jsd.buju.wbvs.wbqtt[1]=(jsd.buju.wbvs.wbqtt[1]+1)%4
                this.wbbtupdate()
                this.render()
            }
        }//标题右
        //标题文本区//标题文本滚动效果。
        if(inarea(x,y,jsd.tt.xsj[4])){
            if(e.type==="mousedown"){
                let t=jsd.tt.tzxy
                let h=jsd.tt.th
                let y=t[t.length-1][2]
                let k=Math.floor(y/h)+1
                jsd.buju.wbvs.wbqtt[4]=(jsd.buju.wbvs.wbqtt[4]+1)%k
                this.render()
            }
        }//标题文本区//标题文本滚动效果。
    }
    //2区，文本区//    
}//sbevent//
wbsbevent(e){
   //滚轮移动文本
   if(e.type==='wheel'){
    // if(jsd.buju.wbvs.wbqtt[0]===3){
    //     if (e.deltaY>0){this.sxjdq.ichange(1)}else{this.sxjdq.ichange(0)}
    //     this.wbrender(1)
    // }else{
        let k=20
        let i=jsd.buju.wbvs.wbqtt[0]
        if (e.deltaY>0){this.sxjdq.h[i]=this.sxjdq.h[i]+k}else{this.sxjdq.h[i]=this.sxjdq.h[i]-k}
        if(this.sxjdq.h[i]<0){this.sxjdq.h[i]=0}
        if(this.sxjdq.h[i]>this.sxjdq.hmax[i]){this.sxjdq.h[i]=this.sxjdq.hmax[i]}
        this.wbrender()
    // }
    } 
    //单击：折页/书签功能：//节点点击跳转
    if(e.type==='mousedown'){
        // console.log(e);
        let x=e.clientX - wbcanvas.getBoundingClientRect().left;
        let y=e.clientY - wbcanvas.getBoundingClientRect().top;
        // console.log(x,y);
        let xywh=this.sxjdq.xywh
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
            let ysh=this.sxjdq.ysh[vi]
            let dqh=this.sxjdq.h[vi]
            let dj=hhdjjd(ysh,dqh,y)
            // console.log(ysh,dqh,y);
            // console.log(`第${dj}节点被点击`);
            this.sxjdq.qi=dj
            if(vi===4&&!!this.sxjdq.jd012[4].length){this.sxjdq.jd012[4][dj]=(this.sxjdq.jd012[4][dj]+1)/3}
            this.sxjdq.bfwbrender(wbcanvas)
        }
    }//单击
    //双击，改变显示模式：0节点名，1内容，2两者。
    if(e.type==='dblclick'){
        let x=e.clientX - wbcanvas.getBoundingClientRect().left;
        let y=e.clientY - wbcanvas.getBoundingClientRect().top;
        let vi=jsd.buju.wbvs.wbqtt[0]
            let ysh=this.sxjdq.ysh[vi]
            let dqh=this.sxjdq.h[vi]
            let dj=hhdjjd(ysh,dqh,y)
            console.log(`第${dj}节点被点击`);
            this.sxjdq.qi=dj
            if(!this.sxjdq.jd012[4].length){this.sxjdq.jd012[4]=this.sxjdq.jd012[vi]}
            let lsvi=(vi===2)?0:2
            if(this.sxjdq.jd012[vi][dj]===vi){this.sxjdq.jd012[vi][dj]=lsvi}else{this.sxjdq.jd012[vi][dj]=vi}
            this.sxjdq.jd012[4][dj]=this.sxjdq.jd012[vi][dj]
    }//双击
}
/**////三，更新数据。以便render()根据当前数据，刷新/（重新）加载屏幕………………数据与绘图分离…………
update(){
    //1,根据屏幕（三视区）尺寸，生成地图图片相关数据。
    // let cc=jsd.cc
    // console.log('jsd.vs:',jsd.vs);
    if(jsd.vs[0]>0){
        this.dtupdate()
    }//地图区
    //文本区
    if(jsd.vs[1]>0){
        this.wbupdate()
    }//文本区
    // console.log(jsd.jds);
    //默认，自动保存当前数据状态
    if(typeof(Storage)!=="undefined"){
        // console.log('默认，自动保存当前数据状态',jsd);
        localStorage.setItem('jsd',JSON.stringify(jsd));    //json转为str再保存
    }
    this.render()
}//update()//
//update模块化，分为地图dtupdate，文本wbupdate，时线sxupdate，三份。（加节点四份？）
dtupdate(){
    let sc=jsd.cc[0]
        //1.1.1等比例缩放图片以匹配显示区域，多余的裁剪。中心定位。
        let c=[0,0,jsd.bg[0].width,jsd.bg[0].height,sc[0],sc[1],sc[2],sc[3]]
        jsd.c=jsd.bg[0].zoom(c,0.5*c[6],0.5*c[7],3)
        // console.log(c);
        jsd.mapp=dings.cydd.xd    //临时（系列）地理点：{key:[地点名，地理上的经度,纬度]} 
        //生成地图缩放工具的位置
        let btn=bians.btns.map
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
wbupdate(){
    //文本区
    if(jsd.vs[1]>0){
        this.wbbtupdate()
        this.wbjdmupdate()
        this.wbjdupdate()
    }//文本区
}//wbupdate进一步模块化，分为：标题，节点名，节点内容三部分。按钮，第四部分，集成在标题中。
//标题模块
wbbtupdate(){
        //文本框元素：背景，左上缩放小三角
        let sq=jsd.cc[1]    //视区[x,y,w,h]//文本显示区
        let gs=jsd.wbgs    //文本格式：字体，字号，加粗等
        let ttvs=jsd.buju.wbvs.wbqtt    //文本显示：文本区wbq,地图区dtq,时间线区sxq是[1,1,1]否显示大标题，小标题/节点名,节点内容。
        let tt=jsd.wb[jsd.language].slwb.tt     //大标题//多时线下大标题如何处理？
        let jj=gs.H1.jj    //文本间距[x,y,首行缩进]
        ctx.font=gs.H1.font
        // console.log(ctx.font);
        let lsw=ctx.measureText('测').width
        //jsd.ttsxj:[0]：大标题左侧小三角：控制ttvs[0],文本与节点名显示模式。1：大标题右侧小三角：控制ttvs[1],隐藏显示大标题与附近按钮图标。2：右三角靠左：打开关注列表。3：右三角靠下：文本到顶。]
        let tbt=[[sq[0],sq[1],lsw,lsw],[sq[0]+sq[2]-lsw,sq[1],lsw,lsw],[sq[0]+sq[2]-2*lsw,sq[1],lsw,lsw],[sq[0]+sq[2]-lsw,sq[1]+lsw,lsw,lsw],[sq[0]+lsw,sq[1],sq[2]-3*lsw,lsw]]
        jsd.tt.xsj=tbt
        let tsq=[sq[0],sq[1],sq[2],lsw]    //标题视区（标题文本显示区）
        // console.log('tsq0:',tsq);
        let zfc=jsd.wb[jsd.language].slwb.tt 
        let sjk=sq[2]
        if(ttvs[1]===1){sjk=sjk-3*lsw}
        let fnt=gs.H1.font
        //输入：字符串zfc，视界宽度sjk，字体格式font.返回：[['字',x,y]……]
        let tzxy=hhzxya(zfc,sjk,fnt,jj)
        jsd.tt.tzxy=tzxy
        jsd.tt.th=jj[1]+lsw
}//标题模块
//节点名模块
wbjdmupdate(){
    let sq=deepCopy(jsd.cc[1])    //视区[x,y,w,h]//文本显示区
    let gs=jsd.wbgs    //文本格式：字体，字号，加粗等
    this.sxjdq.wbjdmupdate(sq,gs)
}//节点名模块
//节点内容模块
wbjdupdate(){
    let sq=jsd.cc[1]    //视区[x,y,w,h]//文本显示区
    let gs=jsd.wbgs    //文本格式：字体，字号，加粗等
    this.sxjdq.wbjdupdate(sq,gs)
}//节点内容模块
//时线模块
sxupdate(){

}//时线模块
//同步模块：地图点（或线），时间（点或线），文本块，三者同步于jsd.sxjdq[i]:jsd.sxjdqi
tbupdate(){
    console.log(jsd.szjdqi);
}//同步模块
/**/
/**////二，根据当前数据，刷新/（重新）加载屏幕………………数据与绘图分离…………
render(){
    //清屏
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    //分区域更新绘图
    let cc=jsd.cc
    // console.log('jsd.vs:',jsd.vs);
    //一，加载图文线：
    //1，图：
    if(jsd.vs[0]>0){
        //1.1.1等比例缩放图片以匹配显示区域，多余的裁剪。中心定位。
        let c=jsd.c
        // ctx.drawImage(jsd.bg[0],c[0],c[1],c[2],c[3],c[4],c[5],c[6],c[7])
        jsd.bg[0].drawToCanvas(ctx,c)
        let lsmapp=jsd.mapp
        //1.2，描绘预设地点
        for (let i in lsmapp){
        let p=lsmapp[i];    //测试用地理点，经纬数据。
        //1.2.2,输入所需定位的点p(的度数制经纬数据),图高比btg，以及当前所用地图数据，返回对应点的图xy.
        let mp=hhdtd(p,jsd.tgb,jsd.map)
        // console.log(c);
        // let c=cc[0]
        // console.log(c);
        // console.log(i);
        // console.log(mp)
        //1.2.3,根据图xy绘图
        let xmp=[(mp[0]-c[0])*c[6]/c[2],(mp[1]-c[1])*c[7]/c[3]]
        ctx.beginPath();
        ctx.arc(xmp[0],xmp[1],5,0,2*Math.PI);
        ctx.stroke();
        ctx.font="12px Arial";
        ctx.fillText(p[0],xmp[0],xmp[1]);
        }
        //1.3,加载悬浮按钮……地图缩放工具
        let mbp=bians.btns.map.p.s
        ctx.drawImage(jsd.mapbtn,mbp[0],mbp[1],mbp[2],mbp[3])
        //  //
    }
    //2，文本
    if(jsd.vs[1]>0){
        let sq=cc[1]    //视区[x,y,w,h]//文本显示区
        //2.1,文本视界背景图
        ctx.drawImage(jsd.bg[1],sq[0],sq[1],sq[2],sq[3])
        //2.2,标题区
        let gs=jsd.wbgs    //文本格式：字体，字号，加粗等
        let ttvs=jsd.buju.wbvs.wbqtt
        //ttvs[0]:所有节点只显示节点名0，只显示内容1，同时显示节点名与内容2，只显示“当前时间节点”的内容3，
        //ttvs[1]：0，隐藏大标题与附近按钮图标。默认1，显示所有。2，隐藏大标题，显示按钮。3,显示大标题文本，隐藏按钮。
        //2.2.2,标题区文本
        if(ttvs[1]===1||ttvs[1]===3){
            let zs=jsd.tt.tzxy
            let th=jsd.tt.th
            let jj=gs.H1.jj    //文本间距[x,y,首行缩进]
            let xy0=[sq[0]+jj[0],sq[1]]
            let dy0=0
            ctx.font=gs.H1.font
            let lsw=ctx.measureText('测').width
            ctx.fillStyle=gs.H1.bjs
            ctx.fillRect(sq[0],sq[1],sq[2],lsw+jj[1]);
            if(ttvs[1]===1){xy0[0]=xy0[0]+lsw}
            for (let j=0;j<zs.length;j++){
                let m=zs[j]
                ctx.fillStyle=gs.H1.s
                let hs=jsd.buju.wbvs.wbqtt[4]
                let dh=lsw+jj[1]
                dy0=-hs*dh
                let dy=dy0+m[2]-0.1*lsw
                // console.log(dy);
                // console.log(jsd.buju.wbvs.wbqtt[4]);
                if(xy0[1]<dy&&dy<xy0[1]+th){
                    ctx.fillText(m[0],xy0[0]+m[1],dy)
                }//只显示一行。
            }
        }//2.2.2,标题区文本
        //2.3,内容区//带参数，表示需要文本数据预处理
        this.wbrender(1)
        //2.2.1,标题区附近的按钮
        if(ttvs[1]===1||ttvs[1]===2){
            //jsd.tt.xsj:[0]：大标题左侧小三角：控制ttvs[0],文本与节点名显示模式。1：大标题右侧小三角：控制ttvs[1],隐藏显示大标题与附近按钮图标。2：右三角靠左：打开关注列表。3：右三角靠下：文本到顶。]
            let tbt=jsd.tt.xsj
            ctx.drawImage(jsd.xsj[ttvs[0]],tbt[0][0],tbt[0][1],tbt[0][2],tbt[0][3])
            ctx.drawImage(jsd.xsj[ttvs[0]],tbt[1][0],tbt[1][1],tbt[1][2],tbt[1][3])
            ctx.drawImage(jsd.xsj[ttvs[0]],tbt[2][0],tbt[2][1],tbt[2][2],tbt[2][3])
            ctx.drawImage(jsd.xsj[ttvs[0]],tbt[3][0],tbt[3][1],tbt[3][2],tbt[3][3])
        }
        // console.log(lsw);
        let sxjdq=jsd.sxjdq    //时序节点群,其vs模式默认为1：显示节点名及其内容。//0：隐藏节点名，显示内容。2：显示节点名，隐藏内容。

    }
    //3,时间线
    if(jsd.vs[2]>0){
        ctx.drawImage(jsd.bg[2],cc[2][0],cc[2][1],cc[2][2],cc[2][3])
        //显示公元纪年
        let tc=cc[2]   //时间线区域的[x,y,w,h]
        let t=jsd.sjx.tim    //[起始（年），时长（年），当前时间（年）]//时长：年月日世纪元会……缩放功能
        let py=Math.floor(tc[2]/t[1])    //py像素每年
        // console.log('py:',py,'像素每年');
        for (let i=0;i*py<tc[2];i++){
            //设定年标线长，
            let y=t[0]+i
            let l=Math.floor(0.12*tc[3])
            if (y%5===0){l=l*2}
            if (y%10===0){
                l=l*2
                ctx.font="12px Arial";
                ctx.fillText(y,i*py,tc[1]+l);
            }
            if(y===t[2]){
                l=tc[3]
                ctx.font="12px Arial";
                ctx.fillText(y,i*py,tc[1]+tc[3]);
            }
            ctx.moveTo(i*py,tc[1]);
            ctx.lineTo(i*py,tc[1]+l);
            ctx.stroke();
        //显示干支纪年//待补
        }
    }
    //二，按钮：
    //1,图
}//render()//
/**/
//render模块化，文本内容区独立出来//带参数，表示需要文本数据预处理
wbrender(k){
    let sq=deepCopy(jsd.cc[1])    //视区[x,y,w,h]//文本显示区
    let gs=jsd.wbgs    //文本格式：字体，字号，加粗等
    let ttvs=jsd.buju.wbvs.wbqtt
    if(ttvs[1]===1||ttvs[1]===3){
        sq[1]=sq[1]+jsd.tt.th
        sq[3]=sq[3]-jsd.tt.th
    }
    wbcanvas.width=Math.ceil(sq[2])
    wbcanvas.height=Math.ceil(sq[3])
    wbcanvas.sq=sq
    wbcanvas.gs=gs
    wbcanvas.ttvs=ttvs
    this.sxjdq.xywh=[sq[0],sq[1],sq[2],sq[3]]
    wbcanvas.style=`position:absolute;left:${sq[0]}px;top:${sq[1]}px;`
    wbctx.clearRect(0,0,wbcanvas.width,wbcanvas.height)
    if(!!k){this.sxjdq.bfwbrender(wbcanvas)}else{this.sxjdq.wbrender(wbcanvas)}
    
}
}//main//
//判断点xy是否位于s[sx,sy,sw,sh]区域。
function inarea(x,y,s){
    let re=0
    if(x>=s[0]&&y>=s[1]&&x<s[0]+s[2]&&y<s[1]+s[3]){re=1}
    return re
}
//生成图片对象
function sctp(m){
    let re=new Image()
    re.src=m.src
    re.width=m.siz[0]
    re.height=m.siz[1]
    // re = new Sprite(src,p[0]*xsw,p[1]*xsh,p[2]*xsw,p[3]*xsh)
    return re
}
//调整界面大小//横屏或竖屏
function resize(){
	var screenheight=window.innerHeight;
    var screenwidth=window.innerWidth;
    var zhudiv=document.getElementById("zhudiv");
    zhudiv.style.position="relative";
    if (bians.hporsp===0){
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
    // console.log("re:",re);
    return re;    
}
//输入：字符串zfc，视界宽度sjk，字体格式font,间距jj.返回：[['字',x,y]……]
function hhzxya(zfc,sjk,fnt,jj){
    ctx.font=fnt
    let mw=ctx.measureText('测').width
    let x=jj[2]+3*jj[0]
    let h=0
    let dy=mw
    let y=h*(mw+jj[1])+dy
    let ms=[]
    for (let i=0;i<zfc.length;i++){
        let z=zfc.substring(i,i+1)
        let zw=ctx.measureText(z).width
        if(x+zw+2*jj[0]<sjk){
            let mxy=[z,x,y]
            ms.push(mxy)
            x=x+zw+jj[0]
        }else{
            x=jj[0]
            h=h+1
            y=h*(mw+jj[1])+dy
            i=i-1
        }
    }
    return ms
}
//返回被点击的节点序号
function hhdjjd(ysh,dqh,y){
    for (let i=0;i<ysh.length;i++){
        let h=ysh[i]-dqh
        if(y<h){return(i-1)}
    }
}
//返回临时jd自定义显示模式：0，只显示节点名;1,只显示内容；2，显示两者