// src/app/components/employee-form/employee-form.component.ts

import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Employee } from './employee';


@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports:[ReactiveFormsModule],
  templateUrl: './employee.component.html',
  styleUrl:'./employee.component.scss'
})
export class EmployeeFormComponent implements OnInit {
  @Input() employee: Employee | null = null;
  @Output() save = new EventEmitter<Employee>();
  employeeForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      name: [this.employee?.name || '', Validators.required],
      companyName: [this.employee?.companyName || '', Validators.required],
      email: [this.employee?.email || '', [Validators.required, Validators.email]],
      contactNo: [this.employee?.contactNo || '', Validators.required],
      designation: [this.employee?.designation || '', Validators.required],
    });
  }
clear(){
    this.employeeForm.reset();
}
handleEditEmployee(emp: {
    email: any;
    contactNo: any;
    designation: any; name: any; companyName: any; 
}): void {
    this.employeeForm = this.fb.group({
      name: emp.name,
      companyName: emp.companyName,
      email: emp.email,
      contactNo:emp.contactNo ,
      designation: emp.designation ,
    });
  }
  onSubmit() {
    if (this.employeeForm.valid) {
      const data = {
        ...this.employee,
        ...this.employeeForm.value,
      };
      this.save.emit(data);
    }
  }
}
