// src/app/services/employee.service.ts

import { Injectable, ViewChild } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { Employee } from './employee';
import { EmployeeFormComponent } from './employee.component';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private employeeList: Employee[] = [];
  private employeesSubject = new BehaviorSubject<Employee[]>([]);
  employees$ = this.employeesSubject.asObservable();
  @ViewChild("empForm") empForm?:EmployeeFormComponent;


  private avatarPool = [
    'avatar1.png', 'avatar2.png', 'avatar3.png', 'avatar4.png', 'avatar5.png'
  ];

  constructor() {}

  private updateSubject() {
    this.employeesSubject.next([...this.employeeList]);
  }

//   getRandomAvatar(): string {
//     const index = Math.floor(Math.random() * this.avatarPool.length);
//     return `assets/avatars/${}`;
//   }
  async getRandomAvatar(): Promise<string> {
    try {
      // This API returns a random avatar image directly
      const avatarUrl = `https://avatar.iran.liara.run/public`; 
      // We return the URL directly since it's already an image endpoint
      return avatarUrl + `?${Date.now()}`; // optional: cache-busting param
    } catch (error) {
      console.error('Failed to get avatar:', error);
      return `assets/avatars/${this.avatarPool[1]}`; // fallback
    }
  }

 async addEmployee(employee: Omit<Employee, 'id' | 'avatar'>) {
    const avatar = await this.getRandomAvatar();
    const newEmp: Employee = {
      ...employee,
      id: Date.now(),
      avatar
    };
    this.employeeList.push(newEmp);
    this.updateSubject();
    this.empForm?.clear();

  }

  updateEmployee(updated: Employee) {
    const index = this.employeeList.findIndex(e => e.id === updated.id);
    if (index !== -1) {
      this.employeeList[index] = updated;
      this.updateSubject();
    }
  }

  deleteEmployee(id: number) {
    this.employeeList = this.employeeList.filter(e => e.id !== id);
    this.updateSubject();
  }

  getEmployeeById(id: number): Employee | undefined {
    return this.employeeList.find(e => e.id === id);
  }
}
