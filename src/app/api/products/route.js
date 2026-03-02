import { dbconnect, collections } from "@/lib/dbconnect";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const productsCollection = await dbconnect(collections.PRODUCTS);
        const products = await productsCollection.find({}).toArray();
        
        return NextResponse.json({
            success: true,
            data: products,
            count: products.length
        }, { status: 200 });
        
    } catch (error) {
        console.error("Error fetching products:", error);
        return NextResponse.json({
            success: false,
            message: "Failed to fetch products",
            error: error.message
        }, { status: 500 });
    }
}
