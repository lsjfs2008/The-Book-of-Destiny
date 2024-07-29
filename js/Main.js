import Sprite from './base/sprite.js'
import {sj,pst,buju,cydd,map,sjx} from './jmsj.js'    //导入常量
import { deepCopy,resize,hhsjmcc } from './tools.js'    //导入工具
import { hhimgmapb,hhdtd,hhjwjd } from './map.js'
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
export default class Main{
    constructor() {
        // 维护当前requestAnimationFrame的id
        this.aniId = 0
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
    }
    start(){
        //一，加载默认数据，如果有本地存储数据，更新为本地存储数据。
        //尝试调用本地存储的配置数据：
        this.bj=dqbj
        if(typeof(Storage)!=="undefined"){
            localStorage.setItem('buju',JSON.stringify(dqbj));    //json转为str再保存
            // dqbj=JSON.parse(localStorage.getItem('buju'));   //读取再str转为json
        }
        this.vs=this.bj[this.bj.ms].vs;
        // canvas.style="overflow: hidden;position: absolute;"
        document.getElementById('zhudiv').appendChild(canvas)
        // console.log("canvas x,y:",canvas.width,canvas.height);
        
        this.tj=dqtj
            // console.log(tj);
            if(typeof(Storage)!=="undefined"){
                localStorage.setItem('sjx',JSON.stringify(this.tj));    //json转为str再保存
                // this.tj=JSON.parse(localStorage.getItem('sjx'));   //读取再str转为json
            }
        //1,地图
        let mapcsxl=[map.sg[1],map.sg[1],map.cs]    //临时，测试地图组。
        this.map=mapcsxl[1]    //设定当前地图
        this.tgb=hhimgmapb(this.map)     //输入当前所用地图信息（包括定位点等。）返回图片xy与高斯xy/地图xy的比。btg:txy/gxy:[tx,gx,ty,gy]。
        let bg0 = sctp(this.map.img) //生成背景图片obj//地图
        let bg1 = sctp(sj.bgimg[0]) //背景图片//文本
        let bg2 = sctp(sj.bgimg[1]) //背景图片//时间线
        this.bg=[bg0,bg1,bg2]
        // console.log(this.bg);
        window.onload=()=>{console.log('window.onload');this.render();}
        window.onresize=()=>{
            lssize=resize()
            canvas.width = lssize[0]
            canvas.height = lssize[1]
            dqjmcc=hhsjmcc(dqbj[dqbj.ms],lssize)    //当前界面尺寸
            this.render();
        }//临时用用，监控浏览器尺寸改变。//
        // this.bg[0].onload=()=>{console.log('this.bg[0].onload');}
        // this.bg[1].onload=()=>{console.log('this.bg[1].onload');}
        // this.bg[2].onload=()=>{console.log('this.bg[2].onload');}
    //  //
    }//start()//
/**////二，根据当前数据，刷新/（重新）加载屏幕………………数据与绘图分离…………
render(){
    //清屏
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    //分区域更新绘图
    let cc=dqjmcc
    // console.log('this.vs:',this.vs);
    if(this.vs[0]>0){
        //加载图文线：
        //1.1.1等比例缩放图片以匹配显示区域，多余的裁剪。中心定位。
        let c=[0,0,this.bg[0].width,this.bg[0].height,cc[0][0],cc[0][1],cc[0][2],cc[0][3]]
        if(c[2]*c[7]>c[3]*c[6]){
            c[0]=0.5*(c[2]-c[3]*c[6]/c[7])
            c[2]=c[2]*c[6]/c[7]
        }else{
            c[1]=0.5*(c[3]-c[2]*c[7]/c[6])
            c[3]=c[2]*c[7]/c[6]}
        ctx.drawImage(this.bg[0],c[0],c[1],c[2],c[3],c[4],c[5],c[6],c[7])
        let lsmapp=cydd.xd    //临时（系列）地理点：{key:[地点名，地理上的经度,纬度]}
        //1.2，描绘预设地点
        for (let i in lsmapp){
        let p=lsmapp[i];    //测试用地理点，经纬数据。
        //1.2.2,输入所需定位的点p(的度数制经纬数据),图高比btg，以及当前所用地图数据，返回对应点的图xy.
        let mp=hhdtd(p,this.tgb,this.map)
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
        //  //
    }
    if(this.vs[1]>0){
        //2，文本
        ctx.drawImage(this.bg[1],cc[1][0],cc[1][1],cc[1][2],cc[1][3])
    }
    if(this.vs[2]>0){
        //3,时间线
        ctx.drawImage(this.bg[2],cc[2][0],cc[2][1],cc[2][2],cc[2][3])
        //显示公元纪年
        let tc=cc[2]   //时间线区域的[x,y,w,h]
        let t=this.tj.tim    //[起始（年），时长（年），当前时间（年）]//时长：年月日世纪元会……缩放功能
        let py=Math.floor(tc[2]/t[1])    //py像素每年
        console.log('py:',py,'像素每年');
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
}//render()//
/**/
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
