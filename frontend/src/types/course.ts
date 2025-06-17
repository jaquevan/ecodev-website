export interface Course {
    id: number;
    title: string;
    desc: string;
    date: string;
    endDate: string;
    time: string;
    endTime: string;
    Image: StrapiFile[];
    slug: string;
    location: string;
    instructorName: string;
    instructorDesc: string;
    instructorImage: StrapiFile;
    language: string;
    learnings: string;
    preRequisites: string;

    localizations?: Localization[];
}

export interface Localization {
    id: number;
    attributes: {
        locale: string;
        slug: string;
        title: string;
        desc: string;
        date: string;
        endDate: string;
        time: string;
        endTime: string;
        Image: StrapiFile[];
        location: string;
        instructorName: string;
        instructorDesc: string;
        instructorImage: StrapiFile;
        language: string;
        learnings: string;
        preRequisites: string;
    };
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
