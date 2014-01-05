/*	var waitForFinalEvent = (function () {
		var timers = {};
		return function (callback, ms, uniqueId) {
			if (!uniqueId) {uniqueId = "Don't call this";}
			if (timers[uniqueId]) {clearTimeout (timers[uniqueId]);}
			timers[uniqueId] = setTimeout(callback, ms);
		};
	})();
	
	$(window).resize(function () {
		waitForFinalEvent(function(){
			if ($(".checkClass").css("float") == "none"){
				$("#tabs ul li a").eq(0).click();
			}else if($(".checkClass").css("float") == "left" ){
				$("#accordion .accord-header").eq(0).click();
			}
		}, 100, $.now());
	});

	$(window).load(function (){
		var i = setInterval(function (){
				if ($('#tabs').length){
					clearInterval(i);
					$("#tabs ul li").first().addClass("first");
					$("#tabs ul li").last().addClass("last");
					$("#tabs ul li a").tabs();
					$("#tabs ul li a").eq(0).click();
				}
				if($('#accordion').length){
					clearInterval(i);
					$("#accordion .accord-header").accordion();
					$("#accordion .accord-header").eq(0).click();
				}
		}, 100);
	});
	*/
$.fn.tabs = function(){
	$(this).on("click", function(e) {
		e.preventDefault();
		$(this).parent("li").addClass("active").siblings().removeClass("active");
		var element = "#main-content > #tabs > div" + $(this).attr("href");
		$(element).addClass("active").siblings().removeClass("active");
	});
};

$.fn.accordion = function(e){
	$(this).on("click", function() {
		var ele = $(this).attr("name");
		if(!$(ele).is(":visible")){
			$("#accordion .accord-content").slideUp("normal");
			$(".accord-header").removeClass("active");
			$(this).addClass("active");
			$(ele).slideDown("normal");
		}
	});	
};

	
function switchScreen(){
	if ($(".respCheck").css("float") == "none"){
		var tabs = document.getElementById('tabs');
		scope = angular.element(tabs).scope();
		scope.$apply(function(){
			scope.layout = "tabs";
		});
	} else if($(".respCheck").css("float") == "left" ){
		var accr = document.getElementById('accordion');
		scope = angular.element(accr).scope();
		scope.$apply(function(){
			scope.layout = "accr";
		});
	}
	
}

$(window).resize(switchScreen);

if ( document.addEventListener ) {
// Mozilla, Opera, Webkit 
	document.addEventListener("DOMContentLoaded", switchScreen, false);
} else if ( document.attachEvent ) {
// lt IE 9
	document.attachEvent("onreadystatechange", switchScreen);
}

var app=angular.module('myApp', [])
.controller('SwitchScreenCtrl', function ($scope) {
	$scope.tabid = 0;
	$scope.layout = 'tabs';
	$scope.profile = data;
})
.directive('pbTabs', function() {
    return {
        restrict: 'A',
        link: function(scope, elm, attrs) {
            var jqueryElm = "#" + attrs['id'] + " ul li a";
			setTimeout(function() {
				$(jqueryElm).tabs();
				$(jqueryElm).eq(scope.tabid).click();
			},0);
        }
    };
})
.directive('pbAccr', function() {
    return {
        restrict: 'A',
        link: function(scope, elm, attrs) {
            var jqueryElm = "#" + attrs['id'] + " .accord-header";
			setTimeout(function() {
				$(jqueryElm).accordion();
				$(jqueryElm).eq(scope.tabid).click();
			},0);
        }
    };
})

