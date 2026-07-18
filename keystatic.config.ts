import { config, fields, collection, singleton } from '@keystatic/core';

export default config({
  storage: {
    kind: 'local',
  },

  singletons: {
    settings: singleton({
      label: 'Site settings',
      path: 'src/content/settings/',
      schema: {
        siteName: fields.text({ label: 'Site name', defaultValue: 'Ryan Fogle' }),
        defaultDescription: fields.text({
          label: 'Default meta description',
          defaultValue: 'Personal site, blog, and project portfolio.',
        }),
        footerText: fields.text({
          label: 'Footer text',
          defaultValue: 'Built with Astro & Keystatic.',
        }),
        navLinks: fields.array(
          fields.object({
            label: fields.text({ label: 'Label' }),
            href: fields.text({ label: 'Link (e.g. /work)' }),
          }),
          {
            label: 'Navigation links',
            itemLabel: (props) => props.fields.label.value || 'Link',
          }
        ),
        socialLinks: fields.array(
          fields.object({
            label: fields.text({ label: 'Label' }),
            url: fields.url({ label: 'URL' }),
          }),
          {
            label: 'Social links (footer)',
            itemLabel: (props) => props.fields.label.value || 'Link',
          }
        ),
      },
    }),

    home: singleton({
      label: 'Home page',
      path: 'src/content/home/',
      schema: {
        heading: fields.text({ label: 'Heading' }),
        intro: fields.text({ label: 'Intro paragraph', multiline: true }),
        photo: fields.image({
          label: 'Photo of yourself',
          validation: { isRequired: false },
          directory: 'src/content/home/images',
          publicPath: '/src/content/home/images/',
        }),
        ctas: fields.array(
          fields.object({
            label: fields.text({ label: 'Label' }),
            href: fields.text({ label: 'Link (e.g. /work)' }),
          }),
          {
            label: 'Call-to-action buttons',
            itemLabel: (props) => props.fields.label.value || 'Button',
          }
        ),
      },
    }),
  },

  collections: {
    work: collection({
      label: 'Work',
      slugField: 'title',
      path: 'src/content/work/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        description: fields.text({ label: 'Description', multiline: true }),
        publishedDate: fields.date({ label: 'Published date' }),
        tags: fields.array(fields.text({ label: 'Tag' }), {
          label: 'Tags',
          itemLabel: (props) => props.value || 'Tag',
        }),
        url: fields.url({ label: 'Live URL', validation: { isRequired: false } }),
        repo: fields.url({ label: 'Repository URL', validation: { isRequired: false } }),
        featured: fields.checkbox({ label: 'Featured', defaultValue: false }),
        coverImage: fields.image({
          label: 'Cover image',
          directory: 'src/content/work/images',
          publicPath: '/src/content/work/images/',
        }),
        content: fields.markdoc({
          label: 'Content',
          options: {
            image: {
              directory: 'src/content/work/images',
              publicPath: '/src/content/work/images/',
            },
          },
        }),
      },
    }),
  },
});
