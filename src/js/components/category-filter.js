$(function () {


    // Genre tabs slider 
    var SETTINGS_2 = {
        navBarTravelling_2: false,
        navBarTravelDirection_2: "",
        navBarTravelDistance_2: 150
    }

    var colour = "#000"

    document.documentElement.classList.remove("no-js");
    document.documentElement.classList.add("js");

    var ctAdvancerLeft = document.getElementById("ctAdvancerLeft");
    var ctAdvancerRight = document.getElementById("ctAdvancerRight");

    // the indicator
    var ctIndicator = document.getElementById("ctIndicator");

    var ctProductNav = document.getElementById("ctProductNav");
    var ctProductNavContents = document.getElementById("ctProductNavContents");


    ctProductNav.setAttribute("data-overflowing", determineOverflow(ctProductNavContents, ctProductNav));

    // Set the indicator
    moveIndicator(ctProductNav.querySelector("[aria-selected=\"true\"]"), colour);

    // Handle the scroll of the horizontal container
    var last_known_scroll_position_cat = 0;
    var ticking_2 = false;


    function doSomething(scroll_pos) {
        ctProductNav.setAttribute("data-overflowing", determineOverflow(ctProductNavContents, ctProductNav));
    }


    ctProductNav.addEventListener("scroll", function () {
        last_known_scroll_position_cat = window.scrollY;
        if (!ticking_2) {
            window.requestAnimationFrame(function () {
                dosomething(last_known_scroll_position_cat);
                ticking_2 = false;
            });
        }
        ticking_2 = true;
    });

    ctAdvancerLeft.addEventListener("click", function () {
        // If in the middle of a move return
        if (SETTINGS_2.navBarTravelling_2 === true) {
            return;
        }
        // If we have content overflowing both sides or on the left
        if (determineOverflow(ctProductNavContents, ctProductNav) === "left" || determineOverflow(ctProductNavContents, ctProductNav) === "both") {
            // Find how far this panel has been scrolled
            var availableScrollLeft_2 = ctProductNav.scrollLeft;
            // If the space available is less than two lots of our desired distance, just move the whole amount
            // otherwise, move by the amount in the SETTINGS_2
            if (availableScrollLeft_2 < SETTINGS_2.navBarTravelDistance_2 * 2) {
                ctProductNavContents.style.transform = "translateX(" + availableScrollLeft_2 + "px)";
            } else {
                ctProductNavContents.style.transform = "translateX(" + SETTINGS_2.navBarTravelDistance_2 + "px)";
            }
            // We do want a transition (this is set in CSS) when moving so remove the class that would prevent that
            ctProductNavContents.classList.remove("ct-ProductNav_Contents-no-transition");
            // Update our settings
            SETTINGS_2.navBarTravelDirection_2 = "left";
            SETTINGS_2.navBarTravelling_2 = true;
        }
        // Now update the attribute in the DOM
        ctProductNav.setAttribute("data-overflowing", determineOverflow(ctProductNavContents, ctProductNav));
    });




    ctAdvancerRight.addEventListener("click", function () {
        // If in the middle of a move return
        if (SETTINGS_2.navBarTravelling_2 === true) {
            return;
        }
        // If we have content overflowing both sides or on the right
        if (determineOverflow(ctProductNavContents, ctProductNav) === "right" || determineOverflow(ctProductNavContents, ctProductNav) === "both") {
            // Get the right edge of the container and content
            var navBarRightEdge_2 = ctProductNavContents.getBoundingClientRect().right;
            var navBarScrollerRightEdge_2 = ctProductNav.getBoundingClientRect().right;
            // Now we know how much space we have available to scroll
            var availableScrollRight_2 = Math.floor(navBarRightEdge_2 - navBarScrollerRightEdge_2);
            // If the space available is less than two lots of our desired distance, just move the whole amount
            // otherwise, move by the amount in the settings
            if (availableScrollRight_2 < SETTINGS_2.navBarTravelDistance_2 * 2) {
                ctProductNavContents.style.transform = "translateX(-" + availableScrollRight_2 + "px)";
            } else {
                ctProductNavContents.style.transform = "translateX(-" + SETTINGS_2.navBarTravelDistance_2 + "px)";
            }
            // We do want a transition (this is set in CSS) when moving so remove the class that would prevent that
            ctProductNavContents.classList.remove("ct-ProductNav_Contents-no-transition");
            // Update our settings
            SETTINGS_2.navBarTravelDirection_2 = "right";
            SETTINGS_2.navBarTravelling_2 = true;
        }
        // Now update the attribute in the DOM
        ctProductNav.setAttribute("data-overflowing", determineOverflow(ctProductNavContents, ctProductNav));
    });

    ctProductNavContents.addEventListener(
        "transitionend",
        function () {
            // get the value of the transform, apply that to the current scroll position (so get the scroll pos first) and then remove the transform
            var styleOfTransform_2 = window.getComputedStyle(ctProductNavContents, null);
            var tr_2 = styleOfTransform_2.getPropertyValue("-webkit-transform") || styleOfTransform.getPropertyValue("transform");
            // If there is no transition we want to default to 0 and not null
            var amount_2 = Math.abs(parseInt(tr_2.split(",")[4]) || 0);
            ctProductNavContents.style.transform = "none";
            ctProductNavContents.classList.add("ct-ProductNav_Contents-no-transition");
            // Now lets set the scroll position
            if (SETTINGS_2.navBarTravelDirection_2 === "left") {
                ctProductNav.scrollLeft = ctProductNav.scrollLeft - amount_2;
            } else {
                ctProductNav.scrollLeft = ctProductNav.scrollLeft + amount_2;
            }
            SETTINGS_2.navBarTravelling_2 = false;
        },
        false
    );

    // Handle setting the currently active link
    ctProductNavContents.addEventListener("click", function (e) {
        var links_2 = [].slice.call(document.querySelectorAll(".ct-ProductNav_Link"));
        links_2.forEach(function (items) {
            items.setAttribute("aria-selected", "false");
        })
        e.target.setAttribute("aria-selected", "true");
        // Pass the clicked items and it's colour to the move indicator function
        moveIndicator(e.target, colour);
    });

    // var count = 0;
    function moveIndicator(items, color) {
        var textPosition = items.getBoundingClientRect();
        var container = ctProductNavContents.getBoundingClientRect().left;
        var distance = textPosition.left - containerCat;
        var scroll = ctProductNavContents.scrollLeft;
        ctIndicator.style.transform = "translateX(" + ((distanceCat + 14) + scroll) + "px) scaleX(" + (textPosition.width - 14 * 2) * 0.01 + ")";
        // count = count += 100;
        // pnIndicator.style.transform = "translateX(" + count + "px)";

        if (color) {
            ctIndicator.style.backgroundColor = color;
        }
        var ctProductNavLink = $('.ct-ProductNav_Link')
    }

    function determineOverflow(content, container) {
        var containerMetrics_2 = container.getBoundingClientRect();
        var containerMetricsRight_2 = Math.floor(containerMetrics_2.right);
        var containerMetricsLeft_2 = Math.floor(containerMetrics_2.left);
        var contentMetrics_2 = content.getBoundingClientRect();
        var contentMetricsRight_2 = Math.floor(contentMetrics_2.right);
        var contentMetricsLeft_2 = Math.floor(contentMetrics_2.left);
        if (containerMetricsLeft_2 > contentMetricsLeft_2 && containerMetricsRight_2 < contentMetricsRight_2) {
            return "both";
        } else if (contentMetricsLeft_2 < containerMetricsLeft_2) {
            return "left";
        } else if (contentMetricsRight_2 > containerMetricsRight_2) {
            return "right";
        } else {
            return "none";
        }
    }


    (function (root, factory) {
        if (typeof define === 'function' && define.amd) {
            define(['exports'], factory);
        } else if (typeof exports !== 'undefined') {
            factory(exports);
        } else {
            factory((root.dragscroll = {}));
        }
    }(this, function (exports) {
        var _window = window;
        var _document = document;
        var mousemove = 'mousemove';
        var mouseup = 'mouseup';
        var mousedown = 'mousedown';
        var EventListener = 'EventListener';
        var addEventListener = 'add' + EventListener;
        var removeEventListener = 'remove' + EventListener;
        var newScrollX, newScrollY;

        var dragged_2 = [];
        var reset = function (i, el) {
            for (i = 0; i < dragged_2.length;) {
                el = dragged_2[i++];
                el = el.containerCat || el;
                el[removeEventListener](mousedown, el.md, 0);
                _window[removeEventListener](mouseup, el.mu, 0);
                _window[removeEventListener](mousemove, el.mm, 0);
            }

            // cloning into array since HTMLCollection is updated dynamically
            dragged_2 = [].slice.call(_document.getElementsByClassName('dragscroll'));
            for (i = 0; i < dragged_2.length;) {
                (function (el, lastClientX, lastClientY, pushed, scroller, cont) {
                    (cont = el.containerCat || el)[addEventListener](
                        mousedown,
                        cont.md = function (e) {
                            if (!el.hasAttribute('nochilddrag') ||
                                _document.elementFromPoint(
                                    e.pageX, e.pageY
                                ) == cont
                            ) {
                                pushed = 1;
                                lastClientX = e.clientX;
                                lastClientY = e.clientY;

                                e.preventDefault();
                            }
                        }, 0
                    );

                    _window[addEventListener](
                        mouseup, cont.mu = function () { pushed = 0; }, 0
                    );

                    _window[addEventListener](
                        mousemove,
                        cont.mm = function (e) {
                            if (pushed) {
                                (scroller = el.scroller || el).scrollLeft -=
                                    newScrollX = (- lastClientX + (lastClientX = e.clientX));
                                scroller.scrollTop -=
                                    newScrollY = (- lastClientY + (lastClientY = e.clientY));
                                if (el == _document.body) {
                                    (scroller = _document.documentElement).scrollLeft -= newScrollX;
                                    scroller.scrollTop -= newScrollY;
                                }
                            }
                        }, 0
                    );
                })(dragged[i++]);
            }
        }


        if (_document.readyState == 'complete') {
            reset();
        } else {
            _window[addEventListener]('load', reset, 0);
        }

        exports.reset = reset;
    }));


})