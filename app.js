var restify = require('restify');
var builder = require('botbuilder');

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});

// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
 //   appId: process.env.MICROSOFT_APP_ID,
  //  appPassword: process.env.MICROSOFT_APP_PASSWORD

    appId: '37bf4312-47ec-473e-a675-039b63d6f3b0',
    appPassword: 'oxkZYhY7FcCNBqZa4EXiSGT'
});

// Listen for messages from users 
//server.post('/api/messages', connector.listen());
server.post('https://agile-headland-89882.herokuapp.com/api/messages', connector.listen());

// Receive messages from the user and respond by echoing each message back (prefixed with 'You said:')
var bot = new builder.UniversalBot(connector);

bot.dialog('/', [
    function (session) {
        // Add an InputHint to let Cortana know to expect user input
      //  session.say('Hi there', '<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="en-US">Hi, what’s your name?</speak>', {
      //      inputHint: builder.InputHint.expectingInput
      //  });
        builder.Prompts.text(session, 'Hi there.  What is your name?', {            
        speak: 'Hey there mister.  What is <emphasis level=\"moderate\">your name dude</emphasis>?',
        retrySpeak: 'I did not understand my man.  Say <emphasis level=\"moderate\">your name fool</emphasis>',
        inputHint: builder.InputHint.expectingInput
        });
    },
    function (session, results) {
        //session.say("You said your name is '%s'", results.response.entity);
        console.log(session.message.text);

        builder.Prompts.text(session, 'You said '+ session.message.text, {            
        speak: 'You said <emphasis level=\"moderate\">' + session.message.text +'</emphasis>?'
        
        });
    }
]);

server.get('/', restify.serveStatic({
 directory: __dirname,
 default: '/index.html'
}));

