This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Dependencies

_Make Sure Node.js is installed_

Install dependencies

```
npm install
```

### Dev Setup

Modify `main.js` and find `isDev` then set it to `true`

Create .env file on root directory

```
ATLAS_URI=[Insert MongoDB Atlas URI key here]
```

Next, run react development

```
npm start
```

Then run electron

```
npm run electron
```

### `Main Process`

Main Process is handled by `main.js` file.

### `Renderer / Front-end`

Front-end is located at `src` folder.

### Build Setup

Modify `main.js` and find `isDev` then set it to `false`

Next, run react build

```
npm run build
```

Then build electron

```
npm run build-electron
```

### API / Web Service

Folder is located at `backend`

### `NPM Scripts`

```
npm run lambda-serve        : serving lambda functions in development
npm run lambda-build        : build lambda functions - Netlify handles building the application no need to run.
```

### Application Usage

See [Application Documentation](https://jolly-perlman-e277e1.netlify.com/).
