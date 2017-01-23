
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

$(".switch-input").change(function(){
  var classe = $(this).parent().attr('class');
  //var flag = $(this).checked();
  var flag = $(this).is(":checked");
  var filter = "." + classe.substring(38,classe.length);
  if(flag == true)
    $(filter).show();
  else {
    $(filter).hide();
  }

});

var myFunction = function(){
  $(".loader").fadeIn('slow');
  $(".generate-model").hide();
  $(".description").fadeOut('slow');
  setTimeout(function(){
      $(".loader").fadeOut('slow');
      $(".generate-model").fadeIn('slow');

  },2000);
};
