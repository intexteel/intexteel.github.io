// let videos = Array.from(document.getElementsByTagName("iframe"));

function setupVideo() {
  let videos = Array.from(document.getElementsByTagName("iframe"));

  videos.forEach((video, index) => {
    video.id = "video-" + index;
    // console.log(video.src);

    video.src = video.src + "&version=3&enablejsapi=1&html5=1";

    // video.setAttribute(
    //   "data-src",
    //   video.src + "&version=3&enablejsapi=1&html5=1"
    // );
    // video.src = "";
    //
    // var dataSrc = video.getAttribute("data-src");

    // video.src = dataSrc;

    // playersLoaded[video.id] = true;
    console.log("creating " + video.id);

    players[video.id] = new YT.Player(video.id, {
      events: {
        // call this function when player is ready to use
        onReady: onPlayerReady,
        onStateChange: onPlayerStateChange,
      },
    });

    // players[video.id].pauseVideo();

    // playersLoaded[video.id] = false;
    // playersVisible[video.id] = false;

    // console.log("Observing " + video.id);

    // observer.observe(video);
  });
}
// Inject YouTube API script
// var tag = document.createElement("script");
// tag.src = "https://www.youtube.com/player_api";
//
// var firstScriptTag = document.getElementsByTagName("script")[0];
// firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// global variable for the player
var players = {};
// var playersLoaded = {};
// var playersVisible = {};
// console.log("videos found: " + videos.length);

players["test"] = "testp";
console.log(players);

var readyFrames = [];

var observer = new IntersectionObserver(
  (entries) => {
    console.log("observer changed");
    // isIntersecting is true when element and viewport are overlapping
    // isIntersecting is false when element and viewport don't overlap
    // console.log("Callback");
    //
    // console.log(entries);

    entries.forEach((entry) => {
      let iframe = entry.target;

      var player = players[iframe.id];
      // console.log(player);

      // console.log(entries);
      // playersVisible[iframe.id] = entry.isIntersecting;

      if (entry.isIntersecting) {
        console.log("playing " + iframe.id);
        player.playVideo();
        // Load video
        // if (!playersLoaded[iframe.id]) {
        //   var dataSrc = iframe.getAttribute("data-src");
        //   iframe.src = dataSrc;
        //   playersLoaded[iframe.id] = true;
        //   console.log("creating " + iframe.id);
        //   players[iframe.id] = new YT.Player(iframe.id, {
        //     events: {
        //       // call this function when player is ready to use
        //       onReady: onPlayerReady,
        //       onStateChange: onPlayerStateChange,
        //     },
        //   });
        // } else {
        //   // console.log(players);
        //   var player = players[iframe.id];
        //   player.playVideo();
        // }

        // console.log("Element has just become visible in screen: " + iframe.id);

        //iframe.attr("src", iframe.data("src"));
      } else {
        console.log("pausing " + iframe.id);
        // console.log(players);
        // if(players[iframe.id].src == dataSrc)

        // var player = players[iframe.id];
        // console.log(player);

        player.pauseVideo();
      }
    });
  },
  { threshold: [1] }
);

// this function gets called when API is ready to use
function onYouTubePlayerAPIReady() {
  setupVideo();

  // // create the global player from the specific iframe (#video)
  // console.log("Youtube API ready");
  //
  // for (var i = 0; i < videos.length; i++) {
  //   var video = videos[i];
  //   // if(video.id == null)
  //   // continue;
  //   console.log(videos[i].id);
  //   if (!playersLoaded[video.id]) continue;
  //
  //   players[video.id] = new YT.Player(video.id, {
  //     events: {
  //       // call this function when player is ready to use
  //       onReady: onPlayerReady,
  //       onStateChange: onPlayerStateChange,
  //     },
  //   });
  // }
  //
  // console.log(players);
}

function onPlayerStateChange(event) {
  // console.log("playing: " + event.data != YT.PlayerState.PLAYING);
  // console.log("visible: " + playersVisible[event.target.id] == true);
  // console.log(event.target.h);
  // console.log(playersVisible);
  // if (
  //   event.data != YT.PlayerState.PLAYING &&
  //   playersVisible[event.target.h.id] == true
  // ) {
  // event.target.playVideo();
  // event.target.setLoop(true);
  // }
}

function onPlayerReady(event) {
  // event.target.setLoop(true);
  // Automatically pause video on load

  event.target.stopVideo();

  observer.observe(event.target.h);

  console.log("starting to observe", event.target.h.id);
}
