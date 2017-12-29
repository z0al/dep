# DEP

[![Travis](https://img.shields.io/travis/ahmed-taj/dep.svg)](https://travis-ci.org/ahmed-taj/dep)
[![All Contributors](https://img.shields.io/badge/all_contributors-3-orange.svg?style=flat-square)](#contributors)

<p align="center">
  <img src="./docs/assets/logo.png" width="256" height="256" alt="bot logo">
</p>

> built with [probot](https://github.com/probot/probot) framework

A dependency manager for Pull Requests.

## Usage

1. Browse to [GitHub Apps - DEP][apps]
2. Accept the permissions
3. Allow access to repositories

If you want to update a pull request dependencies write:

![comment-screenshot][]

On the pull request, a status check from `DEP` will appear:

![status-check-screenshot][]

For best results, enable branch protection (in the repository's settings) and require the `DEP` status check to pass before merging:

![branch-protection-screenshot][]

[apps]: https://github.com/apps/dep
[status-check-screenshot]: ./docs/assets/status.png
[comment-screenshot]: ./docs/assets/comment.png
[branch-protection-screenshot]: ./docs/assets/settings.png

## Development

1. Setup the repo:

```shell
git clone https://github.com/ahmed-taj/dep.git
cd dep
npm install
```

2. Create your own [GitHub app][]
3. Store the private key as `private-key.pem` somewhere safe, and point to its location in `.env`
4. Start the app with `APP_ID=1234 npm start` where `1234` is your GitHub app's ID
5. Update your GitHub app's Webhook URL to your localtunnel.me URL

[github app]: https://probot.github.io/docs/development/#configure-a-github-app

## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->

| [<img src="https://avatars1.githubusercontent.com/u/12673605?v=4" width="100px;"/><br /><sub><b>Ahmed T. Ali</b></sub>](https://ahmed.sd)<br />[📝](#blog-ahmed-taj "Blogposts") [💻](https://github.com/ahmed-taj/dep/commits?author=ahmed-taj "Code") [📖](https://github.com/ahmed-taj/dep/commits?author=ahmed-taj "Documentation") [⚠️](https://github.com/ahmed-taj/dep/commits?author=ahmed-taj "Tests") | [<img src="https://avatars1.githubusercontent.com/u/10660468?v=4" width="100px;"/><br /><sub><b>Jason Etcovitch</b></sub>](https://jasonet.co)<br />[💬](#question-JasonEtco "Answering Questions") [🤔](#ideas-JasonEtco "Ideas, Planning, & Feedback") | [<img src="https://avatars2.githubusercontent.com/u/425099?v=4" width="100px;"/><br /><sub><b>Ryan Hiebert</b></sub>](http://ryanhiebert.com)<br />[📖](https://github.com/ahmed-taj/dep/commits?author=ryanhiebert "Documentation") [🤔](#ideas-ryanhiebert "Ideas, Planning, & Feedback") |
| :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |


<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!

## Deployment

See [docs/deploy.md](./docs/deploy.md) for more info.

## Like it?

Give it a star(:star:) :point_up_2:

## Credits

The Logo is designed by [Freepik](https://www.freepik.com/free-vector/green-and-blue-retro-robots-collection_721192.htm). Modified by [Ahmed T. Ali](https://github.com/ahmed-taj).

Special thanks to [Jason Etcovitch](https://github.com/JasonEtco) for their help, including the original bot idea.

## License

MIT © [Ahmed T. Ali](https://github.com/ahmed-taj)
