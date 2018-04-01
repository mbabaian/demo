// conversation logic

module.exports = function(bp) {
  // Listens for a first message (this is a Regex)
  // GET_STARTED is the first message you get on Facebook Messenger
  bp.hear(/GET_STARTED|hello|hi|hey|holla/i, (event, next) => {
    event.reply('#welcome') // See the file `content.yml` to see the block
  })

  // You can also pass a matcher object to better filter events
  bp.hear({
    type: /message|text/i,
    text: /exit|bye|goodbye|quit|done|leave|stop/i
  }, (event, next) => {
    event.reply('#goodbye', {
      // You can pass data to the UMM bloc!
      // reason: 'tiredness'
    })
  })

  bp.hear('help', (event, next) => {
    event.reply('#content.welcome')
  })
  
  bp.hear('search', (event, next) => {
    event.reply('#search')
  })
  
  // if user wants to learn about card catalog
  bp.hear({
    platform: 'web',
    type: 'quick_reply',
    text: 'Let\'s go!',
    payload: 'continue'
  }, (event, next) => {
    event.reply('#continueReply')
    })

  // verify user wants to learn more
  bp.hear({
    platform: 'web',
    type: 'quick_reply',
    text: 'Yes! Absolutely.',
    payload: 'yes'
  }, (event, next) => {
    event.reply('#pickASearchMethod')
  })

  // exit convo if user doesn't want to learn about card catalog
    bp.hear({
      platform: 'web',
      type: 'quick_reply',
      text: 'Nevermind',
      payload: 'quit'
    }, (event, next) => {
      event.reply('#content.goodbye')
  })

  bp.hear({
    platform: 'web',
    type: 'quick_reply',
    text: 'No thank you.',
    payload: 'quit'
  }, (event, next) => {
    event.reply('#content.goodbye')
  })

  // search by author
  bp.hear({
    platform: 'web',
    type: 'quick_reply',
    text: 'Search by Author',
    payload: 'author'
  }, (event, next) => {
    event.reply('#searchByAuthor')
  })

  bp.hear({
    platform: 'web',
    type: 'quick_reply',
    text: /dr. seuss|jk rowling|rick riordan|lemony snicket/i
  }, (event, next) => {
      event.reply('#chosenAuthor')
    // event.reply('#chosenAuthor', { author: response.text })
    // event.next()
  })

  // search by title
  bp.hear({
    platform: 'web',
    type: 'quick_reply',
    text: 'Search by Title',
    payload: 'title'
  }, (event, next) => {
    event.reply('#searchByTitle')
  })

  bp.hear({
    platform: 'web',
    type: 'quick_reply',
    text: /lorax|where the wild things are|charlottes web|a wrinkle in time|number the stars/i,
    payload: 'title'
  }, (event, next) => {
    event.reply('#chosenTitle')
  })



  // search by subject
  bp.hear({
    platform: 'web',
    type: 'quick_reply',
    text: 'Search by Subject',
    payload: 'subject'
  }, (event, next) => {
    event.reply('#searchBySubject')
  })

  bp.hear({
    platform: 'web',
    type: 'quick_reply',
    text: /football|origami|poetry|biography/i,
    payload: 'subject'
  }, (event, next) => {
    event.reply('#chosenSubject')
  })



  // search by series
  bp.hear({
    platform: 'web',
    type: 'quick_reply',
    text: 'Search by Series',
    payload: 'series'
  }, (event, next) => {
    event.reply('#searchBySeries')
  })




  // once search has started
  bp.hear({
    platform: 'web',
    type: 'quick_reply',
    text: 'I see it',
    payload: 'i see it'
  }, (event, next) => {
    event.reply('#explainResults')
  })

  bp.hear({
    platform: 'web',
    type: 'quick_reply',
    text: 'I don\'t see it.',
    payload: 'i do not see it'
  }, (event, next) => {
    event.reply('#getHelp')
  })

  bp.hear({
    platform: 'web',
    type: 'quick_reply',
    text: 'Exit demo',
    payload: 'quit'
  }, (event, next) => {
    event.reply('#goodbye')
  })

  bp.hear('ready', (event, next) => {
    event.reply('#readyResponse')
  })
  
  bp.hear(/test/i, (event, next) => {
    event.reply('#test')
  })

  // handle unrecognized words
  bp.hear({text: /.*/i}, (event, next) => {
    event.reply('#fallback')
    // event.next();
  })

  // debugging
  bp.hear({text: /.+/i}, (event, next) => {
    bp.logger.info(event) 
  })

  
}