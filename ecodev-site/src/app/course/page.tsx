import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CourseAbout from "@/components/CourseAbout";
import CourseTitle from "@/components/CourseTitle";
import Instructor from "@/components/Instructor";

export default function Home() {
    return (
        <>
            <Nav/>

            <div className="pt-20 px-4 max-w-4xl mx-auto">
                <CourseTitle/>
                <CourseAbout/>
            </div>

            <Footer/>
        </>
    )
}