"use client";

import { login } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { BsGoogle } from "react-icons/bs";

export default function ContinueWithGoogle() {
    return (
        <Button
            className="bg-neutral-800 text-white hover:bg-neutral-800 hover:opacity-85 border border-neutral-700"
            onClick={() => login()}
        >
            <BsGoogle /> Continue with Google
        </Button>
    );
}
