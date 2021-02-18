function setupVideo() {
  let videos = Array.from(document.getElementsByTagName("iframe"));

  videos.forEach((video, index) => {
    video.id = "video-" + index;

    video.src = video.src + "&rel=0&version=3&enablejsapi=1&html5=1";
    console.log("creating " + video.id);

    players[video.id] = new YT.Player(video.id, {
      events: {
        // call this function when player is ready to use
        onReady: onPlayerReady,
        onStateChange: onPlayerStateChange,
      },
      playerVars: { 
        'autoplay': 0,
        'autohide' : 1,
        'modestBranding' : 1,
        'showinfo': 0,
        'controls': 0, 
        'rel' : 0,
        'fs' : 0,
    }
    });
  });
}

var players = {};
var readyFrames = [];

var observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      let iframe = entry.target;

      var player = players[iframe.id];
      if (entry.isIntersecting) {
        console.log("playing " + iframe.id);
        player.playVideo();
      } else {
        console.log("pausing " + iframe.id);
        player.pauseVideo();
      }
    });
  },
  { threshold: [1] }
);

// this function gets called when API is ready to use
function onYouTubePlayerAPIReady() {
  setupVideo();
}

function onPlayerStateChange(event) {

}

function onPlayerReady(event) {
  event.target.stopVideo();
  observer.observe(event.target.h);
  console.log("starting to observe", event.target.h.id);
}
