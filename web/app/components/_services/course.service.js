(function() {
  'use strict';

  function CourseService(RestService, promiseCache) {
    var service = {};

    service.get = function(courseId) {
      return promiseCache({
        key: 'course_' + courseId,
        args: [courseId],
        ttl: 60*60*24*1000,
        localStorageEnabled: true,
        promise: function(courseId) {
          return RestService.get('course/' + courseId);
        }
      }).then(formatCourse);
    };

    service.findCourses = function(query) {
      return RestService.post('find/courses', { query: query });
    };

    function formatCourse(course) {
      return course;
    }

    return service;
  }

  angular.module('golfWithMe')
    .service('CourseService', CourseService)
})();
