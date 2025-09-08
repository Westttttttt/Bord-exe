import { getCurrentUser } from "@/actions/auth";
import { auth } from "@/auth";
import { Button } from "./ui/button";
import Link from "next/link";

export default async function Navbar({ session }: { session: any }) {
    return (
        <nav className="w-full h-16 p-2 border-b flex items-center justify-between">
            <Link className="text-lg" href={"/"}>
                <img src={"/black-white-cropped.png"} className="w-22" />
            </Link>
            {!session && (
                <Button>
                    <Link href={"/auth"}>Get Started</Link>
                </Button>
            )}
        </nav>
    );
}
