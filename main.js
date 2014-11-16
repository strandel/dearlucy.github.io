/*   ______                  _
     |  _  \                | |
     | | | |___  __ _ _ __  | |    _   _  ___ _   _
     | | | / _ \/ _` | '__| | |   | | | |/ __| | | |
     | |/ /  __/ (_| | |    | |___| |_| | (__| |_| |
     |___/ \___|\__,_|_|    \_____/\__,_|\___|\__, |
                                               __/ |
                                              |___/   */

$(document).ready(function() {

  var MAIL_ADDRESS_TO_SEND_TO = 'toni.strandell@gmail.com'

  $('#sign-up-button').click(function () {
    $('.sign-up-form-section').animate({ 'max-height': 1000 }, 300)
    setTimeout(function () { $('.sign-up-form').animate({ 'opacity': 1 }, 200) }, 150)
    // TODO: scroll to form and focus first
    // TODO: send GA event of opening sign up
  })

  $('.sign-up-form button.send').click(function (event) {
    event.preventDefault()
    // TODO: send to GA as well
    // TODO: check all fields are filled and checkbox is checked
    var signUpData = $('.sign-up-form').serializeArray().map(function (field) { return field.name + ': ' + field.value }).join('\n')
    var mandrillSendMailObj = {
      type: "POST",
      url: "https://mandrillapp.com/api/1.0/messages/send.json",
      data: {
        'key': '4dgJP2EFJK04xMZX7A_fqg',
        'message': {
          'from_email': 'dearlucy.dev@gmail.com',
          'to': [{ 'email': MAIL_ADDRESS_TO_SEND_TO, 'name': 'Test', 'type': 'to' }],
          'autotext': 'true',
          'subject': 'Sign up details from webpage',
          'html': signUpData
        }
      }
    }
    // TODO: send success and fail codes to GA
    $.ajax(mandrillSendMailObj)
      .done(function () { console.log('SUCCESS!!') })
      .fail(function () { console.error('Mail sending failed..') })
  })

  // TODO: delighter mail titles random

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
