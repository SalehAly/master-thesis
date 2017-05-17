#!/usr/bin/env python
import RPi.GPIO as GPIO
from time import sleep


ObstaclePin = 11

def setup():
        GPIO.setmode(GPIO.BOARD)       # Numbers GPIOs by physical location
        GPIO.setup(ObstaclePin, GPIO.IN, pull_up_down=GPIO.PUD_UP)

def loop():
        while True:
                if (0 == GPIO.input(ObstaclePin)):
                        print "1"
                        sleep(0.5)


def destroy():
        GPIO.cleanup()                     # Release resource

if __name__ == '__main__':     # Program start from here
        setup()
        try:
                loop()
        except KeyboardInterrupt:  # When 'Ctrl+C' is pressed, the child program destroy() will be  executed.
                destroy()



