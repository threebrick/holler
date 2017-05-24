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
server.post('https://hollerskill.azurewebsites.net/api/messages', connector.listen());

// Receive messages from the user and respond by echoing each message back (prefixed with 'You said:')
var bot = new builder.UniversalBot(connector);

//bot.beginDialogAction('restaurants', '/restaurants', { matches: /^restaurants|find restaurants|search restaurants/i });
//bot.beginDialogAction('events', '/events', { matches: /^events|find events|search events/i });

bot.dialog('/', [
    function (session) {
        // Add an InputHint to let Cortana know to expect user input
      //  session.say('Hi there', '<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="en-US">Hi, what’s your name?</speak>', {
      //      inputHint: builder.InputHint.expectingInput
      //  });
        builder.Prompts.text(session, 'Hi there.  What is your name?', {            
        speak: 'Hey there mister.  What is your name ?',
        retrySpeak: 'I did not understand my man.  Say your name?',
        inputHint: builder.InputHint.expectingInput
        });
    },
    function (session, results) {
        //session.say("You said your name is '%s'", results.response.entity);
        console.log(session.message.text);

        builder.Prompts.text(session, 'You said '+ session.message.text, {            
        speak: 'You said ' + session.message.text +''
        
        });
    }
]);

//bot.dialog('/restaurants', [
//    function (session) {

    //   session.userData.faqTest = "startFAQ"; 

//       var msg = new builder.Message(session)
//            .attachments([
//                new builder.HeroCard(session)
//                    .title("Hero Card")
//                    .subtitle("The Space Needle is an observation tower in Seattle, Washington, a landmark of the Pacific Northwest, and an icon of Seattle.")
//                    .images([
//                        builder.CardImage.create(session, "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Seattlenighttimequeenanne.jpg/320px-Seattlenighttimequeenanne.jpg")
//                    ])
//                    .tap(builder.CardAction.openUrl(session, "https://en.wikipedia.org/wiki/Space_Needle"))
//            ]);
        //session.send(msg);
//        session.endDialog(msg);
//    }
//]);
//bot.beginDialogAction('restaurants', '/restaurants'); 


//bot.dialog('/events', [
//    function (session) {

    //   session.userData.faqTest = "startFAQ"; 

//        msg = new builder.Message(session)
//            .attachments([
//                new builder.ThumbnailCard(session)
//                    .title("Thumbnail Card")
//                    .subtitle("Pike Place Market is a public market overlooking the Elliott Bay waterfront in Seattle, Washington, United States.")
//                    .images([
//                        builder.CardImage.create(session, "https://upload.wikimedia.org/wikipedia/en/thumb/2/2a/PikePlaceMarket.jpg/320px-PikePlaceMarket.jpg")
//                    ])
//                    .tap(builder.CardAction.openUrl(session, "https://en.wikipedia.org/wiki/Pike_Place_Market"))
//            ]);
        //session.endDialog(msg);
//        session.endDialog(msg);
//    }
//]);
//bot.beginDialogAction('events', '/events'); 

server.get('/', restify.serveStatic({
 directory: __dirname,
 default: '/index.html'
}));

