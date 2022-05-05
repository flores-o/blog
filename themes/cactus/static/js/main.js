/**
 * Sets up Justified Gallery.
 */

if (!!$.prototype.justifiedGallery) {
  var options = {
    rowHeight: 140,
    margins: 4,
    lastRow: "justify"
  };
  $(".article-gallery").justifiedGallery(options);
}

$(document).ready(function () {


  if (true) { console.log("trying to log smth here") }

  /**
   * Shows the responsive navigation menu on mobile.
   */
  $("#header > #nav > ul > .icon").click(function () {
    $("#header > #nav > ul").toggleClass("responsive");
  });


  /**
   * Controls the different versions of  the menu in blog post articles
   * for Desktop, tablet and mobile.
   */
  if ($(".post").length) {
    var menu = $("#menu");
    var nav = $("#menu > #nav");
    var menuIcon = $("#menu-icon, #menu-icon-tablet");

    /**
     * Display the menu on hi-res laptops and desktops.
     */
    if ($(document).width() >= 1440) {
      menu.css("visibility", "visible");
      menuIcon.addClass("active");
    }

    /**
     * Display the menu if the menu icon is clicked.
     */
    menuIcon.click(function () {
      if (menu.css("visibility") === "hidden") {
        menu.css("visibility", "visible");
        menuIcon.addClass("active");
      } else {
        menu.css("visibility", "hidden");
        menuIcon.removeClass("active");
      }
      return false;
    });

    /**
     * Add a scroll listener to the menu to hide/show the navigation links.
     */
    if (menu.length) {
      $(window).on("scroll", function () {
        var topDistance = menu.offset().top;

        // hide only the navigation links on desktop
        if (!nav.is(":visible") && topDistance < 50) {
          nav.show();
        } else if (nav.is(":visible") && topDistance > 100) {
          nav.hide();
        }

        // on tablet, hide the navigation icon as well and show a "scroll to top
        // icon" instead
        if (!$("#menu-icon").is(":visible") && topDistance < 50) {
          $("#menu-icon-tablet").show();
          $("#top-icon-tablet").hide();
        } else if (!$("#menu-icon").is(":visible") && topDistance > 100) {
          $("#menu-icon-tablet").hide();
          $("#top-icon-tablet").show();
        }
      });
    }

    /**
     * Show mobile navigation menu after scrolling upwards,
     * hide it again after scrolling downwards.
     */
    if ($("#footer-post").length) {
      var lastScrollTop = 0;
      $(window).on("scroll", function () {
        var topDistance = $(window).scrollTop();

        if (topDistance > lastScrollTop) {
          // downscroll -> show menu
          $("#footer-post").hide();
        } else {
          // upscroll -> hide menu
          $("#footer-post").show();
        }
        lastScrollTop = topDistance;

        // close all submenu"s on scroll
        $("#nav-footer").hide();
        $("#toc-footer").hide();
        $("#share-footer").hide();

        // show a "navigation" icon when close to the top of the page,
        // otherwise show a "scroll to the top" icon
        if (topDistance < 50) {
          $("#actions-footer > #top").hide();
        } else if (topDistance > 100) {
          $("#actions-footer > #top").show();
        }
      });
    }
  }



  // firstImpression libray - move this to a separate file
  /*
   * firstImpression.js
   * Copyright (c) 2012 Rob Flaherty (@robflaherty)
   * Licensed under the MIT and GPL licenses.
   */

  window.firstImpression = function (cookie, days) {

    var cookieMachine, getCookie, setCookie, checkUser;

    /* Plain JS port of jquery.cookie plugin
     * Copyright (c) 2010 Klaus Hartl (stilbuero.de)
     * Dual licensed under the MIT and GPL licenses.
     */

    cookieMachine = function (key, value, options) {
      var expiration, result, time;

      if (arguments.length > 1 && String(value) !== "[object Object]") {
        options = options || {};

        if (value === null || value === undefined) {
          options.expires = -1;
        }

        if (typeof options.expires === 'number') {
          expiration = options.expires;
          time = options.expires = new Date();
          time.setTime(time.getTime() + expiration * 24 * 60 * 60 * 1000);
        }

        // Temporary fix for path problem
        options.path = '/';

        return (document.cookie = [
          encodeURIComponent(key),
          '=',
          encodeURIComponent(value),
          options.expires ? '; expires=' + options.expires.toUTCString() : '',
          options.path ? '; path=' + options.path : '',
          options.domain ? '; domain=' + options.domain : '',
          options.secure ? '; secure' : ''
        ].join(''));
      }

      result = new RegExp('(?:^|; )' + encodeURIComponent(key) + '=([^;]*)').exec(document.cookie);
      return result ? decodeURIComponent(result[1]) : null;
    };

    /*
     * Option defaults
     */

    if (cookie === undefined) {
      cookie = "_firstImpression";
    }

    if (days === undefined) {
      days = 730;
    }

    /*
     * Delete cookie if either option is null
     */

    if (cookie === null) {
      cookieMachine("_firstImpression", null);
      return;
    }

    if (days === null) {
      cookieMachine(cookie, null);
      return;
    }

    /*
     * Functions
     */

    getCookie = function () {
      return cookieMachine(cookie);
    };

    setCookie = function () {
      cookieMachine(cookie, true, { expires: days });
    };

    checkUser = function () {
      var status = getCookie();

      // Set cookie if new user
      if (!status) {
        setCookie();
      }

      return !status;
    };

    /*
     * Return boolean
     */

    return checkUser();

  };

  var first_time_here_gif = $("#first_time_here_gif");
  // Basic usage
  if (firstImpression()) {
    console.log('New user');
    first_time_here_gif.show();
  }
  else { console.log('This user has been here before');
  first_time_here_gif.hide();}



});
