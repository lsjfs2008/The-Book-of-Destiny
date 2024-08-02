import Sprite from './base/sprite.js'
import {sj,pst,buju,cydd,map,sjx} from './jmsj.js'    //导入常量
import { deepCopy,resize,hhsjmcc } from './tools.js'    //导入工具
import { hhimgmapb,hhdtd,hhjwjd,Mapimg } from './map.js'
//主进程，设置处画面，获取屏幕尺寸，导入json数据
const screenWidth = window.innerWidth
const screenHeight = window.innerHeight
let canvas = document.createElement('canvas')
let lssize=resize()
canvas.width = lssize[0]
canvas.height = lssize[1]
const ctx = canvas.getContext('2d')
const xsw=screenWidth/720
const xsh=screenHeight/1280
let dqbj=deepCopy(buju)    //默认/初始布局数据
let dqjmcc=hhsjmcc(dqbj[dqbj.ms],lssize)    //当前界面尺寸
let dqtj=deepCopy(sjx)    //初始/默认时间数据
let jsd={}
export default class Main{
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
        canvas.addEventListener('mousemove',this.bindsbevent)
        canvas.addEventListener('wheel',this.bindsbevent)
        canvas.addEventListener('dblclick',this.bindsbevent)
        //鼠标拖动地图,松开鼠标不需集成。
        document.addEventListener('mouseup', () => {
            jsd.mapisDragging = false;
            canvas.style.cursor = 'default';
          });
        //滚轮缩放地图
        // canvas.addEventListener('wheel',(e)=>{
        //     console.log(e);
        //     let x=e.clientX - canvas.getBoundingClientRect().left;
        //     let y=e.clientY - canvas.getBoundingClientRect().top;
        //     let cc=jsd.cc
        //     let ms=jsd.map.img.siz
        //     let c=jsd.c
        //     // console.log(c);
        //     //1区（默认图区）
        //     if(x>=cc[0][0]&&y>=cc[0][1]&&x<cc[0][0]+cc[0][2]&&y<cc[0][1]+cc[0][3]){
        //         let bmax=Math.min(ms[0]/cc[0][2],ms[1]/cc[0][3])
        //         let bmin=0.1*bmax
        //         let b0=c[2]/c[6]
        //         // console.log('bmax:',bmax);
        //         //以x,y为中心点缩放：
        //         let db=0.1*b0
        //         let b=b0-db
        //         if (e.deltaY>0){b=b0+db}
        //         // else{b=b0-db}
        //         if(b>bmax){b=bmax}
        //         if(b<bmin){b=bmin}
        //         c[0]=c[0]+x*(b0-b)
        //         c[1]=c[1]+y*(b0-b)
        //         c[2]=c[6]*b
        //         c[3]=c[7]*b
        //         if(c[0]<0){c[0]=0}
        //         if(c[0]+c[2]>ms[0]){c[0]=ms[0]-c[2]}
        //         if(c[1]<0){c[1]=0}
        //         if(c[1]+c[3]>ms[1]){c[1]=ms[1]-c[3]}
        //         // console.log(c);
        //         jsd.c=c
        //     }
        //     this.render()
        // })
        //双击地图自动聚焦目标地点（为地图中心或尽量靠近中心）
        // canvas.addEventListener('dblclick',(e)=>{
        //     let x=e.clientX - canvas.getBoundingClientRect().left;
        //     let y=e.clientY - canvas.getBoundingClientRect().top;
        //     let cc=jsd.cc
        //     let ms=jsd.map.img.siz
        //     let c=jsd.c
        //     //1区（默认图区）
        //     if(x>=cc[0][0]&&y>=cc[0][1]&&x<cc[0][0]+cc[0][2]&&y<cc[0][1]+cc[0][3]){

        //     }
        // })

    }//构建函数//
    start(){
        document.getElementById('zhudiv').appendChild(canvas)
        //1，加载默认数据，如果有本地存储数据，更新为本地存储数据。
        //尝试调用本地存储的配置数据：
        let localStoragegot=0
        if(typeof(Storage)!=="undefined"){
            // localStorage.setItem('jsd',JSON.stringify(jsd));    //json转为str再保存
            let ls=JSON.parse(localStorage.getItem('jsd'));   //读取再str转为json
            if(!!ls){
                localStoragegot=1
                jsd=ls
            }
        }
        //未取得本地存储的配置数据，则获取默认数据：
        if(localStoragegot===0){
            jsd.bj=dqbj
            jsd.vs=jsd.bj[jsd.bj.ms].vs;
            jsd.tj=dqtj
            // canvas.style="overflow: hidden;position: absolute;"
            // console.log("canvas x,y:",canvas.width,canvas.height);
            //一些数据集成入jsd中
            jsd.size=lssize
            //2,根据布局数据，生成图文线三区域背景图片对象。
            let mapcsxl=[map.sg[1],map.sg[1],map.cs]    //临时，测试地图组。
            jsd.map=mapcsxl[1]    //设定当前地图
            jsd.tgb=hhimgmapb(jsd.map)     //输入当前所用地图信息（包括定位点等。）返回图片xy与高斯xy/地图xy的比。btg:txy/gxy:[tx,gx,ty,gy]。
            // let bg0 = sctp(jsd.map.img) //生成背景图片obj//地图
            let bg0=new Mapimg(jsd.map.img)
            let bg1 = sctp(ds.bgimg[0]) //背景图片//文本
            let bg2 = sctp(ds.bgimg[1]) //背景图片//时间线
            jsd.bg=[bg0,bg1,bg2]    //图文线三区域背景图片。
            //3,根据布局数据，生成按钮图片对象
            //生成地图缩放工具
            jsd.mapbtn=sctp(jsd.bj.btns.map.img)
            // jsd.mapbtn.addEventListener('click',(e)=>{console.log('地图缩放工具');})
            //4，绑定鼠标事件
            this.bindsbevent=this.sbevent.bind(this)    //绑定this.
            //5,选取（默认）语言与文本群
            jsd.language='chs'
            jsd.wbs=ds.wb[jsd.language].slwb
            //5.2,根据所选语言与文本群，生成时空节点群数据。
            let jds=ds.jd[jsd.language]
            jsd.jds={}
            for (let ms in jsd.wbs){
                if(ms==="gzlb"){
                    let mvs=jsd.wbs[ms]
                    for (let i=0;i<mvs.length;i++){
                        if(mvs[i][0]==='han'){
                            let tag=mvs[i][1]
                            // console.log(tag);
                            for (let jd in jds){
                            let rs=jds[jd].r
                            for (let r=0;r<rs.length;r++){
                                if (tag===rs[r]){
                                    // console.log(jd);
                                    let obj={}
                                    obj[jd]=jds[jd]
                                    // console.log(obj);
                                    jsd.jds=Object.assign(jsd.jds,obj)
                                }
                            }
                        }
                    }
                }
            }
            
        }
        }
        window.onload=()=>{console.log('window.onload');this.update();}
        window.onresize=()=>{
            lssize=resize()
            canvas.width = lssize[0]
            canvas.height = lssize[1]
            dqjmcc=hhsjmcc(dqbj[dqbj.ms],lssize)    //当前界面尺寸
            jsd.siz=lssize
            this.update();
        }//临时用用，监控浏览器尺寸改变。//
        // jsd.bg[0].onload=()=>{console.log('jsd.bg[0].onload');}
        // jsd.bg[1].onload=()=>{console.log('jsd.bg[1].onload');}
        // jsd.bg[2].onload=()=>{console.log('jsd.bg[2].onload');}
    //  //
    }//start()//
sbevent(e){
    // console.log(e);
    let x=e.clientX - canvas.getBoundingClientRect().left;
    let y=e.clientY - canvas.getBoundingClientRect().top;
    let cc=jsd.cc
    let c=jsd.c
    let ms=jsd.map.img.siz
    //1区：
    if(x>=cc[0][0]&&y>=cc[0][1]&&x<cc[0][0]+cc[0][2]&&y<cc[0][1]+cc[0][3]){
        //地图缩放按钮：
    if(inarea(x,y,jsd.bj.btns.map.p.s)){
        if(e.type==="mousedown"){
            let s=jsd.bj.btns.map.p.s
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
        }
        if(e.type==="mousemove"){
            if (jsd.mapisDragging) {
                let x= e.clientX - canvas.getBoundingClientRect().left;
                let y= e.clientY - canvas.getBoundingClientRect().top;
                let dx=x-jsd.offsetX
                let dy=y-jsd.offsetY
                jsd.offsetX=x
                jsd.offsetY=y
                jsd.c=jsd.bg[0].move(c,dx,dy)
                this.render()
            }
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
    }//1区//
    // console.log(this);
    
}//sbevent//
/**////三，更新数据。以便render()根据当前数据，刷新/（重新）加载屏幕………………数据与绘图分离…………
update(){
    //1,根据屏幕（三视区）尺寸，生成地图图片相关数据。
    let cc=dqjmcc
    jsd.cc=cc
    // console.log('jsd.vs:',jsd.vs);
    if(jsd.vs[0]>0){
        let sc=cc[0]
        //1.1.1等比例缩放图片以匹配显示区域，多余的裁剪。中心定位。
        let c=[0,0,jsd.bg[0].width,jsd.bg[0].height,cc[0][0],cc[0][1],cc[0][2],cc[0][3]]
        // console.log(c);
        if(c[2]*c[7]>c[3]*c[6]){
            c[0]=0.5*(c[2]-c[3]*c[6]/c[7])
            c[2]=c[3]*c[6]/c[7]
        }else{
            c[1]=0.5*(c[3]-c[2]*c[7]/c[6])
            c[3]=c[2]*c[7]/c[6]}
        jsd.c=c
        // console.log(c);
        jsd.mapp=cydd.xd    //临时（系列）地理点：{key:[地点名，地理上的经度,纬度]} 
        //生成地图缩放工具的位置
        let btn=jsd.bj.btns.map
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
        console.log(s);
        p.s=s
    }
    //默认，自动保存当前数据状态
    if(typeof(Storage)!=="undefined"){
        // console.log('默认，自动保存当前数据状态');
        localStorage.setItem('jsd',JSON.stringify(jsd));    //json转为str再保存
        // dqbj=JSON.parse(localStorage.getItem('buju'));   //读取再str转为json
    }
    this.render()
}//update()//
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
        let mbp=jsd.bj.btns.map.p.s
        ctx.drawImage(jsd.mapbtn,mbp[0],mbp[1],mbp[2],mbp[3])
        //  //
    }
    //2，文本
    if(jsd.vs[1]>0){
        ctx.drawImage(jsd.bg[1],cc[1][0],cc[1][1],cc[1][2],cc[1][3])
    }
    //3,时间线
    if(jsd.vs[2]>0){
        ctx.drawImage(jsd.bg[2],cc[2][0],cc[2][1],cc[2][2],cc[2][3])
        //显示公元纪年
        let tc=cc[2]   //时间线区域的[x,y,w,h]
        let t=jsd.tj.tim    //[起始（年），时长（年），当前时间（年）]//时长：年月日世纪元会……缩放功能
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
}//main//
//
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
//描绘图片：m对象，p方位
function mhtp(m,p){
    ctx.drawImage(m,p[0],p[1],p[2],p[3])
    console.log(p)
    //debugger
}
