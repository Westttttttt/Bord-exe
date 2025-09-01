"use server";

import { signIn, signOut } from "@/auth";
import { dbConnect } from "@/lib/mongoose";
import { User } from "@/models/User";
import { nanoid } from "nanoid";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function login() {
    await signIn("google", { redirectTo: "/" });
}

export async function logout() {
    await signOut({ redirectTo: "/" });
}

export async function createGuestUser() {
    await dbConnect();
    console.log("Execute");
    const guestUser = await User.create({
        name: `Guest-${nanoid(6)}`,
        provider: "guest",
        isGuest: true,
    });

    const token = jwt.sign(
        {
            id: guestUser._id.toString(),
            name: guestUser.name,
            provider: "guest",
            isGuest: true,
        },
        process.env.AUTH_SECRET!,
        { expiresIn: "7d" }
    );

    const cookieStore = await cookies();
    cookieStore.set?.("next-auth.session-token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
    });

    // return guestUser;
}
