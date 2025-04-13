// src/app/components/employee-list/employee-list.component.ts

import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Employee } from '../employee/employee';
import { EmployeeService } from '../employee/employee.service';
import { EmployeeFormComponent } from '../employee/employee.component';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, EmployeeFormComponent],
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  selected: Employee | null = null;
  isEditing: boolean = false;

  @ViewChild('empForm') empForm?: EmployeeFormComponent;

  constructor(private empService: EmployeeService) {}

  ngOnInit(): void {
    this.empService.employees$.subscribe(data => this.employees = data);
  }

  editEmployee(emp: Employee): void {
    console.log(emp, 'empp');
    this.selected = emp;
    this.isEditing = true;

    // Populate the form with selected employee
    if (this.empForm) {
        this.empForm.handleEditEmployee(emp) // clone to prevent live binding
    }
  }

  deleteEmployee(emp: Employee): void {
    if (confirm(`Delete employee ${emp.name}?`)) {
      this.empService.deleteEmployee(emp.id);
    }
  }

  saveEmployee(emp: Employee): void {
    if (this.isEditing && this.selected) {
      this.empService.updateEmployee({ ...emp, id: this.selected.id });
      this.selected = null;
      this.isEditing = false;
  
      this.newEmployee();
    } else {
      this.empService.addEmployee(emp);
      this.selected = null;
      this.isEditing = false;
  
      this.newEmployee();
    }

  
  }

  newEmployee(): void {
    this.empForm?.clear(); // Make sure this method exists in your EmployeeFormComponent
    this.selected = null;
    this.isEditing = false;
  }
}
