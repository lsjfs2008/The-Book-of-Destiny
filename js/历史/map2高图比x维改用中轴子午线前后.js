import { cydw } from "./jmsj.js"
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
/**/////2.2,输入高斯xy数据gxy,图高比btg，以及当前所用地图数据，返回对应点的图xy.
// function hhdtd(p,m){
function hhdtd(p,tgb,m){
    console.log(tgb);
    let si=[p[1],p[2]]
    let gxy=hhgauss(si)
    //2.根据地图信息取得当前经纬度应对应的地图上的位置
    // console.log(m);   
    let d=m.dw;
    let k=2    //试用第3个定位点为基准点///
    let xy0=[d[k][1],d[k][2]]
    let djw=cydw[d[k][0]]
    let jw0=[djw[1],djw[2]]
    let gxy0=hhgauss(jw0)
    let dgxy=[gxy[0]-gxy0[0],gxy[1]-gxy0[1]]
    let xy=[xy0[0]+dgxy[0]*tgb[0]/tgb[1],xy0[1]+dgxy[1]*tgb[2]/tgb[3]]
    console.log(xy);
    // let re=[xy[1],xy[0]]
    return xy;
    
}
/**/
////1.2.1,输入度数制经纬数据(与作为x轴的基准子午线（y轴是赤道线）)。返回高斯x,y值。
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
    let b=6356755    //短半轴
    let e12=(a*a-b*b)/(b*b)     // 第二偏心率的平方
    let c=a*a/b
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

//2.2，自定义高斯反解：输入1个？？数制经纬点，一组xy偏移量，返回其对应的经纬点。
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
////输入当前所用地图信息（包括定位点等。）返回图片xy与高斯xy的比。btg:txy/gxy:[tx,gx,ty,gy]。
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
    //1.3,获取图片xy与高斯xy的比。btg:txy/gxy:[tx,gx,ty,gy]
    //1.3.1,设定基准图x与gx(=0)：
    let x0=0.5*dqmap.img.siz[0]
    let gx0=0
    let btg=[0,0,0,0]
    for (let i=0;i<gxy.length;i++){
    //略过隔太近的
        //x:
        if(Math.abs([xyjw[i][0]]-x0)>30){
            let b=[[xyjw[i][0]]-x0,gxy[i][0]]
            if(b[1]<0){b=[-b[0],-b[1]]}
            console.log("临时x图高比：",b[0]/b[1]);
            console.log(`x,${i},${b}`);
            btg[0]=btg[0]+b[0]
            btg[1]=btg[1]+b[1]
        }
    }
    for (let i=0;i<gxy.length;i++){
        for (let j=i+1;j<gxy.length;j++){
        //略过隔太近的
        //y:
        if(Math.abs([xyjw[i][1]]-[xyjw[j][1]])>30){
            let b=[[xyjw[i][1]]-[xyjw[j][1]],gxy[i][1]-gxy[j][1]]
            if(b[1]<0){b=[-b[0],-b[1]]}
            console.log("临时y图高比：",b[0]/b[1]);
            console.log(`y,${i},${j},${b}`);
            console.log(b);
            btg[2]=btg[2]+b[0]
            btg[3]=btg[3]+b[1]
        }
        }
    }
    console.log("总图高比，x:",btg[0]/btg[1],"比y:",btg[2]/btg[3]);
    console.log(btg);
    return btg;
}


export {hhpnts,hhdtd}