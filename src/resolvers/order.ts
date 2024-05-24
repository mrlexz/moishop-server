import { Db, ObjectId } from "mongodb";
import { stripe } from "../lib/stripe.js";
import Order from "../models/order.model.js";
import User from "../models/user.model.js";
import Configuration from "../models/configuration.model.js";
import BillingAddress from "../models/billingAddress.model.js";
import ShippingAddress from "../models/shippingAddress.model.js";

export default {
  Query: {
    orders: async (_, __) => {
      const orders = await Order.find();
      return orders;
    },
    order: async (_, { id }) => {
      try {
        const order = await Order.findOne({ _id: new ObjectId(id) });
        if (!order) {
          return null;
        }
        return order;
      } catch (error) {
        return null;
      }
    },
    paymentStatus: async (_, { orderId }, { kindeUserId }) => {
      try {
        const user = await User.findOne({
          kindeUserId,
        });

        if (!user) {
          throw new Error("You must to be logged in to continue.");
        }

        const order = await Order.findOne({ _id: new ObjectId(orderId) });
        if (!order) {
          return {
            order: null,
            status: false,
          };
        }
        return {
          order,
          status: true,
        };
      } catch (error) {
        return {
          order: null,
          status: false,
        };
      }
    },
  },
  Mutation: {
    async createCheckoutSession(_, { input }) {
      try {
        const currentUser = await User.findOne({
          kindeUserId: input.kindeUserId,
        });
        console.log(
          "🚀 ~ createCheckoutSession ~ currentUser:",
          currentUser?._id
        );

        if (!currentUser) {
          throw new Error("You must to be logged in to create an order.");
        }

        const configuration = await Configuration.findOne({
          _id: new ObjectId(input.configurationId),
        });

        if (!configuration) {
          throw new Error("Configuration not found.");
        }

        let order = undefined;

        const existingOrder = await Order.findOne({
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

          const newOrder = new Order(newOrderInput);

          const result = await newOrder.save();
          console.log("🚀 ~ createCheckoutSession ~ result:", result);

          /* @ts-ignore */
          order = await Order.findOne({ _id: result._id });
        }

        const product = await stripe.products.create({
          name: "Custom Iphone Case",
          images: [configuration.imgUrl!],
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
    user: async (parent) => {
      try {
        return await User.findOne({ _id: parent.userId });
      } catch (error) {
        return null;
      }
    },
    configuration: async (parent) => {
      try {
        return await Configuration.findOne({ _id: parent.configurationId });
      } catch (error) {
        return null;
      }
    },
    billingAddress: async (parent) => {
      try {
        return await BillingAddress.findOne({ _id: parent.billingAddressId });
      } catch (error) {
        return null;
      }
    },
    shippingAddress: async (parent) => {
      try {
        return await ShippingAddress.findOne({
          _id: parent.shippingAddressId,
        });
      } catch (error) {
        return null;
      }
    },
  },
};
