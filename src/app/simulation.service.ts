import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UUID } from 'crypto';
import { Observable, tap } from 'rxjs';

export interface SimulationDTO {
  id: number;
  uuid: string;
  n: string;
  p: number;
  i: number;
  r: number;
  m: number;
  ti: number;
  tm: number;
  ts: number;
}

export interface SimulationResultDTO { 
  id: UUID;
  day: number;
  pi: number;
  pv: number;
  pm: number;
  pr: number;
  simulationId: UUID;
}


@Injectable({
  providedIn: 'root'
})
export class SimulationService {
  private simulations: SimulationDTO[] = [];
  private idCounter = 0;
  private apiUrl = 'http://localhost:8080/api/simulation';
  constructor(private http: HttpClient) { }

  getSimulations(): SimulationDTO[] {
    return this.simulations;
  }

  getSimulationById(uuid: string): SimulationDTO | undefined {
    return this.simulations.find(sim => sim.uuid === uuid);
  }

  addSimulation(simulation: Omit<SimulationDTO, 'id'>): Observable<UUID> {
    console.log('addSimulation called in service');
    return this.http.post<UUID>(`${this.apiUrl}/createSimulation`, simulation).pipe(
      tap((uuid: UUID) => {
        console.log('UUID received:', uuid);
        this.simulations.push({ ...simulation, id: this.idCounter++, uuid: uuid.toString() });
        console.log('Simulation added:', this.simulations);
      })
    );
  }

  updateSimulation(uuid: string, simulation: SimulationDTO): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/updateSimulation/${uuid}`, simulation);
  }

  getSimulationResults(simulationId: string): Observable<SimulationResultDTO[]> {
    return this.http.get<SimulationResultDTO[]>(`${this.apiUrl}/getSimulationResults/${simulationId}`);
  }

  deleteSimulation(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/deleteSimulation/${id}`);
  }

}