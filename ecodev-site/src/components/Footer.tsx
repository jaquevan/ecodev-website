export default function Footer() {
    return (
        <footer className="bg-blue-900 shadow-md p-4 mt-8">
            <div className="container mx-auto text-center">
                <p className="text-sm text-white">
                    &copy; {new Date().getFullYear()} La Colaborativa. All rights reserved.
                </p>
                <p className="text-sm text-gray-600">
                    <a href="https://la-colaborativa.org/" target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:underline">
                        Visit our website
                    </a>
                </p>
            </div>
        </footer>
    );

}