export interface Course {
    id: number;
    title: string;
    desc: string;
    date: string;
    endDate: string;
    time: string;
    endTime: string;
    Image: StrapiFile[];
}

export interface StrapiFile {
    id: number;
    name: string;
    url: string;
    alternativeText?: string;
    formats?: {
        thumbnail?: { url: string };
        small?: { url: string };
        medium?: { url: string };
        large?: { url: string };
    };
}
