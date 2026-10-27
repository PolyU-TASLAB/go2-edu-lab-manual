#!/usr/bin/env python3
"""Read the Go2 front camera with SDK2; optionally publish a lab ROS 2 Image topic.
API reference: unitreerobotics/unitree_sdk2_python, go2/video/video_client.py.
This example has not been run on this laboratory's robot.
"""
import argparse
import time
from pathlib import Path


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--interface', required=True, help='Robot-facing network interface, not an IP address')
    parser.add_argument('--output', default='go2_front.jpg', help='Image file for snapshot mode')
    parser.add_argument('--ros2', action='store_true', help='Publish decoded frames to ROS 2 instead of saving a snapshot')
    parser.add_argument('--topic', default='/lab/go2/front_camera/image_raw')
    parser.add_argument('--rate', type=float, default=5.0, help='Requested sampling frequency; actual rate depends on the device')
    args = parser.parse_args()
    if not 0 < args.rate <= 15:
        parser.error('--rate must be in (0, 15] for this example')

    from unitree_sdk2py.core.channel import ChannelFactoryInitialize
    from unitree_sdk2py.go2.video.video_client import VideoClient

    ChannelFactoryInitialize(0, args.interface)
    client = VideoClient()
    client.SetTimeout(3.0)
    client.Init()
    if not args.ros2:
        code, data = client.GetImageSample()
        if code != 0 or not data:
            raise SystemExit(f'Camera request failed: code={code}; check network interface and videohub service')
        Path(args.output).write_bytes(bytes(data))
        print(f'Saved camera sample: {args.output}')
        return

    import cv2
    import numpy as np
    import rclpy
    from rclpy.qos import qos_profile_sensor_data
    from sensor_msgs.msg import Image

    rclpy.init()
    node = rclpy.create_node('lab_go2_front_camera')
    publisher = node.create_publisher(Image, args.topic, qos_profile_sensor_data)
    print(f'Publishing {args.topic}; timestamps use host receive time; no CameraInfo or robot TF is provided')
    try:
        while rclpy.ok():
            started = time.monotonic()
            code, data = client.GetImageSample()
            if code != 0 or not data:
                node.get_logger().warning(f'GetImageSample failed: code={code}')
            else:
                frame = cv2.imdecode(np.frombuffer(bytes(data), dtype=np.uint8), cv2.IMREAD_COLOR)
                if frame is not None:
                    frame = np.ascontiguousarray(frame)
                    message = Image()
                    message.header.stamp = node.get_clock().now().to_msg()
                    message.header.frame_id = 'lab_go2_front_camera_optical'
                    message.height, message.width = frame.shape[:2]
                    message.encoding = 'bgr8'
                    message.is_bigendian = 0
                    message.step = frame.shape[1] * 3
                    message.data = frame.tobytes()
                    publisher.publish(message)
            rclpy.spin_once(node, timeout_sec=0)
            time.sleep(max(0.0, 1.0 / args.rate - (time.monotonic() - started)))
    except KeyboardInterrupt:
        pass
    finally:
        node.destroy_node()
        if rclpy.ok():
            rclpy.shutdown()


if __name__ == '__main__':
    main()
