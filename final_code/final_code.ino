#include <Arduino.h>
#include <Stepper.h>
#include <ESP32Servo.h>
#include "HX711.h"

const int stepsPerRevolution = 2048;  // change this to fit the number of steps per revolution

// ULN2003 Motor Driver Pins
#define IN1 19
#define IN2 18
#define IN3 5
#define IN4 17

#define SERVOPIN 13
#define SERVOPIN2 12

#define LOADCELL_DOUT_PIN 16
#define LOADCELL_SCK_PIN 4

#define PIN_RED    25 
#define PIN_GREEN  27 
#define PIN_BLUE   26 

#define PIN_RED2    2
#define PIN_GREEN2  15 
#define PIN_BLUE2   0


// initialize stepper and servo motors
Stepper myStepper(stepsPerRevolution, IN1, IN3, IN2, IN4);
Servo servoMotor;
Servo servoMotor2;
HX711 scale;

float prevweight;

void setup() {
  pinMode(PIN_RED,   OUTPUT);
  pinMode(PIN_GREEN, OUTPUT);
  pinMode(PIN_BLUE,  OUTPUT);
  pinMode(PIN_RED2,   OUTPUT);
  pinMode(PIN_GREEN2, OUTPUT);
  pinMode(PIN_BLUE2,  OUTPUT);
  myStepper.setSpeed(15);
  servoMotor.attach(SERVOPIN);
  servoMotor2.attach(SERVOPIN2);
  Serial.begin(115200);
  Serial.println("HX711 Demo");

  Serial.println("Initializing the scale");

  scale.begin(LOADCELL_DOUT_PIN, LOADCELL_SCK_PIN);

  Serial.println("Before setting up the scale:");
  Serial.print("read: \t\t");
  Serial.println(scale.read());      // print a raw reading from the ADC

  Serial.print("read average: \t\t");
  Serial.println(scale.read_average(20));   // print the average of 20 readings from the ADC

  Serial.print("get value: \t\t");
  Serial.println(scale.get_value(5));   // print the average of 5 readings from the ADC minus the tare weight (not set yet)

  Serial.print("get units: \t\t");
  Serial.println(scale.get_units(5), 1);  // print the average of 5 readings from the ADC minus tare weight (not set) divided
            // by the SCALE parameter (not set yet)
            
  // scale.set_scale(INSERT YOU FACTOR);
  //scale.set_scale(-471.497);                      // this value is obtained by calibrating the scale with known weights; see the README for details
  scale.tare();               // reset the scale to 0

  setColor(0,250,0);
  setColor2(0,0,250);
  delay(100);
  setColor(0,0,0);
  setColor2(0,0,0);
  delay(100);
  setColor(0,250,0);
  setColor2(0,0,250);
  delay(100);
  setColor(0,0,0);
  setColor2(0,0,0);
  delay(100);
  setColor(0,250,0);
  setColor2(0,0,250);

  Serial.println("After setting up the scale:");

  Serial.print("read: \t\t");
  Serial.println(scale.read());                 // print a raw reading from the ADC

  Serial.print("read average: \t\t");
  Serial.println(scale.read_average(20));       // print the average of 20 readings from the ADC

  Serial.print("get value: \t\t");
  Serial.println(scale.get_value(5));   // print the average of 5 readings from the ADC minus the tare weight, set with tare()

  Serial.print("get units: \t\t");
  Serial.println(scale.get_units(5), 1);        // print the average of 5 readings from the ADC minus tare weight, divided
            // by the SCALE parameter set with set_scale

  Serial.println("Readings:");
  
}

void loop() {
  Serial.print("one reading:\t");
  Serial.print(scale.get_units(), 1);
  Serial.print("\t| average:\t");
  float aveweight = scale.get_units(10);
  Serial.println(aveweight, 5);
  Serial.println(scale.get_units(10), 5);
  scale.power_down();

  // if (aveweight > 150) {
  //   dance_1();
  // }

  if (aveweight > prevweight+ 350) {
    dance_1();
  }

  prevweight = aveweight;

  delay(1000);
  scale.power_up();
  
}

void setColor(int R, int G, int B) {
  analogWrite(PIN_RED,   R);
  analogWrite(PIN_GREEN,   G);
  analogWrite(PIN_BLUE,   B);
}

void setColor2(int R, int G, int B) {
  analogWrite(PIN_RED2,   R);
  analogWrite(PIN_GREEN2,   G);
  analogWrite(PIN_BLUE2,   B);
}

void dance_1() {
  setColor(0, 0, 250);
  setColor2(0, 250, 0);
  servoMotor.write(30);
  servoMotor2.write(30);
  myStepper.step(384);
  Serial.println("clockwise");
  delay(400);
  setColor(250, 0, 250);
  setColor2(250, 250, 0);

  servoMotor.write(150);
  servoMotor2.write(150);
  Serial.println("counterclockwise");
  myStepper.step(-384);
  delay(400);
  setColor(0, 0, 250);
  setColor2(0, 250, 0);

  myStepper.step(2048);
  servoMotor.write(30);
  delay(300);
  servoMotor2.write(30);
  delay(300);
  setColor(250, 0, 250);
  setColor2(250, 250, 0);
  servoMotor.write(150);
  delay(300);
  servoMotor2.write(150);
  delay(300);
  myStepper.step(-2048);
  servoMotor.write(30);
  delay(300);
  setColor(0, 0, 250);
  setColor2(0, 250, 0);
  servoMotor2.write(30);
  delay(300);
  servoMotor.write(150);
  delay(300);
  servoMotor2.write(150);
  delay(300);
  setColor(250, 0, 250);
  setColor2(250, 250, 0);

  myStepper.step(2048);
  servoMotor.write(30);
  servoMotor2.write(30);
  delay(200);
  servoMotor.write(60);
  servoMotor2.write(60);
  delay(200);
  servoMotor.write(90);
  servoMotor2.write(90);
  delay(200);
  servoMotor.write(120);
  servoMotor2.write(120);
  delay(300);
  servoMotor.write(150);
  servoMotor2.write(150);
  delay(200);
  myStepper.step(-2048);
  servoMotor.write(120);
  servoMotor2.write(120);
  delay(200);
  servoMotor.write(90);
  servoMotor2.write(90);
  delay(200);
  servoMotor.write(60);
  servoMotor2.write(50);
  delay(200);
  servoMotor.write(30);
  servoMotor2.write(30);
}

void dance_2() {
  myStepper.step(384);
  delay(400);
  myStepper.step(-384);
  delay(400);
}

// void dance_2() {
//   servoMotor.write(30);
//   delay(500);
//   servoMotor.write(150);
//   delay(500);
//   servoMotor.write(30);
//   delay(500);
//   servoMotor.write(150);

//   delay(500);

//   servoMotor2.write(150);
//   delay(500);
//   servoMotor2.write(30);
//   delay(500);
//   servoMotor2.write(150);
//   delay(500);
//   servoMotor2.write(30);

//   delay(500);

//   servoMotor.write(30);
//   servoMotor2.write(150);
//   delay(500);
//   servoMotor.write(150);
//   servoMotor2.write(30);
//   delay(500);
//   servoMotor.write(30);
//   servoMotor2.write(150);
//   delay(500);
//   servoMotor.write(150);
//   servoMotor2.write(30);
//   delay(500);
// }

// void dance_3() {
//   myStepper.step(2048);
//   servoMotor.write(30);
//   delay(300);
//   servoMotor2.write(30);
//   delay(300);
//   servoMotor.write(150);
//   delay(300);
//   servoMotor2.write(150);
//   delay(300);
//   myStepper.step(-2048);
//   servoMotor.write(30);
//   delay(300);
//   servoMotor2.write(30);
//   delay(300);
//   servoMotor.write(150);
//   delay(300);
//   servoMotor2.write(150);
//   delay(300);
// }

// void dance_4() {
//   servoMotor.write(30);
//   delay(300);
//   servoMotor.write(150);
//   delay(300);
//   servoMotor.write(30);
//   delay(300);
//   servoMotor.write(150);
//   delay(300);
// }


// void dance_5() {
//   myStepper.step(2048);
//   servoMotor.write(30);
//   servoMotor2.write(30);
//   delay(200);
//   servoMotor.write(60);
//   servoMotor2.write(60);
//   delay(200);
//   servoMotor.write(90);
//   servoMotor2.write(90);
//   delay(200);
//   servoMotor.write(120);
//   servoMotor2.write(120);
//   delay(300);
//   servoMotor.write(150);
//   servoMotor2.write(150);
//   delay(200);
//   myStepper.step(-2048);
//   servoMotor.write(120);
//   servoMotor2.write(120);
//   delay(200);
//   servoMotor.write(90);
//   servoMotor2.write(90);
//   delay(200);
//   servoMotor.write(60);
//   servoMotor2.write(50);
//   delay(200);
//   servoMotor.write(30);
//   servoMotor2.write(30);
// }


// void dance_6() {
//   myStepper.setSpeed(15);
//   myStepper.step(-2048);
//   delay(500);
//   myStepper.step(-2048);
//   delay(500);
//   myStepper.setSpeed(10);
// }

// void dance_7() {
//   myStepper.step(384);
//   delay(400);
//   servoMotor2.write(30);
//   delay(300);
//   servoMotor2.write(150);
//   delay(300);
//   servoMotor2.write(30);
//   delay(300);
//   servoMotor2.write(150);
//   delay(300);
//   myStepper.step(-384);
// }

// void dance_8() {
//   servoMotor.write(30);
//   servoMotor2.write(150);
//   delay(300);
//   servoMotor.write(150);
//   servoMotor2.write(30);
//   delay(300);
//   servoMotor.write(30);
//   servoMotor2.write(150);
//   delay(300);
//   servoMotor.write(150);
//   servoMotor2.write(30);
//   delay(300);
// }

// void dance_9() {
//   myStepper.setSpeed(15);
//   myStepper.step(1024);
//   servoMotor.write(150);
//   servoMotor2.write(30);
//   delay(300);
//   servoMotor.write(150);
//   servoMotor2.write(30);
//   delay(300);
//   servoMotor.write(150);
//   servoMotor2.write(30);
//   delay(300);
//   servoMotor.write(150);
//   servoMotor2.write(30);
//   delay(300);
//   myStepper.step(-1024);
//   servoMotor.write(150);
//   servoMotor2.write(30);
//   delay(300);
//   servoMotor.write(150);
//   servoMotor2.write(30);
//   delay(300);
//   servoMotor.write(150);
//   servoMotor2.write(30);
//   delay(300);
//   servoMotor.write(150);
//   servoMotor2.write(30);
//   delay(300);
// }

// void dance_10() {
//   myStepper.step(-1024);
//   servoMotor2.write(30);
//   delay(300);
//   servoMotor2.write(150);
//   delay(300);
//   servoMotor2.write(30);
//   delay(300);
//   servoMotor2.write(150);
//   delay(300);
//   myStepper.step(1024);
//   servoMotor2.write(30);
//   delay(300);
//   servoMotor2.write(150);
//   delay(300);
//   servoMotor2.write(30);
//   delay(300);
//   servoMotor2.write(150);
//   delay(300);
// }