// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Mergestat Docs',
  tagline: 'SQL for the software development lifecycle',
  url: 'https://docs.mergestat.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/small_blue.png',
  organizationName: 'mergestat', // Usually your GitHub org/user name.
  projectName: 'docs', // Usually your repo name.

  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/mergestat/docs/edit/main/ref/',
          routeBasePath: '/',
        },
        blog: false, // TODO(patrickdevivo) remove this line and uncomment the below to enable the blog
        // blog: {
        //   showReadingTime: false,
        //   editUrl:
        //     'https://github.com/mergestat/docs/edit/main/blog/',
        // },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'MergeStat Docs',
        logo: {
          alt: 'Mergestat Logo',
          src: 'img/small_blue.png',
        },
        items: [
          {
            type: 'doc',
            docId: 'intro',
            position: 'left',
            label: 'Reference',
          },
          // {to: '/blog', label: 'Blog', position: 'left'}, // TODO(patrickdevivo) uncomment this line
          {
            href: 'https://github.com/mergestat/mergestat',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Reference',
            items: [
              {
                label: 'Reference',
                to: '/',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Stack Overflow',
                href: 'https://stackoverflow.com/questions/tagged/mergestat',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/mergestat',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Blog',
                to: '/blog',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/mergestat/mergestat',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} AskGit, Inc.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
