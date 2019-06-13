#include "OpenAquarium.h"
#include "Wire.h"
#include "Arduino.h"

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
