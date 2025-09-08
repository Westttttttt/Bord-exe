import { currentLoginUser } from "@/actions/auth";
import { auth } from "@/auth";
import Intro from "@/components/intro";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BsPlus } from "react-icons/bs";
import CreateNewBoard from "./_components/create-new-board";

export default async function Home() {
    const user = await currentLoginUser();
    console.log(user);

    if (user) {
        return (
            <div className="pt-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-xl">Dashboard</h1>
                    <CreateNewBoard/>
                </div>
            </div>
        );
    }

    return <div>{!user && <Intro />}</div>;
}
