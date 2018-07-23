const sherperd = require('./lib/sherperd');
const twitter = require('./lib/twitter');
const fs = require('fs');

// people we go notify
const handles = [
  "@gwuah_",
  "@___vaughan"
];

// obviously killers go try fool
// so we go blacklist some handles
const blacklist = [

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
  "eei siiiis, as3m aba o"
]


const stream = sherperd.stream('statuses/filter', { track: '@tlheat' });

function generateHandles() {

}

function generateTweet() {

}

function scheduleTweet() {

}

stream.on('tweet', function(tweet){
  console.log(tweet.text);

  if (tweet.text.includes("heat")) {
    // notify all usrs
  } else {
    // reply with an insult
  }
})