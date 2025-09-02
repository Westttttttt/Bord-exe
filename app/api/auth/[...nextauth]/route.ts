import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import { dbConnect } from "@/lib/mongoose";
import { IUser, User } from "@/models/User";

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
                await User.create<
                    Pick<
                        IUser,
                        | "username"
                        | "profileImage"
                        | "provider"
                        | "isGuest"
                        | "email"
                    >
                >({
                    username: user.name,
                    email: user.email,
                    profileImage: user.image,
                    provider: account?.provider,
                    isGuest: false,
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
