	$(document).ready(function(){

		  $('input[type=radio][name=inlineRadioOptions]').change(function() {
						//changeLabels($(this).data().name);
						var currentFilter = $(this).data().name;
						$( ".card-header h5" ).text(currentFilter);

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
										//	code block
								break;
						}
						return myDataset;
			}

				var myLabels = {
					accessLabel : ["0-2","3-4","5-6","7-8"],
					accessText: "Quantidade de acessos",
					individualItLabel : ["0-5","6-10","11-15","15-20"],
					iterationText: "Quantidade de interações",
					groupItLabel : ["0-2","3-4","5-6","7-8"],
					lessonsLabel : ["Aula 01", "Aula 02", "Aula 03", "Aula 04"],
					lessonsText : "Quantidade de alunos",
					historyLabel : ["Domingo", "Segunda", "Terça", "Quarta", "Quinta","Sexta"]

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
				    var lineChart = document.getElementById('canvas-3');
				    var barChart = document.getElementById('canvas-4');
				    var pieChart = document.getElementById('canvas-5');


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
						}

				// $(function () {


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
				          categories: ['1', '2', '3', '4', '5'],
				          title: {
				              text: 'Experiment No.'
				          }
				      },

				      yAxis: {
				          title: {
				              text: 'Quantidade'
				          },
				          plotLines: [{
				              value: 932,
				              color: 'red',
				              width: 1,
				              label: {
				                  text: 'Média: 50',
				                  align: 'center',
				                  style: {
				                      color: 'gray'
				                  }
				              }
				          }]
				      },

				      series: [{
				          name: 'Observations',
				          data: [
				              [760, 801, 848, 895, 965],
				              [733, 853, 939, 980, 1080],
				              [714, 762, 817, 870, 918],
				              [724, 802, 806, 871, 950],
				              [834, 836, 864, 882, 910]
				          ],
				          tooltip: {
				              headerFormat: '<em>Experiment No {point.key}</em><br/>'
				          }
				      }, {
				          name: 'Outlier',
				          color: Highcharts.getOptions().colors[0],
				          type: 'scatter',
				          data: [ // x, y positions where 0 is the first category
				              [0, 644],
				              [4, 718],
				              [4, 951],
				              [4, 969]
				          ],
				          marker: {
				              fillColor: 'white',
				              lineWidth: 1,
				              lineColor: Highcharts.getOptions().colors[0]
				          },
				          tooltip: {
				              pointFormat: 'Observation: {point.y}'
				          }
				      }]
						}


					var boxChart = new Highcharts.Chart(options);




				//});
		});
