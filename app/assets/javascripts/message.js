$(document).on('turbolinks:load',function() {
  function buildHTML(message) {
    const img = message.image? `<img src = "${message.image}">`: "" ;
    const html = `<div class="message" data-message-id = "${message.id}">
                    <div class="message__upper-info">
                      <div class="message__upper-info__talker">${message.user_name}</div>
                      <div class="message__upper-info__date">${message.date}</div>
                    </div>
                    <div class="message__text">
                      <p class="lower-message__content">${message.content}</p>
                      ${img}
                    </div>
                  </div>`
    return html;
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $('#new_message')[0].reset();
    })
  })
})