// conversation logic

module.exports = function(bp) {
  // Listens for a first message (this is a Regex)
  // GET_STARTED is the first message you get on Facebook Messenger
  bp.hear(/hello|hi|hey|holla|milo/i, (event, next) => {
    event.reply('#content.welcome') // See the file `content.yml` to see the block
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
      event.reply('#goodbye')
  })

  bp.hear({
    platform: 'web',
    type: 'quick_reply',
    text: 'No thank you.',
    payload: 'quit'
  }, (event, next) => {
    event.reply('#goodbye')
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
    text: /lorax|where the wild things are|charlottes web|a wrinkle in time|number the stars/i
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
    text: /football|origami|poetry|biography/i
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

  bp.hear({
    platform: 'web',
    type: 'quick_reply',
    text: /diary|junie|henry|harry/i
  }, (event, next) => {
    event.reply('#chosenSeries')
  })

  
  // once card catalog search has started
  bp.hear({
    platform: 'web',
    type: 'quick_reply',
    text: /i see it/i
  }, (event, next) => {
    event.reply('#explainResults')
  })

  bp.hear({
    platform: 'web',
    type: 'quick_reply',
    text: /i don't see it/i
  }, (event, next) => {
    event.reply('#getHelp')
  })


  /* HANDLE CALL NUMBERS */

  // picture books
  bp.hear({
    platform: 'web',
    type: 'quick_reply',
    text: 'E',
    payload: 'easy'
  }, (event, next) => {
    event.reply('#easy')
  })


  // fiction
  bp.hear({
    platform: 'web',
    type: 'quick_reply',
    text: 'F or FIC',
    payload: 'fic'
  }, (event, next) => {
    event.reply('#fiction')
  })

  // nonfiction
  bp.hear({
    platform: 'web',
    type: 'quick_reply',
    text: '000 - 999',
    payload: 'nonfiction'
  }, (event, next) => {
    event.reply('#nonfiction')
  })

  // biography 
  bp.hear({
    platform: 'web',
    type: 'quick_reply',
    text: 'B or 921',
    payload: 'biography'
  }, (event, next) => {
    event.reply('#biography')
  })

  // exiting program
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
    event.reply('#content.test')
  })

  // handle unrecognized words
  bp.hear({text: /.*/i}, (event, next) => {
    event.reply('#content.fallback')
    // event.next();
  })

  // debugging
  // bp.hear({text: /.+/i}, (event, next) => {
  //   bp.logger.info(event) 
  // })

  
}