import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MilieuServiceService } from 'src/app/services/milieu-service.service';
// import * as data from '../../../assets/server-metrics.json'

// import { Chart } from 'chart.js';
@Component({
	selector: 'app-accueil',
	templateUrl: './accueil.component.html',
	styleUrls: ['./accueil.component.scss']
})

export class AccueilComponent {
	milieu: any
	moyenne: any

	//data: any;
	//options: any;
	chartOptions: any
	constructor(private http: HttpClient, private ml: MilieuServiceService) {
	}

	ngOnInit() {
		this.fetchData()
		this.fetchDataMoyenne()
		setInterval(() => {
			this.fetchData()
			this.fetchDataMoyenne()
		}, 5000);
	
	}

	fetchData() {
		this.ml.getAllTemperature().subscribe(data => {
			this.milieu = data
			this.milieu.forEach((element: any) => {
				console.log(element._id.jour)
				this.chartOptions = {
					title: {
						text: "Monthly Sales Data"
					},
					theme: "light2",
					animationEnabled: true,
					exportEnabled: true,
					axisY: {
						includeZero: true,
						valueFormatString: "$#,##0k"
					},
					data: [{
						type: "column", //change type to bar, line, area, pie, etc
						yValueFormatString: "$#,##0k",
						color: "#01b8aa",
						dataPoints: [
							{ label: element._id.jour, y: element.temperature },
							
						]
					}]
				}
			});

		});
	}

	fetchDataMoyenne() {
		this.ml.getAllTemperatureMoyenne().subscribe(data => {
			this.moyenne = data
		});
	}

	data = {
		labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
		datasets: [
		  {
			label: 'Temperature',
			data: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120],
			borderColor: '#3cba9f',
			fill: false
		  },
		  {
			label: 'Humidity',
			data: [20, 40, 60, 80, 100, 120, 140, 160, 180, 200, 220, 240],
			borderColor: '#ffcc00',
			fill: false
		  }
		]
	  };
	  options = {
		responsive: true,
		legend: {
		  display: true,
		  position: 'bottom'
		},
		scales: {
		  xAxes: [{
			display: true,
			scaleLabel: {
			  display: true,
			  labelString: 'Month'
			}
		  }],
		  yAxes: [{
			display: true,
			scaleLabel: {
			  display: true,
			  labelString: 'Value'
			}
		  }]
		}
	  };
}
