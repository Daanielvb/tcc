	$(document).ready(function(){

		  $('input[type=radio][name=inlineRadioOptions]').change(function() {
						//changeLabels($(this).data().name);
						var currentFilter = $(this).data().name;
						$( ".card-header h5" ).text(currentFilter);
						$(".current-attr").text(currentFilter);
						boxChart.setTitle({text: currentFilter});

						boxChart.xAxis[0].setTitle({text: currentFilter});

						boxChart.redraw();

						updateCharts(pickUpLabel(currentFilter));
		        //Recarregar graficos e ajustar os dados de acordo com o arff
		    });

				$("#search-std").on("click", function(){
					 jQuery("#canvas-3").fadeIn("slow", function() {
			        jQuery("#canvas-3").attr("style", "display: block !important");
			    });	});

				var changeLabels = function(label){
			  	$( ".card-header" ).text(label);
					$( ".card-header" ).fadeIn('slow');
				}

				var pickUpLabel = function(label){
					var myDataset = {
						data :[],
						label : ""
					};
					switch(label) {
			    	case "Acessos semanais":
			        myDataset.data = myLabels.accessLabel;
							myDataset.label = myLabels.accessText;
			        break;
			    	case "Interações individuais":
							myDataset.data = myLabels.individualItLabel;
							myDataset.label = myLabels.iterationText;
			        break;
							case "Interações em grupo":
								myDataset.data = myLabels.groupItLabel;
								myDataset.label = myLabels.iterationText;
									break;
							case "Aulas Assistidas":
								myDataset.data = myLabels.lessonsLabel;
								myDataset.label = myLabels.lessonsText;
									break;
									case "Média de acerto em questões":
									myDataset.data = myLabels.avarageLabel;
									myDataset.label = myLabels.avarageLabelText;
								break;
						}
						return myDataset;
			}

				var myLabels = {
					accessLabel : ["0-2","3-4","5-6","7-8"],
					accessText: "Total de alunos",
					individualItLabel : ["0-5","6-10","11-15","15-20"],
					iterationText: "Total de alunos",
					groupItLabel : ["0-2","3-4","5-6","7-8"],
					lessonsLabel : ["Aula 01", "Aula 02", "Aula 03", "Aula 04"],
					lessonsText : "Total de alunos",
					historyLabel : ["Domingo", "Segunda", "Terça", "Quarta", "Quinta","Sexta"],
					avarageLabel : ["0 - 2.5","2.6 - 5 ","5.1 - 7.5","7.5 - 10" ],
					avarageLabelText : "Total de alunos",
				}


				var randomScalingFactor = function(){
					return Math.round(Math.random()*10)
				};

				var pieData = {
							//atualizar labels
				        labels: myLabels.accessLabel,
				        datasets: [{
									//atualizar data
				            data: [20, 30, 8,22],
				            backgroundColor: [
				                '#FF6384',
				                '#36A2EB',
				                '#FFCE56',
				                '#7FFF00'
				            ],
				            hoverBackgroundColor: [
				                '#FF6384',
				                '#36A2EB',
				                '#FFCE56',
				                '#7FFF00'
				            ]
				        }]
				    };



						var barChartData = {
    				labels: myLabels.accessLabel,
    			datasets: [
        				{
            label: 'Acessos semanais',
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1,
            data: [20, 22, 21, 5],
        }
    ]
};


				    var lineChartData = {
				        labels : myLabels.historyLabel,
				        datasets : [
				            {
				                label: 'Turma',
				                backgroundColor : 'rgba(220,220,220,0.2)',
				                borderColor : 'rgba(220,220,220,1)',
				                pointBackgroundColor : 'rgba(220,220,220,1)',
				                pointBorderColor : '#fff',
				                data : [40,25,8,32,34,88]
				            },
				            {
				                label: 'Aluno',
				                backgroundColor : 'rgba(151,187,205,0.2)',
				                borderColor : 'rgba(151,187,205,1)',
				                pointBackgroundColor : 'rgba(151,187,205,1)',
				                pointBorderColor : '#fff',
				                data : [0,2,2,1,0,5]
				            }
				        ]
				    }



						var updateCharts = function(myData){

							var parent = $('#canvas-4').parent();

							$('#canvas-4').remove();
							parent.append('<canvas id="canvas-4"><canvas>');
							// var parent2 = $('#canvas-5').parent();
							// $('#canvas-5').remove();
							//
							// parent2.append('<canvas id="canvas-5"><canvas>');

							var lineChart = document.getElementById('canvas-3');
							var barChart = document.getElementById('canvas-4');
							var pieChart = document.getElementById('canvas-5');

							pieData.labels = myData.data;
							barChartData.datasets[0].label = myData.label;
							barChartData.labels = myData.data;



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



						$("#canvas-5").click(
						    function(evt){
									var activePoints = chart.getElementsAtEvent(evt);
							    if(activePoints.length > 0){
							      var clickedElementindex = activePoints[0]["_index"];
							      var label = chart.data.labels[clickedElementindex];
							      var value = chart.data.datasets[0].data[clickedElementindex];
										$("#std-number").text(label);
										$("#attr-range").text(value);
										console.log(label);
										console.log(value);
							   }
						    }
						);

						$("#canvas-4").click(
						    function(evt){
									var activePoints = chart2.getElementsAtEvent(evt);
							    if(activePoints.length > 0){
							      var clickedElementindex = activePoints[0]["_index"];
							      var label = chart.data.labels[clickedElementindex];

										var value = chart.data.datasets[0].data[clickedElementindex];
										console.log(label);
										console.log(value);
										$("#std-number").text(label);
										$("#attr-range").text(value);
										//TODO: ABRIR MODAL AQUI
							      /* other stuff that requires slice's label and value */
							   }
						    }
						);


						}

				// $(function () {

				updateCharts(pickUpLabel("Acessos semanais"));

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
				          categories: ['1', '2', '3', '4'],
				          title: {
				              text: 'Acessos semanais'
				          }
				      },

				      yAxis: {
				          title: {
				              text: 'Quantidade'
				          },
				          plotLines: [{
				              value: 4,
				              color: 'red',
				              width: 1,
				              label: {
				                  text: 'Média: 4',
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
										[2, 3, 7, 5.5, 8.8]
				          ],
				          tooltip: {
				              headerFormat: '<em>Experiment No {point.key}</em><br/>'
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
				              lineWidth: 1,
				              lineColor: Highcharts.getOptions().colors[0]
				          },
				          tooltip: {
				              pointFormat: 'Valor: {point.y}'
				          }
				      }]
						}


					var boxChart = new Highcharts.Chart(options);




				//});
		});
