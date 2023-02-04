<div style="text-align: center;" align="center">

# what-pm

> This project has been migrated to [what-pm](https://github.com/saqqdy/node-kit/tree/master/packages/what-pm#readme)

Detects what package manager was used for installation

[![NPM version][npm-image]][npm-url]
[![Codacy Badge][codacy-image]][codacy-url]
[![Test coverage][codecov-image]][codecov-url]
[![npm download][download-image]][download-url]
[![License][license-image]][license-url]

[![Sonar][sonar-image]][sonar-url]

</div>

<div style="text-align: center; margin-bottom: 20px;" align="center">

## **Full API docs： [API Docs](./docs/modules.md)**

</div>

## Installing

```bash
# use pnpm
$ pnpm install -D what-pm

# use npm
$ npm install -D what-pm

# use yarn
$ yarn add -D what-pm
```

## Usage

1. use `what-pm` in async mode
   s

```js
import { whatPM } from 'what-pm'

whatPM().then(info => {
  console.log('The package manager is: ', info) // pnpm | null
})
```

2. use `what-pm` in sync mode

```js
import { whatPMSync } from 'what-pm'

console.log('The package manager is: ', whatPMSync()) // pnpm | null
```

## Support & Issues

Please open an issue [here](https://github.com/saqqdy/what-pm/issues).

## License

[MIT](LICENSE)

[npm-image]: https://img.shields.io/npm/v/what-pm.svg?style=flat-square
[npm-url]: https://npmjs.org/package/what-pm
[codacy-image]: https://app.codacy.com/project/badge/Grade/f70d4880e4ad4f40aa970eb9ee9d0696
[codacy-url]: https://www.codacy.com/gh/saqqdy/what-pm/dashboard?utm_source=github.com&utm_medium=referral&utm_content=saqqdy/what-pm&utm_campaign=Badge_Grade
[codecov-image]: https://img.shields.io/codecov/c/github/saqqdy/what-pm.svg?style=flat-square
[codecov-url]: https://codecov.io/github/saqqdy/what-pm?branch=master
[download-image]: https://img.shields.io/npm/dm/what-pm.svg?style=flat-square
[download-url]: https://npmjs.org/package/what-pm
[license-image]: https://img.shields.io/badge/License-MIT-blue.svg
[license-url]: LICENSE
[sonar-image]: https://sonarcloud.io/api/project_badges/quality_gate?project=saqqdy_what-pm
[sonar-url]: https://sonarcloud.io/dashboard?id=saqqdy_what-pm
