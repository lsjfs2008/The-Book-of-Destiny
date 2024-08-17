// import {bians} from './jmsj.js'    //jds应有独立来源。（比如数据库）
class Sxjdq{
    constructor(sr,language){
        //从关注列表生成生成时序节点群……可有别的方案，比如从存储数据中生成
        this.sr=sr
        this.language=language
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
            this.qi=[6,0]    //第6节点的第0子节点
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
            //初始择取地图：选出指定地图，或匹配备选地图们。并给所有地图配上tgb。
            this.csxzdt()
            //初始化节点地点的pxy或pjw
            this.csjdp()
            //初始化stpr：根据文本自动生成节点对应的stpr。前置需要各时空域的人群，事群，以及从文本中提取人物事物的ai?文本分析程序。
            //暂略。
        }//从头（关注列表）开始构建。
        this.dthuabu=new dtHuabu('zhudiv',[0,0,0,0],this)
        this.wbhuabu=new wbHuabu('zhudiv',[0,0,0,0],this)
        this.sxhuabu=new sxHuabu('zhudiv',[0,0,0,0],this)
        //如果当前qi指定了地图，择取指定地图，不然，从备选maps中生成/择取当前qi地图，不然，从地图库中匹配当前地图
        this.dt=new Mapimg(dings.csdt,this.cc[0])
        this.zqdt()
        this.dtupdate()
        //初始化一个地图img
        // this.mapslx=0    //地图指定类型：0未指定。1节点指定。2文本指定系列，3文本指定基本地图，4，文本指定地域
        console.log(this);
    }//构建函数
////一，监听系列模块：集成到了画布中
////二，整体数据更新与显示模块
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
        tosave.qi=this.qi[0]
        tosave.zdy=this.zdy
        tosave.jd012=this.jd012
        tosave.sx=this.sx
        // console.log(tosave);
        localStorage.setItem(this.name,JSON.stringify(tosave));    //json转为str再保存
    }
    this.render()
}//数据更新
//给第k号视区更新xywh。k:0地图，1文本，2时线
pst(k,sq){
    this.cc[k]=sq
    if(k===0){this.dthuabu.pst(sq)}
    if(k===1){this.wbhuabu.pst(sq)}
    if(k===2){this.sxhuabu.pst(sq)}
}
render(k){
    // console.log('有k表示换地图了');
    this.bfwbrender()
    this.sxrender()
    if(!!k){
        // console.log(this.c,this.dt.c);
        this.zqdt()
        this.dt.img.onload=()=>{
            // console.log('临时，给三国系列地图的d数据配一份jwxy,以便程序中取用。');
            // this.lsjwxy();
            this.dtrender();}
        //临时，给三国系列地图的d数据配一份jwxy,以便程序中取用。
    // this.dt.img.onload=()=>{}
    }else{this.dtrender()}
    
}//显示…………显示模式貌似也可集成到各自画布中…………延后
//配件
ichange(k){
    if(k===1){this.qi[1]+=1};
    if(k===0){this.qi[1]-=1};
    if(this.qi[1]>=this.q[this.qi[0]].s.length){this.qi[0]+=1,this.qi[1]=0}
    if(this.qi[1]<0){this.qi[0]-=1
        if(this.qi[0]<0){this.qi=[0,0]}else{this.qi[1]=this.q[this.qi[0]].s.length-1}
        }
    if(this.qi[0]<0){this.qi=[0,0]}
    if(this.qi[0]>=this.q.length){this.qi[0]=this.q.length-1}
    this.ijump()
}
ijump(k){
    if(!!k){this.qi=[k,0]}
    console.log("ijump");
    this.render(1)
    
}
//二，整体数据更新与显示模块//
////五，地图数据更新与显示模块
//初始生成备选maps
csxzdt(){
    //选择地图//根据节点选择地图，或根据时间选择地图。人物传(人物线)用节点，编年史（世界线）用时间。
    let q=this.q
    let i=this.qi[0]
    let jd=q[i]
    let t=this.t
    let dy=this.language    //默认地域为所用语言（区域）
    if(!!this.sr.dy){dy=this.sr.dy}    //如果源文本指定了，用它的
    let zddt=0
    // let maps=this.maps   //候选地图群
    let map={}
    let maps=[]
    let bxmap=mapku[dy]  //1,将指定地域地图们作为备选
    if(zddt===0){
        if(!!this.sr.maps){
            console.log("2.2,尝试使用源文本指定地图s");
            let m=this.sr.maps
            for (let i=0;i<m.length;i++){
                if(!!bxmap[m[i]]){
                    map=bxmap[m[i]];
                    map.tgb=hhimgmapb(map)
                    maps.push(map)
                    // console.log(maps);
                    zddt=1}
            }
            
        }
    }
    if(zddt===0){
        console.log("如果没找到指定的地图（系列），则从地图库中的地图中,取出合乎sx起止时间的地图存入maps中作为备选,暂略");
        console.log("从maps中根据当前时间或节点，选出合适的map,暂略");
    }
    this.maps=maps
}
//初始化节点地点的pxy与pjw与由jw生成的xy值jwxy……并且加入jd.p中……改变节点p的数据结构为p:[[地点，[pxy],[pjw],[jwxy]],……]
csjdp(){
    //获取所有节点中的p在地图上的pxy值与pjw值，并并入其中。暂且合并一处。后期应分为两个独立数据体……已达成。
    //根据当前所用地图，也可生成jwxy。这个数据与所用地图有关。
    //如果是任意地图，宜于到时直接算。
    //如果是常用地图，比如系列地图，宜于算好后另存一份数据于本地。而后程序中根据地名再从本地存储数据中取用。
    
    let q=this.q
    let qi=this.qi[0]
    for (let i=0;i<q.length;i++){
        let jd=q[i]
        let jdp=jd.p
        let t=jd.t[0]
        //1,初始化pp
        if(!jd.pp){jd.pp=[];
            for (let j=0;j<jdp.length;j++){let p=[];jd.pp.push(p)}}
        //2，使用地图附带定位点。数据结构待归整。暂略。
        for (let j=0;j<jdp.length;j++){
            if(!jd.pp[j].length){
                let d=jdp[j]
                let dxy=this.hhdxy(d,t)
                let djw=this.hhdjw(d,t)
                jd.pp[j]=[dxy,djw]
            }
        }
        // console.log(jd.pp,jdp);
    }
}
//临时，给三国系列地图的d数据配一份jwxy,以便程序中取用。
lsjwxy(){
    // console.log('临时，给三国系列地图的d数据配一份jwxy,以便程序中取用。');
    let d=jwdd.sg.d
    let m=this.map
    // console.log(m);
    let jwxy=[]
    for (let j=0;j<d.length;j++){let p=[];jwxy.push(p)}
    for (let i=0;i<d.length;i++){
        let p=d[i]
        let re=hhdtd(p,m)
        re[0]=Math.round(re[0])
        re[1]=Math.round(re[1])
        jwxy[i]=[d[i][0],re[0],re[1]]
    }
console.log(jwxy);
}
//配件，返回地名对应的xy值，如果有
hhdxy(d,t){
    let re=[-1,-1,0]   //以re[2]为0为无结果，1为有结果。
    // console.log(d);
    //3,使用对应（系列）地图xydd
    if(!!this.sr.maps){
        for(let mp in this.sr.maps){
            if(this.sr.maps[mp] in xydd){
                let ds=xydd[this.sr.maps[mp]]
                for (let di=0;di<ds.length;di++){
                    let dsi=ds[di]
                    let dt=dsi.t
                    let dds=dsi.d
                    for (let ddi=0;ddi<dds.length;ddi++){
                        let ddsi=dds[ddi]
                        let dm=ddsi[0]
                        // console.log(d,dm);
                        if(this.bjtime(t,dt)){
                            // if(d==='成都'){console.log(d,dm,t,d===dm);}
                            if(d===dm){re=[ddsi[1],ddsi[2],1]}
                        }else{
                            if (re[0]>=0){return re}
                            if(d===dm){re=[ddsi[1],ddsi[2],1]}
                        }
                    }
                }
            }
        }
    }
    // if (re[0]>=0){return re}
    return re
}//配件，返回地名对应的xy值，如果有
//配件，返回地名对应的jw值，如果有
hhdjw(d,t){
    //4,如果上面无结果，则使用对应历史时期的jwdd
    let re=[-1,-1,0]    //以re[2]为0为无结果，1为有结果。
    for(let sd in jwdd){
        if(!!jwdd[sd].t){
            let dt=jwdd[sd].t
            if(t[0]>=dt[0]&&t[0]<=dt[1]){
                let ds=jwdd[sd].d
                for (let i=0;i<ds.length;i++){
                    let dd=ds[i]
                    // console.log(d,dd,t);
                    if(d===dd[0]){re=[dd[1],dd[2],1];return re}
                }
            }
        }
    }
    // 5,使用地名的历史时期沿革表（数组），匹配其它时期的数据…………沿革表待做。
    return re
}//配件，返回地名对应的jw值，如果有
//配件，比较两个时间数组，如果大于等于，返回1
bjtime(t,dt){
    for (let i=0;i<dt.length;i++){
        if(!t[i]){return 0}
        if(t[i]>dt[i]){return 1}
        if(t[i]<dt[i]){return 0}
    }
    return 1
}
//择取地图：如果当前qi指定了地图，择取指定地图，不然，从备选maps中生成/择取当前qi地图，不然，从地图库中匹配当前地图
zqdt(){
    let jd=this.q[this.qi[0]]
    let dy=this.language    //默认地域为所用语言（区域）
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
    this.c=this.dt.c
}
//更新数据
dtupdate(){
    let sc=this.cc[0]
        //1.1.1等比例缩放图片以匹配显示区域，多余的裁剪。中心定位。
        let c=[0,0,this.dt.width,this.dt.height,sc[0],sc[1],sc[2],sc[3]]
        this.c=this.dt.zoom(c,0.5*c[6],0.5*c[7],3)
        // console.log(c);
        // jsd.mapp=jwdd.xd    //临时（系列）地理点：{key:[地点名，地理上的经度,纬度]} 
        //生成地图缩放工具的位置
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
    //调用render
    this.dt.img.onload=()=>{this.dtrender()}
}
//绘制
dtrender(){
    let canvas=this.dthuabu.canvas
    let ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    if(jsd.vs[0]>0){
        //1.1.1等比例缩放图片以匹配显示区域，多余的裁剪。中心定位。
        // let sc=this.cc[0]
        // let c0=[0,0,this.dt.width,this.dt.height,sc[0],sc[1],sc[2],sc[3]]
        // this.c=this.dt.zoom(c0,0.5*c0[6],0.5*c0[7],3)
        let c=this.c
        // ctx.drawImage(jsd.bg[0],c[0],c[1],c[2],c[3],c[4],c[5],c[6],c[7])
        this.dt.drawToCanvas(ctx,c)
        // for (let j=0;j<jdp.length;j++){
        //     let d=jdp[j]
        //     //1,先看节点中是否有自定义地点位置：pxy,pjw。暂略。
        //     //2，使用地图附带定位点。数据结构待归整。暂略。
        //     //3,使用对应（系列）地图xydd
        //     if(!!this.sr.maps){
        //         if(this.sr.maps in xydd){
        //             console.log(xydd[this.sr.maps]);
        //         }
        //     }
        //     //4,使用对应历史时期的jwdd
        //     // 5,使用地名的历史时期沿革表（数组），匹配其它时期的数据…………沿革表待做。


        // }
    //子节点“动画”
    //获取所有子节点中的p在地图上的pxy值或pjw值，一一绘制。
    
    let q=this.q
    let qi=this.qi
    for (let i=0;i<q.length;i++){
        let jd=q[i]
        let jdp=jd.p
        // console.log(jd.p,jd.pp);
        for (let j=0;j<jd.stpr.length;j++){
            let sj=jd.stpr[j]
            let sp=[]
            if(!!sj.p){
                let p=sj.p
                for (let k=0;k<p.length;k++){
                    let spk=jdp[p[k]]
                    let ppk=jd.pp[p[k]]
                    let mp=[]
                    // console.log(i,j,k,spk,ppk[0])
                    if(this.sr.mrmapm===this.map.ming){
                        this.mrmap=this.map    //临时，用于等比例拟合……
                        if(ppk[0][2]>0){mp=ppk[0]}else{mp=hhdtd(ppk[1],this.map,'xy')}
                    }else{
                        if(ppk[1][2]>0){mp=hhdtd(ppk[1],this.map,'xy')}else{
                            mp=this.hhnhxy(ppk[0],this.mrmap,this.map)//临时，此处等比例拟合……
                        }
                    }
                    let c=this.c
                    let xmp=[(mp[0]-c[0])*c[6]/c[2],(mp[1]-c[1])*c[7]/c[3]]
                    xmp[0]=Math.round(xmp[0])
                    xmp[1]=Math.round(xmp[1])
                    // console.log(xmp);
                    let canvas=this.dthuabu.canvas
                    let ctx = canvas.getContext('2d')
                    // ctx.globalAlpha=jsd.buju.globalAlpha.pp
                    ctx.globalAlpha=1
                    ctx.beginPath();
                    ctx.arc(xmp[0],xmp[1],5,0,2*Math.PI);
                    ctx.stroke();
                    if(qi[0]===(q.length-1)||(qi[0]===i&&qi[1]===j)){
                        console.log(j,k,spk,xmp);
                        ctx.font="12px Arial";
                        ctx.fillText(spk,xmp[0],xmp[1]);
                    }
                    sp.push(spk)
                }
            }else{sp=jdp}
            // console.log(sp);
            //绘制当前（原）子节点所有的p

        }
        if (qi[0]===i||qi[0]===(q.length-1)) {
            
        }
    }
       
        //1.2，描绘预设地点
        let lsmapp=jsd.mapp
        for (let i in lsmapp){
        let p=lsmapp[i];    //测试用地理点，经纬数据。
        //1.2.2,输入所需定位的点p(的度数制经纬数据),图高比btg，以及当前所用地图数据，返回对应点的图xy.
        // let mp=hhdtd(p,jsd.tgb,jsd.map)
        let mp=hhdtd(p,this.map.tgb,this.map)
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
        let mbp=this.dt.btn.p.s
        ctx.drawImage(jsd.mapbtn,mbp[0],mbp[1],mbp[2],mbp[3])
        //  //
    }
}
//临时配件，输入原xy0，原mrmap,新map,拟合一个新地图上的xy并返回。
hhnhxy(xy0,mrmap,map){
    //1,获取参考点。
}//临时，此处等比例拟合……
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
            this.dtzdlx=1
            re=1
        }
    }
    return re
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
//五，地图数据更新与显示模块//
////三，文本数据更新与显示模块
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
//文本绘制的数据预处理//带参数，表示使用jd012中的数据
bfwbrender(){
    let wbcanvas=this.wbhuabu.canvas
    // console.log(wbcanvas);
    let jdq=this.q    //节点群
    //(当前高)dqh自适应模块：根据qi调整h
    let sji=this.qi[0]
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
}//文本绘制的数据预处理//带参数，表示使用jd012中的数据
//文本绘制
wbrender(){
    let wbcanvas=this.wbhuabu.canvas
    let wbctx=wbcanvas.getContext('2d')
    wbctx.clearRect(0, 0, wbcanvas.width, wbcanvas.height)
    let sq=this.cc[1]
    let gs=this.gs
    let ttvs=this.ttvs
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
                if(i===this.qi[0]){wbctx.strokeStyle=gs.p1.bjs[2];wbctx.strokeRect(xy0[0],xy0[1]-dqh,sq[2]-1,mh)}
                for (let k=0;k<zsz.length;k++){
                    let zs=zsz[k]
                    // console.log(zs,k);
                    for (let j=0;j<zs.length;j++){
                        let m=zs[j]
                        if(xy0[1]-dqh<wbcanvas.height&&xy0[1]+m[2]-dqh>0){
                            wbctx.fillStyle=gs.p1.s
                            if(k===this.qi[1]&&i===this.qi[0]){wbctx.fillStyle=gs.p1.s1}
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
                if(i===this.qi[0]){wbctx.strokeStyle=gs.H3.bjs[2];wbctx.strokeRect(xy0[0],xy0[1]-dqh,sq[2]-1,mh)}
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
                if(i===this.qi[0]){wbctx.strokeStyle=gs.p1.bjs[2];wbctx.strokeRect(xy0[0],xy0[1]-dqh,sq[2]-1,jh)}
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
            let sji=this.qi[0]
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
                    if(i===this.qi[0]){wbctx.strokeStyle=gs.H3.bjs[3];wbctx.strokeRect(xy0[0],xy0[1]-dqh,sq[2]-1,mh)}
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
                    if(i===this.qi[0]){wbctx.strokeStyle=gs.p1.bjs[3];wbctx.strokeRect(xy0[0],xy0[1]-dqh,sq[2]-1,jh)}
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
}//文本绘制
//三，文本数据更新与显示模块//
////四，时线数据更新与显示模块
sxupdate(){
    // console.log('时线变量描述参见：',bians.wb.chs.slwb.sxdescr);
    let i=this.qi[0]
    this.sx.dq=this.q[i].t[0][0]
    this.sx.xd=this.sx.dq-this.sx.qz[0]
    this.sx.sb=[this.sx.xd,this.sx.gt]
    this.sx.jb=[i+1,this.q.length]
}//sxupdate()//根据当前节点qi更新时间线//
//绘制时间线
sxrender(){
    let canvas=this.sxhuabu.canvas
    let ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)
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
        // console.log(this.qi);
        let dqsj=this.q[this.qi[0]].t
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
        this.jdsq=jdsq
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
            if(i===this.qi[0]){sq[1]=0.5*sq[1]}    //当前节点上提
            ctx.fillRect(sq[0],sq[1],sq[2],sq[3]);
            if(zl[1]>0){
                let ks=psfa.dg.fk
                ctx.strokeStyle=ks;
                ctx.strokeRect(sq[0],sq[1],sq[2]-1,sq[3]-1)
            }//有典加框
        }
    }
}//绘制时间线
//配件，时间线模块：返回[本节点在第几个，共几节点位于此时间]
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
}//配件，[本节点在第几个，共几节点位于此时间]
//四，时线数据更新与显示模块//

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
