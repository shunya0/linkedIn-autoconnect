
$(document).ready(function () {
  
    var counter = document.getElementById('count');
    
    var count = 0;
    var maxCount = 20;
    var maxArc = 240;
    var halfArc = maxArc / 2;
  
    // Circle function
    var circle =  function () {
    var arc = (maxArc / maxCount ) * count;
    var arc2 = ((maxArc / maxCount ) * count) - halfArc;
      
    arc = Math.floor(arc);
    arc2 = Math.floor(arc2);
      
     if (arc < halfArc) {    
        $(".left").attr('data-left', arc);
     } else if (arc == halfArc) {  
        $(".left").attr('data-left', arc);
        $(".right").attr('data-right', arc2);
     }
      else if (arc > halfArc) {  
        $(".right").attr('data-right', arc2);
     }   
  }
  
    // Active Buttons functions
    $(".plus").click(function () { 
      if (count < maxCount) {
        count ++;
        counter.innerHTML = count;
        circle();
      }    
    })
      
  });
   
  
  