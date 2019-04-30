import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngxs/store';
import { DelEmployee } from '../../store/employee.action';


@Component({
  selector: '[app-employee]',
  templateUrl: './employee.component.html',
  styles: []
})
export class EmployeeComponent implements OnInit {

  
  @Input() employee;
  @Input() index;
  
  
  
  constructor(private store: Store) { }

  ngOnInit() {
  }

 
  delClick(){

    this.store.dispatch(new DelEmployee(this.employee._id));
    //Remove with css the tr
    let elemt = document.getElementById('line'+this.employee._id);
    elemt.style.display = 'none';
    
   
    
  } 
}
