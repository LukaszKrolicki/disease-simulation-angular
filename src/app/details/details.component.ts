import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SimulationService, SimulationResultDTO } from '../simulation.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  imports: [ 
    HttpClientModule,
    CommonModule,
    FormsModule,
    
  ],  
  standalone: true,
  providers: [SimulationService],
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit, AfterViewInit {
  simulationResults: SimulationResultDTO[] = [];
  uuid: string | undefined;
  lineChart: any;
  pieChart: any;
  barChart: any;
  polarChart: any;

  pi: number | undefined;
  pv: number | undefined;
  pm: number | undefined;
  pr: number | undefined;

  constructor(
    private route: ActivatedRoute,
    private simulationService: SimulationService,
    private router: Router,
    private location: Location 
  ) { }

  ngOnInit(): void {
    const uuidParam = this.route.snapshot.paramMap.get('uuid');
    this.uuid = uuidParam ? uuidParam : 'xd';
    console.log(this.uuid)
    if (this.uuid) {
      this.simulationService.getSimulationResults(this.uuid.toString()).subscribe(results => {
        this.simulationResults = results;
        if (this.simulationResults.length > 0) {
          this.createLineChart(this.simulationResults.length - 1); 
          this.createPieChart(this.simulationResults.length - 1); 
          this.createBarChart(this.simulationResults.length - 1); 
          this.createPolarChart(this.simulationResults.length - 1); 
        }
      });
    }
  }

  ngAfterViewInit(): void {
    if (this.simulationResults.length > 0) {
      this.createLineChart(this.simulationResults.length - 1); 
      this.createPieChart(this.simulationResults.length - 1); 
      this.createBarChart(this.simulationResults.length - 1); 
      this.createPolarChart(this.simulationResults.length - 1);
    }
  }

  createLineChart(dayIndex: number): void {
    const canvas = document.getElementById('lineChart') as HTMLCanvasElement;
    if (!canvas) {
      console.error('Canvas element not found');
      return;
    }

    const days = this.simulationResults.slice(0, dayIndex + 1).map(result => result.day);
    const piValues = this.simulationResults.slice(0, dayIndex + 1).map(result => result.pi);
    const pvValues = this.simulationResults.slice(0, dayIndex + 1).map(result => result.pv);
    const pmValues = this.simulationResults.slice(0, dayIndex + 1).map(result => result.pm);
    const prValues = this.simulationResults.slice(0, dayIndex + 1).map(result => result.pr);

    if (this.lineChart) {
      this.lineChart.destroy();
    }

    this.lineChart = new Chart(canvas, {
      type: 'line',
      data: {
        labels: days,
        datasets: [
          {
            label: 'Infected',
            data: piValues,
            borderColor: '#3cba9f',
            fill: false
          },
          {
            label: 'Vulnerable',
            data: pvValues,
            borderColor: '#ffcc00',
            fill: false
          },
          {
            label: 'Dead',
            data: pmValues,
            borderColor: '#ff5733',
            fill: false
          },
          {
            label: 'Recovered',
            data: prValues,
            borderColor: '#c70039',
            fill: false
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              text: 'Day'
            }
          },
          y: {
            display: true,
            title: {
              display: true,
              text: 'Values'
            }
          }
        }
      }
    });
  }

  createPieChart(dayIndex: number): void {
    const canvas = document.getElementById('pieChart') as HTMLCanvasElement;
    if (!canvas) {
      console.error('Pie canvas element not found');
      return;
    }

    const result = this.simulationResults[dayIndex];
    const data = [result.pi, result.pv, result.pm, result.pr];
    const labels = ['Infected', 'Vulnerable', 'Dead', 'Recovered'];
    const backgroundColors = ['#3cba9f', '#ffcc00', '#ff5733', '#c70039'];

    if (this.pieChart) {
      this.pieChart.destroy();
    }

    this.pieChart = new Chart(canvas, {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [
          {
            data: data,
            backgroundColor: backgroundColors
          }
        ]
      },
      options: {
        responsive: true
      }
    });
  }

  createBarChart(dayIndex: number): void {
    const canvas = document.getElementById('barChart') as HTMLCanvasElement;
    if (!canvas) {
      console.error('Bar canvas element not found');
      return;
    }

    const days = this.simulationResults.slice(0, dayIndex + 1).map(result => result.day);
    const piValues = this.simulationResults.slice(0, dayIndex + 1).map(result => result.pi);
    const pvValues = this.simulationResults.slice(0, dayIndex + 1).map(result => result.pv);
    const pmValues = this.simulationResults.slice(0, dayIndex + 1).map(result => result.pm);
    const prValues = this.simulationResults.slice(0, dayIndex + 1).map(result => result.pr);

    if (this.barChart) {
      this.barChart.destroy();
    }

    this.barChart = new Chart(canvas, {
      type: 'bar',
      data: {
        labels: days,
        datasets: [
          {
            label: 'Infected',
            data: piValues,
            backgroundColor: '#3cba9f'
          },
          {
            label: 'Vulnerable',
            data: pvValues,
            backgroundColor: '#ffcc00'
          },
          {
            label: 'Dead',
            data: pmValues,
            backgroundColor: '#ff5733'
          },
          {
            label: 'Recovered',
            data: prValues,
            backgroundColor: '#c70039'
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              text: 'Day'
            }
          },
          y: {
            display: true,
            title: {
              display: true,
              text: 'Values'
            }
          }
        }
      }
    });
  }

  createPolarChart(dayIndex: number): void {
    const canvas = document.getElementById('polarChart') as HTMLCanvasElement;
    if (!canvas) {
      console.error('Polar canvas element not found');
      return;
    }

    const result = this.simulationResults[dayIndex];
    const data = [result.pi, result.pv, result.pm, result.pr];
    const labels = ['Infected', 'Vulnerable', 'Dead', 'Recovered'];
    const backgroundColors = ['#3cba9f', '#ffcc00', '#ff5733', '#c70039'];

    if (this.polarChart) {
      this.polarChart.destroy();
    }

    this.polarChart = new Chart(canvas, {
      type: 'polarArea',
      data: {
        labels: labels,
        datasets: [
          {
            data: data,
            backgroundColor: backgroundColors
          }
        ]
      },
      options: {
        responsive: true
      }
    });
  }

  onDayClick(dayIndex: number): void {
    this.createLineChart(dayIndex);
    this.createPieChart(dayIndex);
    this.createBarChart(dayIndex);
    this.createPolarChart(dayIndex);

  }
  
  goBack(): void {
    this.location.back();
  }
}