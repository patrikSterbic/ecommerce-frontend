# Ecommerce Frontend Part

Experimental Ecommerce project based on React/Redux

## Prerequisites

* Properly clonned and installed ecommerce-frontend-part
* NodeJS, npm
* Terminal or Command prompt
* WYSIWYG editor (VS Code, Atom, Sublime Text, Notepad++ etc...)
* Some modern browser (Google Chrome, Firefox mostly)

## Installing

First clone repository to your desired working directory and make sure that name of created directory has no special characters, like %, \*, &, ^, $..., if so please remove those chars from name!

### Install NodeJS and NPM

Go to [NodeJS site](https://nodejs.org/en/) and install the most current version (LTS is recommended), installer should install `npm` too. After install you can check that you installed Node and npm with command `node --version` and `npm --version` in your Terminal or Command prompt.

### Install IDE

You can select from one of the most favourite coding IDEs:

* [Visual Studio Code](https://code.visualstudio.com/)
* [Atom](https://atom.io/)
* [Sublime Text](https://www.sublimetext.com/)
* [Notepad++](https://notepad-plus-plus.org/download/)

### Install Chrome IDE

Go to [Chrome Download Page](https://www.google.com/chrome/), download and install.

### Install cloned app

1.  Open Terminal or Command prompt
2.  Go to directory WebApp in your cloned repository (cd <name_of)\_cloned_repo>/WebApp)
3.  Execute command `npm install` (it will take a while)

After a while you should see that there was successfully installed some packages.

## Running app

1.  Open Terminal or Command prompt
2.  Quit all your Chrome instances
3.  Execute command `open -a Google\ Chrome --args --disable-web-security --user-data-dir` (it should open Chrome browsert that has disabled security like CORS)
4.  Go to directory WebApp in your cloned repository (cd <name_of)\_cloned_repo>/WebApp)
5.  Execute command `npm start`

Last command should open address `localhost:3000` in your newly opened Chrome instance. If nothing happens check Terminal or Command prompt, it could happen that you will have port 3000 reserved, then runner will ask you if you want to use another port, so just type `y` and press Enter.

## Building app

1.  Open Terminal or Command prompt
2.  Go to directory WebApp in your cloned repository (cd <name_of)\_cloned_repo>/WebApp)
3.  Execute command `npm run build`

After a while you should see a message: `The build folder is ready to be deployed.`

## Testing app

TBA

## Directory structure

```bash
├── config -> the main configuration of the whole app, contains webpack config files
├── src    -> main working directory
|
│   ├── api -> requests/responses for backend API
│   ├── common -> common functions, constants
│   ├── components -> stateless components
│   ├── containers -> statefull components
│   ├── hoc -> hight order components
│   ├── internalization -> translations for future uses
│   ├── shared -> definitions for enums and utility functions
│   ├── store -> redux store configurations
│   ├── theme -> styles and images
│   ├── utils -> utility functions
│   ├── config.js
│   ├── index.html
│   ├── package.json
│   ├── registerServiceWorker.js
│   └── routes.js
├── public -> directory which will contain all public files like imgs and index.html
├── scripts -> directory with build, start, test scripts
├── README.md
├── package.json
├── server.js
└── .gitignore
```
