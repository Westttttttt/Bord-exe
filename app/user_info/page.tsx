import { getCurrentUser } from "@/actions/auth";
import { auth } from "@/auth";
import SignOutButton from "@/components/sign-out-button";
import GuestUserSignoutButton from "./_components/guest-user-sign-out-button";

export default async function UserInfo() {
    const session = await auth();
    let dbUser;
    if (!session) {
        dbUser = await getCurrentUser();
    }

    // Prefer NextAuth session, fallback to guest DB user
    const user = session?.user || dbUser;

    if (!user) {
        return <div>Please sign in</div>;
    }

    const displayName = user.name || user.username || "Anonymous";
    const avatar = user.image || user.profileImage || "/default-avatar.png";

    return (
        <div>
            <div className="flex items-center gap-2">
                <h1>{displayName}</h1>
                <img
                    src={avatar}
                    alt={displayName}
                    className="w-32 h-32 rounded-full"
                />
            </div>

            {session ? <SignOutButton /> : <GuestUserSignoutButton />}
        </div>
    );
}
