//. app.js
var mqtt = require( 'mqtt' );
require( 'dotenv' ).config();

var option = {};
var mqtt_server = 'MQTT_SERVER' in process.env ? process.env.MQTT_SERVER : '';
var username = 'USERNAME' in process.env ? process.env.USERNAME : '';
var password = 'PASSWORD' in process.env ? process.env.PASSWORD : '';
var topic = 'TOPIC' in process.env ? process.env.TOPIC : 'topic';
if( username && password ){
  option.username = username;
  option.password = password;
}

var client = mqtt.connect( mqtt_server, option );

client.on( 'connect', function(){
  var td = new Date();
  var yyyy = td.getFullYear();
  var mm = td.getMonth() + 1;
  var dd = td.getDate();
  var hh = td.getHours();
  var nn = td.getMinutes();
  var ss = td.getSeconds();
  var datetime = yyyy + '-' + ( mm < 10 ? '0' : '' ) + mm + '-' + ( dd < 10 ? '0' : '' ) + dd
    + ' ' + ( hh < 10 ? '0' : '' ) + hh + ':' + ( nn < 10 ? '0' : '' ) + nn + ':' + ( ss < 10 ? '0' : '' ) + ss;
  client.publish( topic, 'こんにちは ' + datetime );
  console.log( { datetime } );
  client.end();
});
