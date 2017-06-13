const Command = require('./command')
const config = require('./config')
const translate = require('@google-cloud/translate')({
  key: config.googleTranslate.KEY
})

let content, langue, text

module.exports = class Translate extends Command {
  static match (message) {
    return message.content.startsWith('!translate')
  }

  static action (message) {
    content = message.content.split(' ')
    if (content.length > 1) {
      langue = content[0].toLowerCase()
      content.shift()
      text = content.join(' ')

      // traduction du texte
      translate.translate(text, langue).then((results) => {
        let translations = results[0]
        translations = Array.isArray(translations) ? translations : [translations]
        translations.forEach((translation) => {
          message.channel.send('Résultat de la traduction: ' + translation)
        })
      })
    .catch((err) => {
      message.channel.send('ERROR', err)
    })
    } else {
      message.channel.send('Vous n\'avez pas saisie de texte.')
    }
  }
}
