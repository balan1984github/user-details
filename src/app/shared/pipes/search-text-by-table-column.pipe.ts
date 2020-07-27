import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }
    return value.filter((val) => {
      let rVal = (val.firstName.toLocaleLowerCase().includes(args)) || (val.lastName.toLocaleLowerCase().includes(args)) || (val.fullName.toLocaleLowerCase().includes(args)) || (val.age.toString().toLocaleLowerCase().includes(args)) || (val.email.toLocaleLowerCase().includes(args)) || (val.phoneNumber.toString().toLocaleLowerCase().includes(args));
      return rVal;
    })

  }

}
