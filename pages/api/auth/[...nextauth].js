import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../lib/mongodb";
import Google from "next-auth/providers/google";

export default NextAuth({
  providers: [
    // Google
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          redirect_uri: "https://theraacake.onrender.com/api/auth/callback/google",
          prompt: "consent",
          scope: "email",
        },
      },
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      authorization: {
        params: {
          redirect_uri: "https://theracakee.onrender.com/api/auth/callback/facebook",
          prompt: "consent",
          // access_type: "offline",
          scope: "email",
       
        },
      },
    }),
  ],
  debug: true,
  secret: process.env.NEXTAUTH_SECRET,
  adapter: MongoDBAdapter(clientPromise),
  callbacks: {
    async session({ session, token, user }) {
      session.user._id = user.id;
      return session;
    },
  },
  // session: {
  //   strategy: "database",
  //   maxAge: 30 * 24 * 60 * 60
  // }
});
