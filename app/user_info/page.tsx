import { auth } from "@/auth";
import SignOutButton from "@/components/sign-out-button";

export default async function UserInfo() {
    const session = await auth();
    console.log(session)
    if (!session) return <div>Please SignIn fucker</div>;

    return (
        <div>
            <div className="flex items-center gap-2">
                <h1>{session?.user?.name}</h1>
                <img
                    src={session?.user?.image as string}
                    alt={session?.user?.name as string}
                    className="w-32 h-32 rounded-full"
                />
            </div>
            <SignOutButton/>
        </div>
    );
}
