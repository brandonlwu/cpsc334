import os, sys
import serial
import time
import random
# import pyautogui
from pynput.mouse import Button, Controller
from pynput.keyboard import Key, Controller as KeyboardController
import webbrowser


mouse = Controller()
keyboard = KeyboardController()
ser = serial.Serial('/dev/cu.usbserial-110',9600, timeout = 5)

lastclick = 0
click = 0

lastcheeseclick = 0
cheeseclick = 0

prevswitch = 1

cheese_names = [
    "Cheddar",
    "Mozzarella",
    "Gouda",
    "Parmesan",
    "Brie",
    "Camembert",
    "Feta",
    "Swiss",
    "Blue Cheese",
    "Goat Cheese",
    "Provolone",
    "Monterey Jack",
    "Havarti",
    "Roquefort",
    "Ricotta",
    "Pecorino",
    "Colby",
    "Asiago",
    "Manchego",
    "Queso Fresco",
    "Gorgonzola",
    "Paneer",
    "Cottage Cheese",
    "Limburger"
]

url = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'

testurl = 'https://drive.google.com/drive/u/1/home'

chrome_path = 'open -a /Applications/Google\ Chrome.app %s'


cheese_size = len(cheese_names)

while True:
    line = ser.readline()
    line_decoded = line.decode()
    splitline = line_decoded.split('|')
    print(splitline)

    try: 
        x = float(splitline[0])
        y = float(splitline[1])
        z = float(splitline[2])
        b = float(splitline[3])
        s = float(splitline[4])
        
        xdiff = 0
        ydiff = 0

        if x > 2000:
            ydiff = 1
        elif x < 1600:
            ydiff = -1
        else:
            ydiff = 0

        if y > 2000:
            xdiff = -1
        elif y < 1600:
            xdiff = 1
            
        else:
            xdiff = 0
        
        mouse.move(xdiff, ydiff)

        ## Joystick click
        if z == 0:
            click = time.time()
            if click - lastclick > 0.1:
                mouse.click(Button.left)
                lastclick = click

        # Button click
        if b == 0:
            cheeseclick = time.time()
            if cheeseclick - lastcheeseclick > 0.3:
                if s == 1:
                    keyboard.type("Cheese")
                    lastcheeseclick = cheeseclick
                else:
                    keyboard.type(random.choice(cheese_names))
                    lastcheeseclick = cheeseclick
                    # webbrowser.get(chrome_path).open(url)
                    # lastcheeseclick = cheeseclick



        ## Button 2 click

        
        ## Switch
        if s == 0:
            if prevswitch == 1:
                webbrowser.get(chrome_path).open(url)
                prevswitch = 0
        elif s == 1:
            if prevswitch == 0:
                # webbrowser.get(chrome_path).open(testurl)
                prevswitch = 1
    


        
            
    except:
        print("error")
    
    if len(line) == 0:
        print("Time out! Exit.\n")
        sys.exit()
