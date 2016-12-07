
$(".tag-danger, .tag-warning, .tag-default").click(function(){
  var usr = $(this).parent().parent().children()[0].innerHTML;
  vex.dialog.open({
  message: 'Enviar mensagem para ' + usr,
  input: [
      '<input name="mensagem" type="text" placeholder="mensagem" required />'
  ].join(''),
  buttons: [
      $.extend({}, vex.dialog.buttons.YES, { text: 'Enviar' }),
      $.extend({}, vex.dialog.buttons.NO, { text: 'Voltar' })
  ],
  callback: function (data) {
      if (!data) {
          console.log('Cancelled');
      } else {
          console.log('msg:', data.mensagem);
      }
  }
})
})
