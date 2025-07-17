import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  trigger,
  transition,
  style,
  query,
  group,
  animate,
  keyframes,
} from '@angular/animations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
  animations: [
    trigger('routeAnimations', [
      transition('* <=> *', [
        query(':enter, :leave', [
          style({
            position: 'absolute',
            width: '100%',
            height: '100%',
            top: 0,
            left: 0,
          })
        ], { optional: true }),
        group([
          query(':leave', [
            style({ opacity: 1, transform: 'scale(1)' }),
            animate('400ms ease', style({ opacity: 0, transform: 'scale(0.95)' }))
          ], { optional: true }),
          query(':enter', [
            style({ opacity: 0, transform: 'scale(1.05)' }),
            animate('400ms ease', style({ opacity: 1, transform: 'scale(1)' }))
          ], { optional: true }),

        ])
      ])
    ])
  ]
})
export class App {
  prepareRoute(outlet: RouterOutlet) {
    return outlet?.activatedRouteData?.['animation'];
  }
}
