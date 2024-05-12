import { db } from "@/db";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: Request) {
    try {
        const body = await req.text();
        const signature = headers().get("stripe-signature");

        if (!signature) {
            return new Response("Invalid signature", { status: 400 });
        }

        const event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        );

        if (event.type === "checkout.session.completed") {
            if (!event.data.object.customer_details?.email) {
                throw new Error("Missing user email");
            }

            const session = event.data.object as Stripe.Checkout.Session;

            const { userId, orderId } = session.metadata || {
                userId: null,
                orderId: null,
            };

            if (!userId || !orderId) {
                throw new Error("Missing metadata");
            }

            const billingAddress = session.customer_details!.address;
            const shippingAddress = session.customer_details!.address;

            await db.order.update({
                where: {
                    id: orderId,
                },
                data: {
                    isPaid: true,
                    billingAddress: {
                        create: {
                            name: session.customer_details!.name!,
                            city: billingAddress!.city!,
                            country: billingAddress!.country!,
                            postalCode: billingAddress!.postal_code!,
                            state: billingAddress!.state!,
                            street: billingAddress!.line1!,
                        },
                    },
                    shippingAddress: {
                        create: {
                            name: session.customer_details!.name!,
                            city: shippingAddress!.city!,
                            country: shippingAddress!.country!,
                            postalCode: shippingAddress!.postal_code!,
                            state: shippingAddress!.state!,
                            street: shippingAddress!.line1!,
                        },
                    },
                },
            });
        }
        return NextResponse.json({ result: event, ok: true });
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            {
                message: "something went wrong",
                ok: false,
            },
            {
                status: 500,
            }
        );
    }
}
