function setupVideo() {
  let iframes = Array.from(document.getElementsByTagName("iframe"));
  let videos = Array.from(document.getElementsByTagName("video"));

  // Handle YouTube Iframes
  iframes.forEach((iframe, index) => {
    if (iframe.src.includes("youtube.com") || iframe.src.includes("youtu.be")) {
      iframe.id = "video-" + index;
      iframe.src += "&rel=0&version=3&enablejsapi=1&html5=1";

      console.log("creating " + iframe.id);

      if (typeof YT !== "undefined" && YT.Player) {
        players[iframe.id] = new YT.Player(iframe.id, {
          events: {
            onReady: onPlayerReady,
            onStateChange: onPlayerStateChange,
          },
          playerVars: {
            autoplay: 0,
            autohide: 1,
            modestbranding: 1,
            showinfo: 0,
            controls: 0,
            rel: 0,
            fs: 0,
          },
        });
      } else {
        console.warn("YouTube API not loaded. Skipping " + iframe.id);
      }
    }
  });

  // Handle Native Video Elements
  videos.forEach((video, index) => {
    video.id = "native-video-" + index;
    console.log("processing native video " + video.id);
    observer.observe(video);
  });
}

var players = {};
var observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        let element = entry.target;

        if (element.tagName === "IFRAME" && players[element.id]) {
          let player = players[element.id];
          if (entry.isIntersecting) {
            console.log("playing " + element.id);
            player.playVideo();
          } else {
            console.log("pausing " + element.id);
            player.pauseVideo();
          }
        } else if (element.tagName === "VIDEO") {
          if (entry.isIntersecting) {
            console.log("playing native " + element.id);
            element.play();
            element.classList.add("playing"); // Hide play overlay
          } else {
            console.log("pausing native " + element.id);
            element.pause();
            element.classList.remove("playing"); // Show play overlay again
          }
        }
      });
    },
    { threshold: [0.1] }
);

function onYouTubePlayerAPIReady() {
  console.log("YouTube API loaded");
  setupVideo();
}

function onPlayerStateChange(event) {
  // Placeholder for any additional state changes
}

function onPlayerReady(event) {
  let iframeElement = document.getElementById(event.target.getIframe().id);

  if (iframeElement) {
    observer.observe(iframeElement);
    console.log("Starting to observe", iframeElement.id);
  } else {
    console.warn("Could not find iframe element to observe");
  }

  event.target.stopVideo(); // Ensure it doesn't autoplay
}