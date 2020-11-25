> **Disclaimer:** This bot has been deprecated and no longer maintained. Please use [Dependent Issues](https://github.com/z0al/dependent-issues) Action instead.

# DEP

[![Travis](https://img.shields.io/travis/z0al/dep.svg)](https://travis-ci.org/z0al/dep)
[![All Contributors](https://img.shields.io/badge/all_contributors-5-orange.svg?style=flat-square)](#contributors)
[![Greenkeeper badge](https://badges.greenkeeper.io/z0al/dep.svg)](https://greenkeeper.io/)

<p align="center">
  <img src="./docs/assets/logo.png" width="256" height="256" alt="bot logo">
</p>

> built with [probot](https://github.com/probot/probot) framework

A Github App that helps managing pull request dependencies. That App works similar to typical CI services ( e.g [Travis](https://travis-ci.org)) but instead of running a test suite, It will check whether a pull request dependencies are resolved.

A dependency can be either an issue or another pull request. A dependency is considered resolved if its state has changed to `closed`.

## Usage

1.  Browse to [GitHub Apps - DEP][apps]
2.  Accept the permissions
3.  Allow access to repositories

## Screenshots

If you want to update a pull request dependencies write e.g:

![comment-screenshot][]

On the pull request, a status check from `DEP` will appear e.g:

![status-check-screenshot][]

For best results, enable branch protection (in the repository's settings) and require the `DEP` status check to pass before merging:

![branch-protection-screenshot][]

[apps]: https://github.com/apps/dep
[status-check-screenshot]: ./docs/assets/status.png
[comment-screenshot]: ./docs/assets/comment.png
[branch-protection-screenshot]: ./docs/assets/settings.png

## New syntax?

We've deprecated the \`/depends\` and \`/ensure\` commands in favor of the new single inline command: \`depend\` (no slash). The new command works similar to how you may [close issues using keywords][ref] on GitHub but **only** in pull request description.

The following keywords followed by an issue number, will mark that issue as dependency:

- depend on
- depends on
- depended on

**Examples**

You may write the end of PR description:

> Depends on #&#8203;1

or it can be anywhere:

> This pull request **depends on #&#8203;1** which does bla bla bla. Oh, and it **depends on #&#8203;2** too.

All dependencies added using the old commands should have already been converted to the new syntax for you (hopefully), but in case that didn't happen, you need to modify the description to include your dependencies by yourself. The old commands will just write a deprecation notice.

## Development

1.  Setup the repo:

```shell
git clone https://github.com/z0al/dep.git
cd dep
npm install
```

2.  Create your own [GitHub app][]
3.  Store the private key as `private-key.pem` somewhere safe, and point to its location in `.env`
4.  Start the app with `APP_ID=1234 npm start` where `1234` is your GitHub app's ID
5.  Update your GitHub app's Webhook URL to your localtunnel.me URL

[github app]: https://probot.github.io/docs/development/#configuring-a-github-app

## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| [<img src="https://avatars1.githubusercontent.com/u/12673605?v=4" width="100px;"/><br /><sub><b>Ahmed T. Ali</b></sub>](https://ahmed.sd)<br />[📝](#blog-z0al "Blogposts") [💻](https://github.com/z0al/dep/commits?author=z0al "Code") [📖](https://github.com/z0al/dep/commits?author=z0al "Documentation") [⚠️](https://github.com/z0al/dep/commits?author=z0al "Tests") | [<img src="https://avatars1.githubusercontent.com/u/10660468?v=4" width="100px;"/><br /><sub><b>Jason Etcovitch</b></sub>](https://jasonet.co)<br />[💬](#question-JasonEtco "Answering Questions") [🤔](#ideas-JasonEtco "Ideas, Planning, & Feedback") | [<img src="https://avatars2.githubusercontent.com/u/425099?v=4" width="100px;"/><br /><sub><b>Ryan Hiebert</b></sub>](http://ryanhiebert.com)<br />[📖](https://github.com/z0al/dep/commits?author=ryanhiebert "Documentation") [🤔](#ideas-ryanhiebert "Ideas, Planning, & Feedback") | [<img src="https://avatars2.githubusercontent.com/u/24373707?v=4" width="100px;"/><br /><sub><b>Rohit Sarkar</b></sub>](https://github.com/rsarky)<br />[💻](https://github.com/z0al/dep/commits?author=rsarky "Code") | [<img src="https://avatars3.githubusercontent.com/u/1037526?v=4" width="100px;"/><br /><sub><b>Harrison Heck</b></sub>](https://twitter.com/nesl247)<br />[💻](https://github.com/z0al/dep/commits?author=nesl247 "Code") |
| :---: | :---: | :---: | :---: | :---: |

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!

## Deployment

Please refer to [Probot documentation](https://probot.github.io/docs/deployment/) on how to deploy your own App.

## You might also like

- **[commitlint-bot](https://github.com/z0al/commitlint-bot):** A GitHub App that runs commitlint for you!
- **[Review Me](https://github.com/z0al/probot-review-me):** A GitHub App that helps you to decide when a pull request is ready for review based on its statuses.

## Credits

The Logo is designed by [Freepik](https://www.freepik.com/free-vector/green-and-blue-retro-robots-collection_721192.htm). Modified by [Ahmed T. Ali](https://github.com/z0al).

Special thanks to [Jason Etcovitch](https://github.com/JasonEtco) for their help, including the original bot idea.

## License

MIT © [Ahmed T. Ali](https://github.com/z0al)
