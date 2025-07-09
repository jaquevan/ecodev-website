import type { Schema, Struct } from '@strapi/strapi';

export interface DaysWeekday extends Struct.ComponentSchema {
  collectionName: 'components_days_weekdays';
  info: {
    displayName: 'Weekday';
    icon: 'clock';
  };
  attributes: {
    weekdays: Schema.Attribute.Enumeration<
      [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ]
    >;
  };
}

export interface LinksSocialLink extends Struct.ComponentSchema {
  collectionName: 'components_links_social_links';
  info: {
    displayName: 'social link';
    icon: 'attachment';
  };
  attributes: {
    linkedin: Schema.Attribute.String;
  };
}

export interface ProgramRegistrationSteps extends Struct.ComponentSchema {
  collectionName: 'components_program_registration_steps';
  info: {
    displayName: 'Registration Steps';
    icon: 'oneToOne';
  };
  attributes: {
    description: Schema.Attribute.Text;
    icon: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    title: Schema.Attribute.String;
  };
}

export interface ProgramStudentReview extends Struct.ComponentSchema {
  collectionName: 'components_program_student_reviews';
  info: {
    displayName: 'Student Review';
    icon: 'emotionHappy';
  };
  attributes: {
    avatar: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    date: Schema.Attribute.Date;
    name: Schema.Attribute.String;
    quote: Schema.Attribute.Text;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'days.weekday': DaysWeekday;
      'links.social-link': LinksSocialLink;
      'program.registration-steps': ProgramRegistrationSteps;
      'program.student-review': ProgramStudentReview;
    }
  }
}
