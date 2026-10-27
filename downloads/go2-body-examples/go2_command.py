#!/usr/bin/env python3
"""Explicit, high-level Go2 SDK2 commands; no action is selected by default.
Reference: unitreerobotics/unitree_sdk2_python, go2/sport/sport_client.py.
Not run on the laboratory robot. Movement limits below are sample limits,
not manufacturer specifications. Keep the official remote available.
"""
import argparse
import math
import time


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--interface', required=True, help='Robot-facing network interface name')
    parser.add_argument('--action', required=True, choices=['stop', 'standup', 'standdown', 'balance', 'move'])
    parser.add_argument('--vx', type=float, default=0.0, help='Longitudinal velocity in m/s')
    parser.add_argument('--vy', type=float, default=0.0, help='Lateral velocity in m/s')
    parser.add_argument('--yaw', type=float, default=0.0, help='Yaw rate in rad/s')
    parser.add_argument('--seconds', type=float, default=1.0)
    args = parser.parse_args()
    if not all(math.isfinite(v) for v in (args.vx, args.vy, args.yaw, args.seconds)):
        parser.error('Command values must be finite')
    if abs(args.vx) > 0.2 or abs(args.vy) > 0.2 or abs(args.yaw) > 0.4 or not 0 < args.seconds <= 3:
        parser.error('Sample limits: |vx|,|vy| <= 0.2 m/s, |yaw| <= 0.4 rad/s, duration (0, 3] s')

    from unitree_sdk2py.core.channel import ChannelFactoryInitialize
    from unitree_sdk2py.go2.sport.sport_client import SportClient

    ChannelFactoryInitialize(0, args.interface)
    client = SportClient()
    client.SetTimeout(3.0)
    client.Init()
    functions = {'stop': client.StopMove, 'standup': client.StandUp,
                 'standdown': client.StandDown, 'balance': client.BalanceStand}
    if args.action != 'move':
        print(f'{args.action}: return code={functions[args.action]()}')
        return

    print(f'Move: vx={args.vx}, vy={args.vy}, yaw={args.yaw}, duration={args.seconds}s')
    try:
        end = time.monotonic() + args.seconds
        while time.monotonic() < end:
            code = client.Move(args.vx, args.vy, args.yaw)
            if code != 0:
                raise RuntimeError(f'Move request failed: {code}')
            time.sleep(0.05)
    except KeyboardInterrupt:
        pass
    finally:
        print(f'StopMove: return code={client.StopMove()}')


if __name__ == '__main__':
    main()
