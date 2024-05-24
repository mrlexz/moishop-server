import express from "express";
import { Resend } from "resend";

import { ApolloServer } from "apollo-server-express";
import mergeTypeDefs from "./schema/index.js";
import resolvers from "./resolvers/index.js";
import dotenv from "dotenv";
import { MongoClient, ServerApiVersion } from "mongodb";
import cors from "cors";
import { stripe } from "./lib/stripe.js";
import { connectDB } from "./db/connect.js";
import Stripe from "stripe";
import BillingAddress from "./models/billingAddress.model.js";
import ShippingAddress from "./models/shippingAddress.model.js";
import Order from "./models/order.model.js";
// import kindeNode from "@kinde-oss/kinde-node";

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET_KEY!;
const resend = new Resend(process.env.RESEND_API_KEY);

dotenv.config();

const uri = process.env.DB_URI!;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const app = express() as any;

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post(
  "/api/webhooks",
  express.raw({ type: "application/json" }),
  async (request, response) => {
    try {
      const sig = request.headers["stripe-signature"];

      let event: null | Stripe.Event;

      try {
        event = stripe.webhooks.constructEvent(
          request.body,
          sig!,
          endpointSecret
        );
      } catch (err) {
        response.status(400).send(`Webhook Error: ${err.message}`);
        return;
      }

      // Handle the event
      if (!event) {
        throw new Error("Event is not defined");
      }

      switch (event.type) {
        case "checkout.session.completed":
          if (!event.data.object.customer_details?.email) {
            throw new Error("Email is not defined");
          }

          const session = event.data.object as Stripe.Checkout.Session;

          const { userId, orderId } = session.metadata || {
            userId: null,
            orderId: null,
          };

          if (!userId || !orderId) {
            throw new Error("User or Order Id is not defined");
          }

          const billingAddress = session.customer_details!.address;
          const shippingAddress = session.shipping_details!.address;

          const newBillingAddress = new BillingAddress({
            name: session.customer_details!.name,
            city: billingAddress!.city,
            country: billingAddress!.country,
            street: billingAddress!.line1,
            postalCode: billingAddress!.postal_code,
            createdAt: new Date(),
            updatedAt: new Date(),
            state: billingAddress!.state,
          });

          const newBillingData = await newBillingAddress.save();

          const newShippingAddress = new ShippingAddress({
            name: session.customer_details!.name,
            city: shippingAddress!.city,
            country: shippingAddress!.country,
            street: shippingAddress!.line1,
            postalCode: shippingAddress!.postal_code,
            createdAt: new Date(),
            updatedAt: new Date(),
            state: shippingAddress!.state,
          });

          const newShippingData = await newShippingAddress.save();

          await Order.findOneAndUpdate(
            {
              _id: orderId,
            },
            {
              isPaid: true,
              billingAddressId: newBillingData._id,
              shippingAddressId: newShippingData._id,
              updatedAt: new Date(),
            }
          );

          const { data, error } = await resend.emails.send({
            from: `CaseMoiShop <${process.env.EMAIL_SENDER}>`,
            to: [event.data.object.customer_details?.email],
            subject: "Thanks for your order! 🎉",
            html: `
            <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html dir="ltr" lang="en">

  <head>
    <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
    <meta name="x-apple-disable-message-reformatting" />
  </head>
  <div style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0">Your order summary and estimated delivery date<div> ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿</div>
  </div>

  <body style="background-color:#ffffff;font-family:-apple-system,BlinkMacSystemFont,&quot;Segoe UI&quot;,Roboto,Oxygen-Sans,Ubuntu,Cantarell,&quot;Helvetica Neue&quot;,sans-serif">
    <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="max-width:100%;margin:10px auto;width:600px;border:1px solid #E5E5E5">
      <tbody>
        <tr style="width:100%">
          <td>
            <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="padding:40px 74px;text-align:center">
              <tbody>
                <tr>
                  <td><img alt="delivery snake" height="73" src="https://utfs.io/f/5a961d8e-b6b8-48f9-9913-011539c308be-m66lnh.png" style="display:block;outline:none;border:none;text-decoration:none;margin:auto" width="65" />
                    <h1 style="font-size:32px;line-height:1.3;font-weight:700;text-align:center;letter-spacing:-1px">Thank you for your order!</h1>
                    <p style="font-size:14px;line-height:2;margin:0;color:#747474;font-weight:500">We&#x27;re preparing everything for delivery and will notify you once your package has been shipped. Delivery usually takes 2 days.</p>
                    <p style="font-size:14px;line-height:2;margin:0;color:#747474;font-weight:500;margin-top:24px">If you have any questions regarding your order, please feel free to contact us with your order number and we&#x27;re here to help.</p>
                  </td>
                </tr>
              </tbody>
            </table>
            <hr style="width:100%;border:none;border-top:1px solid #eaeaea;border-color:#E5E5E5;margin:0" />
            <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="padding-left:40px;padding-right:40px;padding-top:22px;padding-bottom:22px">
              <tbody>
                <tr>
                  <td>
                    <p style="font-size:15px;line-height:2;margin:0;font-weight:bold">Shipping to:${
                      newShippingData.name
                    }</p>
                    <p style="font-size:14px;line-height:2;margin:0;color:#747474;font-weight:500">${
                      newShippingData.street
                    }, ${newShippingData.city},{' '}
                    ${newShippingData.state} ${newShippingData.postalCode}</p>
                  </td>
                </tr>
              </tbody>
            </table>
            <hr style="width:100%;border:none;border-top:1px solid #eaeaea;border-color:#E5E5E5;margin:0" />
            <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="padding-left:40px;padding-right:40px;padding-top:22px;padding-bottom:22px">
              <tbody>
                <tr>
                  <td>
                    <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="display:inline-flex gap-16;margin-bottom:40px">
                      <tbody style="width:100%">
                        <tr style="width:100%">
                          <td data-id="__react-email-column" style="width:170px">
                            <p style="font-size:14px;line-height:2;margin:0;font-weight:bold">Order Number</p>
                            <p style="font-size:14px;line-height:1.4;margin:12px 0 0 0;font-weight:500;color:#6F6F6F">${orderId}</p>
                          </td>
                          <td data-id="__react-email-column" style="margin-left:20px">
                            <p style="font-size:14px;line-height:2;margin:0;font-weight:bold">Order Date</p>
                            <p style="font-size:14px;line-height:1.4;margin:12px 0 0 0;font-weight:500;color:#6F6F6F">${new Date().toDateString()}</p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
            <hr style="width:100%;border:none;border-top:1px solid #eaeaea;border-color:#E5E5E5;margin:0" />
            <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="padding-top:22px;padding-bottom:22px">
              <tbody>
                <tr>
                  <td>
                    <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation">
                      <tbody style="width:100%">
                        <tr style="width:100%">
                          <p style="font-size:13px;line-height:24px;margin:0;color:#AFAFAF;text-align:center;padding-top:30px;padding-bottom:30px">Please contact us if you have any questions. (If you reply to this email, we won&#x27;t be able to see it.)</p>
                        </tr>
                      </tbody>
                    </table>
                    <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation">
                      <tbody style="width:100%">
                        <tr style="width:100%">
                          <p style="font-size:13px;line-height:24px;margin:0;color:#AFAFAF;text-align:center">© CaseMoiShop, Inc. All Rights Reserved.</p>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  </body>

</html>
            `,
          });

          console.log(data, error);

          break;
        default:
          console.log(`Unhandled event type ${event.type}`);
      }

      // Return a 200 response to acknowledge receipt of the event
      response.send({
        event,
        ok: true,
      });
    } catch (error) {
      response.send({
        message: "Something went wrong",
        ok: false,
      });
    }
  }
);

(async () => {
  try {
    await connectDB();
    await client.connect();
    console.log(
      "👉 Pinged your deployment. You successfully connected to MongoDB! 👈"
    );
    const db = client.db(process.env.DB_NAME!);

    const server = new ApolloServer({
      typeDefs: mergeTypeDefs,
      resolvers,
      context: async ({ req }) => {
        const kindeUserId = req.headers.kinde_user_id;
        return { db, kindeUserId };
      },
    });

    await server.start();
    server.applyMiddleware({ app });

    const PORT: string | number = 4000;

    app.listen(PORT, () => {
      console.log(
        `🚀🚀🚀  Server ready at http://localhost:${PORT}${server.graphqlPath}`
      );
    });
  } catch (err) {
    console.log("😱😱😱😱😱 ~ Somethings ain't right:", err);
  } finally {
    // await client.close();
  }
})();
