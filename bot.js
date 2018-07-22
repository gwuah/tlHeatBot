const sherperd = require('./lib/sherperd');
const twitter = require('./lib/twitter');
const fs = require('fs');

const handles = [
  "@gwuah_",
  "@___vaughan"
];


const stream = sherperd.stream('statuses/filter', { track: '@tlheat' });

stream.on('tweet', function(tweet){
  console.log(tweet.text)
})