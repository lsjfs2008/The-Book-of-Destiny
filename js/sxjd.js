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
        // jsd.wbcanvas.dh=0
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