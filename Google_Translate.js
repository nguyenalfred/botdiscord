
// ------------------------------------------------------//
// -------------Google Translate-------------------------//
// ------------------------------------------------------//

const Command = require('./command')
// var httpClient = require('node-rest-client-promise').Client()
// httpClient.getPromise('https://translation.googleapis.com/language/translate/v2')

// Imports the Google Cloud client library
const Trans = require('./node_modules/@google-cloud/translate')
// key: 'AIzaSyD5KUAKvMH9TFh-YnFWJ8nVjgkR6yXmklM'

module.exports = class GoogleTranslate extends Command {
  static match (message) {
    return message.content.startsWith('translate')
  }
  static action (message) {
    const translate = Trans
      // traduction dans la langue choisie
    var language = message.content.charAt(0) + message.content.charAt(1)
    var text = message.content.substring(3)
    translate.translate(text, language).then((results) => {
      let translations = results[0]
      translations = Array.isArray(translations) ? translations : [translations]
      translations.forEach((translation) => {
        message.channel.send(translation)
      })
    })
        .catch((err) => {
          message.channel.send('ERROR', err)
        })
  }
}
