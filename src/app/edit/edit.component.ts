import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SimulationService, SimulationDTO } from '../simulation.service'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [SimulationService],
})
export class EditComponent implements OnInit {
  simulation: SimulationDTO | undefined;
  uuid: string | undefined;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private simulationService: SimulationService
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.simulation = navigation.extras.state['simulation'];
    }
  }

  ngOnInit(): void {
    this.uuid = this.route.snapshot.paramMap.get('uuid')!;
  }

  validateInputs(): boolean {
    const { n, p, i, r, m, ti, tm, ts } = this.simulation || {};

    if (typeof n !== 'string' || n.trim() === '' || n.length > 100) {
      alert('The name of the simulation must be a non-empty string with a maximum length of 100 characters.');
      return false;
    }

    if (typeof p !== 'undefined' && (!Number.isInteger(p) || p <= 0)) {
      alert('The population size (P) must be an integer greater than 0.');
      return false;
    }

    if (typeof i !== 'undefined' && (!Number.isInteger(i) || i < 0 || i > (p ?? 0))) {
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

    if (typeof ti !== 'undefined' && (!Number.isInteger(ti) || ti <= 0)) {
      alert('The time to recovery (Ti) must be an integer greater than 0.');
      return false;
    }

    if (typeof tm !== 'undefined' && (!Number.isInteger(tm) || tm <= 0)) {
      alert('The time to death (Tm) must be an integer greater than 0.');
      return false;
    }

    if (typeof ts !== 'undefined' && (!Number.isInteger(ts) || ts <= 0)) {
      alert('The simulation duration (Ts) must be an integer greater than 0.');
      return false;
    }
  
    return true;
  }
  updateSimulation(): void {
    if (this.simulation && this.uuid) {
      if (this.validateInputs()) {
        this.simulationService.updateSimulation(this.uuid, this.simulation).subscribe(
          () => {
            alert('Simulation updated successfully!');
            this.updateLocalSimulation();
            this.router.navigate(['/simulation']);
          },
          error => {
            alert('An error occurred while updating the simulation.');
          }
        );
      }
    }
  }

  updateLocalSimulation(): void {
    if (typeof localStorage !== 'undefined') {
      const storedSimulations = localStorage.getItem('simulations');
      if (storedSimulations) {
        const simulations: SimulationDTO[] = JSON.parse(storedSimulations);
        const index = simulations.findIndex(sim => sim.uuid === this.uuid);
        if (index !== -1 && this.simulation) {
          simulations[index] = this.simulation;
          localStorage.setItem('simulations', JSON.stringify(simulations));
        }
      }
    } else {
      console.error('localStorage is not available');
    }
  }

  goBack(): void {
    this.location.back();
  }
}