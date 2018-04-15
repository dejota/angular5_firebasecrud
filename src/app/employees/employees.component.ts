import { Component, OnInit } from '@angular/core';

import { EmployeeService } from './shared/employee.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
  /* inyecta el servicio en el padre de employee y employee-list para que puedan usarlo desde shared.
  para que este servicio lo puedan usar todos los componentes debe declararse en app.module.ts */
  providers: [EmployeeService]
})
export class EmployeesComponent implements OnInit {

  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
  }

}
