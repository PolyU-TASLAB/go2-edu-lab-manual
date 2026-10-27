# Unitree Go2 EDU 实验室使用手册

这是一个默认英文、可切换中文的静态网页项目，按常见操作分栏，记录本实验室 Unitree Go2 EDU 的开机、遥控器控制、RoboNet / OpenWrt 网络配置、SSH 连接、硬件接口和安装孔位，以及 Odin1、MID360 与 GNSS 天线安装方案。产品图来自对应厂商，保存在本地 `assets/` 目录，可离线显示；产品图不是实验室实拍。

仓库已按实验室要求公开。GitHub Pages 发布密码解密版正文，图片与图纸附件保持公开下载。

七个操作栏目均采用默认收起的折叠卡片，展示图片或栏目图形、名称和简要提示。固定导航会展开并定位到对应栏目；目录旁可统一展开或收起主栏目与外置设备卡片。直接访问原有锚点也会展开相应的父级卡片。外置设备保持独立折叠，图纸和下载入口在展开后显示。

页面采用暖白底色、深墨绿展开状态与香槟色细节，使用本机字体，支持手机布局、键盘操作和减少动画偏好，无外部字体或新增依赖。

开机流程结合实验室记录与宇树 Go2 用户手册；遥控器栏目依据官方现行手册整理了开关机、绑定、摇杆与常用按键，并注明 R1 / R3 差异。网络使用实验室自备的 Cudy 设备运行 OpenWrt。SSH 地址、用户名与密码根据实验室提供的本机配置填写，页面支持复制；遥控器绑定编码尚未记录。开机栏目附有宇树用户手册来源。

## 本地查看

最简单的方式：直接用浏览器打开 `index.html`。

也可以在项目目录启动本地静态服务器：

```bash
python3 -m http.server 8000
```

然后访问 <http://localhost:8000>。按 `Ctrl+C` 停止服务器。

复制按钮在浏览器安全上下文（例如 localhost）中可使用；如果直接打开本地文件时浏览器不允许剪贴板访问，可手动复制页面显示的信息。

## 项目文件

- `index.html`：各操作栏目与网络拓扑
- `styles.css`：响应式页面样式
- `app.js`：复制交互、栏目导航与统一展开 / 收起
- `assets/`：官方产品图及来源记录
- `assets/gnss-hbase-v03/`：用户提供的大型 GNSS 天线支架图纸、CAD 文件与图纸预览
- `downloads/Go2_GNSS_Hbase_CAD_v03.zip`：用户提供的原始完整设计包

硬件栏目收录宇树 Go2 EDU 手册中的背部接口定义、安装孔位原图与尺寸摘录，以及图示 Orin 拓展坞的接口参考。原图存于 `assets/`，可以离线查看和放大。资料未标注的螺纹直径、螺距、有效深度需按实际设备核对。

## 外置设备

导航中的“06 外置设备”（`#external-devices`）统一收录 Odin1、MID360 和 GNSS 天线。每个设备采用默认收起的卡片，显示图片、名称与安装状态，点击后展开详细说明、图纸和下载入口；GNSS 缩略图使用原始支架设计图。状态为 Odin1 已安装、MID360 缺安装保护架、大型 GNSS 天线支架尚未 3D 打印；小型天线可粘贴固定。原有设备锚点仍可使用，直接访问对应链接会展开该设备。

### Odin1 配置

实验室已将 Odin1 安装在 Go2 背部最前方的 4 个孔位，作为外置 LIVO 感知模组。`#odin1` 栏目依据留形科技官网与官方 Wiki，整理 RGB / LiDAR / IMU、机内里程计 / 建图 / 重定位、独立航空口供电及 USB 3.0 数据连接。实际支架、供电链路、数据主机、启动命令、固件和标定外参尚未登记，不以官方示例代替本机配置。

供电来源已区分：产品页为 9–26 V，官方接线指南要求直连电源为 9–24 V、推荐 12 V / 2 A。网页内附相关原始资料链接。

### MID360 与 GNSS 扩展

- `#mid360`：MID360 为可扩展设备，暂缺安装／保护架。规格和官方驱动链接来自 Livox；尚未记录本机 IP、接线与主机配置。
- `#gnss`：小型 GNSS 天线可粘贴固定；大型天线已准备 H 形一体增高底座 v0.3 的设计包，尚未 3D 打印。
- 网页中的支架图直接渲染自附件原始 PDF，两页均可查看。提供 PDF、STEP、STL、DXF 和完整 ZIP；文件保持原样，未执行设计包中的脚本。
- 支架参数是附件中的设计尺寸，不代表已打印、装配或完成实机验证。
- 图纸致谢：感谢 Li-Ta Hsu 老师课题组的翟伟伟提供本支架图纸。

## GitHub Pages 密码解密版

- 网站：<https://polyu-taslab.github.io/go2-edu-lab-manual/>。
- `index.html` 供本地查看；发布时由 StatiCrypt 3.5.4 加密，生成带中英文解锁页的 `dist/index.html`。
- 按实验室要求，图片、PDF、CAD、ZIP 不加密；公开仓库中的原始源码和历史也可直接查看。
- Pages 仅部署 `dist/`，不直接发布原始首页。访问密码由仓库 Actions secret `STATICRYPT_PASSWORD` 提供。
- 更新 `main` 后，GitHub Actions 自动构建并部署。

本地构建：安装 Node.js 后执行 `npm ci --ignore-scripts`，在环境中设置 `STATICRYPT_PASSWORD`，然后执行 `npm run build:pages`。原始网页仍可直接打开，无需 Node.js。

加密工具来源：[StatiCrypt](https://github.com/robinmoisson/staticrypt)，MIT 许可证随发布文件保存。

## 本体数据与常用指令

`#body-data` 栏目根据宇树官方 ROS 2 / Python SDK2 源码整理本体电脑连接、DDS 网卡设置、状态 topic、前置相机样本获取、ROS 2 图像桥接、rosbag 与常用高层指令。

- 本机入口沿用 `unitree@192.168.123.18`，未假设本机 ROS 版本、网卡名或安装路径。
- SDK2 原生 DDS topic 与 ROS 2 名称分别说明；前置相机使用官方 `VideoClient.GetImageSample()`，不假定出厂存在标准 Image topic。
- `downloads/go2-body-examples/` 与 `downloads/Go2_body_examples.zip` 包含自行编写的相机和指令参考脚本，以及中文说明。`/lab/go2/front_camera/image_raw` 为示例创建的 topic，图像时间戳使用主机接收时刻，不提供标定 TF 或 CameraInfo。
- 本次仅编写文档与示例，未连接机器狗、运行示例或发送运动指令。脚本的环境兼容性及接口响应需在实际设备上确认。

### 常用 SDK 索引

`#body-sdk` 提供默认收起的官方工具卡片：Python SDK2（本页脚本使用）、C++ SDK2（CMake 工程）和 `unitree_ros2`（ROS 2 消息与通信工作区），附选用建议、Ubuntu 安装 / 编译示例和官方入口。安装命令为供读者执行的文档内容，本次未在本机或机器人上安装这些 SDK。

- `#sdk-api-index`：状态订阅、VideoClient、SportClient、VuiClient 的用途、方法、模块路径与源码。
- `#sdk-sensors`：Odin1 官方 `odin_ros_driver`，以及 MID360 的 `livox_ros_driver2` / Livox-SDK2；与外置设备安装状态相互链接。
- 区分旧 Go1 UDP `unitree_legged_sdk` 与 Go2 SDK2；GNSS 驱动待接收机型号与协议确认后补充。
- 官方资料查阅日期：2026-10-27。版本与实际设备服务仍需对应确认，不将仓库支持能力写成本机已安装状态。

## 中英文与内容维护

- 首次访问默认英文，不根据浏览器语言自动切换。解锁页与手册右上角均有 English / 中文开关，浏览器会记住选择；存储不可用时仍可当页切换。
- 翻译覆盖正文、导航、状态、按钮、图片替代文本、命令注释和复制提示。切换直接更新文本，保留当前展开状态。技术标识符、账号、IP、链接及原始图纸不变。
- `content/manual.zh.html` 为中文内容源，`locales/en.json` 为英文翻译；修改后运行 `npm run build:manual` 重新生成 `index.html`。不要直接修改生成后的正文。
- `i18n.js` 负责语言切换。双语文本内嵌在首页中，本地打开无需请求翻译文件；加密发布时随正文一起加密。
- `npm run build:pages` 自动先生成双语正文，再构建加密版本。下载的原始厂家图纸、CAD 和中文附件保持原样。
