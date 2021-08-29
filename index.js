const venom = require('venom-bot');
const Discord = require("discord.js");
const bot = new Discord.Client({ disableMentions: 'everyone' });
// Define Libraries Needed


venom
  .create(
    'DiscordBot', 
    {
      folderNameToken: 'tokens', //folder name when saving tokens
      mkdirFolderToken: '', //folder directory tokens, just inside the venom folder, example:  { mkdirFolderToken: '/node_modules', } //will save the tokens folder in the node_modules directory
      headless: true, // Headless chrome
      devtools: false, // Open devtools by default
      useChrome: true, // If false will use Chromium instance
      debug: false, // Opens a debug session
      logQR: true, // Logs QR automatically in terminal
      browserWS: '', // If u want to use browserWSEndpoint
      browserArgs: [''], //Original parameters  ---Parameters to be added into the chrome browser instance
      puppeteerOptions: {args:['--no-sandbox']}, // Will be passed to puppeteer.launch
      disableSpins: true, // Will disable Spinnies animation, useful for containers (docker) for a better log
      disableWelcome: true, // Will disable the welcoming message which appears in the beginning
      updatesLog: true, // Logs info updates automatically in terminal
      autoClose: 60000, // Automatically closes the venom-bot only when scanning the QR code (default 60 seconds, if you want to turn it off, assign 0 or false)
      createPathFileToken: false, //creates a folder when inserting an object in the client's browser, to work it is necessary to pass the parameters in the function create browserSessionToken
    }
  )
  .then((client) => {
    start(client);
  })
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
