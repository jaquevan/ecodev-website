import type { Schema, Struct } from '@strapi/strapi';

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

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'links.social-link': LinksSocialLink;
    }
  }
}
