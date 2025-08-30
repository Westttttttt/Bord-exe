import { login } from "@/actions/auth";
import { auth } from "@/auth";
import SignInButton from "@/components/SignInButton";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {
    const session = await auth();

    if (session?.user) {
        return (
            <div>
                <Link href="/user_info">User Info</Link>
            </div>
        );
    }

    return (
        <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
            <p>Your are not signed in</p>
            <SignInButton />
        </div>
    );
}
