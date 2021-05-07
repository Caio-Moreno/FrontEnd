$(document).ready(function(){
    var options = [
        // STAGGERED LIST TRANSITION
        {selector: '#staggered-test', offset: 100, callback: function(el) {
          Materialize.showStaggeredList($(el));
        } },
        // FADE IN ANY IMAGES IN THE STAGGERED LIST       
        {selector: '#staggered-test', offset: 100, callback: function(el) {
          Materialize.fadeInImage($(el));
        } }
      ];
      Materialize.scrollFire(options);
  });