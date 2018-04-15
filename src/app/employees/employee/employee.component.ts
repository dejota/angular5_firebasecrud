import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { EmployeeService } from '../shared/employee.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  public employeeService: EmployeeService
  constructor(private EmployeeService: EmployeeService,
              private toastr: ToastrService) { 
              
              /* se crea EmployeeService en privado y se pasa a una variable publica, sino tira error al compilar */
              this.employeeService = EmployeeService;
              }

  ngOnInit() {
    this.employeeService.getData();
    this.resetForm();
  }

  /* el parametro que recibe cuando hace clic en submit es la referencia del formulario
  y es del tipo NgForm */
  onSubmit(employeeForm: NgForm) {
    /* pregunta si el key es nulo, entonces usa el metodo insertEmployee, en este caso la key la crea firebase */
    if (employeeForm.value.$key == null)
      /* le pasa al metodo insertEmployee del servicio, los valores del formulario */
      this.employeeService.insertEmployee(employeeForm.value);
    else
      /* sino usa el metodo updateEmployee, en este caso la key no se modifica */
      this.employeeService.updateEmployee(employeeForm.value);

    /* una vez insertado los datos a firebase resetea el formulario y le pasa por parametro la referencia del mismo asi no envia null */
    this.resetForm(employeeForm);

    this.toastr.success('Submitted Successfully', 'Employee Register');
  }

  /* le pone un signo de pregunta al parametro employeeForm para que sea opcional,
  necesita que sea opcional asi cuando en el ciclo de vida de ngOnInit llame a este metodo pero no tenga que pasarle ningun parametro */
  resetForm(employeeForm?: NgForm) {
    /* si el parametro de resetForm no es nulo se ejecuta el reset. */
    if(employeeForm != null)
    employeeForm.reset();
    this.employeeService.selectedEmployee = {
      $key: null,
      name: '',
      position: '',
      office: '',
      salary: 0
    }
  }

}
