  
  //------------------------------------------------------//
  //-------------Google Translate-------------------------//
  //------------------------------------------------------//
  
  const Command = require('./command')
  // Imports the Google Cloud client library
  const Translate = require('@google-cloud/translate');
		key: 'AIzaSyD5KUAKvMH9TFh-YnFWJ8nVjgkR6yXmklM'
		
  module.exports = class Translate extends Command {
	  
	static match (message) {
		return message.content.startsWith('!translate')
	}
	
	static action (message) {
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
	 }
	