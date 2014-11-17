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

  $('.sign-up-form').on('focus', 'input', function (event) { $(event.target).removeClass('missing') })
  $('.sign-up-form').on('blur', 'input', function (event) { if (!inputValue(event.target)) $(event.target).addClass('missing') })
  $('.sign-up-form').submit(function (event) {
    event.preventDefault()
    var formFieldsArray = formInputsAsNameValueArray($('.sign-up-form'))
    var missingFieldNames = _.chain(formFieldsArray).filter(function (field) {return !field.value}).pluck('name').value()

    if (missingFieldNames.length) {
      $('.sign-up-form input').removeClass('missing')
      _.chain(missingFieldNames)
        .map(function (name) { return $('input[name=' + name + ']') })
        .each(function ($input) { $input.addClass('missing') })
    } else {
      // TODO: send to GA as well
      // TODO: send success and fail codes to GA
      $.ajax(mandrillSendMailObj(toMessageFormat(formFieldsArray)))
        .done(signUpSuccess)
        .fail(sendingMailFailed)
    }
  })

  function formInputsAsNameValueArray($form) { return _.map($form.find('input').toArray(), inputElemToNameValueObj) }
  function inputElemToNameValueObj(input) { return { name: $(input).attr('name'), value: inputValue(input) }}
  function inputValue(input) { return $(input).attr('type') == 'checkbox' ? $(input).prop('checked') : $(input).val() }

  function signUpSuccess() {
    $('.sign-up-form .send').css({'visibility': 'hidden'})
    $('.sign-up-form .joined-msg').fadeIn(300)
  }
  function sendingMailFailed() { console.error('Mail sending failed..') }
  function toMessageFormat(nameValueObjArray) { return _.map(nameValueObjArray, function (field) { return field.name + ': ' + field.value }).join('<br/>')}
  function mandrillSendMailObj(htmlMsg) {
    return {
      type: "POST",
      url: "https://mandrillapp.com/api/1.0/messages/send.json",
      data: {
        'key': '4dgJP2EFJK04xMZX7A_fqg',
        'message': {
          'from_email': 'dearlucy.dev@gmail.com',
          'to': [{ 'email': MAIL_ADDRESS_TO_SEND_TO, 'name': 'Test', 'type': 'to' }],
          'autotext': 'true',
          'subject': 'Dearlucy.co: New sign up from webpage',
          'html': htmlMsg
        }
      }
    }
  }

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
