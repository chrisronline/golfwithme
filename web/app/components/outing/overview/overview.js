(function() {
  'use strict';

  function OutingOverviewCtrl($scope, DATE_STRINGS, CourseService) {
    var overviewCtrl = this;
    var outingCtrl = $scope.outingCtrl;

    overviewCtrl.editMode = false;
    overviewCtrl.toggleEditMode = function() {
      overviewCtrl.editMode = !overviewCtrl.editMode;
    };

    overviewCtrl.updateDate = function() {
      var date = moment(outingCtrl.outing._dateControl, DATE_STRINGS.DATE_CONTROL);
      outingCtrl.outing.date.month(date.month()).year(date.year()).date(date.date());
    };
    overviewCtrl.updateTime = function() {
      var time = moment(outingCtrl.outing._timeControl, DATE_STRINGS.TIME_CONTROL);
      outingCtrl.outing.date.minute(time.minute()).hour(time.hour());
    };
    overviewCtrl.updateCourse = function() {
      if (!outingCtrl.outing.course.id) return;
      CourseService.get(outingCtrl.outing.course.id)
        .then(function(course) {
          outingCtrl.outing.course = course;
        })
    };

    overviewCtrl.course = {
      options: {
        labelField: 'name',
        valueField: 'id',
        sortField: 'name',
        searchField: 'name',
        load: function(query, callback) {
          CourseService.findCourses(query).then(callback);
        },
        onInitialize: function() {
          if (outingCtrl.outing.course) {
            this.addOption(outingCtrl.outing.course);
          }
        }
      }
    };
  }

  angular.module('golfWithMe')
    .controller('OutingOverviewCtrl', OutingOverviewCtrl);
})();
