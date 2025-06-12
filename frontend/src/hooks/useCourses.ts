import useSWR from 'swr';
import { fetchCourses } from '@/lib/strapi';

export function useCourses() {
    const { data, error } = useSWR('courses', fetchCourses);
    return { courses: data, isLoading: !error && !data, error };
}
