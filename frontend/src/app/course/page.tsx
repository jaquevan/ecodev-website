'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Loading from '@/components/Loading';
import CoursesPageContent from "@/components/courseComponents/CoursePageContent";

export default function CoursesPage() {
    const searchParams = useSearchParams();
    const programQuery = searchParams.get('program') || '';

    return (
        <Suspense fallback={<Loading />}>
            <CoursesPageContent programQuery={programQuery} />
        </Suspense>
    );
}