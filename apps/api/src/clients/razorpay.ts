import Razorpay from "razorpay";

const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID;
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET;

if (!RAZORPAY_KEY_ID) {
  throw new Error(
    "RAZORPAY_KEY_ID is required but not set in environment variables. Please configure it in your .env file."
  );
}

if (!RAZORPAY_KEY_SECRET) {
  throw new Error(
    "RAZORPAY_KEY_SECRET is required but not set in environment variables. Please configure it in your .env file."
  );
}

export const rz_instance = new Razorpay({
  key_id: RAZORPAY_KEY_ID,
  key_secret: RAZORPAY_KEY_SECRET,
});
