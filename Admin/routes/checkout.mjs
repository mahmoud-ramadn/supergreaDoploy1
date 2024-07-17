import { Router } from "express";
import Stripe from "stripe";
const router = Router();

const stripeSecretKey ="sk_test_51Pd81eJDXuvZobnnncrE67H8LYe20ohI8KtxElJlscslpsbJ6EmXijMSy7nQBrS2vUs56jWA1G40OOZKlRMzTbat008jllPwtk"

router.post("/checkout", async (req, res) => {
  const stripe = new Stripe(stripeSecretKey, {
    apiVersion: "2024-06-20",
  });
  try {
    const { items, email } = await req.body;

    const extractingItems = await items.map((item) => ({
      quantity: item.quantity,
      price_data: {
        currency: "usd",
        unit_amount: item.discountedPrice * 100,
        product_data: {
          name: item.name,
          description: item.description,
          images: item.images,
        },
      },
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: extractingItems,
      mode: "payment",
      success_url:"https://supergreas-doploy1-i84b.vercel.app/success?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "https://supergreas-doploy1-i84b.vercel.app/cancel",
      metadata: {
        email,
      },
    });

    res.json({
      message: "Server is connected",
      success: true,
      id:session.id
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});
export default router;