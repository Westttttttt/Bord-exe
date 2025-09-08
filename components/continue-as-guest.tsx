"use client";

import { createGuestUser } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { CgProfile } from "react-icons/cg";

export default function ContinueAsGuest({
    content = "Continue as Guest",
}: {
    content?: string;
}) {
    const router = useRouter();

    async function handleSignin() {
        const res: { success: boolean; user: any } | undefined =
            await createGuestUser();
        if (res?.success) {
            router.push("/user_info");
        }
    }
    return (
        <Button
            className="bg-neutral-800 text-white hover:bg-neutral-800 border border-neutral-700 flex items-center gap-2 hover:opacity-85"
            onClick={handleSignin}
        >
            <CgProfile className="text-lg" />
            {content}
        </Button>
    );
}
