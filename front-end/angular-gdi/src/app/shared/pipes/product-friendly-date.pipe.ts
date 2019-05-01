import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userFriendlyDate'
})
export class ProductFriendlyDatePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if (value) {
      let dd = value.substr(8, 2);
      let MM = value.substr(5, 2);
      let yyyy = value.substr(0, 4);
      return `${dd}/${MM}/${yyyy}`;
    }
    return value;
  }
}
