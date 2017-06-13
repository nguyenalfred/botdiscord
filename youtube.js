const Command = require('./command')
const config = require('./config.js')
const YouTube = require('youtube-node')
var youTube = new YouTube()
youTube.setKey(config.youtube.KEY)

module.exports = class Youtube extends Command {
  static match (message) {
    return message.content.startsWith('!youtube')
  }

  static action (message) {
    youTube.search(message.content, 3, function (error, result) {
      if (error) {
        console.log(error)
      } else if (result.items[0] === undefined || message.content === ' ' || message.content === '') {
        message.channel.sendMessage('veuillez rééssayer SVP !')
      } else {
        for (var k = 0; k < 3; k++) {
          if (result.items[k].id.kind === 'youtube#video') {
            message.channel.send('https://www.youtube.com/watch?v=' + result.items[k].id.videoId)
          } else if (result.items[k].id.kind === 'youtube#playlist') {
            message.channel.send('https://www.youtube.com/playlist?list=' + result.items[k].id.playlistId)
          } else if (result.items[k].id.kind === 'youtube#channel') {
            message.channel.send('https://www.youtube.com/channel/' + result.items[k].id.channelId)
          }
        }
      }
    })
  }
}
