import ContinueWithGoogle from "../../components/continue-with-google-button";
import ContinueAsGuest from "../../components/continue-as-guest";

export default function AuthPage() {
    return (
        <div className="flex w-full min-h-screen items-center justify-center">
            <div className="w-[400px] p-8 rounded-2xl bg-neutral-900 shadow-lg flex flex-col gap-6">
                <img
                    src="/croped-board-exe.png"
                    className="w-42 object-cover mx-auto cursor-pointer hover:scale-105 duration-200 transition-all"
                />
                <div>
                    <h2 className="text-2xl font-semibold text-center text-white">
                        Welcome
                    </h2>
                    <p className="text-sm text-neutral-400 text-center">
                        Choose how you&apos;d like to continue
                    </p>
                </div>

                <div className="flex flex-col gap-4 w-full">
                    {/* Google login */}
                    <ContinueWithGoogle />

                    {/* Guest login */}
                    <ContinueAsGuest />

                    {/* Optional GitHub button */}
                    {/* 
                    <Button className="bg-gray-800 text-white hover:bg-gray-700 border border-gray-700 flex items-center gap-2">
                        <FaGithub className="text-lg" />
                        Continue with GitHub
                    </Button> 
                    */}
                </div>
            </div>
        </div>
    );
}
