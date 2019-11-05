// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'http://192.168.88.83:3105/api',
  apiCouch: 'http://192.168.88.83:5984'
  // apiUrl: 'http://localhost:3105/api',
  // apiCouch: 'http://localhost:5984'
  // apiUrl: 'http://192.168.88.43:3105/api',
  // apiCouch: 'http://192.168.88.43:5984'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
