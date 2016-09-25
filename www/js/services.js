/**
 * Created by igor on 25/09/2016.
 */

'use strict';

angular.module('mll.services', ['ngResource'])
  .constant("baseURL", "http://localhost:3000/")

  .factory('myBooksFactory', ['$resource', 'baseURL', function ($resource, baseURL) {

    return $resource(baseURL + "mybooks/:id", { id: '@_id' }, {
      'update': {
        method: 'PUT'
      }
    });

  }])

;
