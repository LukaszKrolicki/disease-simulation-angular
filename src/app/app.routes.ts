import { RouterModule, Routes } from '@angular/router';
import { SimulationComponent } from './simulation/simulation.component';
import { EditComponent } from './edit/edit.component';
import { DetailsComponent } from './details/details.component';

export const routes: Routes = [
    { path: '', redirectTo: '/simulation', pathMatch: 'full' },
    { path: 'simulation', component: SimulationComponent },
    { path: 'edit/:uuid', component: EditComponent },
    { path: 'details/:uuid', component: DetailsComponent },
    { path: '**', redirectTo: '/simulation' } 
];