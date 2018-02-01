// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyAhn54h0YqgRSwhK7ZmcAXoo0LmUFrVGIA',
    authDomain: 'nutrivida-bot.firebaseapp.com',
    databaseURL: 'https://nutrivida-bot.firebaseio.com',
    projectId: 'nutrivida-bot',
    storageBucket: 'nutrivida-bot.appspot.com',
    messagingSenderId: '602974529857'
  }
};
