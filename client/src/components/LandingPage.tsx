import { Link } from "react-router-dom";

export function LandingPage() {
    return (
        <div
            className=" py-2 h-full grid"
            style={{
                background: "linear-gradient(90deg, #667eea 0%, #764ba2 100%)",
            }}
        >
            <div className="container mx-auto px-6 grid ">
                <div className="self-center">
                    <p className="text-4xl lg:text-8xl text-center font-bold mb-2 text-white">
                        Track time.
                    </p>
                    <p className="text-4xl lg:text-8xl text-center font-bold mb-2 text-white animate-motion delay-150 opacity-0">
                        Build habits.
                    </p>
                    <p className="text-4xl lg:text-8xl text-center font-bold mb-2 text-white animate-motion-far delay-300 opacity-0">
                        Make progress.
                    </p>
                </div>

                <Link to="/sign-up" className="bg-white font-bold rounded-full mt-4 py-4 px-8 lg:py-8 lg:px-16 lg:text-3xl h-min shadow-lg uppercase tracking-wider mx-auto hover:scale-105 transition-transform ease-out">
                    Sign up
                </Link>
            </div>
        </div>
    )
}