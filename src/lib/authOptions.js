import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "./mongodb";
import { connectDB } from "./dbconnect";
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("দয়া করে ইমেইল এবং পাসওয়ার্ড প্রদান করুন");
        }

        try {
          const db = await connectDB();
          const user = await db.collection("users").findOne({ 
            email: credentials.email 
          });

          if (!user) {
            throw new Error("এই ইমেইল দিয়ে কোন অ্যাকাউন্ট পাওয়া যায়নি");
          }

          // Check if user registered with Google OAuth
          if (!user.password) {
            throw new Error("এই অ্যাকাউন্টটি Google দিয়ে তৈরি করা হয়েছে। দয়া করে Google দিয়ে লগইন করুন");
          }

          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isPasswordValid) {
            throw new Error("ভুল পাসওয়ার্ড");
          }

          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            image: user.image || null,
          };
        } catch (error) {
          throw new Error(error.message);
        }
      }
    })
  ],
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: "/routes/login",
    error: "/routes/login",
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account.provider === "google") {
        try {
          const db = await connectDB();
          const existingUser = await db.collection("users").findOne({ 
            email: user.email 
          });

          if (!existingUser) {
            await db.collection("users").insertOne({
              name: user.name,
              email: user.email,
              image: user.image,
              provider: "google",
              createdAt: new Date(),
              updatedAt: new Date(),
            });
          }
        } catch (error) {
          console.error("Error in signIn callback:", error);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
      }
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
};
