const Discord = require('discord.js')
const config = require('./config.js')
const client = new Discord.Client()
var httpClient = require('node-rest-client-promise').Client()
const Translate = require('./Google_Translate')

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
  
//------------Google_Translate------------//
  Translate.parse(msg)
  
})

	client.login(config.token)
