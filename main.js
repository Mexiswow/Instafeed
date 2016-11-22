$(document).ready(function(){
    var new_p,new_a,info_p,info_url,img,data_likes,nxturl,access_token;

    // Instagram access_token (accessToken)
    access_token = "2322023162.950772f.8c1e7258baf6450798cf70774261de1e";
    // Photo count load
    photo_count = 12;

    function getInstagram(){
        if (typeof this.dataset !== "undefined"){
            nxturl = this.dataset.url;
            this.style.display = "none";
        } else {
            nxturl = "https://api.instagram.com/v1/users/self/media/recent/?access_token="+access_token+"&count="+photo_count+";
        }
        $.ajax({
              method: "GET",
              url: nxturl,
              dataType: "jsonp",
              jsonp: "callback",
              jsonpCallback: "jsonpcallback",
              success: function(data) {
                console.log(data.data);
                console.log(data.pagination.next_url);
                $.each(data.data, function(i, pic) {
                  console.log(pic.images.standard_resolution.url);
                  new_p = $('<div>');
                  new_a = $('<a>');
                  info_url = $('<a>');
                  info_p = $('<span>');
                  img = $('<img>'); //Equivalent: $(document.createElement('img'))
                  data_likes = $('<i>');

                  // add attributes and data
                  new_p.attr('class','col-md-2 col-xs-6 insta-block');
                  info_p.attr('class', 'insta-info');
                  info_url.attr('class','btn btn-sm btn-primary pull-right');
                  info_url.attr('href',pic.link);
                  info_url.html('<i class="ion-social-instagram"> Open Instagram</i>');
                  data_likes.attr('class', 'ion-android-favorite-outline');
                  data_likes.html(pic.likes.count);
                  img.attr('class', 'img-responsive');
                  img.attr('src', pic.images.thumbnail.url);
                  new_a.attr('title',pic.likes.count+' likes');
                  new_a.attr('class', 'insta-link');
                  new_a.attr('href', pic.images.standard_resolution.url);
                  new_a.attr('data-gallery', 'data-gallery');
                  new_a.attr('data-insta', pic.link);


                  img.appendTo(new_a);
                  new_a.appendTo(new_p);
                  info_p.appendTo(new_p);
                  data_likes.appendTo(info_p);
                  info_url.appendTo(info_p);
                  new_p.appendTo('#instagram_feed');
                });
                if(data.pagination.next_url){
                  var createlink = $('<button>');
                  createlink.text("Load next posts...");
                  //createlink.setAttribute('onclick','reloadFeed(this,'+data.pagination.next_url+');');
                  createlink.attr({
                        'data-url':data.pagination.next_url,
                        'class':"btn btn-block top15"
                  });
                  createlink.appendTo('#instagram_feed');
                }
              },
              error: function(jqXHR, textStatus, errorThrown) {
                $("#log").val($("#log").val() + 'Error\n');
              }
            });
            console.log("feed reloaded")
    }
    getInstagram();
    $( "#instagram_feed" ).on( "click", "button", getInstagram);
  var linksss = '';
  var gallery = blueimp.Gallery(
        linksss ,
        {
            onopen: function () {
                // Callback function executed when the Gallery is initialized.
                console.log("onopen")

            },
            onopened: function () {
                // Callback function executed when the Gallery has been initialized
                console.log("onopened")
                // and the initialization transition has been completed.
            },
            onslide: function (index, slide) {
                console.log("onslide")
                // Callback function executed on slide change.
            },
            onslideend: function (index, slide) {
                console.log("onslideend")
                // Callback function executed after the slide change transition.
            },
            onslidecomplete: function (index, slide) {
                console.log("onslidecomplete")
                // Callback function executed on slide content load.
            },
            onclose: function () {
                console.log("onclose")
                // Callback function executed when the Gallery is about to be closed.
            },
            onclosed: function () {
                console.log("onclosed")
                // Callback function executed when the Gallery has been closed
                // and the closing transition has been completed.
            }
        }
    );
});
