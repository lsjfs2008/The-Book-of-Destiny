import Sprite from './base/sprite.js'
import {sj,pst,buju,cydd,map,cydw} from './jmsj.js'    //导入常量
import { deepCopy,resize } from './tools.js'    //导入工具
import { hhpnts } from './map.js'
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
let dqbj=deepCopy(buju)
let dqxs=dqbj[dqbj.ms]

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
                  //console.log(e)
                  if(this.djwx===0){this.djgn(x,y)}    //点击1无效，0有效。
                  //this.render()
                }
                ))
    }
    start(){
        //尝试调用本地存储的配置数据：
        if(typeof(Storage)!=="undefined"){
            localStorage.setItem('buju',JSON.stringify(dqbj));    //json转为str再保存
            // dqbj=JSON.parse(localStorage.getItem('buju'));   //读取再str转为json
        }
        dqxs=dqbj[dqbj.ms];
        // canvas.style="overflow: hidden;position: absolute;"
        document.getElementById('zhudiv').appendChild(canvas)
        console.log("canvas x,y:",canvas.width,canvas.height);
        let bl=dqxs.bl
        let dqmap=map.sg[0]    //设定当前地图
        this.bg = sctp(dqmap.img) //背景图片//地图
        this.bg.onload=()=>{
            ctx.drawImage(this.bg,0,0,canvas.width*bl[0][0]/bl[0][1],canvas.height*bl[1][0]/bl[1][1])
            let lsmapp=cydd.xd    //临时（系列）地理点：{key:[地点名，地理上的经度,纬度]}
            let tgb=hhpnts(dqmap)     //从地图点返回图片像素（城市等要素）点：{key:[地点名，图片上的x,y]}………………
            //2，描绘预设地点
    for (let i in lsmapp){
        //2.1,获取预设地点的高斯xy
        ////1.2,输入分数制经纬数据，得到对应的高斯xy数据
        let p=lsmapp[i];
        // let fp=hhfsjw(p[1],p[2])
        let L0=111
        let si=[p[1],p[2]]
        let gxy=hhgauss(si,L0)
        //2.2,输入高斯xy数据gxy,图高比btg，返回对应点的图xy.
        let m=map.sg[0]
        let ms=m.img.siz
        let mp=hhdtd(gxy,m)
        console.log(i);
        console.log(mp)
        //2.3,根据图xy绘图
        let xmp=[mp[0]*canvas.width*bl[0][0]/(bl[0][1]*ms[0]),mp[1]*canvas.height*bl[1][0]/(bl[1][1]*ms[1])]
        ctx.beginPath();
        ctx.arc(xmp[0],xmp[1],5,0,2*Math.PI);
        ctx.stroke();
        ctx.font="12px Arial";
        ctx.fillText(p[0],xmp[0],xmp[1]);
    }
        }
        this.bg1 = sctp(sj.bgimg[0]) //背景图片
        this.bg1.onload=()=>{
            ctx.drawImage(this.bg1,canvas.width*bl[0][0]/bl[0][1],0,canvas.width-canvas.width*bl[0][0]/bl[0][1],canvas.height*bl[1][0]/bl[1][1])
        }
        this.bg2 = sctp(sj.bgimg[1]) //背景图片
        this.bg2.onload=()=>{
            ctx.drawImage(this.bg2,0,canvas.height*bl[1][0]/bl[1][1],canvas.width,canvas.height-canvas.height*bl[1][0]/bl[1][1])
        }
        

    }
    
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
