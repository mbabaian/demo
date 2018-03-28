/*
  CONGRATULATIONS on creating your first Botpress bot!

  This is the programmatic entry point of your bot.
  Your bot's logic resides here.
  
  Here's the next steps for you:
  1. Read this file to understand how this simple bot works
  2. Read the `content.yml` file to understand how messages are sent
  3. Install a connector module (Facebook Messenger and/or Slack)
  4. Customize your bot!

  Happy bot building!

  The Botpress Team
  ----
  Getting Started (Youtube Video): https://www.youtube.com/watch?v=HTpUmDz9kRY
  Documentation: https://botpress.io/docs
  Our Slack Community: https://slack.botpress.io
*/


module.exports = function(bp) {
  // Listens for a first message (this is a Regex)
  // GET_STARTED is the first message you get on Facebook Messenger
  bp.hear(/GET_STARTED|hello|hi|test|hey|holla/i, (event, next) => {
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
    event.reply('#welcome')
    // event.next();
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

  // exit convo if user doesn't want to learn about card catalog
    bp.hear({
      platform: 'web',
      type: 'quick_reply',
      text: 'Nevermind',
      payload: 'quit'
    }, (event, next) => {
      event.reply('#goodbye')
  })

  // search by author
  bp.hear({
    platform: 'web',
    type: 'quick_reply',
    text: 'By Author',
    payload: 'author'
  }, (event, next) => {
    event.reply('#searchByAuthor')
})

  // search by title
  bp.hear({
    platform: 'web',
    type: 'quick_reply',
    text: 'By Title',
    payload: 'title'
  }, (event, next) => {
    event.reply('#searchByTitle')
  })

  // search by subject
  bp.hear({
    platform: 'web',
    type: 'quick_reply',
    text: 'By Subject',
    payload: 'subject'
  }, (event, next) => {
    event.reply('#searchBySubject')
  })

  // search by series
  bp.hear({
    platform: 'web',
    type: 'quick_reply',
    text: 'By Series',
    payload: 'series'
  }, (event, next) => {
    event.reply('#searchBySeries')
  })


  // handle unrecognized words
  bp.hear({text: /.*/i}, (event, next) => {
    event.reply('#fallback')
    // event.next();
  })


  // debugging
  // bp.hear({text: /.+/i}, (event, next) => {
  //   bp.logger.info(event) 
  // })

  
}