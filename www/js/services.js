/**
 * Created by igor on 25/09/2016.
 */

'use strict';

//angular.module('confusionApp')
angular.module('conFusion.services', ['ngResource'])
  .constant("baseURL", "http://localhost:3000/")

  .factory('corporateFactory', ['$resource', 'baseURL', function ($resource, baseURL) {


    return $resource(baseURL + "leadership/:id");

  }])

  .factory('feedbackFactory', ['$resource', 'baseURL', function ($resource, baseURL) {


    return $resource(baseURL + "feedback/:id");

  }])

  .factory('myBooksFactory',['$resource', 'baseURL', function ($resource, baseURL) {

    return $resource(baseURL + "mybooks/:id", null, {
      'update': {
        method: 'PUT'
      }
    });

  }])

;
