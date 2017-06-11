module.exports = class Command {
  static parse (message) {
    if (this.match(message)) {
      let msgContent = message.content.trim() // efface les espaces inutiles
      let msgSplit = msgContent.split(' ')
      msgSplit.shift() // supprime le 1er element du tableau
      while (msgSplit[0] === '') {
        msgSplit.shift()
      }
      message.content = msgSplit.join(' ')
      this.action(message)
      return true
    }
    return false
  }

  static match (message) {
    return false
  }

  static action (message) { }
}