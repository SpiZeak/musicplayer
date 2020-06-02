var jsmediatags = window.jsmediatags;
var audio;
var playlist;
var tracks;
var current;
var currentTrack;
var musicarr = [
  'http://localhost:3000/only-be-me.mp3',
  'http://localhost:3000/knockout.mp3',
  'http://localhost:3000/sad.mp3',
];

shuffle(musicarr);
init();
updateList();

function init() {
  current = 0;
  audio = $('audio');
  audio[0].volume = 0.4;
  currentTrack = musicarr[current];

  playSong(musicarr[current]);

  audio[0].addEventListener('ended', function (e) {
    current++;

    if (current == musicarr.length) {
      current = 0;
    }

    playSong(musicarr[current]);
  });
}

function playSong(link) {
  currentTrack = link;

  $('#list li').removeClass('current');
  $('#list li').each(function (i, track) {
    if ($(track).data('song') === currentTrack) {
      $(track).addClass('current');
    }
  });

  getTrackInfo(link, function (trackInfo) {
    $('#playing').html('Currently playing: ' + trackInfo.title);
  });

  $('audio')[0].src = link;

  $('audio')[0].load();
  $('audio')[0].play();
}

function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function getTrackInfo(link, callback = function () {}) {
  jsmediatags.read(link, {
    onSuccess: function (tag) {
      callback(tag.tags);
    },
    onError: function (error) {
      console.log(error);
    },
  });
}

function updateList() {
  $(musicarr).each(function (i, track) {
    var className = musicarr[current] == track ? 'current' : '';

    getTrackInfo(track, function (trackInfo) {
      $('#list').append(
        '<li data-song="' +
          track +
          '" class="' +
          className +
          '"><button onclick="playSong(\'' +
          track +
          '\')">' +
          trackInfo.title +
          '</button></li>',
      );
    });
  });
}
