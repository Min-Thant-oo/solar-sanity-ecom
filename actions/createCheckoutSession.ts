'use server'

import { BasketItem } from "@/app/(store)/store";

export type Metadata = {
    orderNumber: string;
    customerName: string;
    customerEmail: string;
    clerkUserId: string;
};

export type GroupedBasketItem = {
    product: BasketItem["product"];
    quantity: number;
};

export async function createCheckoutSession(
    items: GroupedBasketItem[],
    metadata: Metadata
) {
    try {
        // check if any grouped items don't have a price
        const itemsWithoutPrice = items.filter((item) => !item.product.price);
        if(itemsWithoutPrice.length > 0) {
            throw new Error("Some item do not have a price.");
        } 
    } catch (error) {
        console.error("Error creating checkout session:", error);
        throw error;
    }
}