import {animate, animation, sequence, style} from "@angular/animations";

export const FlashAnimation = animation(
  // Pour assurer l'exécution des animations en série dans une méthode groupe
  sequence([
    animate('{{inTime}}', style({
      'background-color': '{{bg-color}}',
      color: 'white'
    })),
    animate('{{outTime}}', style({
      'background-color': 'white',
      color: 'black'
    })),
  ])
)
