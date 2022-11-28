import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../lib/mongodb";
export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.JWT_SECRET,
  adapter: MongoDBAdapter(clientPromise),
  callbacks: {
    async session({session, token, user}) {
      session.user._id = user.id;
      return session
    }
  },
  // session: {
  //   strategy: "database",
  //   maxAge: 30 * 24 * 60 * 60
  // }
});
