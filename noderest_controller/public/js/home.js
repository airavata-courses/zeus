// var searchStr = "";

function getSearchResults(e){
  var searchStr = document.getElementById("search").value;
  if(searchStr!=''){
    $.ajax({
      url: "/getSearchVideos",
      crossDomain: true,
      data: {data: searchStr},
      success: function(result){
        console.log("TESTINGMAX");
        console.log(JSON.parse(result));
        // console.log(typeof JSON.parse(result));
        if(result.length>0){
          autocomplete(document.getElementById("search"),JSON.parse(result))
        }
    }});
    
  }
}

function autocomplete(inp, arr) {
  console.log("CheckMax");
  // console.log(inp);
   console.log(arr);
  // console.log(arr[0].videoLink);
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function(e) {
      var a, b, i, val = this.value;
      /*close any already open lists of autocompleted values*/
      closeAllLists();
      if (!val) { return false;}
      currentFocus = -1;
      /*create a DIV element that will contain the items (values):*/
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      /*append the DIV element as a child of the autocomplete container:*/
      this.parentNode.appendChild(a);
      /*for each item in the array...*/
      for (i = 0; i < arr.length; i++) {
        /*check if the item starts with the same letters as the text field value:*/
        if(arr[i].videoName.toUpperCase().includes(val.toUpperCase())){
        //  if(arr[i].toUpperCase().includes(val.toUpperCase())){
        
          /*create a DIV element for each matching element:*/
          b = document.createElement("DIV");
          /*make the matching letters bold:*/
          b.innerHTML = "<strong>" + arr[i].videoName.substr(0, val.length) + "</strong>";
          b.innerHTML += arr[i].videoName.substr(val.length);
          
          b.innerHTML += "<input type='hidden' value='" + arr[i].videoName + "'><input type='hidden' value='" + arr[i].videoLink + "'>";
          b.innerHTML +="<input type='hidden' value='" + arr[i].category + "'><input type='hidden' value='" + arr[i].uploadedBy + "'>";
          
          /*execute a function when someone clicks on the item value (DIV element):*/
          console.log(b.innerHTML);
          console.log("Testing Again");
          console.log(arr);
          b.addEventListener("click", function(e) {
           
              /*insert the value for the autocomplete text field:*/
              console.log("Testing max Again");
              console.log(e);
              var url = this.getElementsByTagName("input")[1].value;
              inp.value = this.getElementsByTagName("input")[0].value;
              var cat=this.getElementsByTagName("input")[2].value;
              console.log(cat);
              
              var user=this.getElementsByTagName("input")[3].value;
             
              $.ajax({
                url: "/addQueue",
                crossDomain: true,
                data: {userId: "haritha.cbit2010@gmail.com", category: cat},
                success: function(result){
                  console.log("added to queue");
              }});          
               window.location="/playVideo?url="+url;
              /*close the list of autocompleted values,
              (or any other open lists of autocompleted values:*/
              closeAllLists();
          });
          a.appendChild(b);

        }
      }

  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function(e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
        currentFocus++;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 38) { //up
        /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
        currentFocus--;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 13) {
        /*If the ENTER key is pressed, prevent the form from being submitted,*/
        e.preventDefault();
        if (currentFocus > -1) {
          /*and simulate a click on the "active" item:*/
          if (x) x[currentFocus].click();
        }
      }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
      closeAllLists(e.target);
  });
}

$(window).bind("load", function() {
  console.log("test");
  $.ajax({
      url: "/getVideos",
      crossDomain: true,
      dataType:'json',
      success: function(result){
        result=JSON.parse(result);
        console.log(result);
        var str="";
        for(var i=0 ; i<result.length; i++){
          str += `<div class="col-lg-4 col-md-6 mb-4">
          <div class="card h-80" onclick="redirectVideo('`+result[i][3]+`','`+result[i][7]+`');">
          <img class="card-img-top" src=`+result[i][6]+` alt="">

          <!--<a href=`+result[i][3]+`><img class="card-img-top" src=`+result[i][6]+` alt=""></a>-->
            <!-- <a href="#"><img class="card-img-top" src=`+result[i][6]+` alt="">result[i][3]</a>-->
            <div class="card-body">
              <h4 class="card-title">
                <a href="#">`+result[i][1]+`</a>
              </h4>
              <p class="card-text">`+result[i][2]+`</p>
              <p class="card-text"> `+result[i][5]+` Views</p>
            </div>
          </div>
        </div>`;        
    }
      document.getElementById('videos').innerHTML=str;     
  }});
});

$(window).bind("load", function() {
  console.log("test");
  $.ajax({
      url: "/getRecommendations",
      crossDomain: true,
      dataType:'json',
      success: function(result){
        result=JSON.parse(result);
        console.log("#############")
        console.log(result);

         var str="";
         for(var i=0 ; i<result.length; i++){
          
          console.log(result[0][3])
          console.log(result[0][7])
          str+=`<div class="videoRecoList" onclick="redirectVideo('`+result[i][3]+`','`+result[i][7]+`');">
          <img src=`+result[i][6]+`></div>`;
        
     }
     document.getElementById('recommendedvideos').innerHTML=str;     
  }});
});



function redirectVideo(url, cat) {
  console.log("redirected")
  console.log(cat);
  //var cat=this.getElementsByTagName("input")[2].value;
  $.ajax({
    url: "/addQueue",
    crossDomain: true,
    data: {userId: "haritha.cbit2010@gmail.com", category: cat},
    success: function(result){
      console.log("added to queue");
  }});
  window.location="/playVideo?url="+url;
}
