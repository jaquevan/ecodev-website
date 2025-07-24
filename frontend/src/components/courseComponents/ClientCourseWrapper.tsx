'use client';

import { useSearchParams } from 'next/navigation';
import CoursesPageContent from './CoursePageContent';

export default function ClientCourseWrapper() {
    const searchParams = useSearchParams();
    const programQuery = searchParams.get('program') || '';

    return <CoursesPageContent programQuery={programQuery} />;
}