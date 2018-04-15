import { Component, OnInit } from '@angular/core';

import { EmployeeService } from '../shared/employee.service';
import { Employee } from '../shared/employee.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  /* para mostrar la lista de firebase, necesita importar el modelo Employee
  y crea una variable del tipo de la clase del modelo en formato array */
  employeeList: Employee[];

  constructor(private employeeService: EmployeeService,
              private toastr: ToastrService) { }

  ngOnInit() {
    /* obtiene una coleccion de empleados desde el servicio del tipo AngularFireList, por lo tanto hay que convertir la data que viene en un array. */
    var x = this.employeeService.getData();
    /* con snapshotChanges() convierte la data y subscribe a un observer
    cada vez que haya un cambio en donde suscribe en la lista en firebase la funcion arrow se ejecuta */
    x.snapshotChanges().subscribe(item => {
      /* inicializa el array de EmployeeList */
      this.employeeList = [];
      /* itera todos los items y le pasa parametro element */
      item.forEach(element => {
        /* payload significa que solo traiga la data que necesito, explicacion en link de abajo
        https://softwareengineering.stackexchange.com/questions/158603/what-does-the-term-payload-mean-in-programming */
        var y = element.payload.toJSON();

        /* le agrega una nueva propiedad al objeto y obtiene de la db el id o key que le creo cuando guardo el registro del empleado */
        y["$key"] = element.key;

        /* pushea la info que trae de firebase a la variable array employeeList creado en este componente para mostrarlo
        el objeto y lo pushea como dicta el modelo Employee */
        this.employeeList.push(y as Employee);
      })
    })
  }

  /* emp es del tipo Employee class que es el modelo */
  onEdit(emp: Employee) {
    /* en vez de asignarle directamente emp, se le asigna de la manera que esta abajo.
    crea una copia de emp y se lo pasa selectedEmployee, la data se muestra porque en employee.component.html se usa [(ngModel)]="employeeService.selectedEmployee.salary"
    esto evita que cada cambio que haga en el formulario actualice automaticamente la lista y provoca problemas de performance */
    /* this.employeeService.selectedEmployee = emp; */
    this.employeeService.selectedEmployee = Object.assign({}, emp);
  }

  /* recibe la key y le asigna tipo string */
  onDelete(key: string) {
    /* cuando hace clic primero salta un cartel de confirmacion, si es true lo elimina, sino se cancela */
    if (confirm('Are you sure to delete this record ?') == true) {
      /* le pasa key como parametro al metodo deleteEmployee */
      this.employeeService.deleteEmployee(key);
      /* cuando se elimina un registro sale el cartel de que se elimino correctamente */
      this.toastr.warning("Deleted Successfully", "Employee register");
    }
  }

}
