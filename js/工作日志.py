'''''###规划1：
一，地图的缩放与拖动功能。
1，缩放：滚轮缩放，二指缩放，（以当前选择时空节点为中心，或以地图中心为中心）“+0-m”按钮缩放。(0:原图尺寸，中心视图，m:（使当前视界能够看见）"全图"（的）尺寸)
2,拖动。（默认）双击/点击时空节点，自动对焦（其为中心）。
二，时空节点：
地图节点（地图区域），时线节点（时线区域），节点文本（文本块/文本树<类，时类空类事类人类……关注标签……>）三方联动。###'''
'''''###20240729
……  ……  ……  ……  已完成：
鼠标点击拖动
滚轮缩放
双击自动对焦…………可考虑补充：有节制地缩放以更好地对焦…………
……  ……  ……  ……  ……  ……###'''  
'''''###20240730
……  ……  ……  ……  已完成：
“+0-m”按钮缩放：1，添加按钮，2，添加功能。……………………漂移bug，待排查……排查完毕，触发双击了……
……  ……  ……  ……  ……  ……###'''    
'''''###20240731
……  ……  ……  ……  已完成：

……  ……  ……  ……  正在做……未完成
时空节点：按时间顺序加载所有文本与时点与空点。显示当前时间的文本与时空点……需类化
……  ……  ……  ……  ……  ……###'''    
'''''###20240801
……  ……  ……  ……  已完成：
地图对象化……类化……初步完成。待时空节点等类化之后，再对render进行优化。
……  ……  ……  ……  正在做：
时空节点：按时间顺序加载所有文本与时点与空点。显示当前时间的文本与时空点……需类化……暂不类化
……  ……  ……  ……  ……  ……###'''    
'''''###20240802
……  ……  ……  ……  已完成：
根据文本中的关注列表（型人物节点群数据）将匹配的时空节点{}导入当前所用节点群中。
……  ……  ……  ……  正在做：
数据整合：jmsj整合成两个部分：定数，变数。###''' 
'''''###规划2：
时空节点：按时间顺序加载所有文本与时点与空点。显示当前时间的文本与时空点……需类化……暂不类化
1，数据结构：节点，节点群
2，地图显示
3，时线显示
4，文本区显示
……数据结构：节点，节点群
设群逻辑/群之脉络：
1，以人设：人物传记
2，以事设：大事记……附图（区域地图，例：战事图）
3，以时设：编年史
4，以空设：地方志
N，以类/标签设：行业史，门类史，比较史，
5，以器物设：文物史……附图：文物图片
6，以思想设：教史，文脉，学术，科技……
……  ……  ……  ……  ……  ……###'''    
'''''###20240803
……  ……  ……  ……  已完成：
数据整合：jmsj整合成两个部分：定数，变数。
//5.3,从节点群jsd.jds生成时间线节点群jsd.sxjdq[]（时序节点群：以时间为顺序而排列的节点群），以便render按当前时间显示时空节点。
……  ……  ……  ……  正在做：
//文本框元素：背景，左上缩放小三角
//根据时序节点群jsd.sxjdq生成文本正文（与小标题/节点名tt,如果没有节点名，则以“人名，人名+时间”为自动标题） ###'''           
'''''###规划3：
时空节点显示：显示模式/界面：
一，节点模式：
1，点击地图，拖动或点击时线，文本区节点文本相应显示（包括前后节点，突出当前节点）
2，点击文本区大标题框左首三角，展开/收缩所有节点；点击节点框左上三角，展开/收缩相应节点。……默认显示大标题
……………………2.1,改：点击大标题左首三角，在四个状态间切换：所有节点只显示节点名0，只显示内容1，同时显示节点名与内容2，默认：自定义显示3，这时将展开收起的选择权下放，所有节点左上加小三角。
…………点击大标题右侧，显示与隐藏大标题。
…………以上两个按钮，即使隐藏，也生效。
…………在大标题显示时，点击大标题其它区域，打开“关注列表”与/或“本地文件/节点群库/文本库”
3，渲染：以类分色，染其背景框，文字轮廓，文字内部等。可延后。……默认显示小标题……
4，被选取的节点在地图与时线区，也可渲染突显。可延后。
4.2,未被选取的节点在地图区可加透明。
二，纯文本模式
1，默认隐藏大小标题。隐藏地图区与时线区。
2，手机操作适配：上拉显现时线区，右拉显现地图区。左拉显现纯由大小标题构成的目录区，继续左拉，显现文本库（节点群库）
三，时间线：
当前只是单线。
后续可做多线：if线,超时空对比线——以人物寿年或登场年或朝代纪年等时间为尺度。
###'''  
'''''###20240804
……  ……  ……  ……  已完成：
大标题文字
//文本框元素：背景，左上缩放小三角
……  ……  ……  ……  正在做：
//根据时序节点群jsd.sxjdq生成文本正文(与小标题/节点名tt,如果没有节点名，则以“人名，人名+时间”为自动标题)           
###'''  
'''''###20240805
……  ……  ……  ……  已完成：
//根据时序节点群jsd.sxjdq生成文本正文(与小标题/节点名tt,如果没有节点名，则以“人名，人名+时间”为自动标题)  
//从文本生成字段数组。
数据与显示分离：update中根据字号，源文本，视界区信息，生成（不超过视界区的）字段数组，render直接使用字段组
字段组数据结构：[['单个字符',x,y],……] 
……  ……  ……  ……  正在做：
//潜在显示文本的数据结构：  
//当前显示文本的数据结构：
###'''  
'''''###规划4：
………………改3.一.2.1：点击大标题左首三角，在五种状态间切换：所有节点只显示节点名0，只显示内容1，同时显示节点名与内容2，只显示“当前时间节点”的内容3，默认：自定义显示4，这时将展开收起的选择权下放，所有节点左上加小三角。
一：从文本生成字段数组。
1,数据与显示分离：update中根据字号，源文本，视界区信息，生成（不超过视界区的）字段数组，render直接使用字段组
2,字段数据结构：{zd:[["字",x,y],……],zk:显示模式：0只显示节点名，1只显示内容，2两者都显示。默认0……需思量……}
2.1,字段组：[{},{}……]
3,显示模式：只有在ttvs[0]=4的情况下，才需要考虑zk的值。其它情况都是自动显示。
4,节点内容的显示模式：字改为行：将一段文字分割为不超过视界的若干“行”
……用分行模式时，render时还要加入字间距的计算。数据显示分离不如分字模式彻底。
……所以还是用分字模式：["单个字",x,y]
###'''
'''''###20240806
……  ……  ……  ……  已完成：
为文本区专开一个wbcanvas
1，update模块化
2,render更进一步的数据运算与绘制分离：
2.1,xh改为相对起始点x0y0的xy
3,节点内容文本计算与绘制
……  ……  ……  ……  正在做：
2.2,按钮图标数绘分离。
4,三视界模式与纯文本模式下的拖动，点击功能。
###''' 
'''''###20240807
……  ……  ……  ……  已完成：
给wbrender做一个数绘分离
……时序节点群类化，内部数绘分离，并且每个显示模式（包括其h与hmax）数据独立存储。
……为方便本地化，类化改为构造函数…………原来本地化只要不用import,export就行。
……  ……  ……  ……  正在做：
……时序数据保存本地，两种备选方案：保存全部，保存简化（到某个程序）。
###''' 
'''''###20240808
……  ……  ……  ……  已完成：
点击文本区节点，改变其显示状态，并存进其详情中。并将改动存进自定义状态中。
……  ……  ……  ……  正在做：
点击文本、地图，时线，跳转节点。
图文线同步。
……时序数据保存本地，两种备选方案：保存全部，保存简化（到某个程序）。
###''' 
'''''###规划5：ttvs[0]改为0，1，2三种状态，
每种状态又有默认与自定义模式两种，其数据寄存于sxjdq.zdy[0,0,0]中，0默认，1自定义。
双击切换zdy的对应于ttvs[0]的状态的数据。
默认模式下，0只显示节点名与当前节点内容。1只显示内容。2显示名与内容。点击选择节点。
自定义模式下，0，点击会展开所选内容，并展开之前选过的。1，点击显示所选节点名，并显示之前所选。2，点击所选在012间切换。
文本绘制的数据预处理模块化。。性能优化延后…………
###'''
'''''###规划6，时间线
点连成线：时间节点（以特定规则）相连，便是（相应规则的）线。
一，类型：
1，人物线：生命线，事业线，
2，事物线：情缘线（爱，姻，亲，友，仇，敌，君臣）/人际交集，因果线/链，传承线。
3，王朝线……
二，显示模式
1，单线模式：目标（人物）时间线固定，时间游标……
1,2,编年史模式：时间游标居中，时间线移动。
2，多线叙事/对比模式：
人物（（时间）线）对比。1，绝对时间线，百分比时间线。2，诞生/出生时间，登场时间。死亡时间。
王朝（（时间）线）对比。1，绝对时间线，百分比时间线。2，诞生时间，争霸时间，定鼎时间。灭亡时间。
2.1,时间对齐：
A,对齐绝对时间。
B,对齐相对时间：
B1:一端对齐：出生/死亡时间，登/退场时间。
B2:两端对齐。
三，视界模式：均衡视界，时线视界
1，均衡
2，时线视界：显示时线，节点（显示模式：1，简册表象，2，星河表象）
四，实施：
集成在节点群对象中……每一个（独立的）节点群，亦可视之为一条时间线。
五，拓展：
多线叙事模式：
1，对比模式……如二，2……抽丝剥茧，条分缕析。
2，交织模式：线织成“布”。多线交织。。交织：人际交集，因缘者也。
###'''
'''''###20240809
……  ……  ……  ……  已完成：
1，节点群对象中实现时线数据。sxjdq.sx
1.1,源文本中设定，或据群生成。
1.2,数据内容：
sx.lx:时线类型：单线，人物线。
sx.qz:起止时间
sx.dq:当前时间(节点)
sx.sb:时间（百分）比，（当前推进时间与起止时间之比）
sx.jb:节点（百分）比，（当前节点与总节点之比）
//（根据其时间段）绘制所有时间节点//根据不同事类采用不同颜色——配色方案。事类未定，方案暂缺。//配色方案中应包含时间点（约）等于，介于，处于的/等情况。
……  ……  ……  ……  正在做：
//默认只显示主要事类颜色，当前节点区显示细节颜色。细节颜色比例：照各小节字符占比算。另，典故额外加方框：其配色：dg.fk。
//时间重合时的区间分配方案：相续方案。重叠方案。
1.3,时线显示优化：A，生死时间，登退场时间显示。B,时间节点与时间点：时间点（约）等于，介于，处于……C,滚轮上下半区，分别控制时间节点与时间点。
2，画布类，对象化。
2.1,监听集成入对应画布中
2.2,设地图画布
###''' 
'''''###20240810
……  ……  ……  ……  已完成：
//时间重合时的区间分配方案：相续方案………………重叠方案暂略
……  ……  ……  ……  正在做：
//当前节点区显示细节颜色。细节颜色比例：照各小节字符占比算……暂略。
1.3,时线显示优化：A，生死时间，登退场时间显示。B,时间节点与时间点：时间点（约）等于，介于，处于……C,滚轮上下半区，分别控制时间节点与时间点。
2，画布类，对象化。
2.1,设地图画布
2.2,监听集成入对应画布中……为此需将画面分为地图，文本，时线三个子类，以对应三种不同监听模式。
###''' 
'''''###规划7，画布类
1，监听集成入对应画布中……为此需将画面分为地图，文本，时线三个子类，以对应三种不同监听模式。
2，图文时三个画布集成/添加在对应的时序节点群对象中
3，多线对比模式下，时间对齐依不同方式，需要另外考虑……
            //点击功能设计：1，根据点击update()数据；
            //2，根据update()的数据判断是否需要render()刷新/重新加载界面；
            //3，点击特定按钮，进入自动演进时间线的伪动画模式loop()
            //this.render()
###'''


####