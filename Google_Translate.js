  
  //------------------------------------------------------//
  //-------------Google Translate-------------------------//
  //------------------------------------------------------//
  
  const Command = require('./command')
  //var httpClient = require('node-rest-client-promise').Client()
  //httpClient.getPromise('https://translation.googleapis.com/language/translate/v2')
  
  // Imports the Google Cloud client library
  const Trans = require('@google-cloud/translate');
		key: 'AIzaSyD5KUAKvMH9TFh-YnFWJ8nVjgkR6yXmklM'
		
  module.exports = class Google_Translate extends Command {
	  
	static match (message) {
		return message.content.startsWith('!translate')
	}
	static action (message) {
		
    if (message.content.charAt(2) !== ' ' || message.content.charAt(1) === ' ') {
      message.channel.send('Veuillez entrer une langue valide.')
    } else {
      const translate = Trans
      // traduction dans la langue choisie
      var languedemandee = message.content.charAt(0) + message.content.charAt(1)
      var atraduire = message.content.substring(3)
      translate.translate(atraduire, languedemandee).then((results) => {
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
	
	  }
	