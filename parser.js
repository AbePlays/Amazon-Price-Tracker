const nightmare = require("nightmare")();

checkPrice();

async function checkPrice() {
  const priceString = await nightmare
    .goto("https://www.amazon.in/dp/B01GGKYS6E")
    .wait("#priceblock_ourprice")
    .evaluate(() => document.getElementById("priceblock_ourprice").innerText)
    .end();

  const priceNumber = parseFloat(priceString.replace("₹", ""));
  if (priceNumber < 700) {
    console.log("It is cheap");
  } else {
    console.log("Expensive");
  }
}
