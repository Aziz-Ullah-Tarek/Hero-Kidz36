import { NextResponse } from "next/server";
import { connectDB } from "@/lib/dbconnect";
import bcrypt from "bcryptjs";

export async function POST(request) {
  try {
    const { name, email, password } = await request.json();

    // Validation
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "সকল ফিল্ড পূরণ করুন" },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "সঠিক ইমেইল প্রদান করুন" },
        { status: 400 }
      );
    }

    // Password validation
    if (password.length < 6) {
      return NextResponse.json(
        { error: "পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে" },
        { status: 400 }
      );
    }

    // Connect to database
    const db = await connectDB();

    // Check if user already exists
    const existingUser = await db.collection("users").findOne({ email });
    
    if (existingUser) {
      return NextResponse.json(
        { error: "এই ইমেইল দিয়ে ইতিমধ্যে একটি অ্যাকাউন্ট আছে" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const result = await db.collection("users").insertOne({
      name,
      email,
      password: hashedPassword,
      provider: "credentials",
      image: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return NextResponse.json(
      { 
        message: "রেজিস্ট্রেশন সফল হয়েছে! এখন লগইন করুন",
        userId: result.insertedId 
      },
      { status: 201 }
    );

  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "রেজিস্ট্রেশন করতে সমস্যা হয়েছে। আবার চেষ্টা করুন" },
      { status: 500 }
    );
  }
}
