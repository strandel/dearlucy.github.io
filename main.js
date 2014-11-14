/*   ______                  _
     |  _  \                | |
     | | | |___  __ _ _ __  | |    _   _  ___ _   _
     | | | / _ \/ _` | '__| | |   | | | |/ __| | | |
     | |/ /  __/ (_| | |    | |___| |_| | (__| |_| |
     |___/ \___|\__,_|_|    \_____/\__,_|\___|\__, |
                                               __/ |
                                              |___/   */

$(document).ready(function() {

  function adjustVideoSize() {
    var maxVideoWidth = 1440
    var aspectRatio = 16 / 9
    var windowWidth = $(window).width()
    var videoWidth = Math.min(maxVideoWidth, windowWidth)
    var videoHeight = videoWidth / aspectRatio

    $('.introduction').css('height', videoHeight)
    $('.video').add('.video-container').css({
      width: videoWidth + 'px',
      height: videoHeight + 'px'
    })
  }

  var noVideoAutoPlay = /(iPad|iPhone|iPod|Windows Phone|Android)/g.test(navigator.userAgent)

  if (noVideoAutoPlay) {
    $('body').addClass('no-video-autoplay')
    $('.video').remove()
  }
  $(window).on('resize', adjustVideoSize)
  adjustVideoSize()
})
