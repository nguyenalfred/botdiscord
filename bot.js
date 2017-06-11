const Discord = require('discord.js')
const config = require('./config.js')
const client = new Discord.Client()
var httpClient = require('node-rest-client-promise').Client()

//
client.on('ready', () => {
  console.log(`Logged in as ${client.user.username}!`)
})

client.on('message', msg => {
  // Check if the message has been posted in a channel where the bot operates
  // and that the author is not the bot itself
  if (msg.channel.type !== 'dm' && (config.channel !== msg.channel.id || msg.author.id === client.user.id)) return

  // If message is hello, post hello too
  if (msg.content === 'hello') {
    msg.channel.sendMessage('Hello to you too!')
  }
  // If message is temperature/paris, return temperature
  if (msg.content === 'temperature/paris') {
    httpClient.getPromise('http://api.openweathermap.org/data/2.5/weather?q=Paris&APPID=b05787eda8d8f7967925692ea52134d2')
    .then((res) => {
      var tempK = res.data.main.temp
      var tempC = tempK - 273.15
      msg.channel.sendMessage('Température à Paris: ' + tempC.toFixed(2) + ' °C')
    })
  }
  // If message is weather/temperature/forecast, return tempature for 5 days
  if (msg.content === 'weather/temperature/forecast') {
    httpClient.getPromise('http://api.openweathermap.org/data/2.5/forecast?q=Paris,fr&APPID=b05787eda8d8f7967925692ea52134d2')
    .then((res) => {
      var forecastTemp = []
      for (var i = 0; i < 5; i++) {
        forecastTemp[i] = ((res.data.list[i].main.temp) - 273.15).toFixed(2)
      }
      msg.channel.sendMessage('Température j+1: ' + forecastTemp[0] + ' , Température j+2: ' + forecastTemp[1] + ' , Température j+3: ' + forecastTemp[2] + ' , Température j+4: ' + forecastTemp[3] + ' , Température j+5: ' + forecastTemp[4])
    })
  }
  
  
  //------------------------------------------------------//
  //-------------Google Translate-------------------------//
  //------------------------------------------------------//
  
  // If message is "translate", post "write your word in english"
  var message = msg;
  var n = msg.startsWith("!translate");
  if (n === true ) {
	// Imports the Google Cloud client library
	const Translate = require('@google-cloud/translate');
		key: 'AIzaSyD5KUAKvMH9TFh-YnFWJ8nVjgkR6yXmklM'
		
	// Instantiates a client
	const translate = Translate();

	// The text to translate, e.g. "Hello, world!"
	var text = message.content.substring(3);

	// The target language, e.g. "ru"
	var target = message.content.charAr(1);

	// The model to use, "nmt" or "base"
	const model = 'base';

	const options = {
	  // The target language, e.g. "ru"
	  to: target,
	  // Make sure your project is whitelisted.
	  // Possible values are "base" and "nmt"
	  model: model
	};

	// Translates the text into the target language. "text" can be a string for
	// translating a single piece of text, or an array of strings for translating
	// multiple texts.
	translate.translate(text, options)
	  .then((results) => {
		let translations = results[0];
		translations = Array.isArray(translations) ? translations : [translations];

		translations.forEach((translation, i) => {
		  message.channel.send(`${text[i]} => (${target}) ${translation}`);
		});
	  })
	  .catch((err) => {
		console.error('ERROR:', err);
	  });
	  }
	})

	client.login(config.token)
