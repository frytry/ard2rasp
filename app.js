//;==========================================
//; Title:  Arduino to Raspberry pi Serial Communication
//; Author: Nasimul Amin(nasimulaminhkd@gmail.com)
//; Date:  16 Mar 2019
//;==========================================

var express = require('express'),
    bodyP=require('body-parser'),
    sp=require('serialport'),
    app=express();
    console.log("Started");
    var ddata,rdata;
    var port=new sp('/dev/ttyACM0',{
    baudRate:9600
    });
    const Readline=sp.parsers.Readline;
    const parser=new Readline();
    port.pipe(parser);
    port.on('open',onPortOpen);
    parser.on('data',onData);
    port.on('close',onClose);
    port.on('error',onError);
    port.write('mssg');

    app.set("view engine","ejs");
    app.use(bodyP.urlencoded({extended: true}));//res for getting value from form "res.body.user"

    function onPortOpen(){
    console.log('port Open');
    }

    function onClose(){
    console.log('port close');
    }

    function onError(){
    console.log("some is bad");
    }

//    function onData(data){
//    console.log("data recived: "+data);
//    ddata=data;
//    }

	function onData(data){
    console.log("data recived: "+data);
        rdata=data;
        var enc="";
      	var srt="";
      	str=data.toString();
      	for(var i=0;i<data.length-1;i++){
      	var a=data.charCodeAt(i);
      	var b=a-10;
      	enc=enc+String.fromCharCode(b);
      	}
      	ddata=enc;
  }



app.get("/",function(req,res){
  res.render("home",{ata:ddata,aata:rdata});
});


app.listen(1337, "127.128.0.1",function () {
	console.log("Server started");
});
