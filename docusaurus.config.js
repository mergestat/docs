// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'MergeStat Docs',
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
    }
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
          editUrl:
            'https://github.com/mergestat/docs/edit/main/blog/',
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
        title: 'MergeStat Docs',
        logo: {
          alt: 'MergeStat Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'doc',
            docId: 'welcome/intro',
            position: 'left',
            label: 'Reference',
          },
          {to: '/blog', label: 'Blog', position: 'left'},
          {
            href: 'https://app.mergestat.com/',
            label: 'Try',
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
