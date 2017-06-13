const Command = require('./command')
const config = require('./config')
const bot = require('./bot')
const Twitter = require('./node_modules/twitter')

let clientTwitter = new Twitter({
  consumer_key: config.twitter.consumerKey,
  consumer_secret: config.twitter.consumerSecret,
  access_token_key: config.twitter.accessTokenKey,
  access_token_secret: config.twitter.accessTokenSecret
})

const sendTweet = txtTweet => {
  return new Promise(function (resolve, reject) {
    clientTwitter.post('statuses/update', { status: txtTweet }, function (error, tweet, response) {
      if (!error) {
        resolve(tweet)
      } else {
        reject(error)
      }
    })
  })
}

clientTwitter.stream('statuses/filter', { track: 'BotIbourk' }, function (stream) {
  stream.on('data', function (tweet) {
    console.log(tweet)
    let link = 'https://twitter.com/' + tweet.user.screen_name + '/status/' + tweet.id_str
    bot.sendMessageToChannel(link)
  })

  stream.on('error', function (error) {
    console.log(error)
  })
})

module.exports = class Twitter extends Command {
  static match (message) {
    console.log('checking twitter')
    return message.content.startsWith('!tweet')
  }

  static action (message) {
    if (message.content.length > 140 || message.content.length < 1) {
      message.channel.send('votre twweet est trop long! Longueur du tweet: ' + message.content.length + ' caractères (max 140)')
    } else {
      sendTweet(message.content).then(function (tweet) {
        console.log(tweet)
        let link = 'https://twitter.com/' + tweet.user.screen_name + '/status/' + tweet.id_str
        message.channel.send(link)
      })
    }
  }
}
