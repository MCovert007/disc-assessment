import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useRouter } from "next/router";
import axios from "axios";
import React from "react";
import { signIn, useSession } from "next-auth/react";

interface Props{
  clientId: string;
  price: string;
  product : string;
}

export default function Paypal({clientId, price, product}:Props) {
  
  const { data: session } = useSession();
  const user : any = session?.user

  return (
    <React.Fragment>
    {
      clientId !== "" &&
      <div className="w-[280px] mx-auto">
        <PayPalScriptProvider
          options={{
            clientId: clientId,
            currency: 'USD',
            intent: 'capture'
          }}
        >
          <PayPalButtons
            style={{
              disableMaxWidth:true,
              color:"blue",
              layout:"horizontal",
              shape:"rect",
              label:"buynow",
              height:30
            }}
            createOrder={(data, actions) => {
                return actions.order.create({
                purchase_units: [{
                    amount: {
                        currency_code: "USD",
                        value: `${price}` // Can be dynamic based on the cart total
                    }
                }],
                intent: "CAPTURE"
                });
            }}
            onApprove={(data, actions:any) => {
              return actions.order.capture().then(async (details:any) => {
                const orderData = {
                  email : user?.email,
                  name : user?.name,
                  paymentOrderId : details.id,
                  paymentEmail : details.payer.email_address,
                  paymentName : details.payer.name.given_name + " " + details.payer.name.surname, 
                  units : details["purchase_units"][0].amount.value, 
                  currencyCode : details["purchase_units"][0].amount.currency_code,
                  gateway : "Paypal",
                  status : details.status,
                  real : (details.links[0].href.search("api.sandbox.paypal")>-1)?false:true,
                  create_time : details.create_time,
                  update_time : details.update_time,
                  productName : product,
                  buyResult : false
                }
                const response = await axios.post("/api/db/payments", orderData)
                await signIn('credentials', { callbackUrl:  product==="Detailed Report"?"/report/individual":product==="One-on-One Comparison"?"/report/one-on-one":"/", redirect: true, email:user?.email, password:user?.password });
                // window.location.href = "/report";
                // Here, you can handle the final transaction confirmation and update your database
              });
            }}
            onError={(err) => {
              console.error("PayPal Checkout onError", err);
            }}
          />
        </PayPalScriptProvider>
      </div>
    }
    </React.Fragment>
  );
}