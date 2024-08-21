// import { dings } from "./jmsj.js"
//取得常用定位点的常用gxy值
let cydw=jwdd.xd
let cydwg={}
// console.log(cydwg);

/**/////一，3,输入高斯xy数据gxy,图高比btg，以及当前所用地图数据，返回对应点的图xy…………tgb也集成在map数据体中
// function hhdtd(p,m){
function hhdtd(p,map,str){
    // console.log(p);
    let tgb=map.tgb
    let si=[p[1],p[2]]
    if(str==='xy'){si=[p[0],p[1]]}
    let ty=map.touyin
    let gxy=hhmapxy(si,ty)
    let d=map.dw;
    //3.2,获取p点上下左右最近的四点。如果没有那样的点，随便取个点，比如第1个点。
     let k=[0,0,0,0]     //[上，下，左，右]
     let dk=[0,0,0,0]
     for (let i=1;i<d.length;i++){
        dk[0]=cydwg[d[k[0]][0]][0]-gxy[0]
        dk[1]=gxy[0]-cydwg[d[k[1]][0]][0]
        dk[2]=cydwg[d[k[2]][0]][0]-gxy[1]
        dk[3]=gxy[1]-cydwg[d[k[3]][0]][0]
        let dx=cydwg[d[i][0]][0]-gxy[0]
        let dy=cydwg[d[i][0]][1]-gxy[1]
        if (dx>=0){if(dk[0]<0||dx<dk[0]){k[0]=i}}else{if(dk[1]<0||Math.abs(dx)<dk[1]){k[1]=i}}
        if (dy>=0){if(dk[2]<0||dy<dk[2]){k[2]=i}}else{if(dk[3]<0||Math.abs(dy)<dk[3]){k[3]=i}}
     }
    //  console.log(k);
    //3.3,计算p点与这四点的距离。
    let r=[0,0,0,0]
    for (let i=0;i<k.length;i++){
        let gxy0=cydwg[d[k[i]][0]]
        let dx=gxy[0]-gxy0[0]
        let dy=gxy[1]-gxy0[1]
    r[i]=Math.sqrt(dx*dx+dy*dy)
    //3.7,如果其中有距离为0的，直接返回结果
    if (r[i]===0){
    let xy=[d[k[i]][1],d[k[i]][2]]
    // console.log("如果其中有距离为0的，直接返回结果");
    return xy;
    }
    }
    // console.log(r);
    //3.4,按远近设定影响因子。
    let r3=[r[1]*r[2]*r[3],r[0]*r[2]*r[3],r[1]*r[0]*r[3],r[1]*r[2]*r[0]]
    let r4=1/(r3[0]+r3[1]+r3[2]+r3[3])
    let yxyz=[r3[0]*r4,r3[1]*r4,r3[2]*r4,r3[3]*r4]
    // console.log(yxyz);
    //3.5,计算以四点为基准的p点的图xy值
    let x4=[0,0,0,0]
    let y4=[0,0,0,0]
    for (let i=0;i<4;i++){
        let gxy0=cydwg[d[k[i]][0]]
        let xy0=[d[k[i]][1],d[k[i]][2]]
        let dgxy=[gxy[0]-gxy0[0],gxy[1]-gxy0[1]]
        y4[i]=xy0[1]+dgxy[1]*tgb[2]/tgb[3]
        x4[i]=xy0[0]+dgxy[0]*tgb[0]/tgb[1]
    }
    // console.log(x4,y4);
    //3.6,综影响因子得到拟合的xy值
    let x=0,y=0
    for (let i=0;i<4;i++){
        x=x+x4[i]*yxyz[i]
        y=y+y4[i]*yxyz[i]
    }
    //3.7,返回之
    let xy=[x,y]
    // console.log(xy);
    return xy;
    
}
/**/
////一，1,输入分数制经纬数据(与作为x轴的基准子午线（y轴是赤道线）)。返回高斯x,y值。
function hhgauss(sd){
    let L0=111
    let s=[sd[0],sd[1]]
    let l=s[0]-L0      //经度差
    let ydf=0.017453292519943295     //1度对应的弧长。
    let B=s[1]*ydf
    let cosb=Math.cos(B)
    let sb=Math.sin(B)
    let m=Math.cos(B)*ydf*l
    let t=Math.tan(B)
    const a = 6378137; // 长半轴
    let b=6356752.31414036   //短半轴
    // let e12=(a*a-b*b)/(b*b)     // 第二偏心率的平方
    let e12=0.0067394967754776875     // 第二偏心率的平方
    // let c=a*a/b
    let c=6399593.625864
    // console.log(c);
    // console.log(6399593.625864);
    let n2=e12*cosb*cosb
    let N=c/Math.sqrt(1+n2)
    let X1=111134.8611*s[1]-(32005.7799*sb+133.9238*sb*sb*sb+0.6976*sb*sb*sb*sb*sb)*cosb
    // console.log(X1);
    let ddx=N*t*(m*m/2+(5-t*t+9*n2+4*n2*n2)*m*m*m*m/24+(61-58*t*t+t*t*t*t)*m*m*m*m*m*m/720)
    let dx=X1+ddx
    let dy=N*(m+(1-t*t+n2)*m*m*m/6+(5-18*t*t+t*t*t*t+14*n2-58*n2*t*t)*m*m*m*m*m/120)
    // console.log("ddx:",ddx,"dx:",dx,"dy:",dy);
    // let re=[dx,dy]
    let re=[dy,dx]    //高斯的xy值：x轴是赤道线，y轴在这里是111E经线。与屏幕所用x,y相反，需对换。
    return re;
}
//一，二，1.2，自定义高斯反解：输入1个？？数制经纬点，一组xy偏移量，返回其对应的经纬点。
function fjgauss(fjsr){
     let xy=[fjsr[2],fjsr[3]]
     let dj=2.35,dw=0.16392807
     let si=[fjsr[0],fjsr[1]+dw]
     let sj=[si[0]+dj,si[1]]
     
     let dxy=gauss(si,sj)
     console.log("dxy:",dxy,"xy:",xy);
    //  if(dxy[0]<xy[0]){
    //     let d=1
    //     dw=dw+d
    //     sj=[si[0]+dj,si[1]+dw]

    //  }


}
/*/废弃
//输入临时（系列）地理点：{key:[地点名，地理上的经度,纬度]}与
//当前所用地理图片.{图片{图源，尺寸}，持续时间，定位[3个以上]}
// 例如：{img:{src:"map/sg/base.jpg",siz:[600,609]},year:[160,280],dw:[["twn",547,570],["dln",497,126],["amd",362,570]]}
//返回图片像素（城市等要素）点：{key:[地点名，图片上的x,y]}………………
/**/
//0，根据map信息中关于touyin(投影)的信息选用对应的图地比算法。
function hhimgmapb(map){
    let ty=map.touyin
        for (let i in cydw){
            let jw=[cydw[i][1],cydw[i][2]]
            let gxy=hhmapxy(jw,ty)         //输入指定点的经纬值，返回web墨卡托投影下的xy值。
            cydwg[i]=gxy
        }
        let re=hhtdb(map,ty)
        return re;
    
}
//0.1，根据经纬与投影信息分发/返回对应的投影坐标xy：gxy,mxy,txy,
function hhmapxy(jw,ty){
    // console.log(ty);
    if(typeof(ty)!=="string"||ty==="gauss"||ty==="default"){
        // console.log("高斯");
    let re=hhgauss(jw)
    return re;    
    }
    if(ty==="mokato"){
        // console.log("墨卡托");
    return hhmktxy(jw)}
    if(ty==="webmkt"){
        // console.log("网络墨卡托");
        return hhwebmktxy(jw)}
}
//二，1，输入度数制经纬数据(与作为x轴的基准子午线（y轴是赤道线）)。返回墨卡托x,y值。
function hhmktxy(jw){
    let L0=111    //测试，临时指定。
    //转化为分数制
    let s=[jw[0],jw[1]]
    let l=s[0]-L0      //经度差
    let ydf=0.017453292519943295     //1度对应的弧长。
    let B=s[1]*ydf
    let cosb=Math.cos(B)
    let sb=Math.sin(B)
    let m=Math.cos(B)*ydf*l
    let t=Math.tan(B)
    const a = 6378137; // 长半轴
    let b=6356752.31414036   //短半轴
    // let e12=(a*a-b*b)/(b*b)     // 第二偏心率的平方
    let e12=0.0067394967754776875     // 第二偏心率的平方
    let c=6399593.625864
    let n2=e12*cosb*cosb
    let N=c/Math.sqrt(1+n2)
    let cb=c*ydf
    // console.log(0.25*Math.PI);
    let tg=Math.tan(0.7853981633974483+B*0.5)
    // let e=Math.sqrt(1-(b*b)/(a*a))
    let e=0.08181919104280835
    let ee=Math.pow((1-e*sb)/(1+e*sb),0.5*e)
    let lln=Math.log(tg*ee)
    let dx=N*cosb*lln
    let dy=N*cosb*l*ydf
    // console.log("ddx:",ddx,"dx:",dx,"dy:",dy);
    // let re=[dx,dy]
    let re=[dy,dx]    //高斯的xy值需对换。
    return re;
}

//三，1，WGS84坐标与web墨卡托投影坐标转换
function hhwebmktxy(jw){
    // console.log(1/(Math.PI / 180));
    let k=111319.49077777778
    //[k/(PI/180)]=6378137,即：k=6378137*(PI/180)，即一角度对应的赤道的长度。
    let y=k*(Math.log(Math.tan((jw[1]+90)*0.008726646259971648)))*57.29577951308232
    //0.008726646259971648*2=0.017453292519943295,即：1/2度对应的弧长。故，Math.tan((jw[1]+90)*0.008726646259971648)即：tan(PI/4+rad(w)/2)
    //57.29577951308232:1/(PI/180),即：二分之一度弧长的倒数。
    let x=jw[0]*k
    //故x是：角度差*一角度所对应的赤道的长度
    let re=[x,y]
    return re;    
}
//三,2,返回图地比
function hhtdb(dqmap,str){
//1,从三个（以上）定位点获得分辨率与高斯投影坐标的比率。
    //1.1,数据整合：得到定位点的xy与度数制经纬数据
    let dw=dqmap.dw
    let xyjw=[]
    for (let i=0;i<dw.length;i++){
        let dxy=[dw[i][1],dw[i][2]]
        let jw=cydw[dw[i][0]]
        let djw=[jw[1],jw[2]]
        let ls=[dxy[0],dxy[1],djw[0],djw[1]]
        xyjw.push(ls)
    }
    //1.2,输入度数制经纬数据，得到定位点的高斯xy数据
    let gxy=[]
        for (let i=0;i<dw.length;i++){
            let si=[xyjw[i][2],xyjw[i][3]]
            gxy[i]=hhmapxy(si,str)
        }
    //1.4对经X比进行一次拟合，使之成为与y相关的一次函数:b=f(y)
    let bfy=[]
    //1.3,获取图片xy与高斯xy的比。btg:txy/gxy:[tx,gx,ty,gy]
    //1.3.1,设定基准图x与gx(=0)：
    let x0=0.5*dqmap.img.siz[0]
    // let gx0=0
    let btg=[0,0,0,0]
    // //x
    for (let i=0;i<gxy.length;i++){
        for (let j=i+1;j<gxy.length;j++){
        //略过隔太近的
        //y:
        let lsk=0
        if(Math.abs([xyjw[i][lsk]]-[xyjw[j][lsk]])>10){
            let b=[[xyjw[i][lsk]]-[xyjw[j][lsk]],gxy[i][lsk]-gxy[j][lsk]]
            if(b[1]<0){b=[-b[0],-b[1]]}
            // console.log(cydw[dw[i][0]][0],cydw[dw[j][0]][0],b[0]/b[1]);
            // console.log(`x,${i},${j},${b}`);
            btg[0]=btg[0]+b[0]
            btg[1]=btg[1]+b[1]
        }
        }
    }
    //y
    for (let i=0;i<gxy.length;i++){
        for (let j=i+1;j<gxy.length;j++){
        //略过隔太近的
        //y:
        if(Math.abs([xyjw[i][1]]-[xyjw[j][1]])>10){
            let b=[[xyjw[i][1]]-[xyjw[j][1]],gxy[i][1]-gxy[j][1]]
            if(b[1]<0){b=[-b[0],-b[1]]}
            // console.log(cydw[dw[i][0]][0],cydw[dw[j][0]][0],b[0]/b[1]);
            // console.log(`y,${i},${j},${b}`);
            btg[2]=btg[2]+b[0]
            btg[3]=btg[3]+b[1]
        }
        }
    }
    //1.5,汇总
    // console.log("总图高比，x:",btg[0]/btg[1],"比y:",btg[2]/btg[3]);
    // console.log(btg);
    if(str==="webmkt"){
        btg=[btg[0]-btg[2],btg[1]+btg[3],btg[2]-btg[0],btg[1]+btg[3]]
        // console.log("总图高比，x:",btg[0]/btg[1],"比y:",btg[2]/btg[3]);
        // console.log(btg);
    }
    return btg;
}
//  //
//四，返回经纬节点，需要数据：tgb:图地比，dqmap:当前所用地图（的投影方式，（第一个）定位点经纬数据）.返回[x,y,j,w]
function hhjwjd(tgb,dqmap){
    //1，测试版：
    //1.0,设定re为{整经纬数据:[x,y,j,w]，边界经纬数据:[j1,w1,j2,w2]}
    let zjw=[]
    let bjjw=[0,0,0,0]
    // let re={zjw:zjw,bjjw:bjjw}
    //1.1,在定位点中任选一个参考点，设定经纬间隔：dj,dw
    let k=0
    let ckd=dqmap.dw[k]
    let dj=3,dw=3
    //1.2,以其为基点，向上，下，左，右四个方向拓展，设定整数经纬度的[j,w]，获得其相应的[x,y],直到地图边界。追加[x,y,j,w]
    let ckjw=[cydw[ckd[0]][1],cydw[ckd[0]][2]]
    let ckxy=[ckd[1],ckd[2]]
    let ckgxy=hhmapxy(ckjw,dqmap.touyin)
    let j0=Math.floor(ckjw[0]/dj)*dj
    let w0=Math.floor(ckjw[1]/dw)*dw
    let gxy0=hhmapxy([j0,w0],dqmap.touyin)
    let xy0=[ckxy[0]+(gxy0[0]-ckgxy[0])*tgb[0]/tgb[1],ckxy[1]+(gxy0[1]-ckgxy[1])*tgb[2]/tgb[3]]
    //1.2.1,先到左上超边界
    while(xy0[0]>0){
        j0=j0-dj
        gxy0=hhmapxy([j0,w0],dqmap.touyin)
        xy0=[ckxy[0]+(gxy0[0]-ckgxy[0])*tgb[0]/tgb[1],ckxy[1]+(gxy0[1]-ckgxy[1])*tgb[2]/tgb[3]]
        // console.log(xy0);
    }
    while(xy0[1]>0){
        w0=w0+dw
        gxy0=hhmapxy([j0,w0],dqmap.touyin)
        xy0=[ckxy[0]+(gxy0[0]-ckgxy[0])*tgb[0]/tgb[1],ckxy[1]+(gxy0[1]-ckgxy[1])*tgb[2]/tgb[3]]
        // console.log(xy0);
    }
    //1.2.1.2,记录左上超边界经纬
    let zsbjjw=[j0,w0]
    //1.2.2,演算到右下边界,记录[x,y,j,w]
    console.log(xy0);
    console.log(dqmap.img.siz);
    let lsj=j0
    let lsw=w0
    while(xy0[0]<dqmap.img.siz[0]){
        lsj=lsj+dj
        lsw=w0
        while(xy0[1]<dqmap.img.siz[1]||lsw===w0){
            lsw=lsw-dw
            let lsgxy0=hhmapxy([lsj,lsw],dqmap.touyin)
            // console.log(lsgxy0);
            xy0=[ckxy[0]+(lsgxy0[0]-ckgxy[0])*tgb[0]/tgb[1],ckxy[1]+(lsgxy0[1]-ckgxy[1])*tgb[2]/tgb[3]]
            let xyjw=[xy0[0],xy0[1],lsj,lsw]
            // console.log(xyjw);
            if(xy0[0]<dqmap.img.siz[0]&&xy0[1]<dqmap.img.siz[1]){zjw.push(xyjw)}
        }
    }
    //1.3,逼近边界所对应的[j,w]，
    //1.4,返回re
    // console.log(zjw);
    return zjw
}
//地图图片类化
class Mapimg{
    constructor(map,cc){
        this.map=map
    this.img = new Image()
    this.img.src = map.img.src
    this.width = map.img.siz[0]
    this.height = map.img.siz[1]
    this.visible = true
    this.c=this.zoom([0,0,this.width,this.height,cc[0],cc[1],cc[2],cc[3]],0.5*this.width,0.5*this.height,3)
    this.sfb=1
    this.cbf=[]
    // this.tgb=m.tgb
    }
    //更新：
    update(map,cc){
        this.map=map
        this.img.src = map.img.src
        this.width = map.img.siz[0]
        this.height = map.img.siz[1]
        //tgb,c两处，也可能需要同步更新
        this.tgb=map.tgb
        //临时，应替换为当前节点的x,y
        // console.log(d);
        // console.log('临时，应替换为当前节点的x,y');
        // this.c=this.zoom([0,0,this.width,this.height,cc[0],cc[1],cc[2],cc[3]],0.5*this.width,0.5*this.height,3)
        // console.log(map);
        // console.log(this);
    }
    //显示
    drawToCanvas(ctx,c) {
        if (!this.visible) return    //不可见则直接隐藏，可见则路过这里执行后面。
        ctx.drawImage(this.img,c[0],c[1],c[2],c[3],c[4],c[5],c[6],c[7])
    }
    //范围校对（以免图片“超出”视界）
    fwjd(c){
        if(c[0]<0){c[0]=0}
        if(c[0]+c[2]>this.width){c[0]=this.width-c[2]}
        if(c[1]<0){c[1]=0}
        if(c[1]+c[3]>this.height){c[1]=this.height-c[3]}
        return c
    }
    //点击地图点时的换图时的范围校正。地图缩放比尽量不变。调整地图偏移量，使得节点视界位置不变。
    fwjz(c,x,y,mx,my){
        if(c[0]<0||c[0]+c[2]>this.width||c[1]<0||c[1]+c[3]>this.height){
            let b=Math.min(mx/x,my/y,(this.width-mx)/(c[6]-x),(this.height-my)/(c[7]-y))
            c[0]=mx-x*b
            c[1]=my-y*b
            c[2]=c[6]*b
            c[3]=c[7]*b
        }
        return c
    }
    //拖动效果
    move(c,dx,dy) {
        // console.log("地图图片拖动中");
        if (!this.visible) return    //不可见则直接隐藏，可见则路过这里执行后面。
        c[0]=c[0]-dx
        c[1]=c[1]-dy
        c=this.fwjd(c)
        return c
    }
    //缩放效果
    zoom(c,x,y,k,mx,my) {
        // let c=deepCopy(cr)
        let ms=[this.width,this.height]
        if (!this.visible) return    //不可见则直接隐藏，可见则路过这里执行后面。
        let bmax=Math.min(ms[0]/c[6],ms[1]/c[7])
        let bmin=0.1*bmax
        let b0=c[2]/c[6]
        // console.log('bmax:',bmax);
        //以x,y为中心点缩放：
        let db=0.1*b0
        let b=1
        if(k===4){
            console.log(x,y,mx,my);
            b=this.sfb
            c[0]=mx-x*b
            c[1]=my-y*b
            c[2]=c[6]*b
            c[3]=c[7]*b
            c=this.fwjz(c,x,y,mx,my)
        }else{
            if(k===0){b=b0-db}
            if(k===2){b=b0+db}
            if(k===3){b=bmax}
            if(b>bmax){b=bmax}
            if(b<bmin){b=bmin}
            c[0]=c[0]+x*(b0-b)
            c[1]=c[1]+y*(b0-b)
            c[2]=c[6]*b
            c[3]=c[7]*b
            c=this.fwjd(c)
        }
        //范围校正（以免图片“超出”视界），返回数据
        // console.log(c);
        if(k!==4){this.sfb=b,this.cbf=c}
        // console.log(k,this.sfb);
        // console.log(c);
        console.log("地图图片缩放中",x,y,c,b);
        return c
    }
    //聚焦效果
    focus(c,x,y) {
        // let ms=[this.width,this.height]
        if (!this.visible) return    //不可见则直接隐藏，可见则路过这里执行后面。
        // console.log("地图图片对焦中");
        let px=0.5*c[6]
        let py=0.5*c[7]
        //已知目标点的原屏幕x,y值为x,y,其原图x,y值为tx,ty：
        let b0=c[2]/c[6]
        let tx=x*b0+c[0]
        let ty=y*b0+c[1]
        //调整c[0],c[1],使得tx,ty对应的屏幕x,y值为px,py
        // x=(tx-c[0])/b0=px
        c[0]=tx-px*b0
        c[1]=ty-py*b0          
        //范围校正（以免图片“超出”视界），返回数据
        c=this.fwjd(c)
        return c
    }
}
// export {hhimgmapb,hhdtd,hhjwjd,Mapimg}