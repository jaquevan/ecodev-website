import DiagflowBot from '@/components/DiagflowBot';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export default function ChatPage() {
    return (
        <>
            <Nav />

            <main className="min-h-screen flex flex-col items-center justify-start space-y-8 px-8 md:px-40 py-10">
                <h1 className="text-center text-4xl font-semibold">Chat with Resume Planner Bot</h1>

                <p className="text-center max-w-2xl text-lg text-gray-700">
                    Welcome! This chatbot is here to assist you with planning and improving your resume.
                    Whether you're starting from scratch or refining an existing one, Resume Planner Bot can help guide you.
                </p>

                <section className="max-w-3xl w-full text-left space-y-6">
                    <h2 className="text-2xl font-medium">How to Use the Bot</h2>
                </section>

                <section className="max-w-3xl w-full text-left space-y-4">
                    <h2 className="text-2xl font-medium">Tips for a Strong Resume</h2>
                </section>

                <p className="text-center text-gray-600 pt-8">
                    Ready to get started? Just open the chat and ask away!
                </p>
            </main>

            <DiagflowBot />
            <Footer />
        </>
    );
}
