"use client";

import { signOutGuestUser } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function GuestUserSignoutButton() {
    const router = useRouter();

    async function handleSignOut() {
        await signOutGuestUser();
        router.push("/auth");
    }

    return <Button onClick={handleSignOut}>Sign out</Button>;
}
