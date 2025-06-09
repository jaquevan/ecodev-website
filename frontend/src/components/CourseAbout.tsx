import Instructor from "@/components/Instructor";

export default function CourseAbout() {
    return (
        <>
            <div className="p-20 flex flex-col items-center justify-center max-w-3xl mx-auto my-12 text-center">
                <h2 className="text-2xl font-bold text-orange-600 mb-4">About The Workshop</h2>
                <p className="text-gray-800 align-left">
                    Welcome to the "Computer Basics & Typing" workshop! This session is designed to help you develop
                    a solid understanding of fundamental computer concepts and improve your typing skills. Whether you are a
                    complete beginner or looking to refresh your knowledge, this workshop will provide you with the essential
                    tools to navigate the digital world with ease.
                </p>
            </div>
        </>
    );
}