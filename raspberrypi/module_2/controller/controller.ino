/*
  The code reads values from a joystick module and prints them on the serial monitor. 
  The joystick module has two analog axes (X and Y). The decimal form of the X and Y 
  axis values is read and displayed on the serial monitor.

  Board: ESP32 Development Board
  Component: Joystick Module
*/

const int xPin = 27;  //the VRX attach to
const int yPin = 26;  //the VRY attach to
const int swPin = 25;  //the SW attach to
const int buttonPin = 33;

int buttonState;
int lastButtonState = LOW;  

unsigned long lastDebounceTime = 0; 
unsigned long debounceDelay = 50;  

const int switchPin = 19;

void setup() {
  pinMode(swPin, INPUT_PULLUP);
  pinMode(switchPin, INPUT_PULLUP);
  pinMode(buttonPin, INPUT_PULLUP);
  Serial.begin(9600);
}

void loop() {
  int reading = digitalRead(switchPin);
  if (reading != lastButtonState) {
    // reset the debouncing timer
    lastDebounceTime = millis();
  }

  if ((millis() - lastDebounceTime) > debounceDelay) {
    // whatever the reading is at, it's been there for longer than the debounce
    // delay, so take it as the actual current state:

    // if the button state has changed:
    if (reading != buttonState) {
      buttonState = reading;
    }
  }

  Serial.print(analogRead(xPin));  // print the value of VRX
  Serial.print("|");
  Serial.print(analogRead(yPin));  // print the value of VRX
  Serial.print("|");
  Serial.print(digitalRead(swPin));  // print the value of SW
  Serial.print("|");
  Serial.print(digitalRead(switchPin));
  Serial.print("|");
  Serial.print(digitalRead(buttonPin));
  Serial.print("|");
  Serial.println("");
  lastButtonState = reading;
}
