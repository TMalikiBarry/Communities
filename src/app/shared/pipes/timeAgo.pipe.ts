import {Pipe, PipeTransform} from "@angular/core";
import {DatePipe} from "@angular/common";

@Pipe(
  {name: 'timeAgo'}
)
export class TimeAgoPipe implements PipeTransform{

  timeDiffs = {
    //        day    hour   minute    second    millisecond
    minute:                               60  *        1000,
    hour  :                     60  *     60  *        1000,
    day   :            24 *     60  *     60  *        1000,
    week  :     7 *    24 *     60  *     60  *        1000,
    month :    30 *    24 *     60  *     60  *        1000,
    year  :   365 *    24 *     60  *     60  *        1000
  }

  transform(value: string | Date): string {

    const diff = Date.now() - new Date(value).getTime();
    if (diff < this.timeDiffs.minute) {
      return `Il y a quelques secondes`;
    } else if (diff < this.timeDiffs.hour) {
      return `Il y a Il y a quelques minutes`;
    } else if (diff < this.timeDiffs.day) {
      return diff / (60 * 60 * 1000) < 2 ? 'Il y a une heure' : `Il y a ${Math.trunc(diff / (60 * 60 * 1000))} heures`;
    } else if (diff < this.timeDiffs.week) {
      if (diff / (24 * 60 * 60 * 1000) < 2) {
        return 'Hier';
      } else if (diff / (24 * 60 * 60 * 1000) < 3) {
        return 'Avant-hier';
      }
      return `Il y a ${Math.trunc(diff / (24 * 60 * 60 * 1000))} jours`;
    } else if (diff < this.timeDiffs.month) {
      return diff / (7 * 24 * 60 * 60 * 1000) < 2 ? 'Il y a une semaine' : `Il y a ${Math.trunc(diff / (7 * 24 * 60 * 60 * 1000))} semaines`;
    } else if (diff < this.timeDiffs.year) {
      return diff / (30 * 24 * 60 * 60 * 1000) < 2 ? 'Il y a un mois' : `Il y a ${Math.trunc(diff / (30 * 24 * 60 * 60 * 1000))} mois`;
    } else if (diff < 3*this.timeDiffs.year) {
      return (diff / (365 * 24 * 60 * 60 * 1000) < 2 ) ? 'Il y a un an' : `Il y a ${Math.trunc(diff / (365 * 24 * 60 * 60 * 1000))} ans`;
    }

    return <string>new DatePipe('en').transform(value, 'short');
  }

}
