"use client";

import { createGuestUser } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { CgProfile } from "react-icons/cg";

export default function ContinueAsGuest() {
    return (
        <Button
            className="bg-neutral-800 text-white hover:bg-neutral-800 border border-neutral-700 flex items-center gap-2 hover:opacity-85"
            onClick={createGuestUser}
        >
            <CgProfile className="text-lg" />
            Continue as Guest
        </Button>
    );
}
