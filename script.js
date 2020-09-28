var messages = [], //array that hold the record of each string in chat
  lastUserMessage = "", //keeps track of the most recent input string from the user
  botMessage = "", //var keeps track of what the chatbot is going to say
  botName = 'CovidBot'; //name of the chatbot
  

var moreInfo = 0;
var moreInfoResponses = ["about what to do if you have Covid", "about preventive measures.", "about ways the virus spreads."]; 
var country = false
//****************************************************************
//****************************************************************
//****************************************************************
//****************************************************************
//****************************************************************
//edit this function to change what the chatbot says



function chatbotResponse() {

  botMessage = "Please ask a Different Question"; //the default message

  if (country === true ) {
    botMessage = `Unfortunately I don't know about the specific guidelines for that country but for general guidelines and information you can get it from: cdc.gov.  `
    moreInfo = 3
    country = false
  }

  if (lastUserMessage.toLowerCase() === 'hi' || lastUserMessage.toLowerCase() === 'hello') {
    botMessage = 'Hello. My name is COVIDbot and it is my job to keep you informed on everything related with the coronavirus.';
    moreInfo = 2
  }

  if (lastUserMessage.toLowerCase().includes("spread")) {
    botMessage = "There are many ways that this virus can spread but the main way it spreads is through contact with other people who have the virus. It can also spread through particles through sneezing or just touching surfaces which people who already have the coronavirus".
    moreInfo = 2
  }

  if (lastUserMessage.toLowerCase().includes("preventive measures") || lastUserMessage.toLowerCase().includes("safety") || lastUserMessage.toLowerCase().includes("prevent") || lastUserMessage.toLowerCase().includes("stop")) {
    botMessage = "There are many ways to prevent the spread of COVID-19. The first way is also the easiest. Just social distancing and avoiding contact with people who are not in your social bubble is a great step. Also if you do go to public places use hand sanitizer and when you come back home make sure to wash you hands thoroughly with soap in order to stop the spread of germs in your house."
    moreInfo = 2
  }

  if (lastUserMessage.toLowerCase().includes("what is")){
    botMessage = "Covid-19 is a part of a family of diseases known as coronaviruses which are respiratory disease which affect parts of your respiratory system. These dcoronaviruses can range from the common cold all the way to some severe diseases like SARS."
    moreInfo = 2
  }

  if(lastUserMessage.toLowerCase().includes("symptoms")){
    botMessage = "Some common symptoms of Coronavirus include dry cough, fever, tiredness and stuff that is usually assocaited with the common cold or flu. Some more serious symptoms include shortness of breath and pain and pressure in the chest area. If you have any of the serious symptoms seek medical help."
    moreinfo = 2
  }

  if (lastUserMessage.toLowerCase().includes("have covid") || lastUserMessage.toLowerCase().includes("have coronavirus") || lastUserMessage.toLowerCase().includes("have the coronavirus")) {
    botMessage = "If you think you have the Coronavirus the first thing you should do is maintain social distancing from everyone in order for you to prevent the spread of the disease. You should always stay at home unless you need to go for medical care. If possible you shgould attempt to avoid public transit in order to limit interactions with others. For more information please enter your country and I will direct you to your respective website."
    moreInfo = 2
    country = true
    return botMessage;
  }

  if(moreInfo >= 3) {
    botMessage = "I'm sorry, I can't really understand you. Please ask questions related towards COVID-19. For example you can ask " + moreInfoResponses[Math.round(Math.random()* 2)] ;
    moreInfo += 1
  }



  if(lastUserMessage.toLowerCase === "canada" && country === true) {
    botMessage = `Canadians can get more info at: https://www.canada.ca/en/public-health/services/diseases/coronavirus-disease-covid-19.html`
    moreInfo = 3
    country = false
  }
  if ((lastUserMessage.toLowerCase() === "usa" || lastUserMessage.toLowerCase() === "us" || lastUserMessage.toLowerCase() === "united states of america" || lastUserMessage.toLowerCase() === "america") && country === true ) {
    botMessage = `Americans can get more info at: cdc.gov `
    moreInfo = 3
    country = false
  }
  if (country === true ) {
    botMessage = `Unfortunately I don't know about the specific guidelines for that country but for general guidelines and information you can get it from: cdc.gov.  `
    moreInfo = 3
    country = false
  }

  if (botMessage === "Please ask a Different Question"){
    moreInfo += 1
  }

  if (moreInfo > 5) {
    botMessage = "I still can't understand you. I would like to direct you to your countries COVID information for more help. What country are you from?";
    country = true
    return botMessage;
  }
  
  if (lastUserMessage.toLowerCase().includes("more information") || lastUserMessage.toLowerCase().includes("information") || lastUserMessage.toLowerCase().includes("info")) {
    botMessage = "I would like to direct you to your countries COVID information for more help. What country are you from?";
    country = true
    return botMessage;
  }
}

//this runs each time enter is pressed.
//It controls the overall input and output
function newEntry() {
  //if the message from the user isn't empty then run 
  if (document.getElementById("chatbox").value != "") {
    //pulls the value from the chatbox ands sets it to lastUserMessage
    lastUserMessage = document.getElementById("chatbox").value;
    //sets the chat box to be clear
    document.getElementById("chatbox").value = "";
    //adds the value of the chatbox to the array messages
    messages.push("<b> User 43: </b>" + lastUserMessage);
    //Speech(lastUserMessage);  //says what the user typed outloud
    //sets the variable botMessage in response to lastUserMessage
    chatbotResponse();
    //add the chatbot's name and message to the array messages
    messages.push("<b>" + botName + ":</b> " + botMessage);
    //outputs the last few array elements of messages to html
    for (var i = 1; i < 8; i++) {
      if (messages[messages.length - i])
        document.getElementById("chatlog" + i).innerHTML = messages[messages.length - i];
      }
  }
}



//runs the keypress() function when a key is pressed
document.onkeypress = keyPress;
//if the key pressed is 'enter' runs the function newEntry()
function keyPress(e) {
  var x = e || window.event;
  var key = (x.keyCode || x.which);
  if (key == 13 || key == 3) {
    //runs this function when enter is pressed
    newEntry();
  }
  if (key == 38) {
    console.log('hi')
      //document.getElementById("chatbox").value = lastUserMessage;
  }
}

//clears the placeholder text ion the chatbox
//this function is set to run when the users brings focus to the chatbox, by clicking on it
function placeHolder() {
  document.getElementById("chatbox").placeholder = "";
}
