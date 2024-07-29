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
//返回(地图点)经纬度对应的图片位置
function hhdtd(p,m){
    //2.根据地图信息取得当前经纬度应对应的地图上的位置
    // console.log(m);   
    let d=m.dw;
    let dxy=[]
    let djw=[]
    for (let i=0;i<d.length;i++){
        dxy[i]=[d[i][2],d[i][1]]
        let dw=cydw[d[i][0]]
        djw[i]=hhfsjw(dw[1],dw[2])
        console.log(djw[i]);
    }
    // console.log(djw);
    let blxj=[0,0]
    for (let i=0;i<dxy.length;i++){
        for (let j=i+1;j<dxy.length;j++){
            if (Math.abs(dxy[i][0]-dxy[j][0])>99){
                let b=[dxy[i][0]-dxy[j][0],djw[i][0]-djw[j][0]]
                // console.log(b);
                // if (b[1]<0){b=[-b[0],-b[1]]}
                if (b[1]>0){blxj=[blxj[0]+b[0],blxj[1]+b[1]]}
                // blxj=[blxj[0]+b[0],blxj[1]+b[1]]
                console.log(blxj);
            }
        }
    }
    let blyw=[0,0]
    for (let i=0;i<dxy.length;i++){
        for (let j=i+1;j<dxy.length;j++){
            if (Math.abs(dxy[i][1]-dxy[j][1])>99){
                let b=[dxy[i][1]-dxy[j][1],djw[i][1]-djw[j][1]]
                // if (b[1]<0){b=[-b[0],-b[1]]}
                if (b[1]>0){blyw=[blyw[0]+b[0],blyw[1]+b[1]]}
                // blyw=[blyw[0]+b[0],blyw[1]+b[1]]
                console.log(blyw);
            }
        }
    }
    let k=2
    let dpjw=[p[0]-djw[k][0],p[1]-djw[k][1]]
    let dpxy=[dpjw[0]*blxj[0]/blxj[1],dpjw[1]*blyw[0]/blyw[1]]
    let xy=[dxy[k][0]+dpxy[0],dxy[k][1]+dpxy[1]]
    // console.log(xy);
    let re=[xy[1],xy[0]]
    return re;
    
}
//高斯投影正算公式
function gaussProjection(lo, la) {
    console.log("高斯:",[lo,la]);
    const a = 6378137; // 长半轴
    const e2 = 0.00669438499958; // 第一偏心率的平方
    const lat = la * Math.PI / 180; // 转换为弧度
    const lon = lo * Math.PI / 180; // 转换为弧度
    console.log("lonlat:",[lon,lat]);
    const N = a / Math.sqrt(1 - e2 * Math.sin(lat) * Math.sin(lat));
    const T = Math.tan(Math.PI / 4 - lat / 2) / Math.pow((1 - e2 * Math.sin(lat) * Math.sin(lat)), 0.5);
    const lat2 = Math.log(Math.pow(T, 1 + e2) * Math.pow(1 - e2, 0.5)) / (e2 * Math.PI);
    console.log("N,T,lat2:",N,T,lat2);
    console.log((Math.tan(Math.PI / 4 + lat2 / 2)));
    const x = N * (lon - 0.40349454620783041 * Math.log(Math.abs(Math.tan(Math.PI / 4 + lat2 / 2))) + 0.23344689675573317);
    // const x = N * (lon - 0.40349454620783041 * Math.log((Math.tan(Math.PI / 4 + lat2 / 2))) + 0.23344689675573317);
    const y = N * Math.sin(lat);
    let re=[y,x]
    // console.log(re);
    // return { x: x, y: y };
    return re
}
//1.2,自定义高斯（差值）:输入两经纬数据，返回两者的高斯x,y的差值。
function gauss(si,sj){
    //返回基准子午线（经度值）
    let L0=111
    console.log(si,sj);
    let l=sj[0]-si[0]      //经度差
    let ydf=0.017453292519943295     //1度对应的弧长。
    let B=si[1]*ydf
    // console.log(l,si[3]);
    // console.log(Math.cos(B),Math.tan(B));
    let cosb=Math.cos(B)
    let sb=Math.sin(B)
    let m=Math.cos(B)*ydf*l
    let t=Math.tan(B)
    const a = 6378137; // 长半轴
    let b=6356755    //短半轴
    // let xb=(a+b)*ydf*0.5
    // xb:111132.89764294286
    // let e02=(a*a-b*b)/(a*a)     // 第一偏心率的平方
    // const e2 = 0.00669438499958; // 第一偏心率的平方
    // console.log(e02,e2);
    // let N1=a / Math.sqrt(1 - e02 * Math.sin(B) * Math.sin(B));    //第一偏心率算出的N值
    let e12=(a*a-b*b)/(b*b)     // 第二偏心率的平方
    let c=a*a/b
    let n2=e12*cosb*cosb
    let N=c/Math.sqrt(1+n2)
    let cb=c*ydf
    // console.log(cb);
    // let nb=N*ydf
    // console.log(xb);
    // console.log(nb);
    let X1=111134.8611*sj[1]-(32005.7799*sb+133.9238*sb*sb*sb+0.6976*sb*sb*sb*sb*sb)*cosb
    // console.log(X1);
    let ddx=N*t*(m*m/2+(5-t*t+9*n2+4*n2*n2)*m*m*m*m/24+(61-58*t*t+t*t*t*t)*m*m*m*m*m*m/720)
    let dx=X1+ddx
    let dy=N*(m+(1-t*t+n2)*m*m*m/6+(5-18*t*t+t*t*t*t+14*n2-58*n2*t*t)*m*m*m*m*m/120)
    console.log("ddx:",ddx,"dx:",dx,"dy:",dy);
    // console.log(e12,"c:",c,"N:",N);
    let re=[dx,dy]
    return re;
    

}
//2.2，自定义高斯反解：输入1个经纬点，一组xy偏移量，返回其对应的经纬点。
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
//输入临时（系列）地理点：{key:[地点名，地理上的经度,纬度]}与
//当前所用地理图片.{图片{图源，尺寸}，持续时间，定位[3个以上]}
// 例如：{img:{src:"map/sg/base.jpg",siz:[600,609]},year:[160,280],dw:[["twn",547,570],["dln",497,126],["amd",362,570]]}
//返回图片像素（城市等要素）点：{key:[地点名，图片上的x,y]}………………
function hhpnts(lsmapp,dqmap){
    //1,从三个（以上）定位点获得分辨率与高斯投影坐标的比率。
    //1.1,数据整合：得到定位点的xy与经纬数据
    let dw=dqmap.dw
    let xyjw=[]
    for (let i=0;i<dw.length;i++){
        let dxy=[dw[i][1],dw[i][2]]
        let jw=cydw[dw[i][0]]
        let djw=hhfsjw(jw[1],jw[2])
        let ls=[dxy[0],dxy[1],djw[0],djw[1]]
        xyjw.push(ls)
    }

    //1.2,运用高斯正算公式，分块计算，拼接拟合经纬线
    for (let i=0;i<dw.length;i++){
        for (let j=0;j<dw.length;j++){
            let bxj=[0,0]    //xj比？
            let byw=[0,0]    //yw比？
            //i,j相等时不算,xy单维相距太近不算
            // if(i!==j){
            // if(i!==1&&j!==1){    //测试用，临时。
                console.log("i:",cydw[dw[i][0]]);
                console.log("j:",cydw[dw[j][0]]);
                let si=[xyjw[i][2],xyjw[i][3]]
                let sj=[xyjw[j][2],xyjw[j][3]]
                //从jw生成高斯gx,gy
                let gxy=gauss(si,sj)


            // }
            // }
        }
    
    }
    //2，自定义高斯反解：输入1个经纬点，一组xy偏移量，返回其对应的经纬点。
    //2.1,整合数据：
    let fjsr=[111,22,2466374.5069514965 ,266826.0172776984]
    //2.2，自定义高斯反解：输入1个经纬点，一组xy偏移量，返回其对应的经纬点。
    let hhjw=fjgauss(fjsr)
    for (let i in pnts){
        let p=pnts[i];
        let m=map.sg[0]
        let ms=m.img.siz
        let fp=hhfsjw(p[1],p[2])
        let mp=hhdtd(fp,m)
        console.log(i);
        console.log(mp)
        let xmp=[mp[0]*canvas.width*bl[0][0]/(bl[0][1]*ms[0]),mp[1]*canvas.height*bl[1][0]/(bl[1][1]*ms[1])]
        ctx.beginPath();
        ctx.arc(xmp[0],xmp[1],5,0,2*Math.PI);
        ctx.stroke();
        ctx.font="12px Arial";
        ctx.fillText(p[0],xmp[0],xmp[1]);
    }
}


export {hhpnts}