import {Pipe, PipeTransform} from "@angular/core";

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
      return diff / (1000) < 2 ? 'Il y a une seconde' : `Il y a ${Math.trunc(diff / (1000))} secondes`;
    } else if (diff < this.timeDiffs.hour) {
      return diff / (60 * 1000) < 2 ? 'Il y a une minute' : `Il y a ${Math.trunc(diff / (60 * 1000))} minutes`;
    } else if (diff < this.timeDiffs.day) {
      return diff / (60 * 60 * 1000) < 2 ? 'Il y a une heure' : `Il y a ${Math.trunc(diff / (60 * 60 * 1000))} heures`;
    } else if (diff < this.timeDiffs.week) {
      return diff / (24 * 60 * 60 * 1000) < 2 ? 'Il y a un jour' : `Il y a ${Math.trunc(diff / (24 * 60 * 60 * 1000))} jours`;
    } else if (diff < this.timeDiffs.month) {
      return diff / (7 * 24 * 60 * 60 * 1000) < 2 ? 'Il y a une semaine' : `Il y a ${Math.trunc(diff / (7 * 24 * 60 * 60 * 1000))} semaines`;
    } else if (diff < this.timeDiffs.year) {
      return diff / (30 * 24 * 60 * 60 * 1000) < 2 ? 'Il y a un mois' : `Il y a ${Math.trunc(diff / (30 * 24 * 60 * 60 * 1000))} mois`;
    }

    return diff / (365 * 24 * 60 * 60 * 1000) < 2 ? 'Il y a un an' : `Il y a ${Math.trunc(diff / (365 * 24 * 60 * 60 * 1000))} ans`;
  }

}
