# :confounded: Topic of the project:

Disease simulation


# DiseaseSimulApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.1.3.

To be able to fully use application, spring boot server must be set up -> https://github.com/LukaszKrolicki/DiseaseSimulationRestApi

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Simulation System Description

The user will create simulations by specifying initial parameters for each simulation:

N: Simulation name (string)

P: Population size

I: Initial number of infected individuals

R: Infection rate, indicating how many people one infected person infects (the COVID-19 news R rate)

M: Mortality rate, indicating how many of the infected individuals die

Ti: Number of days from infection to recovery

Tm: Number of days from infection to death

Ts: Number of days for which the simulation will be conducted

The simulation will be an object containing the following data (N, P, I, R, M, Ti, Tm, Ts).

Upon defining the simulation, the system will generate an initial population record containing information about:

Pi: Number of infected individuals

Pv: Number of healthy individuals susceptible to infection

Pm: Number of deceased individuals

Pr: Number of individuals who have recovered and acquired immunity

## User documentation

### Home page

Includes form where user can specify parameters and create the simulation

![image](https://github.com/user-attachments/assets/d3e44052-f1ed-4d52-8756-971bac075cbd)

it includes also the simulation list

![image](https://github.com/user-attachments/assets/63eaa5a6-89e1-49fe-94b3-a06cd0de4bee)

In simulation list user can edit,delete or go to details section

User element deletion

![image](https://github.com/user-attachments/assets/c5e73aa8-efb3-4c7e-ae25-0c42a692496c)

### Details

Details page include data for all days and various charts to display it

![image](https://github.com/user-attachments/assets/9e2d35c6-b13c-4bb9-acf4-a67d9df86b66)

Line chart:

![image](https://github.com/user-attachments/assets/e8fec6ba-2a7f-48d2-944b-c193dfb811f3)

Pie chart:

![image](https://github.com/user-attachments/assets/186dbe6a-c9ac-4a83-8575-e7fcade44f95)

Bar chart:

![image](https://github.com/user-attachments/assets/d672521d-03ef-4bf2-8d49-6193df71a4ff)

Polar chart:

![image](https://github.com/user-attachments/assets/f1f90a19-c66c-46e4-ab6e-c21cab9b1859)

### When clicking on different day, it regenerates charts

Data for day 20:

![image](https://github.com/user-attachments/assets/757af5e2-0f9c-4301-8419-c80083aa2c6e)

Data for day 21:

![image](https://github.com/user-attachments/assets/e5bed75f-6ec0-4d10-b50a-285a5404c6ed)

### Edit

In edit section user can change parameters of simulation

Lets change simulation duration from 35 to 15

![image](https://github.com/user-attachments/assets/309c8428-6776-47df-9ba1-fbbe347ed59a)

now in details we can see the change

![image](https://github.com/user-attachments/assets/693b688f-e360-498c-a873-1c37d4dae09d)


