import { Db, ObjectId } from "mongodb";
import { stripe } from "../lib/stripe.js";

export default {
  Query: {
    orders: async (_, __, { db }: { db: Db }) => {
      const orders = await db.collection("orders").find().toArray();
      return orders;
    },
    order: async (_, { id }, { db }) => {
      try {
        const order = await db
          .collection("orders")
          .findOne({ _id: new ObjectId(id) });
        if (!order) {
          return null;
        }
        return order;
      } catch (error) {
        return null;
      }
    },
  },
  Mutation: {
    async createCheckoutSession(_, { input }, { db }: { db: Db }) {
      try {
        const currentUser = await db.collection("users").findOne({
          kindeUserId: input.kindeUserId,
        });

        if (!currentUser) {
          throw new Error("You must to be logged in to create an order.");
        }

        const configuration = await db.collection("configurations").findOne({
          _id: new ObjectId(input.configurationId),
        });

        if (!configuration) {
          throw new Error("Configuration not found.");
        }

        let order = undefined;

        const existingOrder = await db.collection("orders").findOne({
          userId: currentUser._id,
          configurationId: new ObjectId(input.configurationId),
        });
        if (existingOrder) {
          /* @ts-ignore */
          order = existingOrder;
        } else {
          const newOrderInput = {
            configurationId: new ObjectId(input.configurationId),
            userId: currentUser._id,
            amount: input.amount,
            isPaid: false,
            orderStatus: "awaiting_shipment",
            createdAt: new Date(),
            updatedAt: new Date(),
          };
          const result = await db.collection("orders").insertOne(newOrderInput);
          /* @ts-ignore */
          order = await db
            .collection("orders")
            .findOne({ _id: result.insertedId });
        }

        const product = await stripe.products.create({
          name: "Custom Iphone Case",
          images: [configuration.imgUrl],
          default_price_data: {
            currency: "usd",
            unit_amount: Math.round(input.amount) * 100,
          },
        });
        /* @ts-ignore */
        const session = await stripe.checkout.sessions.create({
          /* @ts-ignore */
          success_url: `${process.env.CLIENT_APP_URL}/thank-you?orderId=${order?._id}`,
          cancel_url: `${process.env.CLIENT_APP_URL}/configure/preview?configurationId=${input.configurationId}`,
          payment_method_types: ["card"],
          mode: "payment",
          shipping_address_collection: {
            allowed_countries: ["VN"],
          },
          metadata: {
            /* @ts-ignore */
            orderId: order?._id?.toString(),
            userId: currentUser._id.toString(),
          },
          line_items: [
            {
              price: product.default_price,
              quantity: 1,
            },
          ],
        });
        /* @ts-ignore */
        return { order, url: session.url };
      } catch (error) {
        console.log("🚀 ~ createCheckoutSession ~ error:", error);
        return null;
      }
    },
  },
  Order: {
    id: (parent) => parent._id,
  },
  User: {
    id: (parent) => {
      console.log("🚀 ~ parent:", parent);
      return parent._id;
    },
  },
};
