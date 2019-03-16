//;==========================================
//; Title:  Arduino to Raspberry pi Serial Communication
//; Author: Nasimul Amin(nasimulaminhkd@gmail.com)
//; Date:  16 Mar 2019
//;==========================================
#include <SimpleDHT.h>
int pinDHT11 = 2;
SimpleDHT11 dht11(pinDHT11);
void setup() {
  Serial.begin(9600);
}
String data="";
int key=10;
void loop() {
  byte temperature = 0;
  byte humidity = 0;
  int err = SimpleDHTErrSuccess;
  if ((err = dht11.read(&temperature, &humidity, NULL)) != SimpleDHTErrSuccess) {
    Serial.print("Read DHT11 failed, err="); Serial.println(err);delay(1000);
    return;
  }
  data=String(temperature)+" *C ,"+String(humidity)+" H";
  int  len=data.length();
  char edata[len-3];
  for(int i=0;i<data.length();i++)
    edata[i]=data[i]+key;
  Serial.println(edata);
  delay(1500);
}
