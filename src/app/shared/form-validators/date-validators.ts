import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import * as moment from 'moment';

export class DateValidator {
    public static dateValidator(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors => {
         if(!(control && control.value)) {
            return {invalidDate: false};
          }
          const today = moment('YYYY-MM-DD'); 
          const selectedDate = moment(control.value)
          let isSameDay = selectedDate.isSame(today, 'd');
          let isBefore = today.isBefore(selectedDate);

          if (isSameDay || isBefore) {
             return { 'invalidDate': true}
          } else{
              return { 'invalidDate': false}
          }
        }
      }

}