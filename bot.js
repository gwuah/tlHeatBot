const sherperd = require('./lib/sherperd');
const twitter = require('./lib/twitter');
const config = require('./config');
const fs = require('fs');

// people we go notify
const handles = [
  "@gwuah_",
  "@_gwuah_"
  // "@___vaughan"
];

// obviously killers go try fool
// so we go blacklist some handles
const blacklist = [
  "@TAFLEM3KOVIC"
]

// message templates
// we need as much as we can chale.
// 
const templates = [
  "some seeerious heat for the tl chale",
  "ah you bed? heat sorr, heat sorr ni",
  "check your twitter asap, keys upon keys",
  "ah wada?",
  "berma look sharp, receipts dey fly everywhere",
  "eei siiiis, as3m aba o, timeline make hot"
]

const stream = sherperd.stream('statuses/filter', { track: config.me.screen_name });

function getRandomInt(max) {
  // generate random number between 0 and max
  return Math.floor(Math.random() * Math.floor(max));
}

function* generateHandles(handles) {
  yield* handles;
}

function scheduleTweet(tweet) {
  // tweets after waiting for x random seconds
  setTimeout(()=>{
    sherperd.tweet(tweet)
  }, getRandomInt(handles.length))
}

function generateTweet(__iterator) {
  const text = templates[getRandomInt(templates.length)];
  let tweet = `${text}`;

  // initiate generator
  let _iterator = __iterator || generateHandles(handles);
  var { value, done } = _iterator.next();

  if (done) { return }

  while (tweet.length <= 240 && !done) {
    // build tweet
    if (value.length + tweet.length < 240){
      // this is to make sure that we dont exceend the 240 limit
      // set by twitter
      tweet += ` ${value}`;
      var { value, done } = _iterator.next();
    }
  }

  console.log(tweet)

  // schedule tweet
  // so we dont trigger twitter ai
  scheduleTweet(tweet);

  // then we do something very interesting here
  // !done ? generateTweet(_iterator) : undefined ;
  generateTweet(_iterator);

  // so the logic behind this nifty code is that,
  // we might have a large number of handles to notify
  // therefore till we have notified them all, run the function again and notify
  // only the remaining members.

}

stream.on('tweet', function(tweet){
  // when tweet is recieved from stream, process it
  console.log(tweet.text);

  if (tweet.text.includes("heat")) {
    // notify all usrs
    generateTweet()
  } else {
    // sherperd.tweet("wmt x")
  }
})

console.log("bot is running ,,,")