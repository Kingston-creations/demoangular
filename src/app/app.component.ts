// src/app/app.component.ts
import { Component } from '@angular/core';
import { EmployeeListComponent } from './employee-list/employee-list.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [EmployeeListComponent],
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Employee Management';
}
