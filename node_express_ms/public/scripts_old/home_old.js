$(window).bind("load", function() {
    $.ajax({
        url: "http://localhost:3000/getVideos",
        crossDomain: true,
        success: function(result){
        console.log(result[0].THUMBNAIL);
        var str="";
        for(var i=0 ; i<result.length; i++){
             str=str+`<div class="item col-xs-4 col-lg-4">
            <div class="thumbnail card">
                <div class="img-event">
                <img class="group list-group-image img-fluid img-thumbnail" onclick="playvideo()" src=`+result[i].THUMBNAIL+` alt="" />
                    
                </div>
                <div class="caption card-body">
                    <h4 class="group card-title inner list-group-item-heading">`+
                        result[i].VIDEONAME+`</h4>
                    <p class="group inner list-group-item-text">`+
                        result[i].VIDEODESC+`</p>
                    <div class="row">
                        <div class="col-xs-12 col-md-6">
                            <p class="lead">Views:`+
                                result[i].VIEWS+`</p>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>`;
        }
        document.getElementById('products').innerHTML=str;
        
    }});
});


function playvideo() {
    console.log("play video")
//   document.getElementById("demo").innerHTML = "Hello World";
location.href="http://example.com" 
}


