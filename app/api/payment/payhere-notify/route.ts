import crypto from "crypto";

export default function handler(req, res) {
  const {
    merchant_id,
    order_id,
    payhere_amount,
    payhere_currency,
    status_code,
    md5sig,
  } = req.body;

  const merchant_secret = "MTc2NjI2MDU4ODI4MTAzOTQ2MTg3MzYwODMwNTYxOTMwNDAzOTk2";

  const localMd5Sig = crypto
    .createHash("md5")
    .update(
      merchant_id +
        order_id +
        payhere_amount +
        payhere_currency +
        status_code +
        crypto.createHash("md5").update(merchant_secret).digest("hex").toUpperCase()
    )
    .digest("hex")
    .toUpperCase();

  if (localMd5Sig === md5sig && status_code === "2") {
    console.log("✅ Payment Success:", order_id);
    // update DB here
  } else {
    console.log("❌ Invalid or Failed Payment");
  }

  res.status(200).end(); // Acknowledge PayHere's POST
}
