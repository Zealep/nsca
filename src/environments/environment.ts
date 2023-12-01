// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  hostCalculo: 'http://172.31.31.192:1007/v1/calculoactuarial',
  //hostCarga: 'http://172.31.31.192:1006/v1/calculoactuarial',
  hostCarga: 'http://localhost:8080/v1/calculoactuarial',
  hostReporte: 'http://172.31.31.192:1008/v1/calculoactuarial',
  hostSolicitud: 'http://172.31.31.192:1004/v1/calculoactuarial',
  hostLogin: 'http://172.31.31.192:1009/v1/calculoactuarial',
  mock: 'http://demo4873478.mockable.io/v1/calculoactuarial'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
