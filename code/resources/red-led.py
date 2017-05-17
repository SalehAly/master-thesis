#!/usr/bin/env python
import RPi.GPIO as GPIO
import time

colors = [0xFF0000, 0x00FF00, 0x0000FF, 0xFFFF00, 0xFF00FF, 0x00FFFF]
R = 12

def setup(Rpin):
	global pins
	global p_R
	pins = {'pin_R': Rpin}
	GPIO.setmode(GPIO.BOARD)       # Numbers GPIOs by physical location
	for i in pins:
		GPIO.setup(pins[i], GPIO.OUT)   # Set pins' mode is output
		GPIO.output(pins[i], GPIO.HIGH) # Set pins to high(+3.3V) to off led
	
	p_R = GPIO.PWM(pins['pin_R'], 2000)  # set Frequece to 2KHz
	

	p_R.start(100)      # Initial duty Cycle = 0(leds off)


def map(x, in_min, in_max, out_min, out_max):
	return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min

def off():
	for i in pins:
		GPIO.output(pins[i], GPIO.HIGH)    # Turn off all leds

def setColor(col):   # For example : col = 0x112233
	R_val = (col & 0xff0000) >> 16
	R_val = map(R_val, 0, 255, 0, 100)	
	p_R.ChangeDutyCycle(100-R_val)     # Change duty cycle


def loop():
	while True:
		for col in colors:
			setColor(col)
		


def on():
	start = time.time()
    	time.clock()    
    	elapsed = 0
	seconds = 2
    	while elapsed < seconds:
       		elapsed = time.time() - start
		for i in pins:
                	GPIO.output(pins[i], GPIO.LOW)
		
def destroy():
	p_R.stop()
	off()
	GPIO.cleanup()

if __name__ == "__main__":
	try:
		setup(R)
		# loop()
		on()
	        destroy()
	except KeyboardInterrupt:
		destroy()
