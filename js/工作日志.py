'''''###规划：
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
'''''###规划：
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
'''''###规划：
时空节点显示：显示模式/界面：
一，节点模式：
1，点击地图，拖动或点击时线，文本区节点文本相应显示（包括前后节点，突出当前节点）
2，点击文本区大标题框左首三角，展开/收缩所有节点；点击节点框左上三角，展开/收缩相应节点。……默认显示大标题
…………改：点击大标题左首三角，在四个状态间切换：所有节点只显示节点名0，只显示内容1，同时显示节点名与内容2，默认：自定义显示3，这时将展开收起的选择权下放，所有节点左上加小三角。
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
'''''###20240804
……  ……  ……  ……  已完成：

……  ……  ……  ……  正在做：
//根据时序节点群jsd.sxjdq生成文本正文(与小标题/节点名tt,如果没有节点名，则以“人名，人名+时间”为自动标题)  
//从文本生成字段数组。
数据与显示分离：update中根据字号，源文本，视界区信息，生成（不超过视界区的）字段数组，render直接使用字段组
字段组数据结构：[['单个字符',x,y],……]   
###'''  
'''''###规划：
点击大标题左首三角，在五种状态间切换：所有节点只显示节点名0，只显示内容1，同时显示节点名与内容2，只显示“当前时间节点”的内容3，默认：自定义显示4，这时将展开收起的选择权下放，所有节点左上加小三角。
###'''