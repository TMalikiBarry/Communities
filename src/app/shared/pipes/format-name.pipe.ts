import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'formatName'
})
export class FormatNamePipe implements PipeTransform {

  transform(value: { fName: string, lName: string }, locale: 'en' | 'fr' = 'en'): string {
    return locale === 'en' ? `${value.lName.toUpperCase()} ${value.fName.toLowerCase()}`:
      `${value.fName.substring(0, 1).toUpperCase()+value.fName.substring(1).toLowerCase()} ${value.lName.toUpperCase()}`;
  }

}
