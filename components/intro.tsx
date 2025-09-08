import ContinueAsGuest from "@/components/continue-as-guest";
import ContinueWithGoogle from "@/components/continue-with-google-button";

export default function Intro() {
    return (
        <div className=" items-center justify-items-center flex flex-col gap-6">
            <img src={"/black-white-cropped.png"} className="w-52 mt-22" />
            <h1 className="text-5xl tracking-wide ">
                Learn. Collaborate. Share Knowledge
            </h1>
            <p className="w-[38rem] text-center text-lg text-neutral-300">
                The ultimate platform for interactive teaching and seamless
                collaboration. Create, share, and learn together in real-time
            </p>
            <div className="flex gap-3 items-center">
                <ContinueWithGoogle content={"Sign In with Google"} />
                <ContinueAsGuest content={"Sign In as Guest"} />
                {/* <Button>Get Started Free</Button> */}
            </div>
        </div>
    );
}
