var videos = document.getElementsByTagName("iframe");
for(var i=0; i<videos.length; i++)
{
  var video = videos[i];
  video.id = "video-"+i;
  video.setAttribute('data-src', video.src + "&version=3&enablejsapi=1&html5=1");
  video.src = '';
}

// Inject YouTube API script
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/player_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// global variable for the player
var players = {}
var playersLoaded = {}
var playersVisible = {}
console.log("videos found: " + videos.length);

players['test'] = 'testp';
console.log(players);

var readyFrames = [];
var observer = new IntersectionObserver(function(entries) {

  // isIntersecting is true when element and viewport are overlapping
  // isIntersecting is false when element and viewport don't overlap
    console.log("Callback");

console.log(entries);
    for(var i=0; i<entries.length; i++)
    {
      var iframe = entries[i].target;
      console.log(entries);
      playersVisible[iframe.id] = entries[i].isIntersecting;

      if(entries[i].isIntersecting == true)
      {
        if(!playersLoaded[iframe.id])
        {
          var dataSrc = iframe.getAttribute('data-src');
          iframe.src = dataSrc;
          playersLoaded[iframe.id] = true;
          console.log("creating " + iframe.id);
          players[iframe.id] = new YT.Player(iframe.id, {
            events: {
                // call this function when player is ready to use
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }
          });
        }
        else
        {
          // console.log(players);
          var player = players[iframe.id];
          player.playVideo();
        }
        console.log('Element has just become visible in screen: ' + iframe.id);

        //iframe.attr("src", iframe.data("src"));
      }
      else if(playersLoaded[iframe.id] == true)
      {
        console.log("pausing " + iframe.id);
        console.log(players);
        // if(players[iframe.id].src == dataSrc)
        var player = players[iframe.id];
        console.log(player);
        player.pauseVideo();
      }
    }
    
}, { threshold: [0.5] });


for(var i=0; i<videos.length; i++)
{
  playersLoaded[videos[i].id] = false;
  playersVisible[videos[i].id] = false;
  console.log("Observing " + videos[i].id);
  observer.observe(videos[i]);
}

// this function gets called when API is ready to use
function onYouTubePlayerAPIReady() {
    // create the global player from the specific iframe (#video)
    console.log("Youtube API ready");

    for(var i=0; i<videos.length; i++)
    {
      var video = videos[i];
      // if(video.id == null)
        // continue;
        console.log(videos[i].id);
        if(!playersLoaded[video.id])
          continue;

      players[video.id] = new YT.Player(video.id, {
          events: {
              // call this function when player is ready to use
              'onReady': onPlayerReady,
              'onStateChange': onPlayerStateChange
          }
      });
    }

  console.log(players);
}

function onPlayerStateChange(event) {
  console.log("playing: " + event.data != YT.PlayerState.PLAYING);
  console.log("visible: " + playersVisible[event.target.id] == true);
  console.log(event.target.h);
  console.log(playersVisible);
  if (event.data != YT.PlayerState.PLAYING && playersVisible[event.target.h.id] == true) {
    event.target.playVideo();
    event.target.setLoop(true);
  }
}


function onPlayerReady(event) {
event.target.setLoop(true);
}