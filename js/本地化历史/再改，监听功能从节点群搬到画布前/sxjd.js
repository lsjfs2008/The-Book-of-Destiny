// import {bians} from './jmsj.js'    //jds应有独立来源。（比如数据库）
class Sxjdq{
    constructor(sr,language){
        //从关注列表生成生成时序节点群……可有别的方案，比如从存储数据中生成
        this.q=[]    //时序节点群本体
        this.name='文本名，比如某某传'
        this.vs=[1,1,1]     //显示模式，临时设为均衡模式。
        this.cc=deepCopy(jsd.cc)    //三视区尺寸。临时设为本体三视区尺寸。。后续多线叙事时应根据设置修改。
        this.gs=deepCopy(jsd.wbgs)    //同上
        this.ttvs=jsd.buju.wbvs.wbqtt   //同上。
        // console.log(jsd.buju.wbvs.wbqttdesc);
        // console.log(language,!language,!!language);
        if(!!language){
            this.name=sr.tt
            this.q=hhsxjdq(sr,language)
            this.qi=6
            this.zdy=[0,0,0]
            this.jd012=[[],[],[]]
            for (let i=0;i<this.q.length;i++){
                this.jd012[0][i]=0
                this.jd012[1][i]=1
                this.jd012[2][i]=2
            }
            if(!!sr.sx){this.sx=scsjx(this.q,sr.sx)}else{this.sx=scsjx(this.q)}
            this.sxupdate()
            // console.log(this.sx);
            // this.jd012[0][this.qi]=2
        }//从头（关注列表）开始构建。
        this.wbbindsbevent=this.wbsbevent.bind(this)
        this.dthuabu=new Huabu('zhudiv',[0,0,0,0])
        this.wbhuabu=new Huabu('zhudiv',[0,0,0,0])
        this.sxhuabu=new Huabu('zhudiv',[0,0,0,0])
        this.wbhuabu.canvas.addEventListener('wheel',this.wbbindsbevent)
        this.wbhuabu.canvas.addEventListener('mousedown',this.wbbindsbevent)
        this.wbhuabu.canvas.addEventListener('dblclick',this.wbbindsbevent)
    }//构建函数
//////一，监听系列模块：
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
//一，监听系列模块.////
//////二，整体数据更新与显示模块
update(){
    //1,根据屏幕（三视区）尺寸，生成地图图片相关数据。
    // let cc=jsd.cc
    // console.log('jsd.vs:',jsd.vs);
    if(this.vs[0]>0){
        this.dtupdate()
    }//地图区
    //文本区
    if(this.vs[1]>0){
        this.wbupdate()
    }//文本区
    // console.log(jsd.jds);
    //默认，自动保存当前数据状态
    if(typeof(Storage)!=="undefined"){
        // console.log('默认，自动保存当前数据状态',tosave);
        let tosave={}
        tosave.q=this.q
        tosave.vs=this.vs
        tosave.qi=this.qi
        tosave.zdy=this.zdy
        tosave.jd012=this.jd012
        tosave.sx=this.sx
        // console.log(tosave);
        localStorage.setItem(this.name,JSON.stringify(tosave));    //json转为str再保存
    }
    this.render()
}//数据更新
//给第k号社区更新xywh。k:0地图，1文本，2时线
pst(k,sq){
    this.cc[k]=sq
    if(k===0){this.dthuabu.pst(sq)}
    if(k===1){this.wbhuabu.pst(sq)}
    if(k===2){this.sxhuabu.pst(sq)}
}
render(){
    // console.log('this.sxjdq.render()');
    this.bfwbrender()
    this.sxrender()
}//显示
//配件
ichange(k){
    if(k===1){this.qi+=1};
    if(k===0){this.qi-=1};
    if(this.qi<0){this.qi=0}
    if(this.qi>=this.q.length){this.qi=this.q.length-1}
}
ijump(k){this.qi=k;}
//二，整体数据更新与显示模块////
//////三，文本数据更新与显示模块
wbupdate(){
    //文本区
    if(jsd.vs[1]>0){
        // this.wbbtupdate()
        this.wbjdmupdate()
        this.wbjdupdate()
    }//文本区
}//wbupdate进一步模块化，分为：标题，节点名，节点内容三部分。按钮，第四部分，集成在标题中。标题暂由本体呈现。
//配件，节点名模块
wbjdmupdate(){
    let sq=deepCopy(this.cc[1])    //视区[x,y,w,h]//文本显示区
    let gs=jsd.wbgs    //文本格式：字体，字号，加粗等
    let jdq=this.q    //时序节点群
    let jj=gs.H3.jj    //文本间距[x,y,首行缩进]
    ctx.font=gs.H3.font
    // console.log(ctx.font);
    let mw=ctx.measureText('测').width
    //所有节点名的['字'，x,h]值，数据结构相当于jds中的节点内容（文本）的每个单字用['字'，x,h]取代。其中x是相对于文本视界左侧的dx，h是行数。
    //其内容添加进jds中相应条目中。
    for (let i=0;i<jdq.length;i++){
        let jd=jdq[i]
        let jdm=''
        if(!!jd.m){jdm=jd.m}else{
            for (let j=0;j<jd.r.length;j++){
            jdm=jdm+`${jd.r[j]},`
            }
            let gy=(jd.t[0][0]>0)?'':'公元前'
            let n=(!!jd.t[1])?`${Math.abs(jd.t[0][0])}—${Math.abs(jd.t[1][0])}年`:`${Math.abs(jd.t[0][0])}年`
            jdm=jdm+gy+n
            // console.log(jdm);
            this.q[i].m=jdm    
        }//保存节点名纯文本。//以此生成每个字符的mxh
        let zfc=jdm
        let sjk=sq[2]
        let fnt=gs.H3.font
        //输入：字符串zfc，视界宽度sjk，字体格式font.返回：[['字',x,y]……]
        let mzxy=hhzxya(zfc,sjk,fnt,jj)
        // console.log(ms);
        this.q[i].zxym=mzxy
        this.q[i].zxymh=Math.ceil(mzxy[mzxy.length-1][2]+jj[1]+0.2*mw)
        // jsd.sxjdq[i].mh=mzxy[mzxy.length-1][2]+mw+jj[1]
    }
}//配件，节点名模块
//配件，节点内容模块
wbjdupdate(){
    let sq=this.cc[1]    //视区[x,y,w,h]//文本显示区
    let gs=jsd.wbgs    //文本格式：字体，字号，加粗等
    let jdq=this.q    //时序节点群
    let jj=gs.p1.jj    //文本间距[x,y,首行缩进]
    ctx.font=gs.p1.font
    let mw=ctx.measureText('测').width
    for (let i=0;i<jdq.length;i++){
        let jd=jdq[i]
        let zz=jd.s
        let zfc=''
        for (let j=0;j<zz.length;j++){
            zfc=zfc+zz[j]
        }
        let sjk=sq[2]
        let fnt=gs.p1.font
        // console.log(zfc);
        //输入：字符串zfc，视界宽度sjk，字体格式font.返回：[['字',x,y]……]
        let zxy=hhzxya(zfc,sjk,fnt,jj)    
        //分出子节点。
        let zj=0
        let zxys=[]
        for (let j=0;j<zz.length;j++){
            let zl=zz[j].length
            let zs=zxy.slice(zj,zj+zl)
            zj=zj+zl
            zxys.push(zs)
        }
        // console.log(zxys);
        this.q[i].zxyjz=zxys
        let jdh=Math.ceil(zxy[zxy.length-1][2]+jj[1]+0.2*mw)
        this.q[i].zxyjh=jdh
        // this.h=0
    }
}//配件，节点内容模块
//以上，数据更新////以下，显示//
////文本绘制的数据预处理//带参数，表示使用jd012中的数据
bfwbrender(){
    let wbcanvas=this.wbhuabu.canvas
    // console.log(wbcanvas);
    let jdq=this.q    //节点群
    //(当前高)dqh自适应模块：根据qi调整h
    let sji=this.qi
    let lsi=[]
    //默认模式数据
    if(1){
        let ysh=[0]
        let dqysh=[]
        let dqh=[0,0,0]  //设为数组
        let dqhmax=[0,0,0]
        for (let j=0;j<3;j++){
            if(j===0){
                for (let i=0;i<jdq.length;i++){
                    let mh=jdq[i].zxymh
                    let h=ysh[ysh.length-1]+mh
                    if(i===sji){
                        let jh=jdq[i].zxyjh
                        h=h+jh
                    }
                    ysh.push(h)
                }
            }
            if(j===1){
                for (let i=0;i<jdq.length;i++){
                        let jh=jdq[i].zxyjh
                        let h=ysh[ysh.length-1]+jh
                        ysh.push(h)
                }
            }
            if(j===2){
                for (let i=0;i<jdq.length;i++){
                    let mh=jdq[i].zxymh
                    let jh=jdq[i].zxyjh
                    let h=ysh[ysh.length-1]+jh+mh
                    ysh.push(h)
                }
            }
            let yl=(j===1||j===2)?1:2
            let zsyi=(sji-yl>0)?(sji-yl):0
            dqh[j]=ysh[zsyi]   //控制文本上下移动的变量，取值于当前时间（节）点。临时设为0。
            //跳转时控制“前言”体量。
            if(dqh[j]<ysh[sji]-0.2*wbcanvas.height){dqh[j]=ysh[sji]-0.2*wbcanvas.height}
            dqhmax[j]=(ysh[ysh.length-1]-wbcanvas.height>0)?(ysh[ysh.length-1]-wbcanvas.height):0
            dqh[j]=(dqh[j]<dqhmax[j])?dqh[j]:(dqhmax[j])
            dqysh[j]=ysh
            ysh=[0]
            // console.log(dqh,dqh[j],dqhmax);
        }
        this.ysh=dqysh
        // console.log(this.ysh);
        this.h=dqh
        this.hmax=dqhmax
    }//默认模式数据//
    //zdy模式数据
    if(1){
        let ysh=[0]
        let dqysh=[]
        let dqh=[0,0,0]  //设为数组
        let dqhmax=[0,0,0]
        for (let j=0;j<3;j++){
            for (let i=0;i<jdq.length;i++){
                    let jh=jdq[i].zxyjh
                    let mh=jdq[i].zxymh
                    let dh=0
                    let ls=this.jd012[j][i]
                    if(ls===0){dh=mh}
                    if(ls===1){dh=jh}
                    if(ls===2){dh=mh+jh}
                    let h=ysh[ysh.length-1]+dh
                    ysh.push(h)
            }
            let yl=(j===1||j===2)?1:2
            let zsyi=(sji-yl>0)?(sji-yl):0
            dqh[j]=ysh[zsyi]   //控制文本上下移动的变量，取值于当前时间（节）点。临时设为0。
            //跳转时控制“前言”体量。
            if(dqh[j]<ysh[sji]-0.2*wbcanvas.height){dqh[j]=ysh[sji]-0.2*wbcanvas.height}
            dqhmax[j]=(ysh[ysh.length-1]-wbcanvas.height>0)?(ysh[ysh.length-1]-wbcanvas.height):0
            dqh[j]=(dqh[j]<dqhmax[j])?dqh[j]:(dqhmax[j])
            dqysh[j]=ysh
            ysh=[0]
            // console.log(dqh,dqh[j],dqhmax);
        }
        this.zdyysh=dqysh
        // console.log(this.zdyysh);
        this.zdyh=dqh
        this.zdyhmax=dqhmax
    }//zdy模式数据//
    this.wbrender(wbcanvas)
}//文本绘制的数据预处理//带参数，表示使用jd012中的数据//
////文本绘制
wbrender(){
    let wbcanvas=this.wbhuabu.canvas
    let sq=this.cc[1]
    let gs=this.gs
    let ttvs=this.ttvs
    let wbctx=wbcanvas.getContext('2d')
    //ttvs[0]:所有节点只显示节点名0，只显示内容1，同时显示节点名与内容2，只显示“当前时间节点”的内容3，
    // 默认：自定义显示4，这时将展开收起的选择权下放，所有节点左上加小三角。
    let xy0=[0,0]
    let jdq=this.q    //节点群
    // this.bfwbrnd(wbcanvas)
    // console.log(this.hmax);
    if(this.zdy[ttvs[0]]===0){
        if (ttvs[0]===1){
            let pbjs=0
            for (let i=0;i<jdq.length;i++){
                //加文本（背景）框
                if(pbjs===0){
                    pbjs=1
                    wbctx.fillStyle=gs.p1.bjs[0]
                }else{
                    pbjs=0
                    wbctx.fillStyle=gs.p1.bjs[1]
                }
                let zsz=jdq[i].zxyjz
                let mh=jdq[i].zxyjh
                let dqh=this.h[ttvs[0]]   //控制文本上下移动的变量，取值于当前时间（节）点。临时设为0。
                wbctx.font=gs.p1.font
                let mw=wbctx.measureText('测').width
                wbctx.fillRect(xy0[0],xy0[1]-dqh,sq[2],mh+1);
                if(i===this.qi){wbctx.strokeStyle=gs.p1.bjs[2];wbctx.strokeRect(xy0[0],xy0[1]-dqh,sq[2]-1,mh)}
                for (let k=0;k<zsz.length;k++){
                    let zs=zsz[k]
                    for (let j=0;j<zs.length;j++){
                        let m=zs[j]
                        if(xy0[1]-dqh<wbcanvas.height&&xy0[1]+m[2]-dqh>0){
                            wbctx.fillStyle=gs.p1.s
                            wbctx.fillText(m[0],xy0[0]+m[1],xy0[1]+m[2]-dqh)
                        }
                    }
                }
                xy0[1]=xy0[1]+mh
            }
            // this.hmax=(xy0[1]-wbcanvas.height>0)?(xy0[1]-wbcanvas.height):0
        }
        if (ttvs[0]===2){
            let pbjs=0
            let bjs=0
            for (let i=0;i<jdq.length;i++){
                //节点名模块
                if(bjs===0){bjs=1;wbctx.fillStyle=gs.H3.bjs[0];}else{bjs=0;wbctx.fillStyle=gs.H3.bjs[1];}
                let zs=jdq[i].zxym
                let mh=jdq[i].zxymh
                let dqh=this.h[ttvs[0]]   //控制文本上下移动的变量，取值于当前时间（节）点。临时设为0。
                wbctx.font=gs.H3.font
                wbctx.fillRect(xy0[0],xy0[1]-dqh,sq[2],mh+1);
                if(i===this.qi){wbctx.strokeStyle=gs.H3.bjs[2];wbctx.strokeRect(xy0[0],xy0[1]-dqh,sq[2]-1,mh)}
                    for (let j=0;j<zs.length;j++){
                        let m=zs[j]
                        if(xy0[1]-dqh<wbcanvas.height&&xy0[1]+m[2]-dqh>0){
                            wbctx.fillStyle=gs.H3.s
                            wbctx.fillText(m[0],xy0[0]+m[1],xy0[1]+m[2]-dqh)
                        }
                    }
                xy0[1]=xy0[1]+mh
                //节点内容模块
                if(pbjs===0){pbjs=1;wbctx.fillStyle=gs.p1.bjs[0];}else{pbjs=0;wbctx.fillStyle=gs.p1.bjs[1];}
                let zsz=jdq[i].zxyjz
                let jh=jdq[i].zxyjh
                wbctx.font=gs.p1.font
                wbctx.fillRect(xy0[0],xy0[1]-dqh,sq[2],jh+1);
                if(i===this.qi){wbctx.strokeStyle=gs.p1.bjs[2];wbctx.strokeRect(xy0[0],xy0[1]-dqh,sq[2]-1,jh)}
                for (let k=0;k<zsz.length;k++){
                    let zs=zsz[k]
                    for (let j=0;j<zs.length;j++){
                        let m=zs[j]
                        if(xy0[1]-dqh<wbcanvas.height&&xy0[1]+m[2]-dqh>0){
                            wbctx.fillStyle=gs.p1.s
                            wbctx.fillText(m[0],xy0[0]+m[1],xy0[1]+m[2]-dqh)
                        }
                    }
                }
                xy0[1]=xy0[1]+jh
            }
            // this.hmax=(xy0[1]-wbcanvas.height>0)?(xy0[1]-wbcanvas.height):0
        }
        if (ttvs[0]===0){
            let sji=this.qi
            // console.log(sji);
            let pbjs=0
            let bjs=0
            //绘制文字：
            for (let i=0;i<jdq.length;i++){
                //节点名模块
                if(bjs===0){bjs=1;wbctx.fillStyle=gs.H3.bjs[0];}else{bjs=0;wbctx.fillStyle=gs.H3.bjs[1];}
                let zs=jdq[i].zxym
                let mh=jdq[i].zxymh
                let dqh=this.h[ttvs[0]]   //控制文本上下移动的变量，取值于当前时间（节）点。临时设为0。
                wbctx.font=gs.H3.font
                wbctx.fillRect(xy0[0],xy0[1]-dqh,sq[2],mh+1);
                    for (let j=0;j<zs.length;j++){
                        let m=zs[j]
                        if(xy0[1]-dqh<wbcanvas.height&&xy0[1]+m[2]-dqh>0){
                            wbctx.fillStyle=gs.H3.s
                            wbctx.fillText(m[0],xy0[0]+m[1],xy0[1]+m[2]-dqh)
                        }
                    }
                xy0[1]=xy0[1]+mh
                // console.log(xy0[1]);
                if(i===sji){
                    //节点内容模块
                    if(pbjs===0){pbjs=1;wbctx.fillStyle=gs.p1.bjs[0];}else{pbjs=0;wbctx.fillStyle=gs.p1.bjs[1];}
                    let zsz=jdq[i].zxyjz
                    let jh=jdq[i].zxyjh
                    wbctx.font=gs.p1.font
                    wbctx.fillRect(xy0[0],xy0[1]-dqh,sq[2],jh+1);
                    for (let k=0;k<zsz.length;k++){
                        let zs=zsz[k]
                        for (let j=0;j<zs.length;j++){
                            let m=zs[j]
                            if(xy0[1]-dqh<wbcanvas.height&&xy0[1]+m[2]-dqh>0){
                                wbctx.fillStyle=gs.p1.s
                                wbctx.fillText(m[0],xy0[0]+m[1],xy0[1]+m[2]-dqh)
                            }
                        }
                    }
                    xy0[1]=xy0[1]+jh
                    // console.log(xy0[1]);
                }
            }
            // this.hmax=(xy0[1]-wbcanvas.height>0)?(xy0[1]-wbcanvas.height):0
        }
    }
    if(this.zdy[ttvs[0]]===1){
            let pbjs=0
            let bjs=0
            //绘制文字：
            for (let i=0;i<jdq.length;i++){
                let ls=this.jd012[ttvs[0]][i]
                let dqh=this.zdyh[ttvs[0]]   //控制文本上下移动的变量，取值于当前时间（节）点。临时设为0。
                // console.log('dqh:',dqh);
                // console.log('ls:',ls);
                if(ls===0||ls===2){
                    //节点名模块
                    if(bjs===0){bjs=1;wbctx.fillStyle=gs.H3.bjs[0];}else{bjs=0;wbctx.fillStyle=gs.H3.bjs[1];}
                    let zs=jdq[i].zxym
                    let mh=jdq[i].zxymh
                    wbctx.font=gs.H3.font
                    wbctx.fillRect(xy0[0],xy0[1]-dqh,sq[2],mh+1);
                    if(i===this.qi){wbctx.strokeStyle=gs.H3.bjs[3];wbctx.strokeRect(xy0[0],xy0[1]-dqh,sq[2]-1,mh)}
                        for (let j=0;j<zs.length;j++){
                            let m=zs[j]
                            if(xy0[1]-dqh<wbcanvas.height&&xy0[1]+m[2]-dqh>0){
                                wbctx.fillStyle=gs.H3.s
                                wbctx.fillText(m[0],xy0[0]+m[1],xy0[1]+m[2]-dqh)
                            }
                        }
                    xy0[1]=xy0[1]+mh
                }
                // console.log(xy0[1]);
                if(ls===1||ls===2){
                    //节点内容模块
                    if(pbjs===0){pbjs=1;wbctx.fillStyle=gs.p1.bjs[0];}else{pbjs=0;wbctx.fillStyle=gs.p1.bjs[1];}
                    let zsz=jdq[i].zxyjz
                    let jh=jdq[i].zxyjh
                    wbctx.font=gs.p1.font
                    wbctx.fillRect(xy0[0],xy0[1]-dqh,sq[2],jh+1);
                    // console.log(gs.p1.bjs[3]);
                    if(i===this.qi){wbctx.strokeStyle=gs.p1.bjs[3];wbctx.strokeRect(xy0[0],xy0[1]-dqh,sq[2]-1,jh)}
                    for (let k=0;k<zsz.length;k++){
                        let zs=zsz[k]
                        for (let j=0;j<zs.length;j++){
                            let m=zs[j]
                            if(xy0[1]-dqh<wbcanvas.height&&xy0[1]+m[2]-dqh>0){
                                wbctx.fillStyle=gs.p1.s
                                wbctx.fillText(m[0],xy0[0]+m[1],xy0[1]+m[2]-dqh)
                            }
                        }
                    }
                    xy0[1]=xy0[1]+jh
                    // console.log(xy0[1]);
                }
            }//绘制文字//
            // this.hmax=(xy0[1]-wbcanvas.height>0)?(xy0[1]-wbcanvas.height):0
    }
    // console.log(this.hmax);
    if(ttvs[1]===1||ttvs[1]===2){
        wbctx.strokeStyle="#000000"
        let xywh=this.cc[0]
        let dxy0=0.07*(xywh[2]+xywh[3])
        wbctx.moveTo(xywh[2],xywh[3]-dxy0);
        wbctx.lineTo(xywh[2]-dxy0,xywh[3]);
        wbctx.stroke();
    }//书签折纸线
}//文本绘制//
//三，文本数据更新与显示模块////
//////四，时线数据更新与显示模块
sxupdate(){
    let i=this.qi
    this.sx.dq=this.q[i].t[0][0]
    this.sx.xd=this.sx.dq-this.sx.qz[0]
    this.sx.sb=[this.sx.xd,this.sx.gt]
    this.sx.jb=[i+1,this.q.length]
}//sxupdate()//根据当前节点qi更新时间线//
////绘制时间线
sxrender(){
    let canvas=this.sxhuabu.canvas
    let ctx = canvas.getContext('2d')
    ctx.fillStyle='#000'
    ctx.strokeStyle="#000000"
    // console.log(ctx);
    //3,时间线
    if(jsd.vs[2]>0){
        //显示公元纪年
        let tc=this.cc[2]   //时间线区域的[x,y,w,h]
        // console.log(jsd.bg[2]);
        // console.log(tc);
        tc=[0,0,tc[2],tc[3]]
        ctx.drawImage(jsd.bg[2],0,0,tc[2],tc[3])
        // let t=jsd.sjx.tim    //[起始（年），时长（年），当前时间（年）]//时长：年月日世纪元会……缩放功能
        let sq=this.sx.sq    //视区时间段
        let qz=this.sx.qz   //起止时间
        let dc=this.sx.dc   //登场时间段
        let zr=this.sx.zr   //自然生死时间段
        let dq=this.sx.dq   //当前节点时间（段）
        let dqsj=this.q[this.qi].t
        // console.log(this.sx);
        let py=Math.floor(tc[2]/(qz[1]-sq[0]))    //py像素每年
        // console.log(`${tc[2]}像素，${qz[1]-sq[0]}年`);
        // console.log('py:',py,'像素每年');
        //绘制视区（公元）时间与当前时间
        for (let i=0;i*py<tc[2];i++){
            //设定年标线长，
            let y=sq[0]+i
            let l=Math.floor(0.12*tc[3])
            if (y%5===0){l=l*2}
            if (y%10===0){
                l=l*2
                ctx.font="12px Arial";
                ctx.fillText(y,i*py,tc[1]+l);
            }
            if(y===dq){
                l=tc[3]
                ctx.font="12px Arial";
                ctx.fillText(y,i*py,tc[1]+tc[3]);
            }
            ctx.moveTo(i*py,tc[1]);
            ctx.lineTo(i*py,tc[1]+l);
            ctx.stroke();
        //显示干支纪年//待补
        }//绘制视区（公元）时间与当前时间
        //（根据其时间段）绘制所有时间节点//根据不同事类采用不同颜色——配色方案。事类未定，方案暂缺。//配色方案中应包含时间点（约）等于，介于，处于的/等情况。
        //默认只显示主要事类颜色，当前节点区显示细节颜色。细节颜色比例：照各小节字符占比算。另，典故额外加方框：其配色：dg.fk。
        //时间重合时的区间分配方案：相续方案。重叠方案……延后处理，暂不考虑
        let jdsq=[]
        for (let i=0;i<this.q.length;i++){
            let q=this.q[i]
            let t=q.t
            let qt=t[0][0]
            let qx=(qt-sq[0])*py
            let zt=(!!t[1])?t[1][0]:t[0][0]
            let zx=(zt-sq[0])*py
            let dx=0
            //相续方案
            if(!!t[0][1]){dx=dx+py*(t[0][1]-1)/12}else{
                let qdx=this.hhtjds(qt,i)    //[本节点在第几个(0起步)，共几节点位于此时间]
                if(qdx[1]>1){dx=py*qdx[0]/qdx[1]}
            }
            let zdx=this.hhtjds(zt,i)
            let dzx=0
            if(zdx[1]>0){dzx=py*((zdx[0]+1)/zdx[1])}
            //相续方案
            // if(!!t[0][2]){dx=dx+pd*(t[0][2]-1)}//时间细分至此，“时间分辨率”使用pd(像素每天较好)//后面也应有相应“时间分辨率”的比值
            //后续暂略。
            zx=zx+dzx
            let x=qx+dx
            let w=zx-x
            let s=[x,0.5*tc[3],w,0.3*tc[3]]
            jdsq[i]=s
        }//先算出节点“宽度”
        //再依配色画矩形与典框。
        for (let i=0;i<this.q.length;i++){
            let q=this.q[i]
            let sq=jdsq[i]
            // console.log(sq);
            let sl=q.tag
            let zl=hhzl(sl)   //返回主要事类,以及是否有典
            let psfa=dings.sjx.ps
            let ps=(!!psfa[zl[0]])?psfa[zl[0]].mr:psfa.mr
            // console.log('配色：',ps);
            ctx.fillStyle=ps
            if(i===this.qi){sq[1]=0.5*sq[1]}    //当前节点上提
            ctx.fillRect(sq[0],sq[1],sq[2],sq[3]);
            if(zl[1]>0){
                let ks=psfa.dg.fk
                ctx.strokeStyle=ks;
                ctx.strokeRect(sq[0],sq[1],sq[2]-1,sq[3]-1)
            }//有典加框
        }
    }
}//绘制时间线//
////配件，时间线模块：返回[本节点在第几个，共几节点位于此时间]
hhtjds(bt,bi){
    let re=[]
    let xu=0
    let z=1
    for (let i=0;i<this.q.length;i++){
        let q=this.q[i]
        let t=q.t
        let qt=t[0][0]
        let zt=(!!t[1])?t[1][0]:t[0][0]
        if(i<bi&&zt===bt){xu=xu+1;z=z+1}
        if(i>bi&&qt===bt){z=z+1}
    }
    re=[xu,z]
    return re
}//配件，[本节点在第几个，共几节点位于此时间]//
//四，时线数据更新与显示模块////
//////五，地图数据更新与显示模块
dtupdate(){}
//五，地图数据更新与显示模块////
//根据当前节点qi更新时间线
}//本体////////////////////////////////
//比较两个时间ti,tj的先后,如果ti>tj,返回1
function tidayutj(ti,tj){
    // let re=0
    //比较开始时间
    let li=ti[0].length
    let lj=tj[0].length
    let l=li
    if(lj<li){l=lj}
    for (let i=0;i<l;i++){
        if(ti[0][i]>tj[0][i]){return 1}
        if(ti[0][i]<tj[0][i]){return 0}
    }
    //如果开始时间完全相同，比较人物行动顺序
    let ri=ti[2]
    let rj=tj[2]
    for (let i in ri){
        for(let j in rj){
            if(i===j){
                // console.log(i);
                if(ri[i]>rj[j]){return 1}
                if(ri[i]<rj[j]){return 0}
            }
        }
    }
    return 0
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
//模块，生成时序节点群
function hhsxjdq(sr,language){
    console.log('//模块，生成时序节点群');
    let thisq=[]
    let ljds=bians.jd[language]
    let jds={}
    for (let ms in sr){
        if(ms==="gzlb"){
            let mvs=sr[ms]
            for (let i=0;i<mvs.length;i++){
                if(mvs[i][0]==='han'){
                    let tag=mvs[i][1]
                    // console.log(tag);
                    for (let jd in ljds){
                    let rs=ljds[jd].r
                    for (let r=0;r<rs.length;r++){
                        if (tag===rs[r]){
                            // console.log(jd);
                            let obj={}
                            obj[jd]=ljds[jd]
                            // console.log(obj);
                            jds=Object.assign(jds,obj)
                        }
                    }
                }
            }
        }
    }
    }//根据源文本所列模式，从候选节点库中取出匹配的节点，构成无序节点群
    // console.log(jds);
    let lsjdq=[]
    let lsxlh=[]
    for (let key in jds){
        let jd=jds[key]
        lsjdq.push(jd)
    }
    for (let i=0;i<lsjdq.length;i++){
    lsxlh[i]=i
    }
    for (let i=0;i<lsjdq.length;i++){
        for (let j=i+1;j<lsjdq.length;j++){
        let ti=lsjdq[lsxlh[i]].t
        let tj=lsjdq[lsxlh[j]].t
        if(tidayutj(ti,tj)){
            lsxlh[i]=j
            lsxlh[j]=i
        }
        }
    }
    for (let i=0;i<lsxlh.length;i++){
        thisq[i]=lsjdq[lsxlh[i]]
    }//给无序节点群排序。
    return thisq
}
//模块，生成时间线数据
function scsjx(q,cs){
    console.log('//模块，生成时间线数据');
    let re={}
    // console.log(sr.sx,!sr.sx,!!sr.sx);
    console.log('目前只有人物线，待优化……');
    let lx=''
    let dc=[]
    let zr=[]
    let qt=q[0].t[0][0]
    let zt=q[q.length-1].t[0][0]
    if(!!q[q.length-1].t[1]){zt=q[q.length-1].t[1][0]}
    let qz=[qt,zt]
    // console.log(zt+'年',qt,typeof(qt));
    let dq=qt
    let sb=[dq-qt,zt-qt]
    let jb=[1,q.length]
    let min=0
    let max=100
    if(!!cs){
        if(!!cs.lx){lx=cs.lx}
        if(!!cs.dc){dc=cs.dc}
        if(!!cs.zr){zr=cs.zr}
        min=dc[0]
        max=dc[1]
        if(zr[0]<dc[0]){min=zr[0]}
        if(zr[1]>dc[1]){max=zr[1]}
    }else{
        lx='人物线'
        dc=qz
        zr=qz
        min=qt
        max=zt
    }
    let sq0=Math.floor((min-9)*0.1)*10
    let sq1=Math.ceil((max+9)*0.1)*10
    let sq=[sq0,sq1]
    re.lx=lx
    re.qz=qz
    re.dc=dc
    re.zr=zr
    re.gt=zt-qt
    re.sq=sq
    re.dq=dq
    re.xd=dq-qt
    re.sb=sb
    re.jb=jb
    return re
}
//返回主要事类,以及是否有典
function hhzl(sl){
    // console.log(sl);
    let s={js:0,rs:0,yt:0,dg:0,yy:0,}
    for (let i=0;i<sl.length;i++){
        let zs=sl[i]
        let pp={js:'兵',rs:'人',yt:'言',dg:'典',yy:'缘',}
        let zp=hhzspp(zs,pp)
        s[zp]=s[zp]+1
    }
    let js=0
    let si=0
    for (let i in s){
        if(s[i]>js){si=i;js=s[i]}
    }
    // console.log(si,s[si]);
    let yd=0
    if(s['dg']>0){yd=1}
    let re=[si,yd]
    return re
}
//返回字符匹配事类
function hhzspp(zs,pp){
    for (let i=0;i<zs.length;i++){
        let z=zs.slice(i,i+1)
        for (let p in pp){
            if(z===pp[p]){return p}
        }
    }
}
