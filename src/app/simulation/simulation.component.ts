import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras} from '@angular/router';
import { CommonModule } from '@angular/common';
import { SimulationService, SimulationDTO } from '../simulation.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-simulation',
  standalone: true,
  templateUrl: './simulation.component.html',
  imports: [ 
    HttpClientModule,
    CommonModule,
    FormsModule,
  ],  
  providers: [SimulationService],
  styleUrls: ['./simulation.component.css']
})
export class SimulationComponent implements OnInit {
  simulations: SimulationDTO[] = [];
  simulation: Omit<SimulationDTO, 'id'> = {
    uuid: '',
    n: '',
    p: 0,
    i: 0,
    r: 0,
    m: 0,
    ti: 0,
    tm: 0,
    ts: 0
  };

  constructor(private simulationService: SimulationService, private router: Router) { }

  ngOnInit(): void {
    if (typeof localStorage !== 'undefined') {
      const storedSimulations = localStorage.getItem('simulations');
      if (storedSimulations) {
        this.simulations = JSON.parse(storedSimulations);
      }
    } else {
      console.error('localStorage is not available');
    }
  }

  validateInputs() {
    const { n, p, i, r, m, ti, tm, ts } = this.simulation;
  
    if (typeof n !== 'string' || n.trim() === '' || n.length > 100) {
      alert('The name of the simulation must be a non-empty string with a maximum length of 100 characters.');
      return false;
    }
  
    if (!Number.isInteger(p) || p <= 0) {
      alert('The population size (P) must be an integer greater than 0.');
      return false;
    }

    if (!Number.isInteger(i) || i < 0 || i > p) {
      alert('The initial number of infected individuals (I) must be an integer greater than or equal to 0 and not greater than the population size (P).');
      return false;
    }

    if (typeof r !== 'number' || r < 0) {
      alert('The infectivity rate (R) must be a number greater than or equal to 0.');
      return false;
    }

    if (typeof m !== 'number' || m < 0 || m > 1) {
      alert('The mortality rate (M) must be a number between 0 and 1.');
      return false;
    }

    if (!Number.isInteger(ti) || ti <= 0) {
      alert('The time to recovery (Ti) must be an integer greater than 0.');
      return false;
    }

    if (!Number.isInteger(tm) || tm <= 0) {
      alert('The time to death (Tm) must be an integer greater than 0.');
      return false;
    }

    if (!Number.isInteger(ts) || ts <= 0) {
      alert('The simulation duration (Ts) must be an integer greater than 0.');
      return false;
    }

    if (tm > ti) {
      alert('The time to death (Tm) cannot be greater than the time to recovery (Ti).');
      return false;
    }
  
    return true;
  }
  

  addSimulation(): void {
    if (this.validateInputs()) {
      this.simulationService.addSimulation(this.simulation).subscribe(uuid => {
        this.simulations.push({ ...this.simulation, id: this.simulations.length, uuid: uuid.toString() });
        localStorage.setItem('simulations', JSON.stringify(this.simulations));
        this.simulation = {
          uuid: '',
          n: '',
          p: 0,
          i: 0,
          r: 0,
          m: 0,
          ti: 0,
          tm: 0,
          ts: 0
        };
        alert('Simulation created successfully!');
      }, error => {
        alert('An error occurred while creating the simulation.');
      });
    }
  }

  deleteSimulation(uuid: string): void {
    if (confirm('Are you sure you want to delete this simulation?')) {
        this.simulations = this.simulations.filter(sim => sim.uuid !== uuid);
        localStorage.setItem('simulations', JSON.stringify(this.simulations));
        this.simulationService.deleteSimulation(uuid).subscribe(() => {
          alert('Simulation deleted successfully!');
        });
    }
  }
  editSimulation(simulation: SimulationDTO): void {
    const navigationExtras: NavigationExtras = {
      state: { simulation: simulation }
    };
    this.router.navigate([`/edit/${simulation.uuid}`], navigationExtras);
  }

  viewDetails(uuid: string): void {
    this.router.navigate(['/details', uuid]);
  }
}
