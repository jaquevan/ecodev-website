import { Suspense } from 'react';
import Loading from '@/components/Loading';
import ClientCourseWrapper from '@/components/courseComponents/ClientCourseWrapper';

export default function CoursesPage() {
    return (
        <Suspense fallback={<Loading />}>
            <ClientCourseWrapper />
        </Suspense>
    );
}
