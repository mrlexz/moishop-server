import Stripe from "stripe";
import { stripe } from "../lib/stripe.js";
import dotenv from "dotenv";
import BillingAddress from "../models/billingAddress.model.js";
import ShippingAddress from "../models/shippingAddress.model.js";
import Order from "../models/order.model.js";
import { sendEmail } from "../lib/sendEmail.js";
import mustache from "mustache";
// import thankYouEmail from "../templates/thankyouEmail.html";

dotenv.config();

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET_KEY!;

const buildHTLMThankYouEmail = (data: Record<string, string>) => {
  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
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
                      <p style="font-size:15px;line-height:2;margin:0;font-weight:bold">Shipping to: ${
                        data.name
                      }</p>
                      <p style="font-size:14px;line-height:2;margin:0;color:#747474;font-weight:500">${
                        data.street
                      }, ${data.city}, ${data.state}, ${data.postalCode}</p>
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
                          <tr style="width:100%; display: flex;justify-content: space-between;">
                            <td data-id="__react-email-column" style="width:170px">
                              <p style="font-size:14px;line-height:2;margin:0;font-weight:bold">Order Number</p>
                              <p style="font-size:14px;line-height:1.4;margin:12px 0 0 0;font-weight:500;color:#6F6F6F">${
                                data.orderId
                              }</p>
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
  </html>`;
};

export const paymentSuccess = async (request, response) => {
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

        const { data, error } = await sendEmail({
          emailFrom: `CaseMoiShop <${process.env.EMAIL_SENDER}>`,
          emailTo: session.customer_details!.email!,
          subject: "Thanks for your order! 🎉",
          html: buildHTLMThankYouEmail({
            name: newShippingAddress.name ?? "",
            street: newShippingAddress.street ?? "",
            city: newShippingAddress.city ?? "",
            state: newShippingAddress.state ?? "",
            postalCode: newShippingAddress.postalCode ?? "",
            orderId: orderId,
          }),
          // html: mustache.render()
        });

        console.log("🚀 ~ paymentSuccess ~ data:", data);
        console.log("🚀 ~ paymentSuccess ~ error:", error);

        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

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
};
