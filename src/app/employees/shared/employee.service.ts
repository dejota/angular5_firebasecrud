import { Injectable } from '@angular/core';

/* importa angularfire2 para poder hacer CRUD con firebase */
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

/* importa el modelo */
import { Employee } from './employee.model';

@Injectable()
export class EmployeeService {
  /* le asigna valor del tipo AngularFireList */
  employeeList: AngularFireList<any>;
  /* tipo Employee de la clase del modelo y lo instancia */
  selectedEmployee: Employee = new Employee();

  constructor(private firebase: AngularFireDatabase) { }

  getData() {
    /* le asigna a la variable employeeList lo que trae de firebase */
    this.employeeList = this.firebase.list('employees');
    return this.employeeList;
  }

  /* le pasa parametro employee del tipo de la clase Employee del modelo
  despues se usa abajo */
  insertEmployee(employee: Employee) {
    /* le pasa toda la data que tiene que pushear en employeeList */
    this.employeeList.push({
      /* employee es el nombre que le puso en el parametro y usa cada propiedad que se creo en el modelo
      si pasas el mouse sobre la propiedad abajo te dice que tipo se asigno en el modelo */
      name: employee.name,
      position: employee.position,
      office: employee.office,
      salary: employee.salary
    });
  }

  updateEmployee(employee: Employee) {
    /* primer parametro es el id del empleado a actualizar y despues los datos que necesita el modelo */
    this.employeeList.update(employee.$key, {
      name: employee.name,
      position: employee.position,
      office: employee.office,
      salary: employee.salary
    });
  }

  /* le pasa el id del tipo string */
  deleteEmployee($key: string) {
    /* al metodo eliminar le pasa el id que desea eliminar */
    this.employeeList.remove($key);
  }

}
