const venom = require('venom-bot');
const Discord = require("discord.js");
const bot = new Discord.Client({ disableMentions: 'everyone' });
// Define Libraries Needed


venom
  .create()
  .then((client) => start(client))
  .catch((erro) => {
    console.log(erro);
  });
// creates a new client for venom

const TargetChannel = process.env.CHANNEL
const phoneNumber = process.env.NUMBER
// global variables, phone number and discord channel





function WhatsappToDiscord(message){
  bot.channels.cache.get(TargetChannel).send(message.body) // get the channel, and send the message from whatsapp
}
// function to send whatsapp message to discord



function start(client) {
  client.onMessage((message) => {

    if (message.isGroupMsg === false) {  // if whatsapp message isnt in group, 
      WhatsappToDiscord(message)  // send the message content to discord, and then send to phone number in whatsapp 
    }

    
    
  });

  function attachment(message){
    const content = message.content.replace("<@!879650462549295164>","@xylo") // if someone pings the bot, it'll replace with "@xylo"
    message.attachments.forEach(attachment => { // for each attachment
      const ImageLink = attachment.proxyURL; // get the url of the discord attachment
      const linkcheck = ImageLink.slice(ImageLink.length - 3) // get the last 3 characters of the url
    if(linkcheck === "png" || linkcheck === "jpg" || linkcheck === "gif"){
      // if the last 3 characters are "png","jpg","gif"
      client.sendImage(phoneNumber, ImageLink,`image.${linkcheck}`, `${message.member.displayName}: ${content}`)
      // send the image, and message content
    }
    if(linkcheck === "mp4"){
      // if the last 3 characters are "mp4"
      client.sendText(phoneNumber, `${message.member.displayName}: ${content} ${ImageLink}`)
      // send the mp4 file and message content
    }
    if(linkcheck === "mp3"){
      // if the last 3 characters are "mp3"
      client.sendText(phoneNumber, `${message.member.displayName}: ${content} ${ImageLink}`)
      // send the mp4 file and message content
    }
  });
  }

  bot.on("message", async (message) => {
    if(message.author.id === bot.user.id) return; // if message author is the bot, return;
    if(message.author.id === "726437002874191934") return; // returns if message author is xylo
    if(message.channel.id != TargetChannel) return; // if it isnt in the designated channel, return;
    if(message.attachments.size > 0) return attachment(message); // if there is an attachment, return function "attachment(messasge)"
    if(message.content.length < 0) return client.sendText("[Empty message]") // if content length is nothing, send a placeholder

    const textcontent = message.content.replace("<@!879650462549295164>","@xylo") // if someone pings the bot, it'll replace with "@xylo"
    client.sendText(phoneNumber, `${message.member.displayName}: ${textcontent}`) // otherwise, send to phone number, message content

  })
}











bot.login(process.env.TOKEN)
// login to bot on discord
