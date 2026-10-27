Go2 本体电脑：相机与高层指令示例
资料核对：2026-10-27。脚本未在实验室机器狗上运行。

1. 在机器人内部 Ubuntu 电脑，或与内部 DDS 网络可达的开发电脑上运行。
   先连接 RoboNet，再 SSH 到 unitree@192.168.123.18。
   使用 ip -br -4 addr 查询机器人内部网络对应的网卡，不要直接照抄 eth0。
   SSH 可达不表示跨路由 DDS 组播也可达。

2. 安装/准备宇树官方 Python SDK2：
   https://github.com/unitreerobotics/unitree_sdk2_python
   官方要求 Python >= 3.8、CycloneDDS 0.10.2、numpy、opencv-python。
   如已安装，不要为了本示例重复更改环境；ROS 2 模式还需 rclpy 和 sensor_msgs。
   SDK 安装方式与系统环境的关系见官方 README。

3. 设置实际网卡名称，例如（此处 eth0 仅为示例）：
   export GO2_IFACE=eth0

4. 只读获取前置相机图片（无需桌面）：
   python3 go2_camera.py --interface "$GO2_IFACE" --output go2_front.jpg
   在另一台电脑下载：
   scp unitree@192.168.123.18:~/go2-body-examples/go2_front.jpg .
   以上路径假定脚本位于 ~/go2-body-examples，按实际目录替换。

5. ROS 2 图像桥接（先加载实际 ROS 2 环境）：
   python3 go2_camera.py --interface "$GO2_IFACE" --ros2
   输出 /lab/go2/front_camera/image_raw，类型 sensor_msgs/msg/Image，BGR8。
   此 topic 由本示例创建，绝非 Go2 出厂默认 topic。
   默认请求 5Hz，不承诺相机实际帧率；时间戳为主机接收时刻。
   不发布 CameraInfo 或机器人 TF；帧名 lab_go2_front_camera_optical 仅为本示例标识。

6. 显式发送一条高层指令（会影响机器狗）：
   python3 go2_command.py --interface "$GO2_IFACE" --action stop
   python3 go2_command.py --interface "$GO2_IFACE" --action standup
   python3 go2_command.py --interface "$GO2_IFACE" --action standdown
   python3 go2_command.py --interface "$GO2_IFACE" --action balance
   python3 go2_command.py --interface "$GO2_IFACE" --action move --vx 0.1 --seconds 1
   移动脚本以 20Hz 请求，在结束/异常/Ctrl+C 时尝试 StopMove；连接丢失时不保证停止请求送达。
   需启用官方高层运动服务，且现场允许动作、周围有空间，遥控器可随时接管。
   示例限制 |vx|,|vy|<=0.2m/s，|yaw|<=0.4rad/s，时长<=3s；这些不是厂家极限。
   StopMove 停止速度运动；关节阻尼属于 Damp，是不同接口。
   本示例不关闭 sport_mode、不发送关节级 lowcmd，也不执行翻滚等动作。

官方依据：
https://github.com/unitreerobotics/unitree_ros2
https://github.com/unitreerobotics/unitree_sdk2_python/blob/master/example/go2/front_camera/capture_image.py
https://github.com/unitreerobotics/unitree_sdk2_python/blob/master/unitree_sdk2py/go2/video/video_client.py
https://github.com/unitreerobotics/unitree_sdk2_python/blob/master/unitree_sdk2py/go2/sport/sport_client.py
