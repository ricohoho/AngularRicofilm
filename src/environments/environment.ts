// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  //si frnt et back eme host laisser a vide sion indiquer l'url du back
  REST_HOST: 'http://localhost:4200/',
  REST_API_FILM_SERVER :'films/list',
  REST_API_FILM_SERVER_SELECT :'films/listselect',
  REST_API_FILM_MENU_IMAGE :'films/listmenufilmimage',
  REST_API_USER_SERVER_SELECT : '/api/user/list',
  REST_API : '/api',
  REST_API_REQUEST_SERVER :'request',
  PATH_IMAGE:'../../assets/images/',
  URL_HOME:''
};

/* ricofilmA
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
