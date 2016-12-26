	$(document).ready(function(){


	$( ".card a" ).on( "click", function() {
	 var myData = $(this).data();
	 if(window.location.pathname != "/views/grades.html"){
 			setDiscipline(myData);
 		}

	});


	$("#search-std").on("click", function(){
		 jQuery("#canvas-3").fadeIn("slow", function() {
        jQuery("#canvas-3").attr("style", "display: block !important");
    });	});

	var setDiscipline = function(data){
		localStorage.clear();
		localStorage.setItem("disciplineName",data.name);
		localStorage.setItem("disciplineStudents",data.std);
		localStorage.setItem("disciplineStart",data.start);
		localStorage.setItem("disciplineEnd",data.end);
		localStorage.setItem("status",data.status);
		window.location = "/views/index.html";
	};


	var loadDisciplineData = function(){
		var discName = localStorage.getItem("disciplineName");
		var discStds = localStorage.getItem("disciplineStudents");
		var disciplineStart = localStorage.getItem("disciplineStart");
		var disciplineEnd = localStorage.getItem("disciplineEnd");
		var status = localStorage.getItem("status");
		if(discName != null && discName != undefined){
			$("#disc-name").text(discName);
			$("#qty-std").text(discStds);
			$("#disc-start").text(disciplineStart);
			$("#disc-end").text(disciplineEnd);
			$("#disc-status").text(status);
		}
	};



	$("#home-boxes .card").click(function(){
	  var page = ($(this).attr('id'));
		if(page == "students"){
			window.location = "/views/advanced.html";
		}
		else if (page == "status"){
			window.location = "/views/grades.html"
		}
	else{

	}
	})

	if(window.location.pathname == "/views/index.html"){
		loadDisciplineData();
	}

	var randomScalingFactor = function(){
		return Math.round(Math.random()*10)
	};

	var pieData = {
	        labels: [
	            '0-2',
	            '2.1-4',
	            '4.1-6',
	            '6.1-8',
	            '8.1-10'
	        ],
	        datasets: [{
	            data: [20, 30, 8,22,20],
	            backgroundColor: [
	                '#FF6384',
	                '#36A2EB',
	                '#FFCE56',
	                '#FFA500',
	                '#7FFF00'
	            ],
	            hoverBackgroundColor: [
	                '#FF6384',
	                '#36A2EB',
	                '#FFCE56',
	                '#FFA500',
	                '#7FFF00'
	            ]
	        }]
	    };

	    var barChartData = {
	        labels : ['0-2.5','2.5-5','5-7.5','7.5-10'],
	        datasets : [
	            {
	                label: 'Total de alunos',
	                backgroundColor : '#5CACEE',
	                borderColor : 'rgba(151,187,205,0.8)',
	                highlightFill : 'rgba(151,187,205,0.75)',
	                highlightStroke : 'rgba(151,187,205,1)',
	                data : [10,9,12,10,2]
	            }
	        ]
	    }


	    var lineChartData = {
	        labels : ['Atividade 1','Atividade 2','Atividade 3','Atividade 4'],
	        datasets : [
	            {
	                label: 'Turma',
	                backgroundColor : 'rgba(220,220,220,0.2)',
	                borderColor : 'rgba(220,220,220,1)',
	                pointBackgroundColor : 'rgba(220,220,220,1)',
	                pointBorderColor : '#fff',
	                data : [randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor()]
	            },
	            {
	                label: 'João',
	                backgroundColor : 'rgba(151,187,205,0.2)',
	                borderColor : 'rgba(151,187,205,1)',
	                pointBackgroundColor : 'rgba(151,187,205,1)',
	                pointBorderColor : '#fff',
	                data : [randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor()]
	            }
	        ]
	    }

	    var lineChart = document.getElementById('canvas-3');
	    var barChart = document.getElementById('canvas-4');
	    var pieChart = document.getElementById('canvas-5');


	    if(pieChart != undefined){
		    var chart = new Chart(pieChart, {
		        type: 'pie',
		        data: pieData,
		        options: {
		            responsive: true
		        }
		    });

		    var chart2 = new Chart(barChart, {
	        type: 'bar',
	        data: barChartData,
	        options: {
	            responsive: true
	        }
	    });

		    var chart3 = new Chart(lineChart, {
	        type: 'line',
	        data: lineChartData,
	        options: {
	            responsive: true
	        }
	    });
	    }

			var options = {
					chart: {
							renderTo: 'container',
							type: 'boxplot'
					},

					title: {
							text: 'Gráfico de caixa'
					},

					legend: {
							enabled: false
					},



					xAxis: {
							categories: ['Ativ. 1', 'Ativ. 2', 'Ativ. 3', 'Ativ. 4'],
							title: {
									text: 'Atividade'
							}
					},

					yAxis: {
							title: {
									text: 'Média das atividades'
							},
							plotLines: [{
									value: 5,
									color: 'red',
									width: 1,
									label: {
											text: 'Média: 5',
											align: 'center',
											style: {
													color: 'gray'
											}
									}
							}]
					},

					series: [{
							name: 'Observações',
							data: [
									[0, 3, 6, 5.5, 10],
									[1, 5, 7, 6, 9.5],
									[0, 2, 4, 5, 10],
									[2, 3, 7, 5.5, 8.8],
							],
							tooltip: {
									headerFormat: '<em>Atividade {point.key}</em><br/>'
							}
					}, {
							name: 'Valor discrepante',
							color: Highcharts.getOptions().colors[0],
							type: 'scatter',
							data: [ // x, y positions where 0 is the first category
									[1, 0 ],
									[2, 10]
							],
							marker: {
									fillColor: 'white',
									lineWidth: 2,
									lineColor: Highcharts.getOptions().colors[0]
							},
							tooltip: {
									pointFormat: 'Nota: {point.y}'
							}
					}]
				}



			$("#canvas-5").click(
					function(evt){
						var activePoints = chart.getElementsAtEvent(evt);
						if(activePoints.length > 0){
							var clickedElementindex = activePoints[0]["_index"];
							var label = chart.data.labels[clickedElementindex];
							var value = chart.data.datasets[0].data[clickedElementindex];
							$("#std-number").text(label);
							$("#attr-range").text(value);
							//var options = {...};

							//$('[data-remodal-id=modal]').remodal();
							//TODO: ABRIR MODAL AQUI
					 }
					}
			);

			$("#canvas-4").click(
					function(evt){
						var activePoints = chart2.getElementsAtEvent(evt);
						if(activePoints.length > 0){
							var clickedElementindex = activePoints[0]["_index"];
							var label = chart2.data.labels[clickedElementindex];
							var value = chart2.data.datasets[0].data[clickedElementindex];
							$("#std-number").text(label);
							$("#attr-range").text(value);
					 }
					}
			);



			var boxChart = new Highcharts.Chart(options);

	});
