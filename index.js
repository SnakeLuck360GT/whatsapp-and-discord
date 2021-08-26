const venom = require('venom-bot');
const Discord = require("discord.js");
const bot = new Discord.Client({ disableMentions: 'everyone' });
const db = require("quick.db");
// Define Libraries Needed


venom
  .create()
  .then((client) => start(client))
  .catch((erro) => {
    console.log(erro);
  });
// creates a new client for venom

const ApplicationChannel = "(channel id here)"
const phoneNumber = "(phone number here)@c.us"
const tokenvariable = "TOKEN HERE"
// global variables, phone number and discord channel and token




function WhatsappToDiscord(message){
  bot.channels.cache.get(ApplicationChannel).send(message.body)
}
// function to send whatsapp message to discord

function DiscordToWhatsapp(message){
  if(message.channel.id === ApplicationChannel){
    client.sendText(phoneNumber, message.content)
  }
}



function start(client) {
  client.onMessage((message) => {
    if (message.isGroupMsg === false) {
      WhatsappToDiscord(message)
    }
    
  });
  // if whatsapp message isnt in group, 
  // send the message content to discord, and then send to phone number in whatsapp 
  // with "message has been sent in discord"



  bot.on("message", async (message) => {
    if(message.author.bot) return;
    if(message.channel.id != ApplicationChannel) return;
    if(message.content.length < 1) return client.sendText(phoneNumber, `${message.member.displayName}: (Empty message, probably an image)`);
    client.sendText(phoneNumber, `${message.member.displayName}: ${message.content}`)
    
    
  })
  // if message author is a bot, return;
  // if it isnt in the designated channel, return;
  // if message content is nothing, send a placeholder
  // otherwise, send to phone number, message content

}








bot.login(tokenvariable)
// login to bot on discord
