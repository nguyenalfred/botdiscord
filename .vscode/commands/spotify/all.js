const Command = require('../command')
const config = require('../../config.js')
const SpotifyWebApi = require('spotify-web-api-node')

var spotifyApi = new SpotifyWebApi({
  clientId: config.spotify.clientId,
  clientSecret: config.spotify.clientSecret
})

spotifyApi.clientCredentialsGrant()
  .then(function (data) {
    spotifyApi.setAccessToken(data.body['access_token'])
  }, function (err) {
    console.log('Something went wrong when retrieving an access token', err.message)
  })

module.exports = class SpotifyAll extends Command {
  static match (message) {
    return message.content.startsWith('!spotify')
  }

  static action (message) {
    if (message.content === ' ' || message.content === '') {
      message.channel.send("veuillez rééssayer SVP.")
    } else {
      spotifyApi.searchTracks(message.content).then(function (data) {
        if (data.body.tracks.items[0] === undefined) {
          message.channel.send("veuillez rééssayer SVP.")
        } else {
          for (let i = 0; i < data.body.tracks.items.length && i < 3; i++) {
            message.channel.send(data.body.tracks.items[i].external_urls.spotify)
          }
        }
      }, function (err) {
        console.error(err)
      })
    }
  }
}
