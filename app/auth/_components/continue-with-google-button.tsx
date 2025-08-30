"use client";

import { login } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { BsGoogle } from "react-icons/bs";

export default function ContinueWithGoogle() {
    return (
        <Button
            className="bg-gray-800 text-white hover:bg-gray-800 hover:opacity-85 border border-gray-700"
            onClick={() => login()}
        >
            <BsGoogle /> Continue with Google
        </Button>
    );
}
