import Sprite from './base/sprite'
import {sj,pst} from './jmsj'    //常量
import DataBus from './databus'
const databus = new DataBus()
const ctx = canvas.getContext('2d')
const screenWidth = window.innerWidth
const screenHeight = window.innerHeight
const xsw=screenWidth/720
const xsh=screenHeight/1280
//1.声明一批将要用到的游戏参数（变量）：yxcs
var yxcs={
  jd     : 0,             //演算进度，0刚开始，1-4，第一次演算，上下左右；
  jgsz : [[0,1],[1,1],[2,1],[3,1],[4,1],[5,1],[6,1],[7,1],[8,1]],    //九宫数字取值
  lyjgsz : [[0,1],[1,1],[2,1],[3,1],[4,1],[5,1],[6,1],[7,1],[8,1]],    //另一个九宫数字取值
  cyyssz : [[0,1],[2,3],[0,2],[1,3]],    //参与运算的数字在数列中的位置
  ////
  qgszcz :[[0,1],[1,1],[2,1],[3,1],[4,1],[5,1],[6,1]],    //七个数字初值
  qgszls :[[0,1],[1,1],[2,1],[3,1],[4,1],[5,1],[6,1]],    //七个数字临时值
  //qgszzz :[[0,1],[1,1],[2,1],[3,1],[4,1],[5,1],[6,1]],    //七个数字终值
  qgszzt :[1,1,1,1,0,0,0],    //七个数字状态，（1）能（0）否参与运算/被选
  sgxs:   [0,1,2,3],          //四个格子显示（七数中的）哪个数字//以及，四格当前处于哪个状态。
  sgxz:   [0,0,0,1],    //四个格子当前是否被选中。以及，被第几（1，2）个选中。
  lsbx: [3,-1,-1],      //当前被选中的数字（0，1）和运算（2），
  lsysxl:[[-1,-1,-1],[-1,-1,-1],[-1,-1,-1],],    //当前运算序列
  jgysxl:[[-1,-1,-1],[-1,-1,-1],[-1,-1,-1],],    //结果可行的运算序列
  ////
  sfp : ['+','-','×','÷'],    //运算字符
  zt     : 0,             //游戏是否暂停，0运行，1暂停。
  gg     : 0,             //游戏是否过关，0未过，1过关。
  ren    :[1,1,1,1,0,0,0,0,0],    //给表达render传递显示与否的信号
  jgwb   :new String,    //结果文本
  xsms   :0,      //显示模式：0，普通游戏；1，设置；2，说明；3二维码。
  yxms   :0,      //游戏模式：0，整数模式。1，分数模式。
  dclog  :0,      //单次log
  xsqun  :0,      //显示群
  ////声音
  bgmkg  :1,
  bjyy   :new Audio(),    //背景音乐
  bjbfz  :0,
  sykg   :1,    //声音开关
  syjd   :[1,-1,-1,-1],    //声音进度（0开关,第i1段第j2句第k3词）
  sycd   :0,    //声音长度
  syst   :0,    //声音开始时间
  dqsy   :new Audio(),    //当前声音
  dqsybfz:0,    //当前声音播放中0无1有
  zstj   :0,    //帧数统计
  djtj   :0,    //点击统计
  dcdjtj :0,    //多次点击统计
  tscstj :0,    //提示次数统计。
  tjsx   :25,    //统计上限
  yssysz   :new Array,    //数字与运算声音数组
  yssyzsz   :new Array,    //数字与运算声音子数组
  yssysj   :new Array,    //数字与运算声音数据
  yssy   :new Audio(),    //数字与运算声音
  yssybfz  :0,    //运算声音播放中0无1有
  bfcsss  :0,    //播放初始4数
}
//主函数
export default class Main {
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
                  if(this.djwx===0){this.djgn(x,y)}
                  //this.render()
                }
                ))
    }
    //游戏开始：
    start(){
        this.xsms=yxcs.xsms    //显示模式
            //pst数据（根据屏幕分辨率）转换
        this.pst=fblzh(pst)    //分辨率转换
        //console.log(screenWidth,screenHeight)
        //资料导入
        this.bg = sctp(sj.bgimg,pst.bgimg)    //背景
            ///声音
    this.sy=scsy(sj.sound)
    //播放背景音乐
    yxcs.bjyy.src="sound/bgm.mp3"
    this.bgmbf()
        szcsh()            //四角数字初始化
        this.wbdxxs=hhwbdxxs(this.pst.wbkzx[0],sj.yxjstxt,sj.txtgs,0)    //指定文本框显示文本
        this.restart()
        yxcs.syjd=[1,4,0,0]    //声音进度初始化
    }
    //游戏重启
restart() {
    //szcsh()            //四角数字初始化
    //this.ms = sctp(sj.msimg,pst.msimg)    //游戏模式
    //参数导入
    this.jgsz=hhjbsz(yxcs.jgsz)
    this.lyjgsz=hhjbsz(yxcs.lyjgsz)
    this.ren=hhjbsz(yxcs.ren)
    this.jd=yxcs.jd    //进度
    this.jgwb=yxcs.jgwb
    this.gg=yxcs.gg    //过关
    //新参数
    this.bx=hhjbsz(yxcs.lsbx)   //被选数字位置与运算
    this.sgxs=hhjbsz(yxcs.sgxs)    //当前四个格子显示（七数中的）哪个数字
    this.qgszls=hhjbsz(yxcs.qgszcz)    //七个数字，临时。
    this.djwx=0//过关状态点击无效，此处重置有效
    //console.log(sj.sound);
    //console.log(this.sy);
    yxcs.bfcsss=1    //播放初始4数
    //动画循环
    this.bindLoop = this.loop.bind(this)
    this.hasEventBind = false
    // 清除上一局的动画
    window.cancelAnimationFrame(this.aniId)
    this.aniId = window.requestAnimationFrame(
      this.bindLoop,
      canvas
    )
}
//播放声音全
sybf0(i){
    let s=this.sy[i]
    //s.pause()
    s.currentTime=0
    s.play()
}
//播放串行声音
sybf1(i){
    //console.log(yxcs.syjd);
    yxcs.dqsy.pause()
    yxcs.dqsy=this.sy[i]
    yxcs.dqsy.currentTime=0
    yxcs.dqsy.play()
}
//播放背景音乐
bgmbf(){
    let sy=yxcs.bjyy
    console.log(sy.src);
    if(yxcs.bgmkg===0){
        console.log('音乐');
        console.log(sy.currentTime);
        sy.pause()
    }else if(yxcs.bjbfz===0){
        sy.pause()
        yxcs.bjbfz=1
        sy.currentTime=0
        sy.loop=true
        sy.play()
        console.log('bf音乐');}
}
//运算声音播放
yssybf(){
    //例：yxcs.yssysz:9*(103/7):[[[9]],[[16]],[[7],[13],[1,11,0,3]]],
    if(yxcs.yssybfz===0){
        if(yxcs.yssysz.length>0){
            if(yxcs.yssyzsz.length===0){
                yxcs.yssyzsz=yxcs.yssysz.shift()
                }  
        }
        if(yxcs.yssyzsz.length>0){
            yxcs.yssysj=yxcs.yssyzsz.shift()
            yxcs.yssybfz=1
        }
    }
        this.bfydsy()
}
//播放一段声音
bfydsy(){
    let z=yxcs.yssysj
    //console.log(yxcs.dqsybfz)
    if(yxcs.dqsybfz===0){
        //console.log(yxcs.yssysj)
        if(z.length>0){
            let c=z.shift()
            if(c>1000){
                yxcs.sycd=c-1000    //纯延时
            }else{
                yxcs.sycd=sj.sound.suzi[c][2]    //设定声音长度
                this.sybf1(c)
            }
            let d=new Date()
            yxcs.syst=d.getTime()
            yxcs.dqsybfz=1
        }else{
            yxcs.yssybfz=0
        }
    }else{
        let d1=new Date()
        let lst=d1.getTime()
        if (lst>yxcs.syst+yxcs.sycd){
            yxcs.dqsybfz=0
        }
    }
    
}
//加载/上传数字声音
jzszsy(s){
    //console.log(s);
    let ls=[]
    if(s[0]<0){
        ls.push([106])
        //负
    }
    if(s[1]>1){
        let s1=this.hhsyxl(s[1])    //返回声音序列（大于10的数）
        ls.push(s1)
        ls.push([13])
        //s[1]分之
    }
    let s0=this.hhsyxl(Math.abs(s[0]))
    //console.log(s0);
    //例：s0:103:[1,11,0,3]
    ls.push(s0)
    //例：ls:103/7:[[7],[13],[1,11,0,3]]
    //console.log(ls);
    yxcs.yssysz.push(ls)
    //例：yxcs.yssysz:9*103/7:[[[9]],[[16]],[[7],[13],[1,11,0,3]]],
    //console.log(yxcs.yssysz);
    //this.sybfjz(ls)    //播放句子
}
//加载/上传等于声音
jzdysy(s){
    let ls=[]
    ls.push([18])
    yxcs.yssysz.push(ls)
    this.jzszsy(s)
}
//返回声音序列（大于10的数）
hhsyxl(s){
   // console.log(s);
    let re=[]
    let z=[0,0,0,0]
    z[3]=Math.floor(s/1000)
    z[2]=Math.floor((s-z[3]*1000)/100)
    z[1]=Math.floor((s-z[3]*1000-z[2]*100)/10)
    z[0]=s-z[3]*1000-z[2]*100-z[1]*10
    //console.log(z);
    if(z[3]>0){
        re.push(z[3])
        re.push(12)
        if(z[2]>0){
            re.push(z[2])
            re.push(11)
            if(z[1]>0){
                re.push(z[1])
                re.push(10)
                if(z[0]>0){
                    re.push(z[0])
                }
            }else{
                if(z[0]>0){
                    re.push(0)
                    re.push(z[0])
                }
            }
        }else{
            if(z[1]>0){
                re.push(0)
                re.push(z[1])
                re.push(10)
                if(z[0]>0){
                    re.push(z[0])
                }
            }else{
                if(z[0]>0){
                    re.push(0)
                    re.push(z[0])
                }
            }
        } 
    }else{
        if(z[2]>0){
            re.push(z[2])
            re.push(11)
            if(z[1]>0){
                re.push(z[1])
                re.push(10)
                if(z[0]>0){
                    re.push(z[0])
                }
            }else{
                if(z[0]>0){
                    re.push(0)
                    re.push(z[0])
                }
            }
        }else{
            if(z[1]>1){
                re.push(z[1])
                re.push(10)
                if(z[0]>0){
                    re.push(z[0])
                }
            }else if(z[1]===1){
                re.push(10)
                if(z[0]>0){
                    re.push(z[0])
                }
            }else{re.push(z[0])}
        } 
    }
    //console.log(re);
    return re;
}
ystime(i){
    let ls=[i+1000]
    console.log(ls);
    yxcs.yssysz.push([ls])
}
//声音进度控制
syjdkz(){
    let s=yxcs.syjd
        let dl    //段落
        if (s[1]===0){dl=sj.syyxjs0}
        if (s[1]===1){dl=sj.syyxjs1}
        if (s[1]===2){dl=sj.syyxjs2}
        if (s[1]===3){dl=sj.syyxjs3}
        if (s[1]===4){dl=sj.syyxjs4}
        if (s[1]===5){dl=sj.syyxjs5}
        //if (s[1]===6){dl=sj.syyxjs6}
        //console.log(s);
        let jz=dl[s[2]][1]   //句子
        let c=jz[s[3]]   //词
    if(s[0]===1){
        if(c>1000){
            yxcs.sycd=c-1000    //纯延时
        }else{
            yxcs.sycd=sj.sound.suzi[c][2]    //设定声音长度
            this.sybf1(c)
        }
        let d=new Date()
        yxcs.syst=d.getTime()
        yxcs.dqsybfz=1
        // //console.log(s);
        // yxcs.sycd=sj.sound.suzi[c][2]    //设定声音长度
        // let d=new Date()
        // yxcs.syst=d.getTime()
        // //console.log(yxcs.sycd);
        // this.sybf1(c)
        // yxcs.dqsybfz=1
        s[0]=0    //等待
    }else{
        let d1=new Date()
        let lst=d1.getTime()
        if (lst>yxcs.syst+yxcs.sycd){
           //播放整段、整句 
           if(s[1]<4){
            if(s[3]<jz.length-1){
                s[3]++
                s[0]=1
                //yxcs.dqsybfz=0
               }else if(s[2]<dl.length-1){
                s[3]=0
                s[2]++
                s[0]=1
                //yxcs.dqsybfz=0
               }else{
                yxcs.dqsybfz=0
                s[0]=0 
               }
           }else{
            if(s[3]<jz.length-1){
                s[3]++
                s[0]=1
                //yxcs.dqsybfz=0
               }else{
                yxcs.dqsybfz=0
                s[0]=0 
               }
           }
        }
    }
}
//点击统计
sydjtj(){
    yxcs.zstj++
    if(yxcs.zstj>30){
        yxcs.zstj=0
            if(yxcs.djtj===0){    //如果期间没有点击
                yxcs.tjsx--
                if(yxcs.tjsx<=0){
                    yxcs.tscstj++
                    yxcs.tjsx=25
                    yxcs.syjd=[1,0,0,0]    //提示音
                }
            }else{
                yxcs.tjsx=yxcs.tjsx+25*yxcs.tscstj
            }
    }
}
//按钮功能集成
jcangn(i){
    if (i===11){
        //游戏说明
        if(this.xsms===2||yxcs.syjd[1]===5||yxcs.syjd[1]===3){
            this.xsms=0
            yxcs.syjd=[0,4,0,0]
        }else{this.xsms=2
            yxcs.syjd=[1,1,0,0]}
        console.log(this.xsms)        
        }
    if(yxcs.syjd[1]===4||yxcs.syjd[1]===0){
//加减乘除
if (i>=0&&i<=3){
    this.bx[2]=i
    this.sybf0(14+i)
    //sybf(this.sy[0],sj.sndt.jjcc[i])
    }
    if (i===4){
        //重开本局
        this.restart()
        }
        if (i===5){
        //跳过本局
        szcsh()
    this.restart()   
    console.log(this.sgxs) 
        }
        if (i===6){
        //本局无解
        let da=this.hhckda()
        if (da==="无解"){
            this.jgwb="对啦！无解。"
            yxcs.yssysz.push([[24]])
            this.guoguan()
        }else{
            this.jgwb=da
        }
        this.ren[8]=1    
        }
        if (i===7){
        //本局提示
        //console.log(this.jgwb)
        this.jgwb=this.hhckda()
        this.ren[8]=1    
        }
    if (i===8){
    //开关声音
    console.log("开关声音")
    if(yxcs.sykg===0){yxcs.sykg=1}else{yxcs.sykg=0}
    }
    if (i===9){
    //开关音乐
    if(yxcs.bgmkg===0){yxcs.bgmkg=1
        console.log("开音乐")  }else{yxcs.bgmkg=0
            console.log("关音乐")  }
    this.bgmbf()
      
    }
    if (i===10){
    //整分模式
    if(yxcs.yxms===0){
        yxcs.yxms=1
    }else{
        yxcs.yxms=0
    }
    //四角数字初始化
szcsh()
this.restart()        
    }
    
    }
    //教学声音
    if(yxcs.syjd[1]===3||yxcs.syjd[1]===5){
    //if(yxcs.syjd[1]===5){
        yxcs.syjd=[1,5,i,0]
    }
}
//（返回）参考答案
hhckda(){
    let re="无解"
    let s=yxcs.jgsz.slice(0,4)
    let ss=hhsypl44(s)    //返回所有数组排列
    let ls=hhsy24ss(ss)    //返回所有结果24的算式1
    if(ls.length>0){    //若有结果，随机取一个，返回其表达示
        let ln=ls.length
        let sj=Math.floor(Math.random()*ln)
        let sjjg=ls[sj]
        console.log(sjjg)
        let sjstr=this.jgtostr(sjjg)    //将形式n的算式转换为str
        re=sjstr[0]     //上面返回了一组数据，此处返回第一个。………………………………………………
        //return re
    }else{yxcs.yssysz.push([[120]])}
    return re
}
//将形式N的算式转换为str,当前3种、//返回了一组字符//以及一组读音………………
jgtostr(jg){
    let re=["","","",""]
    //let re=""
    let s=jg[0]    //数（组）
    let y=jg[1]    //运算
    let xs=jg[2]   //运算形式
    let f=yxcs.sfp    //运算字符
    let s0=hh2ysstr(s[0],1)
    let s1=hh2ysstr(s[1],1)
    let s2=hh2ysstr(s[2],1)
    let s3=hh2ysstr(s[3],1)
    //let ls="=24"
    //if(yxcs.yxms===1){
    let ls0=hhxdysstr(jg);    //返回指定运算结果字符
    let ls1=zjjgzzf(ls0,0)
    let ls=zjjgzzf(ls0,1)
    //}
    if (xs===0){    //顺序式
        //加载第一组运算的声音
        this.jzszsy(s[0])
        yxcs.yssysz.push([[14+y[0]]])
        this.jzszsy(s[1])
        //
        let s01=s0+f[y[0]]+s1
        re[0]=s01+ls[0]
        if (y[1]===3){s01="("+s01+")"}
        if (y[1]===2&&y[0]!==2){s01="("+s01+")"}
        let s012=s01+f[y[1]]+s2
        re[1]=ls1[0]+f[y[1]]+s2+ls[1]
        if (y[2]===3){s012="("+s012+")"}
        if (y[2]===2&&y[1]!==2){s012="("+s012+")"}
        re[2] = ls1[1]+f[y[2]]+s3+ls[3]
        re[3] = s012+f[y[2]]+s3+ls[3]
    }
    if (xs===1){    //中分式
        //加载第一组运算的声音
        this.jzszsy(s[0])
        yxcs.yssysz.push([[14+y[0]]])
        this.jzszsy(s[1])
        //
        let s01="("+s0+f[y[0]]+s1+")"
        re[0]=s0+f[y[0]]+s1+ls[0]
        let s23="("+s2+f[y[2]]+s3+")"
        re[1]=s2+f[y[2]]+s3+ls[1]
        re[2]=ls1[0]+f[y[1]]+ls1[1]+ls[3]
        re[3] = s01+f[y[1]]+s23+ls[3]
    }
    if (xs===2){    //中先式
        //加载第一组运算的声音
        this.jzszsy(s[1])
        yxcs.yssysz.push([[14+y[1]]])
        this.jzszsy(s[2])
        //
        let s12="("+s1+f[y[1]]+s2+")"
        re[0]=s1+f[y[1]]+s2+ls[0]
        let s012=s0+f[y[0]]+s12
        re[1]=s0+f[y[0]]+ls1[0]+ls[1]
        if (y[2]===3){s012="("+s012+")"}
        if (y[2]===2&&y[0]!==2){s012="("+s012+")"}
        re[2]=ls1[1]+f[y[2]]+s3+ls[3]
        re[3] = s012+f[y[2]]+s3+ls[3]
    }
    //console.log(re)
    return re
}
//游戏过关
guoguan(){
    console.log("过关了")
    yxcs.yssysz.push([[24]])
    this.djwx=1//过关状态点击无效
    szcsh()            //四角数字初始化
    setTimeout(() => {
        this.restart()
    }, 1500);
}
//加群
jiaqun(){
    if(yxcs.xsqun===0){
        yxcs.xsqun=1
    }else{yxcs.xsqun=0}
}
syzk(){
    if(yxcs.sykg===1){
    ////声音进度控制
    this.syjdkz()
    //点击统计
    this.sydjtj()
    //数字与运算声音播放
    this.yssybf()
    //播放初始4数
    if(yxcs.bfcsss===1&&yxcs.dqsybfz===0){
        //console.log('播放初始4数');
        //console.log(this.qgszls[0]);
        this.ystime(600)
        this.jzszsy(this.qgszls[0])
        this.jzszsy(this.qgszls[1])
        this.jzszsy(this.qgszls[2])
        this.jzszsy(this.qgszls[3])
        yxcs.bfcsss=0
    }  
    }
}
/**
   * canvas重绘函数
   * 每一帧重新绘制所有的需要展示的元素
   */
 render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    //背景
    //this.bgmbf()
    this.bg[0].drawToCanvas(ctx)
    //this.ms[yxcs.yxms].drawToCanvas(ctx)
    //console.log(this.bgimg)
    //四角与四边数字显示
    switch (this.xsms){
        case 0:
            for (let i=0;i<4;i++){
                mhsjwbk(this.qgszls[this.sgxs[i]],this.pst.wbksj[i])
                //if (this.ren[i]>0){      mhsjwbk(this.jgsz[i],this.pst.wbksj[i])    }
              }
              if (this.jgwb.length>0){mhwbk(this.jgwb,this.pst.wbkzx[0])}
              //……………………………………………………改为分步显示…………直接返回第一步。
              break;
        case 2:
            mhcwbk(this.pst.wbkzx[0])
            zdwbkxswb(this.wbdxxs,this.pst.wbkzx[0],sj.yxjstxt,sj.txtgs,0)    //根据指定文本大小系数，文本框，文本内容，格式，模式显示文本
    }
    if(yxcs.xsqun===1){
        this.bg[1].drawToCanvas(ctx)
    }
  this.syzk()
  }
// 实现游戏帧循环
loop() {
    databus.frame++
    //this.update()
    this.render()
    this.aniId = window.requestAnimationFrame(
      this.bindLoop,
      canvas
    )
  }
  //运算/以及其它点击功能
  djgn(x,y){
    yxcs.djtj++    //点击统计
    if(yxcs.syjd[1]===1||yxcs.syjd[1]===2){
        let q0=this.pst.anniu[11]
        if(x>q0[0]&&x<q0[2]+q0[0]&&y>q0[1]&&y<q0[3]+q0[1]){
            this.jcangn(11)
            return
        }
        if(y<0.5*screenHeight){
            yxcs.syjd=[1,2,0,0]
        }else{this.xsms=0
            yxcs.syjd=[1,3,0,0]}
    }else{
//数字区
let ps=this.pst.wbksj
for (let i=0;i<4;i++){
    let q=ps[i]
    if(x>q[0]&&x<q[2]+q[0]&&y>q[1]&&y<q[3]+q[1]){
        
        //console.log ("数字"+i)
        //教学声音
if(yxcs.syjd[1]===3||yxcs.syjd[1]===5){
    yxcs.syjd=[1,5,12+i,0]
}
if(yxcs.syjd[1]===4||yxcs.syjd[1]===0){
    this.jzszsy(this.qgszls[this.sgxs[i]])
}
this.xuansz(i)
        return
    }
    //console.log (i)
}

//按钮区
let p=this.pst.anniu
for (let i=0;i<p.length;i++){
let q=p[i]
if(x>q[0]&&x<q[2]+q[0]&&y>q[1]&&y<q[3]+q[1]){
    this.jcangn(i)
    console.log ("按钮"+i)
    return
}
//console.log (i)
}
        }
    // //if(this.djqy(x,y,this.pst.anniu[7])){this.jiaqun()}       //加群，二维码
  }
  //点击区域/是否点在本区域
  djqy(x,y,q){
    let re=0
    if(x>q[0]&&x<q[2]+q[0]&&y>q[1]&&y<q[3]+q[1]){re=1}
    return re
  }
////loop结束 
////选数字
xuansz(i){
    if (this.bx[2]<0){
        this.bx[0]=i
    }else if(this.sgxs[i]===this.sgxs[this.bx[0]]){
        this.bx[0]=i
        this.bx[2]=-1
    }else if(this.bx[2]===3&&this.qgszls[this.sgxs[i]][0]===0){
        console.log("除数不能是0，请重新选择！");
    }else{
        this.bx[1]=i
        //开始一轮单向四则运算
        this.dxys()
    }
    //console.log(this.jd)
    //console.log(this.bx)
}
//单向运算
dxys(){
    let b=this.bx
    let s0=this.qgszls[this.sgxs[b[0]]]
    let s1=this.qgszls[this.sgxs[b[1]]]
    let jg=dxszys(s0,s1,b[2])
    this.jzdysy(jg)
    //依进度执行后继操作
    let jd=4+this.jd
    this.qgszls[jd]=jg    //存储结果
    //更新四格显示
    for (let i=0;i<4;i++){
        if(i!==b[0]&&i!==b[1]){
        if(this.sgxs[i]===this.sgxs[b[0]]||this.sgxs[i]===this.sgxs[b[1]]){
            this.sgxs[i]=jd
        }
        }
    }
    this.sgxs[b[0]]=jd
    this.sgxs[b[1]]=jd
    this.bx[2]=-1    //运算置空
    this.bx[1]=-1    //当前被选四格位，第1位保持，第2位置空
    this.jd=this.jd+1    //进度加1
    console.log("进度"+this.jd+"结果"+jg[0]);
    if (this.jd===3){
        if (jg[0]===24){
        //console.log('过关');
        this.guoguan()
        }else{
            //重做
            yxcs.yssysz.push([[118]])
            this.restart()
        }
        
    }
}

////运算与变换,主体运算部分
yunsuan(x,y){
  let dw=this.sbdjwz(x,y)    //鼠标点击位置
  console.log(dw)
let wz = Math.floor(dw/5);    //位置
let ys = dw%5;    //运算
if (dw>=0&&dw<20){
    if (this.jd===0) {
        //console.log(dw);
        if (ys===4){
            //两数交换
            let sw1=yxcs.cyyssz[wz][0];
            let sw2=yxcs.cyyssz[wz][1];
            let lss=this.jgsz[sw1];
            this.jgsz[sw1]=this.jgsz[sw2];
            this.jgsz[sw2]=lss;
            //console.log(this.jgsz)
            //按位置显示新数
            this.xsxs(sw1);
            this.xsxs(sw2);
        } else{
                let lsjg=this.wszys(yxcs.cyyssz[wz][0],yxcs.cyyssz[wz][1],ys);
                //console.log(ys)
                this.jgsz[4+wz][0]=lsjg[0][0];
                this.jgsz[4+wz][1]=lsjg[0][1];
                this.lyjgsz[4+wz]=hhjbsz(lsjg[1])
                this.xsxs(4+wz);
                this.jd=wz+1;
        }
    } else if(this.jd===5){    //上下两分,计算4/上，5/下位两数。
        let lsjg=this.wszys(4,5,ys)
        this.jgsz[8][0]=lsjg[0][0];
        this.jgsz[8][1]=lsjg[0][1];
        this.lyjgsz[8]=hhjbsz(lsjg[1]);
        this.xsxs(8);
    } else if(this.jd===6){
        let lsjg=this.wszys(6,7,ys)
        this.jgsz[8][0]=lsjg[0][0];
        this.jgsz[8][1]=lsjg[0][1];
        this.lyjgsz[8]=hhjbsz(lsjg[1]);
        this.xsxs(8);
    } else {
        var lss1=1;
        var lss2=1;
        if (this.jd===1) {
            if (ys===4){}else{
                if (wz===1){
                    let lsjg=this.wszys(2,3,ys)
                    this.jgsz[5][0]=lsjg[0][0];
                    this.jgsz[5][1]=lsjg[0][1];
                    this.lyjgsz[5]=hhjbsz(lsjg[1]);
                    //console.log(this.jgsz);
                } 
                else if(wz===2){
                    this.jgsz[5][0]=this.jgsz[3][0];
                    this.jgsz[5][1]=this.jgsz[3][1];
                    this.lyjgsz[5]=this.jgsz[5]
                    let lsjg=this.wszys(2,4,ys);
                    this.jgsz[4][0]=lsjg[0][0];
                    this.jgsz[4][1]=lsjg[0][1];
                    this.lyjgsz[4]=hhjbsz(lsjg[1]);
                }
                else if(wz===3){
                    this.jgsz[5][0]=this.jgsz[2][0];                    
                    this.jgsz[5][1]=this.jgsz[2][1];
                    this.lyjgsz[5]=this.jgsz[5]
                    let lsjg=this.wszys(3,4,ys);
                    this.jgsz[4][0]=lsjg[0][0];
                    this.jgsz[4][1]=lsjg[0][1];
                    this.lyjgsz[4]=hhjbsz(lsjg[1]);
                }
                this.xsxs(4);
                this.xsxs(5);
                lss1=4;
                lss2=5;
                this.jd=5;    //上下两分
            }
    
        }else if (this.jd===2) {
            if (ys===4){}else{
                if (wz===0){
                    let lsjg=this.wszys(0,1,ys);
                    this.jgsz[4][0]=lsjg[0][0];
                    this.jgsz[4][1]=lsjg[0][1];
                    this.lyjgsz[4]=hhjbsz(lsjg[1]);
                } 
                else if(wz===2){
                    this.jgsz[4][0]=this.jgsz[1][0];
                    this.jgsz[4][1]=this.jgsz[1][1];
                    this.lyjgsz[4]=this.jgsz[4]
                    let lsjg=this.wszys(0,5,ys);
                    this.jgsz[5][0]=lsjg[0][0];
                    this.jgsz[5][1]=lsjg[0][1];
                    this.lyjgsz[5]=hhjbsz(lsjg[1]);
                }
                else if(wz===3){
                    this.jgsz[4][0]=this.jgsz[0][0];
                    this.jgsz[4][1]=this.jgsz[0][1];
                    this.lyjgsz[4]=this.jgsz[4]
                    let lsjg=this.wszys(1,5,ys);
                    this.jgsz[5][0]=lsjg[0][0];
                    this.jgsz[5][1]=lsjg[0][1];
                    this.lyjgsz[5]=hhjbsz(lsjg[1]);
                }
                this.xsxs(4);
                this.xsxs(5);
                lss1=4;
                lss2=5;
                this.jd=5;
            }
    
        }else if (this.jd===3) {
            if (ys===4){}else{
                if (wz===3){
                    let lsjg=this.wszys(1,3,ys);
                    this.jgsz[7][0]=lsjg[0][0];
                    this.jgsz[7][1]=lsjg[0][1];
                    this.lyjgsz[7]=hhjbsz(lsjg[1]);
                } 
                else if(wz===0){
                    this.jgsz[7][0]=this.jgsz[3][0];
                    this.jgsz[7][1]=this.jgsz[3][1];
                    this.lyjgsz[7]=this.jgsz[7]
                    let lsjg=this.wszys(1,6,ys);
                    this.jgsz[6][0]=lsjg[0][0];
                    this.jgsz[6][1]=lsjg[0][1];
                    this.lyjgsz[6]=hhjbsz(lsjg[1]);
                }
                else if(wz===1){
                    this.jgsz[7][0]=this.jgsz[1][0];
                    this.jgsz[7][1]=this.jgsz[1][1];
                    this.lyjgsz[7]=this.jgsz[7]
                    let lsjg=this.wszys(3,6,ys);
                    this.jgsz[6][0]=lsjg[0][0];
                    this.jgsz[6][1]=lsjg[0][1];
                    this.lyjgsz[6]=hhjbsz(lsjg[1]);
                }
                this.xsxs(6);
                this.xsxs(7);
                lss1=6;
                lss2=7;
                this.jd=6;
            }
    
        }else if (this.jd===4) {
            if (ys===4){}else{
                if (wz===2){
                    let lsjg=this.wszys(0,2,ys);
                    this.jgsz[6][0]=lsjg[0][0];
                    this.jgsz[6][1]=lsjg[0][1];
                    this.lyjgsz[6]=hhjbsz(lsjg[1]);
                } 
                else if(wz===0){
                    this.jgsz[6][0]=this.jgsz[2][0];
                    this.jgsz[6][1]=this.jgsz[2][1];
                    this.lyjgsz[6]=this.jgsz[6]
                    let lsjg=this.wszys(0,7,ys);
                    this.jgsz[7][0]=lsjg[0][0];
                    this.jgsz[7][1]=lsjg[0][1];
                    this.lyjgsz[7]=hhjbsz(lsjg[1]);
                }
                else if(wz===1){
                    this.jgsz[6][0]=this.jgsz[0][0];
                    this.jgsz[6][1]=this.jgsz[0][1];
                    this.lyjgsz[6]=this.jgsz[6]
                    let lsjg=this.wszys(2,7,ys);
                    this.jgsz[7][0]=lsjg[0][0];
                    this.jgsz[7][1]=lsjg[0][1];
                    this.lyjgsz[7]=hhjbsz(lsjg[1]);
                }
                this.xsxs(6);
                this.xsxs(7);
                lss1=6;
                lss2=7;
                this.jd=6;
            }
        }
        for (let i=0;i<4;i++){    //两分格局下，自动演算，有24结果，则自动显示。
            let lssj=this.wszys(lss1,lss2,i);
            let lss=lssj[0]
            let lsstr1=hh2ysstr(this.jgsz[lss1],i);
            let lsstr2=hh2ysstr(this.jgsz[lss2],i);
            if (lss[0]/lss[1]===24) {
                if ((this.jgsz[lss1][0]/this.jgsz[lss1][1])>(this.jgsz[lss2][0]/this.jgsz[lss2][1])){
                    this.jgwb=lsstr1+yxcs.sfp[i]+lsstr2+"=24"
                }else{
                  this.jgwb=lsstr2+yxcs.sfp[i]+lsstr1+"=24"
                }
                this.guoguan()
            }
            if(yxcs.yxms===1){
                if(lss[0]===24||lss[1]===24){
                    this.jgwb=lsstr1+yxcs.sfp[i]+lsstr2+"="+hh2ysstr(lss);
                    this.guoguan()
                }
            }
        }
    }
}
if (dw>=20){
    let i=dw-20
    let lss=hhjbsz(this.jgsz[i])
    this.jgsz[i]=hhjbsz(this.lyjgsz[i])
    this.lyjgsz[i]=hhjbsz(lss)
}

}
//
//(位)四则运算
wszys(i,j,k){
    let ls=szys(this.jgsz[i],this.jgsz[j],k)
    //let re=ls[k]
    return ls
    //返回两组（2元数）结果。
}
//

//获取鼠标点击位置/功能序号
sbdjwz(sbx,sby){
let ysk=this.pst.wbkzx[0]   //运算框方位：x,y,宽，高，
//console.log(ysk)
let gzx=13*(sbx-ysk[0])/ysk[2]
let gzy=10.5567*(sby-ysk[1])/ysk[3]
//以上，将鼠标点击位置归整一下
  //以下，根据数据判断点击位置与符号，返回参数：上：加减乘除转0-4，下5-9，左10-14，右15-19
  //上下两处的取值可以宽松一些
  //考虑遮挡效果
  if(this.ren[8]===1){return 28}

  for (let i=7;i>=0;i--){
    if(i>=4){
        if(this.ren[i]===1){
            if(this.djqy(sbx,sby,this.pst.wbksj[i])){return 20+i}
          }
    }else{
        if(this.djqy(sbx,sby,this.pst.wbksj[i])){return 20+i}
    }
  }
  
  if(this.ren[8]===0){
  if (gzx>5.9&&gzx<7.1) {
    //考虑遮挡效果
    if(this.ren[4]===0){
    if (gzy>3.9&&gzy<4.6) {return 0;} 
    else if (gzy>2.9&&gzy<3.6) {return 1;} 
    else if (gzy>1.9&&gzy<2.6) {return 2;} 
    else if (gzy>0.9&&gzy<1.6) {return 3;} 
    else if (gzy>=0&&gzy<0.6) {return 4;} 
    }
    //考虑遮挡效果
    if(this.ren[5]===0){
    if (gzy>5.9&&gzy<6.6) {return 5;} 
    else if (gzy>6.9&&gzy<7.6) {return 6;}
    else if (gzy>7.9&&gzy<8.6) {return 7;}
    else if (gzy>8.9&&gzy<9.6) {return 8;}
    else if (gzy>9.9&&gzy<10.6) {return 9;}
    }
} else if (gzy>4.9&&gzy<5.6) {
  //考虑遮挡效果
  if(this.ren[6]===0){
    if (gzx>=4&&gzx<=5) {return 10;} 
    else if (gzx>=3&&gzx<4) {return 11;}
    else if (gzx>=2&&gzx<3) {return 12;}
    else if (gzx>=1&&gzx<2) {return 13;}
    else if (gzx>=0&&gzx<1) {return 14;}
  }
    //考虑遮挡效果
    if(this.ren[7]===0){
    if (gzx>=8&&gzx<9) {return 15;}
    else if (gzx>=9&&gzx<10) {return 16;}
    else if (gzx>=10&&gzx<11) {return 17;}
    else if (gzx>=11&&gzx<12) {return 18;}
    else if (gzx>=12&&gzx<=13) {return 19;}
    }
}
}
}
//显示新数，给表达信号传参
xsxs(i){
this.ren[i]=1
}
}
//主进程结束

function sybf(s,st){
    s.pause()
    s.currentTime=st[0]
    s.play()
    setTimeout(function(){
        s.pause()
        s.currentTime=st[1]
    },(st[1]-st[0])*1000)
    //同音源pause冲突…………
}
//生成声音
function scsy(s){
    let z=s.qhzui
    let ss=s.suzi
    let re=[]
    for (let i=0;i<ss.length;i++){
        let ls=new Audio()
    ls.src=z[0]+ss[i][1]+z[1]
    re[i]=ls
    }
    return re;
}
//生成图片对象
function sctp(m,pst){
    let re=[]
    for (let i=0;i<m.src.length;i++){
        let src=m.src[i]
        let p=pst[i]
        re[i] = new Sprite(src,p[0]*xsw,p[1]*xsh,p[2]*xsw,p[3]*xsh)
        //console.log(re[i])
    }
    return re
}
//描绘图片：m对象，p方位
function mhtp(m,p){
    ctx.drawImage(m,p[0],p[1],p[2],p[3])
    console.log(p)
    //debugger
}
//描述四角与四边等数据文本框
function mhsjwbk(sj,fw,ys){
  let y=ys||sj.wbkys    //若没有指定样式(ys),则采用默认样式
  let t=hh2ysstr(sj)
  mhwbk(t,fw,y)
}
//描绘纯文本框
function mhcwbk(fw,ys){    //方位，样式
  let y=ys||sj.wbkys    //默认样式
  let p=fw
  //logonce(p)
  ctx.fillStyle=y.bgse
  ctx.fillRect(p[0],p[1],p[2],p[3])   //矩形
  ctx.strokeStyle=y.bkse;
  ctx.lineWidth=y.bkxs*xsw;
  ctx.strokeRect(p[0],p[1],p[2],p[3]);    //矩形边框
  //logonce(y.bkxs*xsw)
}
//描绘文本框与文本
function mhwbk(wb,fw,ys){    //文本,方位，样式，
  //文本框
  let y=ys||sj.wbkys    //默认样式
  let p=fw
  ctx.fillStyle=y.bgse
  ctx.fillRect(p[0],p[1],p[2],p[3])   //矩形
  ctx.strokeStyle=y.bkse;
  ctx.lineWidth=y.bkxs*xsw;
  ctx.strokeRect(p[0],p[1],p[2],p[3]);    //矩形边框
  //文本
  let t=wb
  //文字大小
  let khgrem=[0.66*p[2],0.5*p[3]]
  let fsz=khgrem[0]
  //console.log(fsz)
  if(khgrem[0]>khgrem[1]){fsz=khgrem[1]}
  //文字内容
  ctx.fillStyle = '#000'
  ctx.font = `${fsz}px MicrosoftYaHei`
  //文字位置
  let tw=ctx.measureText(t).width
  while(tw>p[2]){
    fsz-=1
    ctx.font = `${fsz}px MicrosoftYaHei`
    tw=ctx.measureText(t).width
  }
  let tl=p[0]+p[2]/2-tw/2
  let tt=p[1]+p[3]/2+fsz/2
  //console.log(fsz)
  ctx.fillText(t,tl,tt);
}
////返回解绑数组
function hhjbsz(s){
    let xsz=[];
    for (let i=0;i<s.length;i++){
        xsz[i]=s[i];
    }
    return xsz;
}
//数字初始化
function szcsh(){
//   let re=[[0,1],[1,1],[2,1],[3,1],[4,1],[5,1],[6,1],[7,1],[8,1]]   //九宫数字取值
//   let re1=[[0,1],[1,1],[2,1],[3,1],[4,1],[5,1],[6,1],[7,1],[8,1]]   //九宫数字取值
let re=[[0,1],[1,1],[2,1],[3,1],[4,1],[5,1],[6,1]]   //七格数字取值
let re1=[[0,1],[1,1],[2,1],[3,1],[4,1],[5,1],[6,1]]   //七格数字取值
  for (let i=0;i<4;i++){
    let sjs=1+Math.floor(Math.random()*10);
    re[i][0]=sjs;
    re[i][1]=1;
    re1[i]=re[i]
    if(yxcs.yxms===1){
        re[i][1]=1+Math.floor(Math.random()*10);
        re[i]=gyyh(re[i])
        re1[i][0]=re[i][1]
        re1[i][1]=re[i][0]
    }
}
yxcs.jgsz=re
yxcs.lyjgsz=re1
yxcs.qgszcz=re
}
//取最大公约数
function zdgys(a,b){
  if (b>a) {
      let lss=a;
      a=b;
      b=lss;
  }
  while (b!=0) {
      let lss=a%b;
      a=b;
      b=lss;
  }
  return a;
}
//
//公约优化
function gyyh([a,b]){
  let lss=zdgys(a,b);
  let lsa=a/lss;
  let lsb=b/lss;
  if (lsb<0){
    lsa=-lsa
    lsb=-lsb
  }
  return [lsa,lsb];
}
//
////两数对位
function lsdw(a){
    return [a[1],a[0]];
}
////单向四则运算（输入两个数（组），返回所有四组结果（或第k组结果）
function dxszys(x,y,k){
    let r=[[0,1],[0,1],[0,1],[0,1]]
    r[0][0]=x[0]*y[1]+y[0]*x[1];
    r[0][1]=x[1]*y[1];
    r[0]=gyyh(r[0]);
    r[1][0]=x[0]*y[1]-y[0]*x[1];
    r[1][1]=x[1]*y[1];
    r[1]=gyyh(r[1]);
    r[2][0]=x[0]*y[0];
    r[2][1]=x[1]*y[1];
    r[2]=gyyh(r[2]);
    r[3][0]=x[0]*y[1];
    r[3][1]=x[1]*y[0];
    r[3]=gyyh(r[3]);
    if(k>=0&&k<4){return r[k]}
    return r
}
////四则运算（输入两个数（组），返回所有四组（每组两对）结果）
function szys(x,y,k){
    let a=[[0,1],[0,1]]
    let b=[[0,1],[0,1]]
    let c=[[0,1],[0,1]]
    let d=[[0,1],[0,1]]
    a[0][0]=x[0]*y[1]+y[0]*x[1];
    a[0][1]=x[1]*y[1];
    //公约优化
    a[0]=gyyh(a[0]);
    a[1]=lsdw(a[0]);
    //
    b[0][0]=Math.abs(x[0]*y[1]-y[0]*x[1]);
    b[0][1]=x[1]*y[1];
	//公约优化
    b[0]=gyyh(b[0]);
    b[1]=lsdw(b[0]);
    //
    c[0][0]=x[0]*y[0];
    c[0][1]=x[1]*y[1];
	//公约优化
    c[0]=gyyh(c[0]);
    c[1]=lsdw(c[0]);
    //
    d[0][0]=x[0]*y[1];
    d[0][1]=x[1]*y[0];
	//公约优化
    d[0]=gyyh(d[0]);
    d[1]=lsdw(d[0]);
    if (yxcs.yxms===0){
        a[1]=a[0];
        b[1][0]=-b[0][0];
        b[1][1]=b[0][1];
        c[1]=c[0];
    }
    let re=[a,b,c,d]
    if(k>=0&&k<4){return re[k]}
    return re
}
////返回2元数（组）转化成的str
function hh2ysstr(sz,k){    //k:括号。游玩中不需要括号。最后表述答案时需要括号。
    let re=''
    if (sz[1]===1) {
        re=`${sz[0]}`
        if(sz[0]<0&&!!k){re="("+sz[0]+")"}
    } else {
        re=sz[0]+"/"+sz[1]
        if(!!k){re="("+sz[0]+"/"+sz[1]+")"}
        
    }
    return re
}

//返回数组内成员的所有排列
function hhsypl44(s){
    let re=[]
    for (let i=0;i<4;i++){
        for (let j=0;j<4;j++){
            for (let k=0;k<4;k++){
                for (let l=0;l<4;l++){
        let ls=[s[i],s[j],s[k],s[l]]
        if (i!==j&&i!==k&&i!==l&&j!==k&&j!==l&&k!==l){re.push(ls)}    //检验ijkl是否重复，若无重复，回1，并将ls加入re中
                }
            }
        }
    }
    //console.log(re)
    return re
}
//返回所有结果为24的N种算式，当前3种
function hhsy24ss(s){
    let re=[]
    for (let i=0;i<s.length;i++){
        for (let j0=0;j0<4;j0++){
            for (let j1=0;j1<4;j1++){
                for (let j2=0;j2<4;j2++){
                    let y=[j0,j1,j2]    
                    let jg01=jdszys(s[i][0],s[i][1],y[0])
                    let jg02=jdszys(jg01,s[i][2],y[1])
                    let jg03=jdszys(jg02,s[i][3],y[2])
                    if(jg03[0]/jg03[1]===24){
                        let ls=[s[i],y,0]
                        re.push(ls)
                    }
                    let jg12=jdszys(s[i][2],s[i][3],y[2])
                    let jg13=jdszys(jg01,jg12,y[1])
                    if(jg13[0]/jg13[1]===24){
                        let ls=[s[i],y,1]
                        re.push(ls)
                    }
                    let jg21=jdszys(s[i][1],s[i][2],y[1])
                    let jg22=jdszys(s[i][0],jg21,y[0])
                    let jg23=jdszys(jg22,s[i][3],y[2])
                    if(jg23[0]/jg23[1]===24){
                        let ls=[s[i],y,2]
                        re.push(ls)
                    }
                    if(yxcs.yxms===1){
                        if(jg03[0]===24||jg03[1]===24){
                            let ls=[s[i],y,0]
                            re.push(ls)
                        }
                        if(jg13[0]===24||jg13[1]===24){
                            let ls=[s[i],y,1]
                            re.push(ls)
                        }
                        if(jg23[0]===24||jg23[1]===24){
                            let ls=[s[i],y,2]
                            re.push(ls)
                        }
                    }
                }
            }
        }
    }
    //console.log(re)
    return re
}
//简单四则运算，只输入单向运算的结果。
function jdszys(x,y,k){
    let a=[0,1]
    let b=[0,1]
    let c=[0,1]
    let d=[0,1]
    a[0]=x[0]*y[1]+y[0]*x[1];
    a[1]=x[1]*y[1];
    //公约优化
    a=gyyh(a);
    //
    b[0]=x[0]*y[1]-y[0]*x[1];
    b[1]=x[1]*y[1];
	//公约优化
    b=gyyh(b);
    //
    c[0]=x[0]*y[0];
    c[1]=x[1]*y[1];
	//公约优化
    c=gyyh(c);
    //
    d[0]=x[0]*y[1];
    d[1]=x[1]*y[0];
	//公约优化
    d=gyyh(d);
    let re=[a,b,c,d]
    if(k>=0&&k<4){return re[k]}
    return re
}
//返回指定运算结果、、非字符
function hhxdysstr(jg){
    let re=[,,,]
    let s=jg[0]    //数（组）
    let y=jg[1]    //运算
    let xs=jg[2]   //运算形式
    let ls=[0,1]
    if (xs===0){
    let s01=jdszys(s[0],s[1],y[0]);
    let s012=jdszys(s01,s[2],y[1]);
    ls=jdszys(s012,s[3],y[2]);
    re[0]=s01;
    re[1]=s012;
    re[2]=ls;
        }
    if (xs===1){
        let s01=jdszys(s[0],s[1],y[0]);
        let s23=jdszys(s[2],s[3],y[2]);
        ls=jdszys(s01,s23,y[1]);
        re[0]=s01;
    re[1]=s23;
    re[2]=ls;
        }
    if (xs===2){
            let s12=jdszys(s[1],s[2],y[1]);
            let s012=jdszys(s[0],s12,y[0]);
            ls=jdszys(s012,s[3],y[2]);
            re[0]=s12;
    re[1]=s012;
    re[2]=ls;
        }
    re[3]=ls;
    return re;
}
//追加结果转换为字符
function zjjgzzf(j,k){
    let re=[]
    for (let i=0;i<j.length;i++){
        re[i]=hh2ysstr(j[i]);
        if (k===1){re[i]="="+re[i]}
    }
    return re;    
}

//分辨率转换
function fblzh(pst){
    let o={}
    for (let x in pst){
        o[x]=[]
        for(let s in pst[x]){
            let ss=pst[x][s]
            let ls=[ss[2]*xsw,ss[3]*xsh,ss[0]*xsw,ss[1]*xsh]
            o[x][s]=ls
        }
    }
    return o
}    
//指定文本框与文本与格式，返回文本大小系数
function hhwbdxxs(pst,wb,gs,ms){    //位置，文本，格式，显示模式：0：缩放文本至文本框大小。
    let re=0
    let p=[pst[0],pst[1],pst[2],pst[3]]
    //console.log(p[2])
    if (ms===0){
        let xs=1    //文本大小系数，与gs中的参数相乘，得到文本字号大小
        let zzh=0    //总文本高度
        let kcc=[Math.floor(0.9*p[2]),Math.floor(0.9*p[3])]    //文本框尺寸
        
        while (zzh<kcc[1]){
            xs=xs+1
            zzh=hhwbgd(kcc,wb,xs,gs)    //返回文本高度
            //console.log(xs)
        }
        xs=xs-1
        re=xs
    }
    return re
}    
//返回文本高度
function hhwbgd(kcc,wb,xs,gs){
    let h1=xs*gs.h1
    let h2=xs*gs.h2
    let p=xs*gs.p
    let re=0
    for (let i=0;i<wb.length;i++){
        ctx.font = p+"px MicrosoftYaHei"
        if (wb[i][1]==="p"){
            ctx.font = p+"px MicrosoftYaHei"
        }
        if(wb[i][1]==="h1"){
            ctx.font = h1+"px MicrosoftYaHei"
        }
        if(wb[i][1]==="h2"){
            ctx.font = h2+"px MicrosoftYaHei"
        }
            let lszw =ctx.measureText('理').width
            let zfs=wb[i][0].length
            let lsw=lszw*zfs
            let lszh =lszw*(1+Math.floor(lsw/kcc[0]))
            re=re+lszh
    }
    return re
}    
//根据指定文本大小系数，文本框，文本内容，格式，模式显示文本 
function zdwbkxswb(xs,pst,wb,gs,k){
    if (k===0){
        let wbkk=0.99*pst[2]    //文本框宽
        let h1=xs*gs.h1
        let h2=xs*gs.h2
        let p=xs*gs.p
        let lsx0=pst[0]+pst[2]*0.05
        let lsy0=pst[1]
        ctx.fillStyle = '#000000'
        //logonce(wb.length)
        for (let i=0;i<wb.length;i++){
            let lsy=0
            ctx.font = p+"px MicrosoftYaHei"
            lsx0=pst[0]+pst[2]*0.01
            ctx.fillStyle = '#000000'
            if (wb[i][1]==="p"){
                ctx.font = `italic ${p}px MicrosoftYaHei`
            }
            if(wb[i][1]==="h1"){
                //ctx.font = h1+"px MicrosoftYaHei"
                ctx.fillStyle = '#0757E0'
                ctx.font = `italic ${h1}px MicrosoftYaHei`
                lsx0=pst[0]
            }
            if(wb[i][1]==="h2"){
                //ctx.font = "bold"+h2+"px MicrosoftYaHei"
                ctx.font = `bold ${h2}px arial`;
                lsx0=pst[0]
            }
            for (let j=0;j<wb[i][0].length;j++){
                let lscc =ctx.measureText('理').width
                let lsls=Math.floor(wbkk/lscc)
                let lszf=wb[i][0].substring(j,j+1)
                let lsx=lsx0+lscc*(j%lsls)
                lsy=lsy0+1.17*lscc+1.2*lscc*Math.floor(j/lsls)
                ctx.fillText(lszf,lsx,lsy)
                logonce([lsx,lsy])
            }
            lsy0=lsy
        }
        //logonce(lszf)
    }
    
}    
////单次log，在循环动画中。   
function logonce(wb){
    if(yxcs.dclog<1){
        console.log(wb)
        yxcs.dclog+=1    //单次log
    }
}
 