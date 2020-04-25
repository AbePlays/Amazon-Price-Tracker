require("dotenv").config();
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const nightmare = require("nightmare")();

const arguments = process.argv.slice(2);
const url = arguments[0];
const price = arguments[1];
// ("https://www.amazon.in/dp/B01GGKYS6E");

checkPrice();

async function checkPrice() {
  const priceString = await nightmare
    .goto(url)
    .wait("#priceblock_ourprice")
    .evaluate(() => document.getElementById("priceblock_ourprice").innerText)
    .end();

  const priceNumber = parseFloat(priceString.replace("₹", ""));
  if (priceNumber < price) {
    console.log("It is cheap");
  } else {
    console.log("Expensive");
  }
}
