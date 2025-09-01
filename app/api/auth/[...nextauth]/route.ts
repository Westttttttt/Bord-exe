import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import { dbConnect } from "@/lib/mongoose";
import { User } from "@/models/User";

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    providers: [Google, GitHub],
    session: { strategy: "jwt" },

    callbacks: {
        async signIn({ user, account }) {
            await dbConnect();

            // Check if user exists
            const existing = await User.findOne({ email: user.email });

            if (!existing) {
                await User.create({
                    name: user.name,
                    email: user.email,
                    image: user.image,
                    provider: account?.provider,
                });
            }

            return true; // allow sign-in
        },

        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },

        async session({ session, token }) {
            if (token?.id && session.user) {
                session.user.id = String(token.id);
            }
            return session;
        },
    },
});
