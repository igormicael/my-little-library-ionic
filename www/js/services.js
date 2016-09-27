/**
 * Created by igor on 25/09/2016.
 */

'use strict';

angular.module('mll.services', ['ngResource'])
  .constant("baseURL", "https://my-little-library.herokuapp.com/")

  .factory('myBooksFactory', ['$resource', 'baseURL', function ($resource, baseURL) {

    return $resource(baseURL + "mybooks/:id", { id: '@_id' }, {
      'update': {
        method: 'PUT'
      }
    });

  }])

  .factory('booksFactory', ['$resource', 'baseURL', function ($resource, baseURL) {

    return $resource(baseURL + "books/:id", { id: '@_id' }, {
      'update': {
        method: 'PUT'
      }
    });

  }])

;
