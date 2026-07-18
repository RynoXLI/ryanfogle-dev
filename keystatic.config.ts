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
            href: fields.text({ label: 'Link (e.g. /blog)' }),
          }),
          {
            label: 'Navigation links',
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
        ctas: fields.array(
          fields.object({
            label: fields.text({ label: 'Label' }),
            href: fields.text({ label: 'Link (e.g. /cv)' }),
          }),
          {
            label: 'Call-to-action buttons',
            itemLabel: (props) => props.fields.label.value || 'Button',
          }
        ),
      },
    }),

    cv: singleton({
      label: 'CV',
      path: 'src/content/cv/',
      schema: {
        name: fields.text({ label: 'Full name' }),
        headline: fields.text({ label: 'Headline / job title' }),
        email: fields.text({ label: 'Email' }),
        location: fields.text({ label: 'Location' }),
        summary: fields.text({ label: 'Summary', multiline: true }),
        links: fields.array(
          fields.object({
            label: fields.text({ label: 'Label' }),
            url: fields.url({ label: 'URL' }),
          }),
          {
            label: 'Links',
            itemLabel: (props) => props.fields.label.value || 'Link',
          }
        ),
        skills: fields.array(fields.text({ label: 'Skill' }), {
          label: 'Skills',
          itemLabel: (props) => props.value || 'Skill',
        }),
        experience: fields.array(
          fields.object({
            role: fields.text({ label: 'Role' }),
            company: fields.text({ label: 'Company' }),
            startDate: fields.date({ label: 'Start date' }),
            endDate: fields.date({
              label: 'End date (leave blank if current)',
              validation: { isRequired: false },
            }),
            description: fields.array(fields.text({ label: 'Bullet' }), {
              label: 'Description bullets',
              itemLabel: (props) => props.value || 'Bullet',
            }),
          }),
          {
            label: 'Experience',
            itemLabel: (props) => `${props.fields.role.value} @ ${props.fields.company.value}`,
          }
        ),
        education: fields.array(
          fields.object({
            school: fields.text({ label: 'School' }),
            degree: fields.text({ label: 'Degree' }),
            startDate: fields.date({ label: 'Start date', validation: { isRequired: false } }),
            endDate: fields.date({ label: 'End date', validation: { isRequired: false } }),
          }),
          {
            label: 'Education',
            itemLabel: (props) => `${props.fields.degree.value} @ ${props.fields.school.value}`,
          }
        ),
      },
    }),
  },

  collections: {
    blog: collection({
      label: 'Blog posts',
      slugField: 'title',
      path: 'src/content/blog/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        description: fields.text({ label: 'Description', multiline: true }),
        publishedDate: fields.date({ label: 'Published date' }),
        tags: fields.array(fields.text({ label: 'Tag' }), {
          label: 'Tags',
          itemLabel: (props) => props.value || 'Tag',
        }),
        coverImage: fields.image({
          label: 'Cover image',
          directory: 'src/content/blog/images',
          publicPath: '/src/content/blog/images/',
        }),
        content: fields.markdoc({
          label: 'Content',
          options: {
            image: {
              directory: 'src/content/blog/images',
              publicPath: '/src/content/blog/images/',
            },
          },
        }),
      },
    }),

    projects: collection({
      label: 'Projects',
      slugField: 'title',
      path: 'src/content/projects/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        description: fields.text({ label: 'Short description', multiline: true }),
        tags: fields.array(fields.text({ label: 'Tag' }), {
          label: 'Tech / tags',
          itemLabel: (props) => props.value || 'Tag',
        }),
        url: fields.url({ label: 'Live URL', validation: { isRequired: false } }),
        repo: fields.url({ label: 'Repository URL', validation: { isRequired: false } }),
        featured: fields.checkbox({ label: 'Featured', defaultValue: false }),
        coverImage: fields.image({
          label: 'Cover image',
          directory: 'src/content/projects/images',
          publicPath: '/src/content/projects/images/',
        }),
        content: fields.markdoc({
          label: 'Content',
          options: {
            image: {
              directory: 'src/content/projects/images',
              publicPath: '/src/content/projects/images/',
            },
          },
        }),
      },
    }),
  },
});
