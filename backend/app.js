"use strict";
const express = require("express");
const path = require("path");

const app = express();
const PORT = 3001;

const cors = require("cors"); //Allows 'Cross Origin Resource Sharing (requests from other domains)'
app.use(cors());
app.use(express.json()); //'modern way' - (replaces 'bodyParser')
// const { registerLocale } = require("react-datepicker");

let houses = [];

houses.push({
  id: 1,
  price: 27500,
  area: "Handsworth",
  type: "Flat",
  image: `https://media.rightmove.co.uk/dir/crop/10:9-16:9/108k/107051/78903606/107051_RS0730_IMG_11_0000_max_476x317.jpeg`,
});
houses.push({
  id: 2,
  price: 1450000,
  area: "Harbourne",
  type: "House",
  image: `https://media.rightmove.co.uk/dir/crop/10:9-16:9/93k/92029/104484854/92029_581009_IMG_00_0000_max_476x317.jpeg`,
});
houses.push({
  id: 3,
  price: 165000,
  area: "Edgbaston",
  type: "Maisonette",
  image: `https://media.rightmove.co.uk/dir/crop/10:9-16:9/73k/72455/97846952/72455_107VC_IMG_00_0000_max_476x317.jpg`,
});
houses.push({
  id: 4,
  price: 329950,
  area: "Sandhurst",
  type: "House",
  image: `https://media.rightmove.co.uk/90k/89518/80000376/89518_CBW206916_IMG_05_0000.jpeg`,
});
houses.push({
  id: 5,
  price: 2995000,
  area: "Edgbaston",
  type: "House",
  image: `https://media.rightmove.co.uk/188k/187751/87749239/187751_BRM012098024_IMG_00_0001.jpeg`,
});
houses.push({
  id: 6,
  price: 1995000,
  area: "Digbeth",
  type: "Apartment",
  image: `https://media.rightmove.co.uk/163k/162914/77376585/162914_CAN210196_IMG_01_0000.jpg`,
});

// var bodyParser = require("body-parser");
// app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "")));

app.get("/houses", (req, res) => {
  res.type("application/json");
  //res.append("Access-Control-Allow-Origin", ["*"]);
  res.send(JSON.stringify(houses));
});

app.post("/sms", (req, res) => {
  let message = `A customer name ${req.body.customerName} has requested a viewing of a property No ${req.body.housekey} at ${req.body.date} ${req.body.time}. The customer email is ${req.body.email} and phone number ${req.body.tel} Customer note: ${req.body.msg}`;
  let messageToCustomer = `Hi ${req.body.customerName}! Thank you we have received your enquiry for a viewing of a property No ${req.body.housekey} at ${req.body.date} ${req.body.time}. Your email address is ${req.body.email} and phone number ${req.body.tel}. Your note: ${req.body.msg}. An agent will contact shortly`;
  sendSMS(message, "07581535855"); // Agent number
  sendSMS(messageToCustomer, req.body.tel); //Customer number
  console.log(message);
  res.type("application/json");
  res.send(JSON.stringify("OK"));
});

/*
app.get("/display", (req, res) => {
  res.type('application/json')
  res.append('Access-Control-Allow-Origin', ['*']);
  res.send(JSON.stringify(displayList));
});
app.get("/present", (req, res) => {
  const ticket = req.query.ticket;
  delete displayList[ticket];
  res.type('application/json')
  res.append('Access-Control-Allow-Origin', ['*']);
  res.status(200).send(JSON.stringify("OK")); //Nick added stringify 01/21
});
*/
app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});

//Pass a parameter into here
function sendSMS(msg, phoneNumber) {
  // Prerequisite: install the request package e.g. npm install request

  const request = require("request");
  const apiKey = "sgU1EBOeN88gQEiZr10vFTuVugiJww";

  const sendApiMessage = function (endpoint, messageArgs, callback) {
    return request.post(
      "https://www.firetext.co.uk/api/" + endpoint,
      { form: messageArgs },
      callback
    );
  };

  var endpoint = "sendsms";
  var urlArgs = {
    apiKey: apiKey,
    to: phoneNumber,
    from: "Firetext",
    message: msg, //<-use the same parameter here instead
  };

  sendApiMessage(endpoint, urlArgs, function (error, response, body) {
    if (error) {
      return console.log(error);
    }
    console.log(body);
  });
}
