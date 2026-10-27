# 图片来源

以下文件于 2026-10-26 从宇树官方站点的产品资源取得，保留原图，仅用于本手册的产品辨识。图片权利归原权利人；它们不是实验室设备实拍。

- `unitree-go2-product.png`：来自 [宇树官方商店 Go2 页面](https://shop.unitree.com/products/unitree-go2)。原图：<https://cdn.shopify.com/s/files/1/0620/4932/1193/files/df9f333424ff6cc6164ce421b019fb94_a6f832b0-479e-4294-ac75-6516208b91f4.png?v=1718274082>
- `unitree-go2-controller.png`：来自 [宇树官方 Go2 遥控器页面](https://www.unitree.com/go2/control/)。原图：<https://oss-global-cdn.unitree.com/static/21c100fde6ef4a1883508cf31645de29_659x416.png>

## 遥控器操作资料

- [宇树官方现行手持遥控器手册](https://marketing.unitree.com/article/en/Go2/Handheld_Remote_Control.html)，含 R3 与 R1，查阅日期：2026-10-26。
- [宇树手持遥控器手册 V1.0 镜像](https://static.generation-robots.com/media/Go2-Handheld-Remote-Control.pdf)，用于核对旧版 R1 提示音及连接指示灯。

## 硬件资料（2026-10-27 查阅）

- `go2-edu-mounting-dimensions.png`：从宇树《Go2 EDU 用户手册》中文第 5 页（PDF 第 29 页）提取的原始尺寸图，保留原始标注。来源：[厂家手册镜像](https://static1.squarespace.com/static/5e76e0c52a318c0c1a850442/t/6670b6185e6f531946071db4/1718662712134/GO2%2BEdu%2BUser%2BManual.pdf)。图纸未标注螺纹直径、螺距或有效深度。
- `go2-edu-body-interfaces.png`：Go2 EDU 机身背部接口原图，与厂家手册中文第 7 页一致。原图：[接口位置图](https://docs.westonrobot.com/assets/images/Go2_electrical_interfaces-a3972966cf330926191e5d90d3488cb2.png)。
- `go2-edu-dock-interfaces.png`：Weston Robot 收录的 Go2 EDU Orin 拓展坞接口图。原图：[拓展坞接口图](https://docs.westonrobot.com/assets/images/Go2_expansion_dock_specs-8ffafcf6367df40b3e0dc5f263d4e9e2.png)。

机身供电随电池电压变化的说明来自 [Weston Robot 的 Go2 接口资料](https://docs.westonrobot.com/robot/quadruped/go2/#electrical-interfaces)。拓展坞参考仅适用于资料图对应的硬件，不代表实验室设备全部端口和接线已实测。

## Odin1（2026-10-27 查阅）

- `manifold-odin1-product.webp`：留形科技 [Odin1 官方产品页](https://www.manifoldtech.cn/products/odin1/)的原始产品图。原图：<https://www.manifoldtech.cn/_assets/images/product/odin1/cta-product.1308.cbf8bdda60.webp>。保留原始图片，非实验室安装实拍，图片权利归原权利人。
- 传感器与数据能力：[官方产品页](https://www.manifoldtech.cn/products/odin1/)；工作模式：[官方建图与重定位流程](https://manifoldtechltd.github.io/wiki/en/odin_series/odin1/6.%20map%20and%20relocalizaiton%20api.html)。
- [硬件接口](https://manifoldtechltd.github.io/wiki/odin_series/odin1/2.%20HW%20Description_.html)、[电源与连接](https://manifoldtechltd.github.io/wiki/odin_series/odin1/4.%20Power%20connection.html)、[安装与数模](https://manifoldtechltd.github.io/wiki/odin_series/odin1/3.%20Installation%20Guide_.html)、[数据输出与标定](https://manifoldtechltd.github.io/wiki/odin_series/odin1/5.%20Data%20output_.html)、[Ubuntu 快速启动](https://manifoldtechltd.github.io/wiki/odin_series/odin1/7.%20Odin1%20Quick%20start%20for%20ubuntu.html)。
- 文档中的供电区间存在差异，网页分别说明产品页的 9–26 V 和接线指南的 9–24 V / 推荐 12 V，不将 26 V 上限作为推荐输入。

背部最前方四孔已用于 Odin1 固定的安装事实来自实验室用户记录；未据此推定支架孔距、螺钉或机身外参。

## MID360（2026-10-27 查阅）

- `livox-mid360-official.jpg`：来自 [Livox MID-360 官方产品页](https://www.livoxtech.com/cn/mid-360)。原图：<https://www.livoxtech.com/dps/6ba15cf20f78a933da165a39ce9f7cf1.jpg>。保留原图，非本机安装照片；图片权利归原权利人。
- 规格依据：[官方技术参数](https://www.livoxtech.com/cn/mid-360/specs)；驱动入口：[Livox 官方 livox_ros_driver2](https://github.com/Livox-SDK/livox_ros_driver2)。
- “暂缺安装／保护架”由实验室用户提供。

## 大型 GNSS 天线支架 · 用户附件

感谢 Li-Ta Hsu 老师课题组的翟伟伟提供本支架图纸。

- 原始设计包：`../downloads/Go2_GNSS_Hbase_CAD_v03.zip`，对应用户提供的 `Go2_GNSS_Hbase_CAD_v03 (1).zip`，完整保留。
- `gnss-hbase-v03/` 中 PDF、STEP、STL、DXF 和 README_CN.txt 均直接提取自原始设计包，未修改内容；未执行包内建模脚本。
- `drawing-v03-1.png` 与 `drawing-v03-2.png` 为原始 PDF 的两页渲染，用于网页预览，未重新绘制支架。
- 状态依据用户记录：设计已准备，尚未 3D 打印。附件标注的一体加工意图及尺寸不表示打印材料、工艺或实机安装已经验证。
- 小型天线粘贴固定的方案来自用户记录；未添加未知天线型号、接头或定位精度。

## 关机、放置与充电资料（2026-10-27 查阅）

- [宇树 Go2 手持遥控器手册 V1.0](https://static.generation-robots.com/media/Go2-Handheld-Remote-Control.pdf)，厂家文档镜像：印刷第 6 页确认 L2 + A 站立锁定、再次按键趴下；第 7 页标注避障默认开启、X 开启、Y 长按 3 秒关闭。
- [宇树 Go2 电池与充电器手册 V1.0](https://static.generation-robots.com/media/Go2-Battery-and-Charger.pdf)，厂家文档镜像：印刷第 5–6 页为关机、取出充电与冷却；第 9–10 页为充电环境、存放和维护。
- Go2 EDU 用户手册 PDF 第 35 页（中文印刷第 11 页）确认先卧倒后关机、关机后整理四肢；第 44 页（中文印刷第 20 页）包含干燥阴凉存放、长期取电池和低于 30% 充到 70% 的维护要求。
- 本机默认避障较保守、L2 + A 的收工顺序由实验室补充；保护背部 Odin1、天线和线束的放置提示结合当前装配情况整理。
