var app = angular.module('app',['ngResource','ngRoute','ngCookies']);

(function(){
    app.config(function($routeProvider,$locationProvider){
        var routeRoleChecks = {
            admin: {
                auth: function(mvAuth){
                    return mvAuth.authorizeCurrentUserForRoute('admin')
                }
            },
            user: {
                auth: function(mvAuth){
                    return mvAuth.authorizeAuthenticatedUserForRoute()
                }
            }
        }
        $locationProvider.html5Mode({enabled: true,requireBase: false});
        $routeProvider
            .when("/",{ templateUrl: '/partials/main',controller: 'mvMainCtrl'})
            .when("/admin/users",{ templateUrl: '/partials/admin/user-list',controller: 'mvUserListCtrl', resolve: routeRoleChecks.admin})
            .when("/signup",{ templateUrl: '/partials/account/signup',controller: 'mvSignupCtrl'})
            .when("/profile",{ templateUrl: '/partials/account/profile',controller: 'mvProfileCtrl', resolve: routeRoleChecks.user })
            .when("/courses",{ templateUrl: '/partials/courses/course-list',controller: 'mvCourseListCtrl' })
            .when("/view/course/:id",{ templateUrl: '/partials/courses/course-details',controller: 'mvCourseDetailsCtrl' })
            .when("/edit/course/:id",{ templateUrl: '/partials/courses/course',controller: 'mvCourseCtrl' });
        
    });

    app.run(function($rootScope,$location) {
        $rootScope.$on('$routeChangeError', function(evt,current,previous,rejection) {
            if(rejection === 'not authorized'){
                $location.path('/');
            }
            /* Act on the event */
        })
    })
})();






