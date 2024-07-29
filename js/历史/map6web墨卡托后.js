import { cydd } from "./jmsj.js"
//取得常用定位点的常用gxy值
let cydw=cydd.xd
let cydwg={}
// console.log(cydwg);
//返回分数制经纬度
function hhfsjw(j,w){
//1.取得分数制的经纬度
let zj=Math.floor(j)
let zw=Math.floor(w)
let fj=(j-zj)/0.6
let fw=(w-zw)/0.6
let re=[zj+fj,zw+fw]
//   console.log(r);
// let re=gaussProjection(r[0],r[1])
//  console.log(re);
return re;
}
/**/////一，3,输入高斯xy数据gxy,图高比btg，以及当前所用地图数据，返回对应点的图xy.
// function hhdtd(p,m){
function hhdtd(p,tgb,map){
    // console.log(m);
    let si=[p[1],p[2]]
    let gxy=[]
    if(typeof(map.touyin)!=="string"){
        gxy=hhgauss(si)
    }else{
    if(map.touyin==="mokato"){gxy=hhmktxy(si)}
    if(map.touyin==="webmkt"){gxy=hhwebmktxy(si)}
    }
    
    //2.根据地图信息取得当前经纬度应对应的地图上的位置
    // console.log(m);   
    let d=map.dw;
    //y用3点，k取gy差+gx差最小者
    let k=0
    for (let i=1;i<d.length;i++){
let dk=Math.abs(gxy[1]-cydwg[d[k][0]][1])
        let gy0=cydwg[d[i][0]][1]
        let gy=gxy[1]
        let gx0=cydwg[d[i][0]][0]
        let gx=gxy[0]
        let dgy=Math.abs(gy-gy0)+Math.abs(gx-gx0)
        if (dgy<dk){k=i}
    }
    // console.log(d[k]);
    let gxy0=cydwg[d[k][0]]
    let xy0=[d[k][1],d[k][2]] 
    let dgxy=[gxy[0]-gxy0[0],gxy[1]-gxy0[1]]
    let y=xy0[1]+dgxy[1]*tgb[2]/tgb[3]
    let x=xy0[0]+dgxy[0]*tgb[0]/tgb[1]
    // let re=[xy[1],xy[0]]
    //经x比采用一次拟合过的
    //x用中轴子午线
    //x用中轴子午线
    // let x0=0.5*m.img.siz[0]
    // let x=x0+gxy[0]*tgb[0]/tgb[1]
    //
    let xy=[x,y]
    // console.log(xy);
    return xy;
    
}
/**/
////一，1,输入度数制经纬数据(与作为x轴的基准子午线（y轴是赤道线）)。返回高斯x,y值。
function hhgauss(sd){
    let L0=111
    //转化为分数制
    let s=hhfsjw(sd[0],sd[1])
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
    let cb=c*ydf
    let X1=111134.8611*s[1]-(32005.7799*sb+133.9238*sb*sb*sb+0.6976*sb*sb*sb*sb*sb)*cosb
    // console.log(X1);
    let ddx=N*t*(m*m/2+(5-t*t+9*n2+4*n2*n2)*m*m*m*m/24+(61-58*t*t+t*t*t*t)*m*m*m*m*m*m/720)
    let dx=X1+ddx
    let dy=N*(m+(1-t*t+n2)*m*m*m/6+(5-18*t*t+t*t*t*t+14*n2-58*n2*t*t)*m*m*m*m*m/120)
    // console.log("ddx:",ddx,"dx:",dx,"dy:",dy);
    // let re=[dx,dy]
    let re=[dy,dx]    //高斯的xy值需对换。
    return re;
}
//一，二，1.2，自定义高斯反解：输入1个？？数制经纬点，一组xy偏移量，返回其对应的经纬点。
function fjgauss(fjsr){
     let xy=[fjsr[2],fjsr[3]]
     let dj=2.35,dw=0.16392807
     let si=hhfsjw(fjsr[0],fjsr[1]+dw)
     let sj=hhfsjw(si[0]+dj,si[1])
     
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
////一，2，输入当前所用地图信息（包括定位点等。）返回图片xy与高斯xy的比。btg:txy/gxy:[tx,gx,ty,gy]。
function hhpnts(dqmap){
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
        gxy[i]=hhgauss(si)
    }
    //1.4对经X比进行一次拟合，使之成为与y相关的一次函数:b=f(y)
    let bfy=[]
    //1.3,获取图片xy与高斯xy的比。btg:txy/gxy:[tx,gx,ty,gy]
    //1.3.1,设定基准图x与gx(=0)：
    let x0=0.5*dqmap.img.siz[0]
    // let gx0=0
    let btg=[0,0,0,0]
    // //x
    // for (let i=0;i<gxy.length;i++){
    // //略过隔太近的
    //     //x:
    //     if(Math.abs([xyjw[i][0]]-x0)>10){
    //         let b=[[xyjw[i][0]]-x0,gxy[i][0]]
    //         if(b[1]<0){b=[-b[0],-b[1]]}
    //         console.log(cydw[dw[i][0]][0],b[0]/b[1]);
    //         console.log(`x,${i},${b}`);
    //         btg[0]=btg[0]+b[0]
    //         btg[1]=btg[1]+b[1]
    //         //1.4对经X比进行一次拟合，使之成为与y相关的一次函数
    //         //1.4.2记录数据
    //         // let y=xyjw[i][1]
    //         // let yb=b[0]/b[1]
    //         // bfy.push([y,yb])
    //         //1.4.2记录数据
    //     }
    // }
    //x2
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
    //1.4对经X比进行一次拟合，使之成为与y相关的一次函数//1.4.3,进行拟合：//临时，测试用
    // console.log(bfy);
    // let dy=bfy[0][0]-bfy[1][0]
    // let db=bfy[0][1]-bfy[1][1]
    // let dby=db/dy
    // let by0=bfy[0][1]-bfy[0][0]*dby
    // btg[0]=by0
    // btg[1]=dby
    //
    //1.5,汇总
    console.log("总图高比，x:",btg[0]/btg[1],"比y:",btg[2]/btg[3]);
    console.log(btg);
    return btg;
}
//0，根据map信息中关于touyin(投影)的信息选用对应的图地比算法。
function hhimgmapb(map){
    // console.log(typeof(map.touyin)!=="string");
    if(typeof(map.touyin)!=="string"){
        //默认使用高斯投影
        for (let i in cydw){
            let jw=[cydw[i][1],cydw[i][2]]
            let gxy=hhgauss(jw)             //输入指定点的经纬值，返回高斯投影下的xy值。
            cydwg[i]=gxy
        }
        let re=hhpnts(map)
        return re;        
    }else{
        if(map.touyin==="mokato"){
            console.log("使用墨卡托投影正解公式获取图地比：图片xy与地理/地图xy的比例。");
            for (let i in cydw){
                let jw=[cydw[i][1],cydw[i][2]]
                let gxy=hhmktxy(jw)         //输入指定点的经纬值，返回墨卡托投影下的xy值。
                cydwg[i]=gxy
            }
            let re=hhmkttdb(map)
            return re;            
        }
        if(map.touyin==="webmkt"){
            console.log("web墨卡托");
            for (let i in cydw){
                let jw=[cydw[i][1],cydw[i][2]]
                let gxy=hhwebmktxy(jw)         //输入指定点的经纬值，返回web墨卡托投影下的xy值。
                cydwg[i]=gxy
            }
            let re=hhtdb(map,"webmkt")
            return re;
        }
    }
}
//二，1，输入度数制经纬数据(与作为x轴的基准子午线（y轴是赤道线）)。返回墨卡托x,y值。
function hhmktxy(jw){
    let L0=111    //测试，临时指定。
    //转化为分数制
    let s=hhfsjw(jw[0],jw[1])
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
////二，2，输入当前所用地图信息（包括定位点等。）返回图片xy与高斯xy的比。btg:txy/gxy:[tx,gx,ty,gy]。
function hhmkttdb(dqmap){
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
        gxy[i]=hhmktxy(si)
    }
    //1.4对经X比进行一次拟合，使之成为与y相关的一次函数:b=f(y)
    let bfy=[]
    //1.3,获取图片xy与高斯xy的比。btg:txy/gxy:[tx,gx,ty,gy]
    //1.3.1,设定基准图x与gx(=0)：
    let x0=0.5*dqmap.img.siz[0]
    // let gx0=0
    let btg=[0,0,0,0]
    // //x
    // for (let i=0;i<gxy.length;i++){
    // //略过隔太近的
    //     //x:
    //     if(Math.abs([xyjw[i][0]]-x0)>10){
    //         let b=[[xyjw[i][0]]-x0,gxy[i][0]]
    //         if(b[1]<0){b=[-b[0],-b[1]]}
    //         console.log(cydw[dw[i][0]][0],b[0]/b[1]);
    //         console.log(`x,${i},${b}`);
    //         btg[0]=btg[0]+b[0]
    //         btg[1]=btg[1]+b[1]
    //         //1.4对经X比进行一次拟合，使之成为与y相关的一次函数
    //         //1.4.2记录数据
    //         // let y=xyjw[i][1]
    //         // let yb=b[0]/b[1]
    //         // bfy.push([y,yb])
    //         //1.4.2记录数据
    //     }
    // }
    //x2
    for (let i=0;i<gxy.length;i++){
        for (let j=i+1;j<gxy.length;j++){
        //略过隔太近的
        //y:
        let lsk=0
        if(Math.abs([xyjw[i][lsk]]-[xyjw[j][lsk]])>10){
            let b=[[xyjw[i][lsk]]-[xyjw[j][lsk]],gxy[i][lsk]-gxy[j][lsk]]
            if(b[1]<0){b=[-b[0],-b[1]]}
            console.log(cydw[dw[i][0]][0],cydw[dw[j][0]][0],b[0]/b[1]);
            console.log(`x,${i},${j},${b}`);
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
            console.log(cydw[dw[i][0]][0],cydw[dw[j][0]][0],b[0]/b[1]);
            console.log(`y,${i},${j},${b}`);
            btg[2]=btg[2]+b[0]
            btg[3]=btg[3]+b[1]
        }
        }
    }
    //1.4对经X比进行一次拟合，使之成为与y相关的一次函数//1.4.3,进行拟合：//临时，测试用
    // console.log(bfy);
    // let dy=bfy[0][0]-bfy[1][0]
    // let db=bfy[0][1]-bfy[1][1]
    // let dby=db/dy
    // let by0=bfy[0][1]-bfy[0][0]*dby
    // btg[0]=by0
    // btg[1]=dby
    //
    //1.5,汇总
    console.log("总图高比，x:",btg[0]/btg[1],"比y:",btg[2]/btg[3]);
    console.log(btg);
    return btg;
}
//三，1，WGS84坐标与web墨卡托投影坐标转换
function hhwebmktxy(jw){
    // console.log(1/(Math.PI / 180));
    let k=111319.49077777778
    let x=k*(Math.log(Math.tan((jw[1]+90)*0.008726646259971648)))*57.29577951308232
    let y=jw[0]*k
    let re=[y,x]
    return re;    
}
//三,2,返回墨卡托图地比
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
    if(str==="webmkt"){
        for (let i=0;i<dw.length;i++){
            let si=[xyjw[i][2],xyjw[i][3]]
            gxy[i]=hhwebmktxy(si)
        }
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
    console.log("总图高比，x:",btg[0]/btg[1],"比y:",btg[2]/btg[3]);
    console.log(btg);
    return btg;
}
//  //
export {hhimgmapb,hhdtd}