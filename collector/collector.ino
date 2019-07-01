#include "OpenAquarium.h"
#include "Wire.h"
#include "Arduino.h"
#define calibration_point_4 2153  //Write here your measured value in mV of pH 4
#define calibration_point_7 1972  //Write here your measured value in mV of pH 7
#define calibration_point_10 1816 //Write here your measured value in mV of pH 10
#define point_1_cond 40000   // Write here your EC calibration value of the solution 1 in µS/cm
#define point_1_cal 40       // Write here your EC value measured in resistance with solution 1
#define point_2_cond 10500   // Write here your EC calibration value of the solution 2 in µS/cm
#define point_2_cal 120      // Write here your EC value measured in resistance with solution 2

      
int mvpH;
float ph;
float temp;
float resistanceEC;
float EC;
int water_level=0;
String output;
String start = "---";
String slut = "+++";

void setup() {
  OpenAquarium.init();
  OpenAquarium.initRTC();
  OpenAquarium.setTime();
  OpenAquarium.calibratepH(calibration_point_4,calibration_point_7,calibration_point_10);
  OpenAquarium.calibrateEC(point_1_cond,point_1_cal,point_2_cond,point_2_cal);
  delay(1000);
  Serial.begin(9600);
}

void loop() {
  mvpH = OpenAquarium.readpH();
  ph = OpenAquarium.pHConversion(mvpH);
  temp = OpenAquarium.readtemperature();
  water_level = OpenAquarium.readwaterlevel(1);
  resistanceEC = OpenAquarium.readResistanceEC();
  EC = OpenAquarium.ECConversion(resistanceEC);
  Serial.println(start);
  Serial.println(ph);
  Serial.println(temp);
  Serial.println(water_level);
  Serial.println(EC);
  Serial.println(slut);
  delay(3600000);
}
