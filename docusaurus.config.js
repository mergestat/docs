// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'MergeStat Documentation',
  tagline: 'SQL for the software development lifecycle',
  url: 'https://docs.mergestat.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/small_blue.png',
  organizationName: 'mergestat', // Usually your GitHub org/user name.
  projectName: 'docs', // Usually your repo name.

  scripts: [
    "/segment.js",
    {
      src: "https://plausible.io/js/plausible.js",
      defer: true,
      "data-domain": "docs.mergestat.com"
    },
    {
      src: "https://cdn.pagesense.io/js/mergestat/897af3992dfe4f739a592bf9c2a9c5ec.js",
      async: false,
    },
  ],

  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/mergestat/docs/edit/main/',
          routeBasePath: '/',
        },
        blog: {
          feedOptions: {
            type: 'all',
            copyright: `Copyright © ${new Date().getFullYear()} AskGit, Inc.`
          },
          showReadingTime: false,
          editUrl: 'https://github.com/mergestat/docs/edit/main/blog/',
          blogSidebarCount: 0
        },
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
        // title: 'MergeStat Documentation',
        logo: {
          alt: 'MergeStat Logo',
          src: 'img/logo-with-text.svg',
        },
        items: [
          {
            type: 'doc',
            docId: 'welcome/README',
            position: 'left',
            label: 'Docs',
          },
          {to: '/blog', label: 'Blog', position: 'left'},
          {
            href: 'https://mergestat.com/',
            label: 'Homepage',
            position: 'left',
          },
          {
            href: 'https://github.com/mergestat/mergestat',
            label: 'GitHub',
            position: 'right',
          },
          {
            href: 'https://join.slack.com/t/mergestatcommunity/shared_invite/zt-xvvtvcz9-w3JJVIdhLgEWrVrKKNXOYg',
            label: 'Slack',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'MergeStat',
            items: [
              {
                label: 'Homepage',
                href: 'https://mergestat.com/',
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
                label: 'Slack Community',
                href: 'https://join.slack.com/t/mergestatcommunity/shared_invite/zt-xvvtvcz9-w3JJVIdhLgEWrVrKKNXOYg',
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
                href: 'https://github.com/mergestat/',
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
