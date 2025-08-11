import crypto from "crypto";

export async function POST(request: Request) {
  
  const req = await request.json();

  const merchant_id = "1231292";
  const order_id = req.order_id;
  const amount = req.amount;
  const currency = req.currency;
  const merchant_secret =
    "MTc2NjI2MDU4ODI4MTAzOTQ2MTg3MzYwODMwNTYxOTMwNDAzOTk2";

  const secretHash = crypto
    .createHash("md5")
    .update(merchant_secret)
    .digest("hex")
    .toUpperCase();

  const hashString = merchant_id + order_id + amount + currency + secretHash;

  const hash = crypto
    .createHash("md5")
    .update(hashString)
    .digest("hex")
    .toUpperCase();

  // const payment = {
  //   sandbox: true,
  //   merchant_id,
  //   return_url: "https://www.buildmarketlk.com/",
  //   cancel_url: "https://www.buildmarketlk.com/",
  //   notify_url: "https://yourdomain.com/api/payhere-notify", // Replace with your actual URL
  //   order_id,
  //   items: "Door bell wireless",
  //   amount,
  //   currency,
  //   hash,
  //   first_name: "Saman",
  //   last_name: "Perera",
  //   email: "samanp@gmail.com",
  //   phone: "0771234567",
  //   address: "No.1, Galle Road",
  //   city: "Colombo",
  //   country: "Sri Lanka",
  //   delivery_address: "No. 46, Galle road, Kalutara South",
  //   delivery_city: "Kalutara",
  //   delivery_country: "Sri Lanka",
  //   custom_1: "",
  //   custom_2: "",
  // };

  const payment = {
    sandbox: true,
    merchant_id,
    return_url: "https://www.buildmarketlk.com/",
    cancel_url: "https://www.buildmarketlk.com/",
    notify_url: "https://www.buildmarketlk.com/",
    first_name: req.first_name,
    last_name: req.last_name,
    email: req.email,
    phone: req.phone,
    address: req.address,
    city: req.city,
    country: req.country,
    order_id,
    items: req.items,
    currency,
    amount,
    hash,
  };

  return new Response(JSON.stringify(payment), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
