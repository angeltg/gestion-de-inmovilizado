import { Component, OnInit } from '@angular/core';
import { EmployeesService } from '../../services/employees.service';

@Component({
  selector: 'app-grafic-employees',
  templateUrl: './grafic-employees.component.html',
  styles: []
})
export class GraficEmployeesComponent {


  constructor(private rollEmployee: EmployeesService){}

  public  barChartOptions:any = {
          scaleShowVerticallines: false,
          responsive: true
  }

  public barChartLabels:string[] = ['Employee', 'Technical','Accountant', 'Purchasing', 'Manager'];
  public barChartType:string = 'pie';
  public barChartLegend:boolean = true;

  public barChartData:any[] = [
    { data: [0,0,0,0,0], label: 'Empleados por Roll' }
  ];


  ngOnInit() {
    this.rollEmployee.getEmployeeByRoll()
    .subscribe(res => {
      const arrEmployeeByRoll = res['arrRollEmployees'];
      this.barChartData = [
        { data: arrEmployeeByRoll, label: 'Empleados por Roll' }
      ];
    });  
    
  }
}
