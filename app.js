const fs = require('fs-extra');
const TelegramBot = require('node-telegram-bot-api')
const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');
const ffmpeg = require('fluent-ffmpeg');
const request = require('request');

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

module.exports = ffmpeg;
// replace the value below with the Telegram token you receive from @BotFather
const token = '5285008861:AAGhxFSKi8aDnIpjEyrvVqw8D4KzJhuOpiY';
const bot = new TelegramBot(token, { polling: true });
// Matches "/echo [whatever]"
bot.onText(/\/api (.+)/, (msg, match) => {

  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"
  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, resp);
});

// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'loading....');
  request.post({url:'https://betterimdbot.herokuapp.com/', form: {q:`${msg.text}`}}, (err, res, body) => {
    if (err) {
      return callback(err);
    } else {
      var bodyres = JSON.parse(body)
      // menu = body.categories;
      // options = {
      //   reply_markup: JSON.stringify({
      //     inline_keyboard: menu.map((x, xi) => ([{
      //       text: x,
      //       callback_data: x,
      //     }])),
      //   }),
      // };
      bot.sendPhoto(chatId, bodyres[1].jsonnnob.image);
    }
  });
});