$("#classificar").click(function() {
    $("#classification-content").hide();
    $(".loader").fadeIn('slow');
    var filters = $('.form-check-input:checkbox:checked');
    var result = "";
    var resultData = [];
    for (var i = 0; i < filters.length; i++) {
        result += filters[i].value + ",";
    }
    result = result.slice(0, -1);
    for (var key in classificationResults) {
        if (key == result) {
            resultData = classificationResults[key];
            //TODO: Mostrar os dados de cima
        }
    }

    showResultData(resultData);
})

var showResultData = function(data) {
  var boxNumber = data.length;
  insertBoxes(data);
  setTimeout(function(){
      $(".loader").fadeOut('slow');
      $("#classification-content").fadeIn('slow');
  },2000);

}


var addLabels = function(label){
  var checkboxes = [];
  $("td").children("input:checked").each(function( index ) {
    if($(this).val() != 0)
      checkboxes.push($( this ).val() );
  });
  console.log(checkboxes);
  for(id in checkboxes){
  //  if(!$("#label-box-" + checkboxes[id]).contains(labelStrings[label]))
    $("#label-box-" + checkboxes[id]).append(labelStrings[label]);
  }
}

var insertBoxes = function(data){
  $("#block-one").show();
  $("#data-one").text(data[0]);
  if(data.length > 1){
      $("#block-two").show();
      $("#data-two").text(data[1]);
  }
  if(data.length > 2){
      console.log("aqui");
      $("#block-three").show();
      $("#data-three").text(data[2]);
  }

}
//EM result
var classificationResults = {
    "1": [101], // whyy
    "1,2": [40,37,24], //ok
    "1,3": [64,37], //ok
    "1,4": [40,20,41],
    "1,2,3": [55,24,22], //ok
    "1,2,4": [30,48,23], //ok
    "1,3,4": [50,51], //ok
    "1,2,3,4": [30,48,23], //ok
    "2": [24,37,40], //ok
    "2,3": [50,51],//ok
    "2,4": [47,34,20], //ok
    "2,3,4": [33,33,35], //ok
    "3": [37,64], //ok
    "3,4": [62,38], //ok
    "4": [20,40,41], //ok
};

var labelStrings = {
   danger : "<span class='tag tag-danger'>Evasão</span>",
   warning:  "<span class='tag tag-warning'>Atenção</span>",
   primary: "<span class='tag tag-primary'>Comp. atípico</span>"
};
