import NextAuth from "next-auth";
import { UserRole } from "@prisma/client";
import { PrismaAdapter } from "@auth/prisma-adapter";

import { db } from "@/lib/db";
import authConfig from "@/auth.config";
import { getUserById } from "@/data/user";
import { getAccountByUserId } from "./data/account";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
  update,
} = NextAuth({
  pages: {
    //redirects in case of sign-in error and general error
    signIn: "/auth/login",
    error: "/auth/error",
  },
  events: {
    //async linkAccount({ user }) {
    async linkAccount(params) {
      //on creation of OAuth accout add emailVerified
      console.log("params from linkAccount: ", params);

      //ADD HERE STORE NAME
      await db.user.update({
        //where: { id: user.id },
        where: { id: params.user.id },
        data: {
          emailVerified: new Date(),
          storeName: params?.user?.name
            ? params?.user?.name + "'s store"
            : "New store",
        },
      });
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      /*  console.log(
        "user, account from signIn calback: ",
        new Date(),
        user,
        account
      ); */
      // Allow OAuth without email verification
      if (account?.provider !== "credentials") return true;

      const existingUser = await getUserById(user.id);

      // Prevent sign in without email verification
      if (!existingUser?.emailVerified) return false;

      return true;
    },

    async jwt({ token }) {
      if (!token.sub) return token; //if logged out
      //console.log("token from jwt calback: ", new Date(), { token });
      const existingUser = await getUserById(token.sub); //sub is id in DB

      if (!existingUser) return token;

      const existingAccount = await getAccountByUserId(existingUser.id);
      // console.log("existingAccount from jwt calback: ", existingAccount);

      token.isOAuth = !!existingAccount; //only OAuth user have accounts in DB
      token.name = existingUser.name;
      token.storeName = existingUser.storeName;
      token.image = existingUser.image;
      token.email = existingUser.email;
      token.role = existingUser.role;

      return token;
    },

    //session is executed after JWT
    async session({ token, session }) {
      //console.log("token from session callback: ", new Date(), token);
      //console.log(" session from session callback: ", new Date(), session);
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }

      if (session.user) {
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
      }

      if (session.user) {
        session.user.name = token.name;
        session.user.storeName = token.storeName as string;
        session.user.image = token.image as string;
        session.user.email = token.email;
        session.user.isOAuth = token.isOAuth as boolean;
      }

      return session;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  //in prisma we cannnot use DB session, because of edge functions, so addition of prisma is done separetely
  ...authConfig,
});
