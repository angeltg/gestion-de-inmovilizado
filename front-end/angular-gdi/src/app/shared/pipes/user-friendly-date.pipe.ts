import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userFriendlyDate'
})
export class UserFriendlyDatePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if (value) {
      let dd = value.substr(8, 2);
      let MM = value.substr(5, 2);
      let yyyy = value.substr(0, 4);
      return `${dd}/${MM}/${yyyy}`;

      // The + operator returns the numeric representation of the object. So in your particular case,
      // it would appear to be predicating the if on whether or not d is a non-zero number.
      // const seconds = Math.floor((+new Date() - +new Date(value)) / 1000);
      // if (seconds < 29) {
      //   return 'Justo ahora';
      // }

      // const intervals = {
      //   año: 31536000,
      //   mes: 2592000,
      //   semana: 604800,
      //   dia: 86400,
      //   hora: 3600,
      //   minuto: 60,
      //   segundo: 1
      // };

      // let counter: number;
      // for (const interval of Object.keys(intervals)) {
      //   counter = Math.floor(seconds / intervals[interval]);
      //   if (counter > 0) {
      //     if (counter === 1) {
      //       return 'Hace ' + counter + ' ' + interval + ' '; // singular (1 day ago)
      //     } else {
      //       return 'Hace ' + counter + ' ' + interval + 's '; // plural (2 days ago)
      //     }
      //   }
      // }
    }
    return value;
  }
}
