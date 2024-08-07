import {bians} from './jmsj.js'    //jds应有独立来源。（比如数据库）
let canvas = document.createElement('canvas')
const ctx = canvas.getContext('2d')
export default class Sxjdq{
    constructor(sr,language){
        //从无序节点群生成时序节点群……可有别的方案，比如从关注列表生成
        this.q=[]
        // console.log(language,!language,!!language);
        let jds={}
        if(!!language){
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
            }
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
                this.q[i]=lsjdq[lsxlh[i]]
            }
        }//从头（关注列表）开始构建。
        this.qi=0
    }//构建函数
//文本绘制的数据预处理
bfwbrnd(wbcanvas){
    let jdq=this.q    //节点群
    //(当前高)dqh自适应模块：根据qi调整h
    let sji=this.qi
    let ysh=[0]
    let dqh=[]  //设为数组
    let dqhmax=[]
    let mh=0
    let jh=0
    for (let i=0;i<jdq.length;i++){
        mh=mh+jdq[i].zxymh
    }
    for (let j=0;j<5;j++){
        
        let zsyi=(sji-2>0)?(sji-2):0
        dqh[j]=ysh[zsyi]   //控制文本上下移动的变量，取值于当前时间（节）点。临时设为0。
        dqhmax[j]=(ysh[ysh.length-1]-wbcanvas.height>0)?(ysh[ysh.length-1]-wbcanvas.height):0
        dqh[j]=(dqh<dqhmax[j])?dqh:(dqhmax[j])
    }
    this.h=dqh
    this.hmax=dqhmax
}
//文本绘制
wbrender(wbcanvas,sq,gs,ttvs){
    console.log(this.hmax);
    let wbctx=wbcanvas.getContext('2d')
//ttvs[0]:所有节点只显示节点名0，只显示内容1，同时显示节点名与内容2，只显示“当前时间节点”的内容3，
    // 默认：自定义显示4，这时将展开收起的选择权下放，所有节点左上加小三角。
    let xy0=[0,0]
    let jdq=this.q    //节点群
    this.bfwbrnd(wbcanvas)
    if (ttvs[0]===0){
        let bjs=0
        for (let i=0;i<jdq.length;i++){
            if(bjs===0){bjs=1;wbctx.fillStyle=gs.H3.bjs[0];}else{bjs=0;wbctx.fillStyle=gs.H3.bjs[1];}
            let zs=jdq[i].zxym
            let mh=jdq[i].zxymh
            let dqh=this.h   //控制文本上下移动的变量，取值于当前时间（节）点。临时设为0。
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
        }
        this.hmax=(xy0[1]-wbcanvas.height>0)?(xy0[1]-wbcanvas.height):0
    }
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
            let dqh=this.h   //控制文本上下移动的变量，取值于当前时间（节）点。临时设为0。
            wbctx.font=gs.p1.font
            let mw=wbctx.measureText('测').width
            wbctx.fillRect(xy0[0],xy0[1]-dqh,sq[2],mh+1);
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
        this.hmax=(xy0[1]-wbcanvas.height>0)?(xy0[1]-wbcanvas.height):0
    }
    if (ttvs[0]===2){
        let pbjs=0
        let bjs=0
        for (let i=0;i<jdq.length;i++){
            //节点名模块
            if(bjs===0){bjs=1;wbctx.fillStyle=gs.H3.bjs[0];}else{bjs=0;wbctx.fillStyle=gs.H3.bjs[1];}
            let zs=jdq[i].zxym
            let mh=jdq[i].zxymh
            let dqh=this.h   //控制文本上下移动的变量，取值于当前时间（节）点。临时设为0。
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
        }
        this.hmax=(xy0[1]-wbcanvas.height>0)?(xy0[1]-wbcanvas.height):0
    }
    if (ttvs[0]===3){
        let sji=this.qi
        // console.log(sji);
        let pbjs=0
        let bjs=0
        //(当前高)dqh自适应模块：
        let ysh=[0]
        for (let i=0;i<jdq.length;i++){
            let mh=jdq[i].zxymh
            let h=ysh[ysh.length-1]+mh
            ysh.push(h)
            if(i===sji){
                let jh=jdq[i].zxyjh
                let h=ysh[ysh.length-1]+jh
                ysh.push(h)
            }
        }
        let zsyi=(sji-2>0)?(sji-2):0
        let dqh=ysh[zsyi]   //控制文本上下移动的变量，取值于当前时间（节）点。临时设为0。
        dqh=(dqh<ysh[ysh.length-1]-wbcanvas.height)?dqh:(ysh[ysh.length-1]-wbcanvas.height)
        // console.log(ysh);
        //绘制文字：
        for (let i=0;i<jdq.length;i++){
            //节点名模块
            if(bjs===0){bjs=1;wbctx.fillStyle=gs.H3.bjs[0];}else{bjs=0;wbctx.fillStyle=gs.H3.bjs[1];}
            let zs=jdq[i].zxym
            let mh=jdq[i].zxymh
            // let dqh=this.h   //控制文本上下移动的变量，取值于当前时间（节）点。临时设为0。
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
        this.hmax=(xy0[1]-wbcanvas.height>0)?(xy0[1]-wbcanvas.height):0
    }
    console.log(this.hmax);
}//文本绘制
//节点名模块
wbjdmupdate(sq,gs){
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
            let n=(!!jd.t[1])?`${jd.t[0][0]}—${jd.t[1][0]}年`:`${jd.t[0][0]}年`
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
        this.q[i].zxymh=mzxy[mzxy.length-1][2]+jj[1]+0.2*mw
        // jsd.sxjdq[i].mh=mzxy[mzxy.length-1][2]+mw+jj[1]
    }
}//节点名模块
//节点内容模块
wbjdupdate(sq,gs){
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
        let jdh=zxy[zxy.length-1][2]+jj[1]+0.2*mw
        this.q[i].zxyjh=jdh
        // this.h=0
    }
}//节点内容模块
ichange(k){
    if(k===1){this.qi+=1};
    if(k===0){this.qi-=1};
    if(this.qi<0){this.qi=0}
    if(this.qi>=this.q.length){this.qi=this.q.length-1}
}
ijump(k){this.qi=k;}
}//本体
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