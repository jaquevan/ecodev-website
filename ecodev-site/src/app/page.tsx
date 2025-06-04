import Nav from "../components/Nav"
import Footer from "../components/Footer"
export default function Home() {
    return (
        <>
            <Nav/>
            <div className="min-h-screen flex items-center justify-center bg-white container mx-auto px-4 py-6 sm:p-4">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-orange-500 text-center max-w-3xl mx-auto">
                    Welcome to the EcoDev Site
                </h1>
            </div>
            <Footer/>

        </>

    );
}