import { loadStripe } from "@stripe/stripe-js";
import { ProductsProps } from "../types/type";
import { store } from "../lib/store";
import { config } from "../../config";

const CheckoutBtn = ({ products }: { products: ProductsProps[] }) => {
  const { currentUser} = store();
  const publishableKey = "pk_test_51Pd81eJDXuvZobnnS2AfwH5bLgxyI9Jj1L1JxyPU7T3eLwxWmcGernokDLrhCbSzBYxzBQADY1JZhcSfs7Yujiy800G0rc1g8N";
  const stripePromise = loadStripe(publishableKey);

  const handleCheckout = async () => {
    try {
      const stripe = await stripePromise;
      if (!stripe) {
        throw new Error("Stripe.js failed to load.");
      }

      const response = await fetch(`${config.baseUrl}/checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: products,
          email: currentUser?.email,
        }),
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }

      const checkoutSession = await response.json();
      console.log(checkoutSession);

      const result: any = await stripe.redirectToCheckout({ sessionId: checkoutSession.id });
      if (result.error) {
        window.alert(result.error.message);
      }
    } catch (error) {
      console.error("Error during checkout process:", error);
      window.alert("There was an issue with the checkout process. Please try again later.");
    } 
  
  };

  return (
    <div className="mt-6">
      {currentUser ? (
        <button
          onClick={handleCheckout}
          type="submit"
          className="w-full rounded-md border border-transparent bg-gray-800 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-black focus:outline-none focus:ring-2 focus:ring-skyText focus:ring-offset-2 focus:ring-offset-gray-50 duration-200"
        >
          Checkout
        </button>
      ) : (
        <button className="w-full text-base text-white text-center rounded-md border border-transparent bg-gray-500 px-4 py-3 cursor-not-allowed">
          Checkout
        </button>
      )}
      {!currentUser && (
        <p className="mt-2 text-sm font-medium text-red-500 text-center">
          Need to sign in to make checkout
        </p>
      )}
    </div>
  );
};

export default CheckoutBtn;
