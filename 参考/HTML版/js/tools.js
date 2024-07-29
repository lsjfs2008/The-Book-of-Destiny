//分辨率转换
function fblzh(pst,ty){
    if (!ty){ty=jsnd.img.fm.imgposition[0]}     //图源尺寸，取前2
    let xsw=yxvar.jmw/ty[0]
    let xsh=yxvar.jmh/ty[1]
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
////根据数据画图
function jzimg(imginf,tycc){
    if (!tycc){tycc=jsnd.img.fm.imgposition[0]}     //图源尺寸，取前2
    for (let i=0;i<imginf.imgsrc.length;i++){
    let parent=document.getElementById(imginf.parentid);
    let newimg=document.createElement("img");
    newimg.src=imginf.imgsrc[i];
	let pst=imginf.imgposition[i]
    console.log(tycc[0])
    console.log(tycc[1])
    let lx=100*pst[2]/tycc[0];
    let ty=100*pst[3]/tycc[1];
    let wx=100*pst[0]/tycc[0];
    let hy=100*pst[1]/tycc[1];
    //console.log(lx,ty,wx,hy)
    newimg.style=`position: absolute; left: ${lx}%; top: ${ty}%; width: ${wx}%; height: ${hy}%;`;
    //console.log(newimg.style)
    parent.appendChild(newimg);
    }
}
//
////根据数据添加“按钮”
function jzanniu(btninf,tycc){
    if (!tycc){tycc=jsnd.img.fm.imgposition[0]}     //图源尺寸，取前2
    for (let i=0;i<btninf.imgsrc.length;i++){
        let parent=document.getElementById(btninf.parentid);
        let newimg=document.createElement("img");
        newimg.id=btninf.imgid[i];
        newimg.src=btninf.imgsrc[i];
        newimg.className="kean";
        if (!!btninf.parentcc){
            parentdivdx[0]=btninf.parentcc[0];
            parentdivdx[1]=btninf.parentcc[1];
        } else {
            parentdivdx[0]=tycc[0];
            parentdivdx[1]=tycc[1];
        }
        let pst=btninf.imgposition[i]
        let lx=100*pst[2]/parentdivdx[0];
        let ty=100*pst[3]/parentdivdx[1];
        let wx=100*pst[0]/parentdivdx[0];
        let hy=100*pst[1]/parentdivdx[1];
        newimg.style=`position: absolute; left: ${lx}%; top: ${ty}%; width: ${wx}%; height: ${hy}%;`;
        parent.appendChild(newimg);
        }
}
//
////自定义尺寸源图时根据数据返回ltwh
function zdyhhltwh(pst,tycc){
    if (!tycc){tycc=jsnd.img.fm.imgposition[0]}     //图源尺寸，取前2
    let lx=100*pst[2]/tycc[0];
    let ty=100*pst[3]/tycc[1];
    let wx=100*pst[0]/tycc[0];
    let hy=100*pst[1]/tycc[1];
    let lsstr=`position: absolute; left: ${lx}%; top: ${ty}%; width: ${wx}%; height: ${hy}%;`;
    return lsstr;
}
////根据方位与id加载居中textdiv;gs:默认（0）:绝对居中。jzkz：上下居中，靠左。
function jztextdiv(divsw,txtid,parid,parsw,gs){
    prt=document.getElementById(parid);
    let tdiv=document.createElement("div");
    lswx=100*divsw[0]/parsw[0];
    //lshy=100*divsw[1]/parsw[1];
    lslx=100*(divsw[2]-parsw[2])/parsw[0];
    lsty=100*(divsw[3]-parsw[3]+divsw[1]/2)/parsw[1];
    tdiv.style=`position: absolute; left: ${lslx}%; top: ${lsty}%;width: ${lswx}%; height: auto;transform: translateY(-50%);`;
    let txt=document.createElement("p");
    txt.id=txtid;
    txt.style="margin: 0; color:#000000; font-size:0.22rem; font-weight:bold;text-align:center;";
    if (gs==='jzkz'){txt.style="margin: 0; color:#000000; font-size:0.22rem; font-weight:bold;";}
    tdiv.appendChild(txt);
    prt.appendChild(tdiv);
}
////创建加载div.
function jzdiv(divinf,tycc){
    if (!tycc){tycc=jsnd.img.fm.imgposition[0]}     //图源尺寸，取前2
    for (let i=0;i<divinf.divid.length;i++){
    let prt=document.getElementById(divinf.parentid);
    let lsdiv=document.createElement("div");
    lsdiv.id=divinf.divid[i];
    if (!!divinf.parentcc){
        parentdivdx[0]=divinf.parentcc[0];
        parentdivdx[1]=divinf.parentcc[1];
    } else {
        parentdivdx[0]=tycc[0];
        parentdivdx[1]=tycc[1];
    }
    let pst=divinf.divposition[i]
    let lx=100*pst[2]/parentdivdx[0];
    let ty=100*pst[3]/parentdivdx[1];
    let wx=100*pst[0]/parentdivdx[0];
    let hy=100*pst[1]/parentdivdx[1];
    lsdiv.style=`position: absolute; left: ${lx}%; top: ${ty}%; width: ${wx}%; height: ${hy}%;`;
    prt.appendChild(lsdiv);
    }
}
////返回当前时间[年月日时分秒]
function hqdqnyrsfm(){
    let myDate = new Date();
    let dqsj=[myDate.getFullYear(),myDate.getMonth()+1,myDate.getDate(),myDate.getHours(),myDate.getMinutes(),myDate.getSeconds()];
    return dqsj;
    //console.log(myDate.toLocaleDateString());
}
////返回数列总和
function hhslzh(s){
    let zs=0;
    for (let i=0;i<s.length;i++){
        zs+=s[i];
    }
    return zs;
}
////返回解绑数组
function hhjbsz(s){
    let xsz=[];
    for (let i=0;i<s.length;i++){
        xsz[i]=s[i];
    }
    return xsz;
}
////返回“数字化”的解绑数组
function tlszszh(dx){
    let sz=[];
    for (let i=0;i<dx.length;i++){
        sz[i]=Number(dx[i]);
    }
    return sz;
}
////给数组最后加一个元素并返回之
function tlszaddh(sz,ys){
    let re=new Array(sz.length+1);
    for (i=0;i<re.length;i++){
        if (i===sz.length){re[i]=ys;}else{
            re[i]=sz[i];
        }
    }
    return re;
}
////界面管理，同区子div单独显示
function tljmglzdivdx(sz,divh){
    for (let i=0;i<sz.length;i++){
        //document.getElementById(sz[i]).style.visibility="hidden";
        document.getElementById(sz[i]).style.zIndex=1;
    }
    if (divh>=0){
        //document.getElementById(sz[divh]).style.visibility="visible";
        document.getElementById(sz[divh]).style.zIndex=2;
    }
}
//fl(左滑)div包裹
function tldivzhbg(p){
    let d=`<div style="float: left;width: 100%;">${p}</div>`
    return d;
}