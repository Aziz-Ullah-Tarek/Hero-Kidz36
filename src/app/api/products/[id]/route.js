import { dbconnect, collections, ObjectId } from "@/lib/dbconnect";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    try {
        const { id } = params;
        
        if (!id) {
            return NextResponse.json({
                success: false,
                message: "Product ID is required"
            }, { status: 400 });
        }

        const productsCollection = await dbconnect(collections.PRODUCTS);
        
        // Try to find by MongoDB ObjectId first
        let product;
        if (ObjectId.isValid(id)) {
            product = await productsCollection.findOne({ _id: new ObjectId(id) });
        }
        
        // If not found by ObjectId, try to find by custom id field
        if (!product) {
            product = await productsCollection.findOne({ id: id });
        }

        if (!product) {
            return NextResponse.json({
                success: false,
                message: "Product not found"
            }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            data: product
        }, { status: 200 });
        
    } catch (error) {
        console.error("Error fetching product:", error);
        return NextResponse.json({
            success: false,
            message: "Failed to fetch product",
            error: error.message
        }, { status: 500 });
    }
}
