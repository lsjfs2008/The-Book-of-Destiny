import Sprite from './base/sprite'
//import Player from './player/index'
//import BackGround from './runtime/background'
import GameInfo from './runtime/gameinfo'
import Music from './runtime/music'
import DataBus from './databus'
const screenWidth = window.innerWidth
const screenHeight = window.innerHeight
const nd2xxpyl=50    //难度2模式需要整体向下偏移一段距离
const nd3xxpyl=106    //困难模式需要整体向下偏移一段距离
//拖动(起点)寄存
var tdqdy=0   //拖动起点
var tdpyl=0   //拖动偏移量
var dqpyl=0   //当前偏移量
var zonpyl=0   //总偏移量
//屏幕分辨率系数
const nd2fblxsx=window.innerWidth/750
const nd2fblxsy=window.innerHeight/(1600+nd2xxpyl)
const nd3fblxsx=window.innerWidth/750
const nd3fblxsy=nd3fblxsx*2834/(2834+nd3xxpyl)
var gkjmxh=0   //关卡与界面序号,共5个界面，
var ngsbpcz=-1 //哪个设备被碰触中
var bxzdsbxl=-1  //被选中的说明文字序号
var zrsmwz=0    //是否转入说明文字，为1时，点击设备，弹出说明文字
//0.0背景图
const bgimgsrc=['images/bg0.jpg','images/bg1.jpg','images/bg2.jpg','images/bg3xj.jpg','images/ggjm.png']
const bgimgwidth=[750,750,750,750,750]
const bgimgheight=[1600,1600,1600,2834,1600]
var bgsjheight=[1600,1600,1600,2834,1600] //背景实际高度
//0.0.1过关界面，集成在背景图最后一个
var ggxh=0     //过关信号
var ysggxh=0   //延时后的过关信号
var ysggxhjs=0 //延时过关信号计时
var ysmbxh=0   //延时描边信号
var ysmbxhjs=0 //延时描边信号计时
//const ggjmimgsrc=['images/ggjm.png']
//0、难度选择界面元素
const ndxzimgsrc=['images/ndxz0.png','images/ndxz1jd.png','images/ndxz2zd.png','images/ndxz3kn.png']
const ndxzimgwidth=[45,54.8,62.8,70]
const ndxzimgheight=[6.5,26,22.25,22.3]
const ndxzimgleft=[27.5,25,2,28]
const ndxzimgtop=[6,21,45,70]
var ndw=[45,54.8,62.8,70]
var ndh=[6.5,26,22.25,22.3]
var ndl=[27.5,25,2,28]
var ndt=[6,21,45,70]
//1、难度1界面元素
const nd1ddimgsrc=['images/nd1ddg.png','images/nd1ddk.png']
const nd1kgimgsrc=['images/nd1kgg.png','images/nd1kgk.png']
var nd1kgw= 59*screenWidth/750
var nd1kgh= 92*screenHeight/1600
var nd1kgl= 418*screenWidth/750
var nd1kgt= 863*screenHeight/1600
var nd1ddkg = 0  //电灯开关归0
//2、难度2界面元素
//2.1难度2电力设备
const dl_img_src=['images/dlbdz.png','images/dlbyq.png','images/dlbyqd.png','images/dlcdz.png','images/dlcs.png','images/dlhdc.png','images/dlxc.png']
 const dl_width=[235,162,169,182,159,248,189]
 const dl_height=[139,120,120,108,128,232,117]
 const dl_left=[408,287,95,525,70,133,290]
 const dl_top=[375,1075,824,1399,1387,116,1393]
 var dlw=[32,22,22,24,21,33,25.2]
 var dlh=[8.7,7.5,7.5,6.75,8,14.5,7.3]
 var dll=[54,37,31,68,7.7,16,39]
 var dlt=[18,63,42,82,82,3.2,82]
 //难度2电力描边
 const mbnd2sbimgsrc=['images/img_dlbdz.png','images/img_dlbyq.png','images/img_dlbyqd.png','images/img_dlcdz.png','images/img_dlcs.png','images/img_dlhdc.png','images/img_dlxc.png']
const gmbnd2sbimgsrc=['images/gimg_dlbdz.png','images/gimg_dlbyq.png','images/gimg_dlbyqd.png','images/gimg_dlcdz.png','images/gimg_dlcs.png','images/gimg_dlhdc.png','images/gimg_dlxc.png']
const rmbnd2sbimgsrc=['images/rimg_dlbdz.png','images/rimg_dlbyq.png','images/rimg_dlbyqd.png','images/rimg_dlcdz.png','images/rimg_dlcs.png','images/rimg_dlhdc.png','images/rimg_dlxc.png']
const mbnd2sbwidth=[245,172,179,192,169,258,199]
const mbnd2sbheight=[149,130,130,118,138,242,127]
const mbnd2sbleft=[403,282,90,520,65,128,285]
const mbnd2sbtop=[370,1070,819,1394,1382,111,1388]
var mbnd2sbw=[370,1070,819,1394,1382,111,1388]
var mbnd2sbh=[370,1070,819,1394,1382,111,1388]
var mbnd2sbl=[370,1070,819,1394,1382,111,1388]
var mbnd2sbt=[370,1070,819,1394,1382,111,1388]
 //2.2难度2电线
 const nd2dximgsrc=['images/nd2x050.png','images/nd2x120.png','images/nd2x221.png','images/nd2x313.png','images/nd2x414.png','images/nd2x516.png']
 const nd2dxwidth=[255,293,303,381,320,223]
 const nd2dxheight=[148,436,256,277,297,291]
 const nd2dxleft=[269,210,40,367,26,147]
 const nd2dxtop=[274,443,860,1126,1112,1112]
 var nd2dxw=[274,443,860,1126,1112,1112]
 var nd2dxh=[274,443,860,1126,1112,1112]
 var nd2dxl=[274,443,860,1126,1112,1112]
 var nd2dxt=[274,443,860,1126,1112,1112]
 //2.3难度2电线连接
 const nd2dxlj=[[5,0],[2,0],[2,1],[1,3],[4,1],[1,6]]   //所有接线组合
 var nd2dxsfyj=[0,0,0,0,0,0]      //电线是否要接
 //2.4难度2灯光效果
const dg2dl_img_src=['images/dlcskd.png','images/dlxckd.png','images/dlcdzkd.png']
const dg2dl_width=[159,189,182]
const dg2dl_height=[128,117,137]
const dg2dl_left=[70,290,525]
const dg2dl_top=[1387,1393,1370]
var dg2dlw=[32,22]
var dg2dlh=[8,7]
var dg2dll=[54,37]
var dg2dlt=[18,63]
 //
 //3.1难度3电力设备
const nd3sbimgsrc=['images/dlhdc.png','images/dl3slfdz0.png','images/dl3flfd.png','images/dl3hdz.png','images/dl3tyn.png','images/dl3fdzbdz.png','images/dlbyqd.png','images/dlbyq.png','images/nd3xjcs.png','images/nd3xjnc.png','images/nd3xjgc.png','images/nd3xjjlz3.png','images/nd3xjjlz4.png',]
const nd3sbwidth=[248,360,156,227,177,235,169,162,242,242,242,396,396]
const nd3sbheight=[232,212,142,158,108,173,120,120,185,150,162,245,246]
const nd3sbleft=[-34,-165,446,489,241,336,533,376,15,257,493,344,214]
const nd3sbtop=[101,305,70,212,148,385,2106,2207,2474,2510,2498,585,1771]
var nd3sbw=[214,195,156,227,177,235,169,162,159,189,182,397,397]
var nd3sbh=[214,195,156,227,177,235,169,162,159,189,182,397,397]
var nd3sbl=[214,195,156,227,177,235,169,162,159,189,182,397,397]
var nd3sbt=[214,195,156,227,177,235,169,162,159,189,182,397,397]
var tdnd3sbt=[214,195,156,227,177,235,169,162,159,189,182,397,397]

//3.1.1难度3电力设备描边
const mbnd3sbimgsrc=['images/img_dlhdc.png','images/img_dl3slfdz0.png','images/img_dl3flfd.png','images/img_dl3hdz.png','images/img_dl3tyn.png','images/img_dl3fdzbdz.png','images/img_dlbyqd.png','images/img_dlbyq.png','images/nd3xjmbbcs.png','images/nd3xjmbbnc.png','images/nd3xjmbbgc.png','images/nd3xjmbbjlz.png','images/nd3xjmbbjlz.png',]
const gmbnd3sbimgsrc=['images/gimg_dlhdc.png','images/gimg_dl3slfdz0.png','images/gimg_dl3flfd.png','images/gimg_dl3hdz.png','images/gimg_dl3tyn.png','images/gimg_dl3fdzbdz.png','images/gimg_dlbyqd.png','images/gimg_dlbyq.png','images/nd3xjmblcs.png','images/nd3xjmblnc.png','images/nd3xjmblgc.png','images/nd3xjmbljlz.png','images/nd3xjmbljlz.png',]
const rmbnd3sbimgsrc=['images/rimg_dlhdc.png','images/rimg_dl3slfdz0.png','images/rimg_dl3flfd.png','images/rimg_dl3hdz.png','images/rimg_dl3tyn.png','images/rimg_dl3fdzbdz.png','images/rimg_dlbyqd.png','images/rimg_dlbyq.png','images/nd3xjmbhcs.png','images/nd3xjmbhnc.png','images/nd3xjmbhgc.png','images/nd3xjmbhjlz.png','images/nd3xjmbhjlz.png',]
const mbnd3sbwidth=[258,370,166,237,187,245,179,172,169,199,192,407,407]
const mbnd3sbheight=[242,222,152,168,118,183,130,130,138,127,150,251,254]
const mbnd3sbleft=[-39,-170,441,484,236,331,156,309,94,319,528,335,6]
const mbnd3sbtop=[96,300,65,207,143,380,1008,1089,1427,1430,1421,539,755]
var mbnd3sbw=[214,195,156,227,177,235,169,162,159,189,182,397,397]
var mbnd3sbh=[214,195,156,227,177,235,169,162,159,189,182,397,397]
var mbnd3sbl=[214,195,156,227,177,235,169,162,159,189,182,397,397]
var mbnd3sbt=[214,195,156,227,177,235,169,162,159,189,182,397,397]
var tdmbnd3sbt=[214,195,156,227,177,235,169,162,159,189,182,397,397]
//3.2难度3电线
const nd3dximgsrc=['images/nd3x126.png','images/nd3x216.png','images/nd3x356.png','images/nd3x436.png','images/nd3x546.png','images/nd3xjx6612.png','images/nd3xjx71213.png','images/nd3xjx8137.png','images/nd3xjx978.png','images/nd3xjx1089.png','images/nd3xjx11810.png','images/nd3xjx12811.png']
const nd3dxwidth=[208,286,194,215,98,185,724,202,96,246,172,351]
const nd3dxheight=[88,168,175,200,84,187,1083,242,56,251,242,250]
const nd3dxleft=[155,95,217,310,409,415,20,488,491,181,288,372]
const nd3dxtop=[415,271,248,205,305,453,723,1900,2201,2300,2300,2300]
var nd3dxw=[208,286,194,215,98,179,224,200,101,389,241,398]
var nd3dxh=[208,286,194,215,98,179,224,200,101,389,241,398]
var nd3dxl=[208,286,194,215,98,179,224,200,101,389,241,398]
var nd3dxt=[208,286,194,215,98,179,224,200,101,389,241,398]
var tdnd3dxt=[208,286,194,215,98,179,224,200,101,389,241,398]
//3.3难度3电线连接
const nd3dxlj=[[1,5],[0,5],[4,5],[2,5],[3,5],[5,11],[11,12],[12,6],[6,7],[7,8],[7,9],[7,10]]   //所有接线组合
var nd3dxsfyj=[0,0,0,0,0,0,0,0,0,0,0,0]      //电线是否要接
 //3.4难度3灯光效果
 const dgnd3sbimgsrc=['images/nd3xjcskd.png','images/nd3xjnckd.png','images/nd3xjgckd.png']
 const dgnd3sbwidth=[242,242,242]
 const dgnd3sbheight=[185,150,162]
 const dgnd3sbleft=[15,257,493]
 const dgnd3sbtop=[2474,2510,2498]
 var dgnd3sbw=[182,397,397]
 var dgnd3sbh=[182,397,397]
 var dgnd3sbl=[182,397,397]
 var dgnd3sbt=[182,397,397]
 var tddgnd3sbt=[182,397,397]
//
//4过关界面
const ggzlyjimgsrc=['']
const ggzlyjwidth=483
const ggzlyjheight=139
const ggzlyjleft=136
const ggzlyjtop=1023
var ggzlyjw=483*screenWidth/750
var ggzlyjh=139*screenHeight/1600
var ggzlyjl=136*screenWidth/750
var ggzlyjt=1023*screenHeight/1600
 var ydsb=[-1,-1] //近两次所点设备
 var sfljsb=0     //是否连接失败
 var lclsb=[-1,-1]//最近边成的两设备
 var lslsb=[-1,-1]//最近连接失败的两设备
 var ssxs = 1    //伸缩系数，呼吸效果用
 var ssxsxh=1    //控制伸缩系数增减的信号

const ctx = canvas.getContext('2d')
const databus = new DataBus()
//说明文字
const smwz = {
  hdwz1: '火电厂：利用煤、石油和天然气等化石燃料所含能量发电的方式统称为火力发电',
  sdwz2: '水电厂：将水能转换为电能的综合工程设施：一般包括由挡水、泄水建筑物形成的水库和水电站引水系统、发电厂房、机电设备等',
  fdwz3: '风电：利用风力带动风车叶片旋转，再透过增速机将旋转的速度提升，来促使发电机发电',
  hdwz4: '核电站：核电站是利用原子核内部蕴藏的能量产生电能的新型发电站',
  tynwz5: '太阳能发电：利用太阳光或热，转变为电能的发电方式',
  sybdzwz6: '升压变电站：电力系統中，发电厂将天然的一次能源转变成电能，向远方的电力用户送电，为了减小输电线路上的电能损耗及线路阻抗压降，需要将电压升高',
  jybdzwz7: '降压变压器：为了满足电力用户安全的要，又要将电压降低，并分配给各个用户',
  pdzwz8: '配电站：是指在电力网中起电能分配作用的网络。通常是指电力系统中二次降压变压器低压侧直接或降压后用户供电的网络，它是电力系统中直接与用户相连并向用户分配电能的环节',
  csydwz9: '城市用电：城市居民的家用电器，它具有年年增长的趋势，以及明显的季节性被动特点',
  ncydwz10: '农村用电：农村居民用电和衣业生产用电',
  gyydwz11: '工业用电：工业生产的用电，一般工业用电的比重在用电构成中居于首位',
  hlbyqwz12: '换流变压器：是指接在换流阀与交流系统之间的电力变压器',
  hlfwz13: '换流阀：是实现交直流转换的关键设备，在直流输电工程中换流阀不仅具有整流和逆变的功能，还具有开关的功能，利用其快速可控性实现对直流快速启动和停运的操作',
  jllbqwz14: '交流滤波器：主要作用是提供系统所需无功，滤除相应次数谐波，调节交流母线电压',
  zllbqwz15: '直流滤波器：通常作为并联滤波器接在直流极母线与换流站中性线（或地）之间',
  gyzlsdx:'高压直流输电线路:是高压直流输电系统的一部分，由架空线路和(或)电缆线路、或部分架空线路和部分电缆线路组成，其终端在换流站。具有输电能力强、损耗小、两侧交流系统不需同步运行、发生故障时对电网造成的损失小等优点，特别适合用于长距离点对点大功率输电。'
}
//说明文字标题
const smwzbt = {
  hdwz1: '火电厂',
  sdwz2: '水电厂',
  fdwz3: '风能发电',
  hdwz4: '核能发电',
  tynwz5: '太阳能发电',
  sybdzwz6: '升压变电站',
  jybdzwz7: '降压变压器',
  pdzwz8: '配电站',
  csydwz9: '城市用电',
  ncydwz10: '农村用电',
  gyydwz11: '工业用电',
  hlbyqwz12: '换流变压器',
  hlfwz13: '换流阀',
  jllbqwz14: '交流滤波器',
  zllbqwz15: '直流滤波器',
gyzlsdx:'高压直流输电线路'
}
//难度2、3说明文字
const nd2wz=[smwz.sybdzwz6,smwz.pdzwz8,smwz.jybdzwz7,smwz.gyydwz11,smwz.csydwz9,smwz.hdwz1,smwz.ncydwz10]
const nd3wz=[smwz.hdwz1,smwz.sdwz2,smwz.fdwz3,smwz.hdwz4,smwz.tynwz5,smwz.sybdzwz6,smwz.jybdzwz7,smwz.pdzwz8,smwz.csydwz9,smwz.ncydwz10,smwz.gyydwz11,smwz.hlbyqwz12,smwz.hlfwz13,smwz.jllbqwz14,smwz.zllbqwz15,smwz.gyzlsdx]
//难度2、3说明文字标题
const nd2wzbt=[smwzbt.sybdzwz6,smwzbt.pdzwz8,smwzbt.jybdzwz7,smwzbt.gyydwz11,smwzbt.csydwz9,smwzbt.hdwz1,smwzbt.ncydwz10]
const nd3wzbt=[smwzbt.hdwz1,smwzbt.sdwz2,smwzbt.fdwz3,smwzbt.hdwz4,smwzbt.tynwz5,smwzbt.sybdzwz6,smwzbt.jybdzwz7,smwzbt.pdzwz8,smwzbt.csydwz9,smwzbt.ncydwz10,smwzbt.gyydwz11,smwzbt.hlbyqwz12,smwzbt.hlfwz13,smwzbt.jllbqwz14,smwzbt.zllbqwz15,smwzbt.gyzlsdx]
//说明文字文本框  占半屏，上或下
const wenbenkimgsrc="images/wenbenkuang.png"
const smwxwbkw=screenWidth
const smwxwbkh=0.3*screenHeight
const smwxwbkl=0
var smwxwbkt=0.2*screenHeight
//说明文字标题框尺寸
var nd2btwbkl=[1,2,3,4,5,6,7]
var nd2btwbkt=[1,2,3,4,5,6,7]
var nd2btwbkw=[1,2,3,4,5,6,7]
var nd3btwbkl=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]
var nd3btwbkt=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]
var nd3btwbkw=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]
const smwzbtcch=0.028*screenHeight



//5.0功能按钮图标
const tttbimgsrc=['images/btnBack.png','images/btnHelp.png','images/btnInfo.png','images/btnLife.png','images/btnMusic.png']
const tttbwidth=[116,76,76,262,76]
const tttbheight=[120,79,79,64,79]
const tttbleft=[15,659,659,15,659]
const tttbtop=[1425,162,249,45,336]
var tttbw=[182,397,397,99,99]
var tttbh=[182,397,397,99,99]
var tttbl=[182,397,397,99,99]
var tttbt=[182,397,397,99,99]
var tbban=[0,0,0,5,1]    //哪个图标被按了,命数

/**
 * 游戏主函数
 */
export default class Main {
  constructor() {
    // 维护当前requestAnimationFrame的id
    this.aniId = 0
    this.restart()
        //开启触碰监控，根据关卡设置不同反应
        canvas.addEventListener('touchstart', ((e) => {
          e.preventDefault()
          const x = e.touches[0].clientX
          const y = e.touches[0].clientY
          tdqdy = y
          //console.log('x:'+x+'y:'+y)
          if(ggxh===1) {
            if(ysggxh===1) {
            if (x>=ggzlyjl&&x<=ggzlyjl+ggzlyjw&y>=ggzlyjt&&y<=ggzlyjt+ggzlyjh){
              //console.log('x:'+x)
              this.restart()
            }
          }
          }else{
            //题头图标
            if (gkjmxh>0&&gkjmxh<4){
              if (x>=tttbl[0]&&x<=tttbl[0]+tttbw[0]&y>=tttbt[0]&&y<=tttbt[0]+tttbh[0]){
                this.restart()
              }
              if (x>=tttbl[1]&&x<=tttbl[1]+tttbw[1]&y>=tttbt[1]&&y<=tttbt[1]+tttbh[1]){
                if (tbban[1]===0) {tbban[1]=1} else {tbban[1]=0}
              }
              if (x>=tttbl[2]&&x<=tttbl[2]+tttbw[2]&y>=tttbt[2]&&y<=tttbt[2]+tttbh[2]){
                if (tbban[2]===0) {tbban[2]=1
                  zrsmwz=1
                } else {tbban[2]=0
                  zrsmwz=0
                }
              }
              if (x>=tttbl[4]&&x<=tttbl[4]+tttbw[4]&y>=tttbt[4]&&y<=tttbt[4]+tttbh[4]){
                if (tbban[4]===0) {tbban[4]=1} else {tbban[4]=0}
              }
            }
            //难度2、3的说明文字选中
            if (gkjmxh===2){
              if (zrsmwz===1){
                bxzdsbxl=-1
                for (let i=0;i<nd2wzbt.length;i++){
                if (x>=nd2btwbkl[i]&&x<=nd2btwbkl[i]+nd2btwbkw[i]&y>=nd2btwbkt[i]&&y<=nd2btwbkt[i]+smwzbtcch){
                  ngsbpcz=-1      //哪个设备碰触中
                  bxzdsbxl=i  //被选中的说明文字序号
                  
                }
              }
              }
            }
            if (gkjmxh===3){
              if (zrsmwz===1){
                bxzdsbxl=-1
                for (let i=0;i<nd3wzbt.length;i++){
                if (x>=nd3btwbkl[i]&&x<=nd3btwbkl[i]+nd3btwbkw[i]&y>=nd3btwbkt[i]&&y<=nd3btwbkt[i]+smwzbtcch){
                  ngsbpcz=-1      //哪个设备碰触中
                  bxzdsbxl=i  //被选中的说明文字序号
                  console.log (nd3btwbkl)
                  console.log(i+""+"="+nd3btwbkt[i]+"="+nd3btwbkl[i]+"="+nd3btwbkw[i])
                }
              }
              }
            }
            //关卡内游玩
            if (gkjmxh===0){
              for (let i=1;i<ndxzimgsrc.length;i++){
                if (x>=ndl[i]&&x<=ndl[i]+ndw[i]&y>=ndt[i]&&y<=ndt[i]+ndh[i]){
                  gkjmxh=i      //关卡界面序号
                }
              }
            }else if (gkjmxh===1){
              if (x>=nd1kgl&&x<=nd1kgl+nd1kgw&y>=nd1kgt&&y<=nd1kgt+nd1kgh){
                if (nd1ddkg===0){
                  nd1ddkg=1
                  ggxh=1  //过关信号
                  console.log('x:'+x+'y:'+y)
                  console.log('ggxh:'+ggxh)
                }else{nd1ddkg=0}
              }
            }else if (gkjmxh===2){
             
              ngsbpcz=-1
              for (let i=0;i<dl_img_src.length;i++){
                if (x>=dll[i]&&x<=dll[i]+dlw[i]&y>=dlt[i]&&y<=dlt[i]+dlh[i]){
                  ngsbpcz=i      //哪个设备碰触中
                }
              }
              if (zrsmwz===0){
                sfljsb=0   //是否连接失败，1连成，-1失败，0无成败
                if (ngsbpcz>=0){
                  if (ydsb[0]>=0){
                    ydsb[1]=ngsbpcz
                    sfljsb=0    //是否连接失败，1连成，-1失败，0无成败
                    let lssbxh=0  //临时失败信号
                    for (let j=0;j<nd2dxlj.length;j++){
                      if (nd2dxlj[j][0]===ydsb[0]&&nd2dxlj[j][1]===ydsb[1]){
                        nd2dxsfyj[j]=1
                        lclsb[0]=ydsb[0]
                        lclsb[1]=ydsb[1]
                        ydsb[0]=-1
                        ydsb[1]=-1
                        lssbxh=1
                        sfljsb=1
                      }
                      else if(nd2dxlj[j][0]===ydsb[1]&&nd2dxlj[j][1]===ydsb[0]){
                        nd2dxsfyj[j]=1
                        lclsb[0]=ydsb[0]
                        lclsb[1]=ydsb[1]
                        ydsb[0]=-1
                        ydsb[1]=-1
                        lssbxh=1
                        sfljsb=1
                      }
                    }
                    if (lssbxh===0){
                      sfljsb=-1
                      lslsb[0]=ydsb[0]
                      lslsb[1]=ydsb[1]
                      ydsb[0]=-1
                      ydsb[1]=-1
                      //console.log('连接失败')
                      lssbxh=0
                    }
                  }else{ydsb[0]=ngsbpcz}
                }else{
                  ydsb[0]=-1
                  ydsb[1]=-1
                }
                console.log(ydsb[0]+'ydsb'+ydsb[1])
                //过关判定
                let lsggxh=1
                for (let g=0;g<nd2dxsfyj.length;g++){
                  if(nd2dxsfyj[g]===0){lsggxh=0}
                }
                if (lsggxh===1){ 
                  ggxh=1  //过关信号
                }
              }
              
             
            }else if (gkjmxh===3){
              ngsbpcz=-1
             
              for (let i=0;i<nd3sbimgsrc.length;i++){
                if (x>=nd3sbl[i]&&x<=nd3sbl[i]+nd3sbw[i]&y>=tdnd3sbt[i]&&y<=tdnd3sbt[i]+nd3sbh[i]){
                  ngsbpcz=i      //哪个设备碰触中
                }
              }
              if (zrsmwz===0){
                sfljsb=0   //是否连接失败，1连成，-1失败，0无成败
                if (ngsbpcz>=0){
                  if (ydsb[0]>=0){
                    ydsb[1]=ngsbpcz
                    console.log(ydsb[0]+'ydsb0'+ydsb[1])
                    //近两次所点设备
                    sfljsb=0   //是否连接失败，1连成，-1失败，0无成败
                    let lssbxh=0  //临时失败信号
                    for (let j=0;j<nd3dxlj.length;j++){
                      if (nd3dxlj[j][0]===ydsb[0]&&nd3dxlj[j][1]===ydsb[1]){
                        nd3dxsfyj[j]=1    //该设备是否要接
                        lclsb[0]=ydsb[0]
                        lclsb[1]=ydsb[1]
                        ydsb[0]=-1
                        ydsb[1]=-1
                        sfljsb=1
                        lssbxh=1
                      }
                      else if(nd3dxlj[j][0]===ydsb[1]&&nd3dxlj[j][1]===ydsb[0]){
                        nd3dxsfyj[j]=1
                        sfljsb=1
                        lssbxh=1
                        lclsb[0]=ydsb[0]
                        lclsb[1]=ydsb[1]
                        ydsb[0]=-1
                        ydsb[1]=-1
                      }
                    }
                    if (lssbxh===0){
                      sfljsb=-1
                      lslsb[0]=ydsb[0]
                      lslsb[1]=ydsb[1]
                      ydsb[0]=-1
                      ydsb[1]=-1
                      //console.log('连接失败')
                      lssbxh=0
                    }
                  }else{ydsb[0]=ngsbpcz}
                }else{
                  //点到空处则取消选择
                  ydsb[0]=-1
                  ydsb[1]=-1
                }
                //console.log(ydsb[0]+'ydsb'+ydsb[1])
                //console.log(nd3dxsfyj)
                let lsggxh=1
                for (let g=0;g<nd3dxsfyj.length;g++){
                  if(nd3dxsfyj[g]===0){lsggxh=0}
                }
                if (lsggxh===1){ 
                  ggxh=1  //过关信号
                }
              }

            }
          }
          
        }
        ))
        //拖动
        canvas.addEventListener('touchmove', ((e) => {
          e.preventDefault()
          //const x = e.touches[0].clientX
          const y = e.touches[0].clientY
          tdpyl = y-tdqdy
          zonpyl = tdpyl+dqpyl
          if (zonpyl>0){zonpyl=0}
          if (zonpyl<screenHeight-bgsjheight[gkjmxh]){zonpyl=screenHeight-bgsjheight[gkjmxh]}
          console.log(tdpyl)
          console.log(zonpyl)
        }))
        canvas.addEventListener('touchend', ((e) => {
          e.preventDefault()
          dqpyl=zonpyl
          //console.log(dqpyl)
        }))
  }

  restart() {
    databus.reset()
    canvas.removeEventListener(
      'touchstart',
      this.touchHandler
    )
   // canvas.addEventListener('touchstart',functio(tchs){gksz(tchs)})
   tbban=[0,0,0,5,1]    //哪个图标被按了,命数
   zrsmwz=0    //提示文字
   zonpyl=0
   ysggxhjs=0  //延时后过关信号计时
   ysggxh=0   //延时后的过关信号
   ysmbxh=0   //延时描边信号
  ysmbxhjs=0 //延时描边信号计时
   ggxh=0      //过关信号归0
   gkjmxh=0    //关卡界面归0
   nd3dxsfyj=[0,0,0,0,0,0,0,0,0,0,0,0] 
nd2dxsfyj=[0,0,0,0,0,0] //难度2电线是否要接
nd1ddkg = 0  //电灯开关归0
bxzdsbxl=-1 //被选中的说明文字序号
ngsbpcz=-1 //哪个设备被碰触中
ydsb=[-1,-1] //近两次所点设备
sfljsb=0     //是否连接失败，1连成，-1失败，0无成败
lclsb=[-1,-1]//最近边成的两设备
lslsb=[-1,-1]//最近连接失败的两设备
//说明文字题头图标
//console.log('nd2wz[0]:'+nd2wz[0].length)
this.tttb = new Array()
for (let i=0;i<tttbimgsrc.length;i++){
  tttbw[i]= tttbwidth[i]*screenWidth/750
  tttbh[i]= tttbheight[i]*screenHeight/1600
  tttbl[i]= tttbleft[i]*screenWidth/750
  tttbt[i]= tttbtop[i]*screenHeight/1600
  this.tttb[i] = new Sprite(tttbimgsrc[i],tttbw[i],tttbh[i],tttbl[i],tttbt[i])
}
//说明文字标题/设备名
//bt.1根据字符长度，取得所有设备名的尺寸（宽）与字体大小
this.nd2smwzbtccwyf=new Array()
for (let i=0;i<nd2wzbt.length;i++){
    let lsbtzfs=nd2wzbt[i].length   //临时标题字符数
    this.nd2smwzbtccwyf[i]=sbmccw(lsbtzfs)
}
this.nd3smwzbtccwyf=new Array()
for (let i=0;i<nd3wzbt.length;i++){
    let lsbtzfs=nd3wzbt[i].length   //临时标题字符数
    this.nd3smwzbtccwyf[i]=sbmccw(lsbtzfs)
}
//说明文字文本框
this.wenbenkuang=new Sprite(wenbenkimgsrc,smwxwbkw,smwxwbkh,smwxwbkl,smwxwbkt)
//w.1取得最大可用字符框尺寸以及相应列数与行数
this.nd2zdkyzfkdx=new Array()
for (let i=0;i<nd2wz.length;i++){
  let lszfs=nd2wz[i].length
  this.nd2zdkyzfkdx[i]=zdkyzfcc(lszfs)
  //console.log('nd2wz[i]:'+nd2wz[i].length)
  //console.log('nd2zdkyzfkdx[i]:'+this.nd2zdkyzfkdx[i])
}
this.nd3zdkyzfkdx=new Array()
for (let i=0;i<nd3wz.length;i++){
  let lszfs=nd3wz[i].length
  this.nd3zdkyzfkdx[i]=zdkyzfcc(lszfs)
  //console.log('nd3wz[i]:'+nd3wz[i].length)
  //console.log('nd3zdkyzfkdx[i]:'+this.nd3zdkyzfkdx[i])
}
//背景，其中最后一个，是过关界面
    this.bg = new Array()
    for (let i=0;i<bgimgsrc.length;i++){
      let bgw= screenWidth
      let bgh= bgimgheight[i]*window.innerWidth/bgimgwidth[i]
      if (bgh<screenHeight){bgh=screenHeight}
      bgsjheight[i]=bgh
      let bgl= 0
      let bgt= 0
      this.bg[i] = new Sprite(bgimgsrc[i],bgw,bgh,bgl,bgt)
    }
    //for (let i=0;i<3;i++){
    //this.player = new Player(ctx)
    //难度选择界面图标
    this.infhelp=new Sprite('images/information.png',0.12*screenWidth,0.06*screenHeight,0.82*screenWidth,0.08*screenHeight)
    this.ndxztb = new Array()
    for (let i=0;i<ndxzimgsrc.length;i++){
      ndw[i]= ndxzimgwidth[i]*screenWidth/100
      ndh[i]= ndxzimgheight[i]*screenHeight/100
      ndl[i]= ndxzimgleft[i]*screenWidth/100
      ndt[i]= ndxzimgtop[i]*screenHeight/100
      this.ndxztb[i] = new Sprite(ndxzimgsrc[i],ndw[i],ndh[i],ndl[i],ndt[i])
    }
    //1、难度1图片
    this.nd1dd=new Array()
    for (let i=0;i<nd1ddimgsrc.length;i++){
      let nd1ddw= 60.53*screenWidth/100
      let nd1ddh= 22.25*screenHeight/100
      let nd1ddl= 16.93*screenWidth/100
      let nd1ddt= 46.19*screenHeight/100
      this.nd1dd[i] = new Sprite(nd1ddimgsrc[i],nd1ddw,nd1ddh,nd1ddl,nd1ddt)
    }
    this.nd1kg=new Array()
    for (let i=0;i<nd1kgimgsrc.length;i++){
      this.nd1kg[i] = new Sprite(nd1kgimgsrc[i],nd1kgw,nd1kgh,nd1kgl,nd1kgt)
    }
    //中等难度设备
    this.dlsbe = new Array()
    for (let i=0;i<dl_img_src.length;i++){
      dlw[i]= dl_width[i]*screenWidth/750
      dlh[i]= dl_height[i]*screenHeight/(1600+nd2xxpyl)
      dll[i]= dl_left[i]*screenWidth/750
      dlt[i]= (dl_top[i]+nd2xxpyl)*screenHeight/(1600+nd2xxpyl)
      this.dlsbe[i] = new Sprite(dl_img_src[i],dlw[i],dlh[i],dll[i],dlt[i])
    }
    //难度2设备描边
    this.mbnd2sb=new Array()
    this.gmbnd2sb=new Array()
    this.rmbnd2sb=new Array()
    for (let i=0;i<mbnd2sbimgsrc.length;i++){
      mbnd2sbw[i]= mbnd2sbwidth[i]*screenWidth/750
      mbnd2sbh[i]= mbnd2sbheight[i]*screenHeight/(1600+nd2xxpyl)
      mbnd2sbl[i]= mbnd2sbleft[i]*screenWidth/750
      mbnd2sbt[i]= (mbnd2sbtop[i]+nd2xxpyl)*screenHeight/(1600+nd2xxpyl)
      this.mbnd2sb[i] = new Sprite(mbnd2sbimgsrc[i],mbnd2sbw[i],mbnd2sbh[i],mbnd2sbl[i],mbnd2sbt[i])
      this.gmbnd2sb[i] = new Sprite(gmbnd2sbimgsrc[i],mbnd2sbw[i],mbnd2sbh[i],mbnd2sbl[i],mbnd2sbt[i])
      this.rmbnd2sb[i] = new Sprite(rmbnd2sbimgsrc[i],mbnd2sbw[i],mbnd2sbh[i],mbnd2sbl[i],mbnd2sbt[i])
    }
    //难度2灯光
    this.dg2dlsbe = new Array()
    for (let i=0;i<dg2dl_img_src.length;i++){
      dg2dlw[i]= dg2dl_width[i]*screenWidth/750
      dg2dlh[i]= dg2dl_height[i]*screenHeight/(1600+nd2xxpyl)
      dg2dll[i]= dg2dl_left[i]*screenWidth/750
      dg2dlt[i]= (dg2dl_top[i]+nd2xxpyl)*screenHeight/(1600+nd2xxpyl)
      this.dg2dlsbe[i] = new Sprite(dg2dl_img_src[i],dg2dlw[i],dg2dlh[i],dg2dll[i],dg2dlt[i])
    }
    //难度2电线
    this.nd2dx = new Array()
    for (let i=0;i<nd2dximgsrc.length;i++){
      nd2dxw[i]= nd2dxwidth[i]*screenWidth/750
      nd2dxh[i]= nd2dxheight[i]*screenHeight/(1600+nd2xxpyl)
      nd2dxl[i]= nd2dxleft[i]*screenWidth/750
      nd2dxt[i]= (nd2dxtop[i]+nd2xxpyl)*screenHeight/(1600+nd2xxpyl)
      this.nd2dx[i] = new Sprite(nd2dximgsrc[i],nd2dxw[i],nd2dxh[i],nd2dxl[i],nd2dxt[i])
    }
    //
    //难度3设备
    this.nd3sb=new Array()
    for (let i=0;i<nd3sbimgsrc.length;i++){
      nd3sbw[i]= nd3sbwidth[i]*screenWidth/750
      nd3sbh[i]= nd3sbheight[i]*nd3fblxsy
      nd3sbl[i]= nd3sbleft[i]*screenWidth/750
      nd3sbt[i]= (nd3sbtop[i]+nd3xxpyl)*nd3fblxsy
      tdnd3sbt[i]=nd3sbt[i]+zonpyl
      this.nd3sb[i] = new Sprite(nd3sbimgsrc[i],nd3sbw[i],nd3sbh[i],nd3sbl[i],tdnd3sbt[i])
    }
    //难度3灯光效果
    this.dgnd3sb=new Array()
    for (let i=0;i<dgnd3sbimgsrc.length;i++){
      dgnd3sbw[i]= dgnd3sbwidth[i]*screenWidth/750
      dgnd3sbh[i]= dgnd3sbheight[i]*nd3fblxsy
      dgnd3sbl[i]= dgnd3sbleft[i]*screenWidth/750
      dgnd3sbt[i]= (dgnd3sbtop[i]+nd3xxpyl)*nd3fblxsy
      tddgnd3sbt[i]=dgnd3sbt[i]+zonpyl
      this.dgnd3sb[i] = new Sprite(dgnd3sbimgsrc[i],dgnd3sbw[i],dgnd3sbh[i],dgnd3sbl[i],tddgnd3sbt[i])
    }
        //难度3设备描边
        this.mbnd3sb=new Array()
        this.gmbnd3sb=new Array()
        this.rmbnd3sb=new Array()
        for (let i=0;i<mbnd3sbimgsrc.length;i++){
          mbnd3sbwidth[i]=nd3sbwidth[i]+10
          mbnd3sbheight[i]=nd3sbheight[i]+10
          mbnd3sbleft[i]=nd3sbleft[i]-5
          mbnd3sbtop[i]=nd3sbtop[i]-5
          mbnd3sbw[i]= mbnd3sbwidth[i]*screenWidth/750
          mbnd3sbh[i]= mbnd3sbheight[i]*nd3fblxsy
          mbnd3sbl[i]= mbnd3sbleft[i]*screenWidth/750
          mbnd3sbt[i]= (mbnd3sbtop[i]+nd3xxpyl)*nd3fblxsy
          tdmbnd3sbt[i]=mbnd3sbt[i]+zonpyl
          this.mbnd3sb[i] = new Sprite(mbnd3sbimgsrc[i],mbnd3sbw[i],mbnd3sbh[i],mbnd3sbl[i],tdmbnd3sbt[i])
          this.gmbnd3sb[i] = new Sprite(gmbnd3sbimgsrc[i],mbnd3sbw[i],mbnd3sbh[i],mbnd3sbl[i],tdmbnd3sbt[i])
          this.rmbnd3sb[i] = new Sprite(rmbnd3sbimgsrc[i],mbnd3sbw[i],mbnd3sbh[i],mbnd3sbl[i],tdmbnd3sbt[i])
        }
    //难度3电线
    this.nd3dx=new Array()
    for (let i=0;i<nd3dximgsrc.length;i++){
      nd3dxw[i]= nd3dxwidth[i]*screenWidth/750
      nd3dxh[i]= nd3dxheight[i]*nd3fblxsy
      nd3dxl[i]= nd3dxleft[i]*screenWidth/750
      nd3dxt[i]= (nd3dxtop[i]+nd3xxpyl)*nd3fblxsy
      tdnd3dxt[i]=nd3dxt[i]+zonpyl
      this.nd3dx[i] = new Sprite(nd3dximgsrc[i],nd3dxw[i],nd3dxh[i],nd3dxl[i],tdnd3dxt[i])
    }

  
    //console.log(dl_width[0])
    //this.dlsbe[1] = new dlsb(dl_img_src[1],dl_width[1],dl_height[1],dl_left[1],dl_top[1])
  //}
    this.gameinfo = new GameInfo()
    this.music = new Music()
    this.bindLoop = this.loop.bind(this)
    this.hasEventBind = false
    // 清除上一局的动画
    window.cancelAnimationFrame(this.aniId)
    this.aniId = window.requestAnimationFrame(
      this.bindLoop,
      canvas
    )
  }

  collisionDetection() {
    const that = this

    databus.bullets.forEach((bullet) => {
      for (let i = 0, il = databus.enemys.length; i < il; i++) {
        const enemy = databus.enemys[i]

        if (!enemy.isPlaying && enemy.isCollideWith(bullet)) {
          enemy.playAnimation()
          that.music.playExplosion()

          bullet.visible = false
          databus.score += 1

          break
        }
      }
    })

    for (let i = 0, il = databus.enemys.length; i < il; i++) {
      const enemy = databus.enemys[i]

      if (this.player.isCollideWith(enemy)) {
        databus.gameOver = true

        break
      }
    }
  }

  // 游戏结束后的触摸事件处理逻辑
  touchEventHandler(e) {
    e.preventDefault()

    const x = e.touches[0].clientX
    const y = e.touches[0].clientY

    const area = this.gameinfo.btnArea

    if (x >= area.startX
        && x <= area.endX
        && y >= area.startY
        && y <= area.endY) this.restart()
  }

  /**
   * canvas重绘函数
   * 每一帧重新绘制所有的需要展示的元素
   */
  render() {
    //清空面板
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    //画背景
    //this.bg.render(ctx)
    //this.bg[gkjmxh].drawToCanvas(ctx)
    this.bg[gkjmxh].fuxixiaoguo(ctx,0,zonpyl,screenWidth,bgimgheight[gkjmxh]*window.innerWidth/bgimgwidth[gkjmxh]);
    //this.infhelp.drawToCanvas(ctx)

    //根据关卡界面序号显示对应界面图片
    if (gkjmxh===0){
      for (let i=0;i<ndxzimgsrc.length;i++){
      this.ndxztb[i].drawToCanvas(ctx)
    }
    }else if (gkjmxh===1){
        if (nd1ddkg===0){
          this.nd1dd[0].drawToCanvas(ctx)
          this.nd1kg[0].drawToCanvas(ctx)
        }else{
          this.nd1dd[1].drawToCanvas(ctx)
          this.nd1kg[1].drawToCanvas(ctx)
          }
    }else if (gkjmxh===2){
      //设备如何显示
      for (let i=0;i<dl_img_src.length;i++){
        if (i===ngsbpcz){
          let lsw=dlw[i]*ssxs
          let lsh=dlh[i]*ssxs
          let lsx=dll[i]+dlw[i]*(1-ssxs)/2
          let lsy=dlt[i]+dlh[i]*(1-ssxs)/2
          this.dlsbe[i].fuxixiaoguo(ctx,lsx,lsy,lsw,lsh);
          if (sfljsb===0){
            let mblsw=mbnd2sbw[i]*ssxs
            let mblsh=mbnd2sbh[i]*ssxs
            let mblsx=mbnd2sbl[i]+mbnd2sbw[i]*(1-ssxs)/2
            let mblsy=mbnd2sbt[i]+mbnd2sbh[i]*(1-ssxs)/2
            this.mbnd2sb[i].fuxixiaoguo(ctx,mblsx,mblsy,mblsw,mblsh);
          }
        }else {
          this.dlsbe[i].drawToCanvas(ctx)
        } 
      }
      //边接成功或失败后的红绿描边效果
      if (sfljsb===1){
        ngsbpcz=-1   //哪个设备碰触中
        this.gmbnd2sb[lclsb[0]].drawToCanvas(ctx)
        this.gmbnd2sb[lclsb[1]].drawToCanvas(ctx)
        console.log(sfljsb)
      } else if (sfljsb===-1){
        ngsbpcz=-1
        this.rmbnd2sb[lslsb[0]].drawToCanvas(ctx)
        this.rmbnd2sb[lslsb[1]].drawToCanvas(ctx)
        console.log(sfljsb)
      } 
      //难度2设备名（说明文字标题）
      if (zrsmwz===1){
        for (let i=0;i<nd2wzbt.length;i++){
          //文字背景
          if (dlt[i]/screenHeight>0.5){
            let wbkt=dlt[i]-smwzbtcch
            let wbkl=dll[i]+dlw[i]/2-0.55*this.nd2smwzbtccwyf[i][0]
            let wbkw=1.1*this.nd2smwzbtccwyf[i][0]
            let wbkh=smwzbtcch
            nd2btwbkl[i]=wbkl
            nd2btwbkt[i]=wbkt
            nd2btwbkw[i]=wbkw
            ctx.fillStyle="#6A7900"
            ctx.fillRect(wbkl,wbkt,wbkw,wbkh) //矩形
            let wbkyr=smwzbtcch/2
            let wbkyx1=dll[i]+dlw[i]/2-0.55*this.nd2smwzbtccwyf[i][0]
            let wbkyx2=dll[i]+dlw[i]/2+0.55*this.nd2smwzbtccwyf[i][0]
            let wbkyy=wbkt+wbkh/2
            ctx.beginPath();
            ctx.arc(wbkyx1,wbkyy,wbkyr,0,2*Math.PI)
            ctx.arc(wbkyx2,wbkyy,wbkyr,0,2*Math.PI)  //两侧的圆
            ctx.fillStyle="#6A7900"
            ctx.fill()
            //文字内容
            let lsfontsize=this.nd2smwzbtccwyf[i][1]  //字体大小
            let lszfc=nd2wzbt[i]
            ctx.fillStyle = '#ffffff'
            ctx.font = `${lsfontsize}px MicrosoftYaHei`
            ctx.fillText(lszfc,wbkl+0.2*smwzbtcch,wbkt+0.8*smwzbtcch);
          }else{
            let wbkt=dlt[i]+dlh[i]
            let wbkl=dll[i]+dlw[i]/2-0.55*this.nd2smwzbtccwyf[i][0]
            let wbkw=1.1*this.nd2smwzbtccwyf[i][0]
            let wbkh=smwzbtcch
            nd2btwbkl[i]=wbkl
            nd2btwbkt[i]=wbkt
            nd2btwbkw[i]=wbkw
            ctx.fillStyle="#6A7900";
            ctx.fillRect(wbkl,wbkt,wbkw,wbkh);
            let wbkyr=smwzbtcch/2
            let wbkyx1=dll[i]+dlw[i]/2-0.55*this.nd2smwzbtccwyf[i][0]
            let wbkyx2=dll[i]+dlw[i]/2+0.55*this.nd2smwzbtccwyf[i][0]
            let wbkyy=wbkt+wbkh/2
            ctx.beginPath();
            ctx.arc(wbkyx1,wbkyy,wbkyr,0,2*Math.PI)
            ctx.arc(wbkyx2,wbkyy,wbkyr,0,2*Math.PI)  //两侧的圆
            ctx.fillStyle="#6A7900"
            ctx.fill()
                        //文字内容
                        let lsfontsize=this.nd2smwzbtccwyf[i][1]  //字体大小
                        let lszfc=nd2wzbt[i]
                        ctx.fillStyle = '#ffffff'
                        ctx.font = `${lsfontsize}px MicrosoftYaHei`
                        ctx.fillText(lszfc,wbkl+0.2*smwzbtcch,wbkt+0.8*smwzbtcch);
          }

        }
      }
      //难度2说明文字
      for (let i=0;i<nd2wzbt.length;i++){
        if (i===bxzdsbxl){
          //难度2说明文字
          if (zrsmwz===1){
            if (dlt[i]/screenHeight>0.5){
              smwxwbkt=0.2*screenHeight
            } else {smwxwbkt=0.6*screenHeight}
            //this.wenbenkuang.drawToCanvas(ctx)
            //console.log(this.wenbenkuang)
            this.wenbenkuang.fuxixiaoguo(ctx,smwxwbkl,smwxwbkt,smwxwbkw,smwxwbkh);
          let lsx0=0.05*smwxwbkw
          let lsy0=smwxwbkt+0.05*smwxwbkh
          let lscc=this.nd2zdkyzfkdx[i][0]   //尺寸
          let lsls=this.nd2zdkyzfkdx[i][1]   //列数
          let lsfontsize=this.nd2zdkyzfkdx[i][2]  //字体大小
          let lszfs=nd2wz[i].length
          let lszfc=nd2wz[i]
          for (let wzi=0;wzi<lszfs;wzi++){
            let lszf=lszfc.substring(wzi,wzi+1)
            let lsx=lsx0+lscc*(wzi%lsls)
            let lsy=lsy0+0.8*lscc+lscc*Math.floor(wzi/lsls)
            ctx.fillStyle = '#ae8913'
            ctx.font = `${lsfontsize}px MicrosoftYaHei`
            //ctx.fillText(lszf,lsx,lsy,0.9*lscc)
            ctx.fillText(lszf,lsx,lsy)
            //console.log(lszf)
          }
          }
        } 
      }
      //电线是否显示
      for (let j=0;j<nd2dxsfyj.length;j++){
        if (nd2dxsfyj[j]===1){
          this.nd2dx[j].drawToCanvas(ctx)
        }
      }
      //难度2灯光效果
      if (nd2dxsfyj[0]===1&&nd2dxsfyj[1]===1&&nd2dxsfyj[2]===1){
        if(nd2dxsfyj[3]===1){
          this.dlsbe[3]=this.dg2dlsbe[2]
        }
        if(nd2dxsfyj[4]===1){
          this.dlsbe[4]=this.dg2dlsbe[0]
          //this.dg2dlsbe[0].drawToCanvas(ctx)
        }
        if(nd2dxsfyj[5]===1){
          this.dlsbe[6]=this.dg2dlsbe[1]
          //this.dg2dlsbe[1].drawToCanvas(ctx)
        }
      }
    }  else if (gkjmxh===3){
      //设备如何显示
      for (let i=0;i<nd3sbimgsrc.length;i++){
        if (i===ngsbpcz){
          let lsw=nd3sbw[i]*ssxs
          let lsh=nd3sbh[i]*ssxs
          let lsx=nd3sbl[i]+nd3sbw[i]*(1-ssxs)/2
          let lsy=tdnd3sbt[i]+nd3sbh[i]*(1-ssxs)/2
          this.nd3sb[i].fuxixiaoguo(ctx,lsx,lsy,lsw,lsh);
          if (sfljsb===0){
            let mblsw=mbnd3sbw[i]*ssxs
            let mblsh=mbnd3sbh[i]*ssxs
            let mblsx=mbnd3sbl[i]+mbnd3sbw[i]*(1-ssxs)/2
            let mblsy=tdmbnd3sbt[i]+mbnd3sbh[i]*(1-ssxs)/2
            this.mbnd3sb[i].fuxixiaoguo(ctx,mblsx,mblsy,mblsw,mblsh);
          }
        }else {
          //this.nd3sb[i].drawToCanvas(ctx)
          let lsw=nd3sbw[i]
          let lsh=nd3sbh[i]
          let lsx=nd3sbl[i]
          let lsy=tdnd3sbt[i]
          this.nd3sb[i].fuxixiaoguo(ctx,lsx,lsy,lsw,lsh);
        } 
      }
      //边接成功或失败后的红绿描边效果
      if (sfljsb===1){
        ngsbpcz=-1
        this.gmbnd3sb[lclsb[0]].fuxixiaoguo(ctx,mbnd3sbl[lclsb[0]],tdmbnd3sbt[lclsb[0]],mbnd3sbw[lclsb[0]],mbnd3sbh[lclsb[0]]);
        this.gmbnd3sb[lclsb[1]].fuxixiaoguo(ctx,mbnd3sbl[lclsb[1]],tdmbnd3sbt[lclsb[1]],mbnd3sbw[lclsb[1]],mbnd3sbh[lclsb[1]]);
      } else if (sfljsb===-1){
        ngsbpcz=-1
      this.rmbnd3sb[lslsb[0]].fuxixiaoguo(ctx,mbnd3sbl[lslsb[0]],tdmbnd3sbt[lslsb[0]],mbnd3sbw[lslsb[0]],mbnd3sbh[lslsb[0]]);
      this.rmbnd3sb[lslsb[1]].fuxixiaoguo(ctx,mbnd3sbl[lslsb[1]],tdmbnd3sbt[lslsb[1]],mbnd3sbw[lslsb[1]],mbnd3sbh[lslsb[1]]);
        //console.log(sfljsb)
      } 
//难度3设备名（说明文字标题）
if (zrsmwz===1){
  for (let i=0;i<nd3wzbt.length;i++){
    //console.log(nd3wzbt[i])
    if (i===nd3wzbt.length-1){
      let wbkt= tdnd3dxt[6]+nd3dxh[6]/2
      let wbkl= nd3dxl[6]+nd3dxw[6]/2-0.55*this.nd3smwzbtccwyf[i][0]
      //console.log(wbkt)
      let wbkw=1.1*this.nd3smwzbtccwyf[i][0]
      let wbkh=smwzbtcch
      nd3btwbkl[i]=wbkl
      nd3btwbkt[i]=wbkt
      nd3btwbkw[i]=wbkw
      
      ctx.fillStyle="#6A7900"
      ctx.fillRect(wbkl,wbkt,wbkw,wbkh) //矩形
      let wbkyr=smwzbtcch/2
      let wbkyx1=wbkl
      let wbkyx2=wbkl+wbkw
      let wbkyy=wbkt+wbkh/2
      ctx.beginPath();
      ctx.arc(wbkyx1,wbkyy,wbkyr,0,2*Math.PI)
      ctx.arc(wbkyx2,wbkyy,wbkyr,0,2*Math.PI)  //两侧的圆
      ctx.fillStyle="#6A7900"
      ctx.fill()
      //文字内容
      let lsfontsize=this.nd3smwzbtccwyf[i][1]  //字体大小
      let lszfc=nd3wzbt[i]
      ctx.fillStyle = '#ffffff'
      ctx.font = `${lsfontsize}px MicrosoftYaHei`
      ctx.fillText(lszfc,wbkl+0.2*smwzbtcch,wbkt+0.8*smwzbtcch);
    }
    //文字背景
    if (tdnd3sbt[i]/screenHeight>0.44){
      let wbkt=tdnd3sbt[i]-smwzbtcch
      let wbkl=nd3sbl[i]+nd3sbw[i]/2-0.55*this.nd3smwzbtccwyf[i][0]
      let wbkw=1.1*this.nd3smwzbtccwyf[i][0]
      let wbkh=smwzbtcch
      nd3btwbkl[i]=wbkl
      nd3btwbkt[i]=wbkt
      nd3btwbkw[i]=wbkw
      ctx.fillStyle="#6A7900"
      ctx.fillRect(wbkl,wbkt,wbkw,wbkh) //矩形
      let wbkyr=smwzbtcch/2
      let wbkyx1=wbkl
      let wbkyx2=wbkl+wbkw
      let wbkyy=wbkt+wbkh/2
      ctx.beginPath();
      ctx.arc(wbkyx1,wbkyy,wbkyr,0,2*Math.PI)
      ctx.arc(wbkyx2,wbkyy,wbkyr,0,2*Math.PI)  //两侧的圆
      ctx.fillStyle="#6A7900"
      ctx.fill()
      //文字内容
      let lsfontsize=this.nd3smwzbtccwyf[i][1]  //字体大小
      let lszfc=nd3wzbt[i]
      ctx.fillStyle = '#ffffff'
      ctx.font = `${lsfontsize}px MicrosoftYaHei`
      ctx.fillText(lszfc,wbkl+0.2*smwzbtcch,wbkt+0.8*smwzbtcch);
    }else{
      let wbkt=tdnd3sbt[i]+nd3sbh[i]
      let wbkl=nd3sbl[i]+nd3sbw[i]/2-0.55*this.nd3smwzbtccwyf[i][0]
      if(wbkl<smwzbtcch/2){wbkl=smwzbtcch/2}
      let wbkw=1.1*this.nd3smwzbtccwyf[i][0]
      let wbkh=smwzbtcch
      nd3btwbkl[i]=wbkl
      nd3btwbkt[i]=wbkt
      nd3btwbkw[i]=wbkw
      ctx.fillStyle="#6A7900";
      ctx.fillRect(wbkl,wbkt,wbkw,wbkh);
      let wbkyr=smwzbtcch/2
      let wbkyx1=wbkl
      let wbkyx2=wbkl+wbkw
      let wbkyy=wbkt+wbkh/2
      ctx.beginPath();
      ctx.arc(wbkyx1,wbkyy,wbkyr,0,2*Math.PI)
      ctx.arc(wbkyx2,wbkyy,wbkyr,0,2*Math.PI)  //两侧的圆
      ctx.fillStyle="#6A7900"
      ctx.fill()
                  //文字内容
                  let lsfontsize=this.nd3smwzbtccwyf[i][1]  //字体大小
                  let lszfc=nd3wzbt[i]
                  ctx.fillStyle = '#ffffff'
                  ctx.font = `${lsfontsize}px MicrosoftYaHei`
                  ctx.fillText(lszfc,wbkl+0.2*smwzbtcch,wbkt+0.8*smwzbtcch);
    }

  }
}
for (let i=0;i<nd3wzbt.length;i++){
  if (i===bxzdsbxl){
          //难度3说明文字
      if (zrsmwz===1){
        if (nd3btwbkt/screenHeight>0.5){
          smwxwbkt=0.2*screenHeight
        } else {smwxwbkt=0.6*screenHeight}
        this.wenbenkuang.fuxixiaoguo(ctx,smwxwbkl,smwxwbkt,smwxwbkw,smwxwbkh);
      let lsx0=0.05*smwxwbkw
      let lsy0=smwxwbkt+0.05*smwxwbkh
      let lscc=this.nd3zdkyzfkdx[i][0]   //尺寸
      let lsls=this.nd3zdkyzfkdx[i][1]   //列数
      let lsfontsize=this.nd3zdkyzfkdx[i][2]  //字体大小
      let lszfs=nd3wz[i].length
      let lszfc=nd3wz[i]
      //console.log(nd3wz[i])
      for (let wzi=0;wzi<lszfs;wzi++){
        let lszf=lszfc.substring(wzi,wzi+1)
        let lsx=lsx0+lscc*(wzi%lsls)
        let lsy=lsy0+0.8*lscc+lscc*Math.floor(wzi/lsls)
        ctx.fillStyle = '#ae8913'
        ctx.font = `${lsfontsize}px MicrosoftYaHei`
        //ctx.fillText(lszf,lsx,lsy,0.9*lscc)
        ctx.fillText(lszf,lsx,lsy)
        //console.log(lszf)
      }
      } 
        }
      }

      
            //电线是否显示
            for (let j=0;j<nd3dxsfyj.length;j++){
              if (nd3dxsfyj[j]===1){
                //this.nd3dx[j].drawToCanvas(ctx)
                let lsw=nd3dxw[j]
          let lsh=nd3dxh[j]
          let lsx=nd3dxl[j]
          let lsy=tdnd3dxt[j]
          this.nd3dx[j].fuxixiaoguo(ctx,lsx,lsy,lsw,lsh);

              }
            }
            //难度3灯光效果
            if (nd3dxsfyj[0]===1||nd3dxsfyj[1]===1||nd3dxsfyj[2]===1||nd3dxsfyj[3]===1||nd3dxsfyj[4]===1){
              if(nd3dxsfyj[5]===1&&nd3dxsfyj[6]===1&&nd3dxsfyj[7]===1&&nd3dxsfyj[8]===1){
                if(nd3dxsfyj[9]===1){
                  this.nd3sb[8]=this.dgnd3sb[0]
                  //this.dgnd3sb[0].drawToCanvas(ctx)
                }
                if(nd3dxsfyj[10]===1){
                  this.nd3sb[9]=this.dgnd3sb[1]
                  //this.dgnd3sb[1].drawToCanvas(ctx)
                }
                if(nd3dxsfyj[11]===1){
                  this.nd3sb[10]=this.dgnd3sb[2]
                  //this.dgnd3sb[2].drawToCanvas(ctx)
                }
              }
            }

    }
        //在游戏界面中显示题头图标
        if (gkjmxh>0&&gkjmxh<4){
          //this.tttb[0].drawToCanvas(ctx)
          //console.log(tttbt[0])
          //if (zrsmwz===0) {this.tttb[2].drawToCanvas(ctx)} else { this.tttb[1].drawToCanvas(ctx)}
          for (let i=0;i<bgimgsrc.length;i++){
            this.tttb[i].drawToCanvas(ctx)
          }
        }
    if (ysggxh===1){
      this.bg[4].drawToCanvas(ctx)
    }

    //this.gameinfo.renderGameScore(ctx, databus.score)
    //this.gameinfo.renderGameScore(ctx, nd2wz[0])
    //ctx.fillText(nd2wz[0],10,50,0.6*screenWidth);
    // 游戏结束停止帧循环
    if (databus.gameOver) {
      this.gameinfo.renderGameOver(ctx, databus.score)
      if (!this.hasEventBind) {
        this.hasEventBind = true
        this.touchHandler = this.touchEventHandler.bind(this)
        canvas.addEventListener('touchstart', this.touchHandler)
      }
    }
  }
  update() {
    //this.bg.update()
    for (let i=0;i<mbnd3sbimgsrc.length;i++)
    {
    tdnd3sbt[i]=nd3sbt[i]+zonpyl
tddgnd3sbt[i]=dgnd3sbt[i]+zonpyl
tdmbnd3sbt[i]=mbnd3sbt[i]+zonpyl
}
for (let xi=0;xi<nd3dximgsrc.length;xi++){
tdnd3dxt[xi]=nd3dxt[xi]+zonpyl
}
    //延时过关信号
    if (ggxh===1){
      ysggxhjs+=1
      //console.log(ysggxhjs)
    }
    if (ysggxhjs>5){
      ysggxh=1
      ysggxhjs=0
    }
    //描边延时
    if (sfljsb!==0){
      ysmbxhjs+=1
    }
    if (ysmbxhjs>5){
      sfljsb=0
      ysmbxhjs=0
    }

    for (let i=0;i<dl_img_src.length;i++){
      if (ssxsxh>0){
        ssxs+=0.01
        if (ssxs>1.2){ssxsxh=-1}
      }else{
        ssxs-=0.01
        if (ssxs<0.8){ssxsxh=1}
      }
      //
      //this.dlsbe[i].fuxixiaoguo(ctx,ssxs);
    }
  }

  
  // 实现游戏帧循环
  loop() {
    databus.frame++
if (databus.frame%30===0){
  this.update()
  this.render()
}


    this.aniId = window.requestAnimationFrame(
      this.bindLoop,
      canvas
    )
  }
}

function gksz(e){
  e.preventDefault()
  const x = e.touches[0].clientX
  const y = e.touches[0].clientY
  console.log('x:'+x+'y:'+y)
}

//返回指定字符数的最大可用尺寸和列数和字体大小
function zdkyzfcc(lszfs){
  let zfs=lszfs
  let lskyw=0.9*smwxwbkw
  let lskyh=0.9*smwxwbkh
  let lscc=1
  let mqzfs=Math.floor(lskyw/lscc)*Math.floor(lskyh/lscc)
  while (mqzfs>zfs) {
    lscc+=1
    mqzfs=Math.floor(lskyw/lscc)*Math.floor(lskyh/lscc)
}
lscc -=1
let lsfontsize=1
ctx.font = lsfontsize+"px MicrosoftYaHei"
let lszw =ctx.measureText('电').width
//console.log(lszw)
//console.log(lscc)
while (lszw<0.8*lscc) {
  lsfontsize+=1
  ctx.font = lsfontsize+"px MicrosoftYaHei"
  lszw =ctx.measureText('电').width
  //console.log(lszw)
}
lsfontsize-=1
return [lscc,Math.floor(lskyw/lscc),lsfontsize]
}

//高度确定时，返回指定字符数的文字的宽度，以及字体大小
function sbmccw(lsbtzfs){
  let zfs=lsbtzfs
  let lsh=0.8*smwzbtcch
  let lsfontsize=1
ctx.font = lsfontsize+"px MicrosoftYaHei"
let lszw =ctx.measureText('境').width
while (lszw<lsh) {
  lsfontsize+=1
  ctx.font = lsfontsize+"px MicrosoftYaHei"
  lszw =ctx.measureText('境').width
}
lsfontsize-=1
ctx.font = lsfontsize+"px MicrosoftYaHei"
  lszw =ctx.measureText('境').width
let wzw=zfs*lszw
return [wzw,lsfontsize]
}

