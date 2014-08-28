var mode;

function User() {
  // jWorld doesn't manipulate <a> objects, so we have to insert the <a>
  // into an element which can move, like <div> or <span>.
  function insertDiv(t, dispClass) {
    var $firstChild = $(t.firstChild);

    // wrap the <a> in a <div>. The wrap function returns the initial element
    // not what you get after the wrap.
    $firstChild = $firstChild.wrap("<div></div>");

    // remove the navigation__link class from the <li>
    $(t).removeClass(dispClass);

    // add navigation__link class to <div>
    var $divWClassAttr = $firstChild.parent().addClass(dispClass);

    // change style of <div> to inline-block
    //$divWClassAttr.attr("display", "inline-block");
  }

  function spinDiv(th) {
    // the first child of the <li> is a <div>
    var $t = $(th.firstChild);
    $t.css("background-color", "#dfa");
    if (mode >= 2.5) {
      $t.world("page", {transition: "none", rotateY: -178});
      setTimeout(function() {
        $t.world("page", {transition: ".45s ease-out", rotateY: -10, z:40});
      }, 5);
    }
  }

  function clearDiv(th) {
    // the first child of the <li> is a <div>
    var $t = $(th.firstChild);
    if ($t.hasClass('sidebar__button--active')) {
      $t.css("background-color", "#11FEDD");
    }
    else {
      $t.css("background-color", "#2BCDB7");
    }
    if (mode >= 2.5) {
      $t.world("page", {});
    }
  }

  // this class is for all the user interaction we might have.
  var $navBarLI = $(".navigation li");
  var $sideBarButton = $('.sidebar button');

  // set up navBar effects
  $navBarLI.each(function() {
    insertDiv(this, "navigation__link");
  });

  $navBarLI.on("mouseenter click", function(ev) {
    spinDiv(this);
  });

  $navBarLI.on("mouseleave", function(ev) {
    clearDiv(this);
  });

  // set up sideBar effects
  $sideBarButton.each(function() {
    insertDiv(this, "");
  });


  $sideBarButton.on("mouseenter click", function(ev) {
    spinDiv(this);
  });

  $sideBarButton.on("mouseleave", function(ev) {
    clearDiv(this);
  });
}
//End User

//This controls the transitions between the different
//modes using the buttons in the sidebar
function ViewControl () {

  //variables to hold the necessary elements for
  //transition to different modes
  var $cam = $("#view_container");
  var $header = $('.navigation');
  var $links = $('.navigation .navigation__link');
  var $aside = $('.sidebar');
  var $buttons = $('.sidebar div');
  var $content = $('.content');

  var currentActive = '#base';
  var baseText = 'This webpage is currently being displayed in regular HTML. Select an option below to see what is possible with the Third Dimension.';
  var twoFiveText = 'This webpage is currently being displayed in 2.5-D HTML. It retains the general look of a regular website, but the possibilities have expanded.';
  var threeDText = 'This webpage is currently being displayed in 3-D HTML. There is now a whole new dimension of possibilities.';

  $('#base').on('click', initializeBase);
  $('#2-5').on('click', initializeTwoFive);
  $('#3-D').on('click', initializeThreeD);

  //Function used in the process to change between modes
  function changeActiveButton (button) {

    $(button)
      .addClass('sidebar__button--active')
      .removeClass('sidebar__button');
    $(currentActive)
      .addClass('sidebar__button')
      .removeClass('sidebar__button--active');

    currentActive = button;
  }

  //
  function initializeBase () {
    mode = 2;

    if(currentActive === '#3-D') {
      $cam.world('set', 'clearAll');

    }
    else{
      $header.world('page', 'clearAll');
      $links.world('page', 'clearAll');
      $aside.world('page', 'clearAll');
      $buttons.world('page', 'clearAll');
    }

    $('.sidebar__text').text(baseText);

    changeActiveButton('#base');
  }

  function initializeTwoFive () {
    mode =2.5;

    $header.world('page', {transition:".5s ease-in-out", z: -5});
    $links.world('page', {transition:".5s ease-in-out", z: 5});

    $aside.world('page', {transition:".5s ease-in-out", z: -5});
    $buttons.world('page', {transition:".5s ease-in-out", z: 5});

    $('.sidebar__text').text(twoFiveText);

    changeActiveButton('#2-5');
  }

  function initializeThreeD () {
    mode = 3;

    $cam.world({fov:70, x:0,y:0,z:-400});
    $cam.height(680);

    $cam.world('addElements', $header);
    $header
      .world('set', {x:-168,y:205,z:20})
      .width(960 * 0.979166667);

    $cam.world('addElements', $aside);
    $aside
      .css({'top':-205, 'left':-450})
      .width(960 * 0.145833333);

    $cam.world('addElements', $content);
    $content
      .css({'top':-375, 'left':-280})
      .width(960 * 0.75);

    $('.sidebar__text').text(threeDText);

    changeActiveButton('#3-D');
  }
}
//End ViewControl


//
//
//
$(document).ready(function() {
  // $(".sidebar").world("page", { perspective: 400, z:200, rotateY:45});

  // what is our state coming in? We are going to assume 2D for the time
  // being, but it may be that we have to get this from SessionStorage
  // because we might be in 2D, 2.5D or 3D

  var viewC = new ViewControl ();

  var user = new User();
});
