"use server";

import { auth, signIn, signOut } from "@/auth";
import { dbConnect } from "@/lib/mongoose";
import { IUser, User } from "@/models/User";
import { nanoid } from "nanoid";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { DecodedTokenValue } from "@/types/type";
import { NextRequest, NextResponse } from "next/server";

const AUTH_SECRET = process.env.AUTH_SECRET;
if (!AUTH_SECRET) {
    throw new Error("Please define AUTH_SECRET in .env.local");
}

export async function login() {
    await signIn("google", { redirectTo: "/" });
}

export async function logout() {
    await signOut({ redirectTo: "/" });
}

export async function createGuestUser() {
    try {
        await dbConnect();
        console.log("Execute");
        const guestUser: IUser = await User.create<
            Pick<IUser, "username" | "profileImage" | "provider" | "isGuest">
        >({
            username: `Guest-${nanoid(6)}`,
            provider: "guest",
            isGuest: true,
        });

        const token = jwt.sign(
            {
                id: String(guestUser._id),
                username: guestUser.username,
                provider: "guest",
                isGuest: true,
            },
            process.env.AUTH_SECRET!,
            { expiresIn: "7d" }
        );

        const cookieStore = await cookies();
        cookieStore.set?.("next-auth-session-token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            path: "/",
        });
        console.log(guestUser);
        console.log(typeof guestUser);

        return {
            success: true,
            user: JSON.parse(JSON.stringify(guestUser.toObject())),
        };
    } catch (error) {
        // console.log("Error creating guest user",error);
        error instanceof Error
            ? console.log("Error creating guest user", error.message)
            : console.log("Something went wrong creating the guest user");
    }
}

export async function getCurrentUser() {
    try {
        await dbConnect();
        const cookieStore = await cookies();

        const token = cookieStore.get("next-auth-session-token")?.value;

        if (!token) {
            throw new Error("Unauthorized, Token is required");
        }

        const decodedToken = jwt.decode(token) as DecodedTokenValue;
        if (!decodedToken) {
            throw new Error("Decoded token is missing");
        }

        const user = await User.findById(decodedToken.id);
        if (!user) {
            throw new Error("User not found");
        }

        return user;
    } catch (error) {
        console.log("Something went wrong while getting the current user");
        // throw new Error("Error while getting the current user");
    }
}

export async function signOutGuestUser() {
    try {
        const cookieStore = await cookies();

        cookieStore.delete("next-auth-session-token");
    } catch (error) {
        error instanceof Error
            ? console.log("Error signout guest user", error.message)
            : console.log("Something went wrong signing out the guest user");
    }
}

export async function getUserByEmail(email: string) {
    try {
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error("User not found");
        }

        return user;
    } catch (error) {
        error instanceof Error
            ? console.log("Error getting user by email", error.message)
            : console.log("Something went wrong getting the user by email");
    }
}

export async function currentLoginUser() {
    let user = null;

    const session = await auth();
    if (session) {
        user = await getUserByEmail(session.user?.email as string);
        return user;
    }
    const guest = await getCurrentUser();
    if (guest) {
        user = guest;
        return user;
    }

    return user;
}
