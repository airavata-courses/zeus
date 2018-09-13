var searchStr = "";
function getSearchResults(e){
    var keynum;
    if(window.event) { // IE                    
      keynum = e.keyCode;
    } else if(e.which){ // Netscape/Firefox/Opera                   
      keynum = e.which;
    }
    searchStr += String.fromCharCode(keynum);
    console.log(searchStr);
}
