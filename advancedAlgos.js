// -------------------  1 ---- 


function telephoneCheck(str) {
  
  
  var a = /\d{3}-\d{3}-\d{4}$/;
  var b = /\(\d{3}\)\d{3}-\d{4}$/;
  var c = /\(\d{3}\)\s\d{3}-\d{4}$/;
  var d = /\d{3}\s\d{3}\s\d{4}$/;
  var e = /\d{10}$/;
  var f = /\d{3}\s\d{3}\s\d{4}$/;
  var g = /^1\d*/;
  
  //do a series of checks and see if this works, rather than try to come up with one brilliant, all encompassing regexp.
  //peace
  //stay strong!
  
  
  return g.test("1 (555) 555-5555");
  
  
  if(g.test(str) && str.charAt(0) ==1){
    if(a.test(str) || b.test(str) || c.test(str) || d.test(str) || e.test(str) || f.test(str) ){
      return true;
    } else {
      return false;
    }
  } else if(g.test(str) && str.charAt(0) !=1){
      return false;
  } else{
    if(a.test(str) || b.test(str) || c.test(str) || d.test(str) || e.test(str) || f.test(str) ){
      return true;
      } else{
        return false;
      }
  }
  
  

// -------------------  2 ----- 
