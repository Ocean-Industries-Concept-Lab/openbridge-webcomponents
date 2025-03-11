import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiCoffee as ObiCoffeeElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-coffee.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-coffee.js';

@Component({
  selector: 'obi-coffee',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiCoffee {
  private _el: ObiCoffeeElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiCoffeeElement>,
    ngZone: NgZone
  ) {
    this._el = e.nativeElement;
    this._ngZone = ngZone;
    
  }

  
  @Input()
  set useCssColor(v: boolean) {
    this._ngZone.runOutsideAngular(() => (this._el.useCssColor = v));
  }

  get useCssColor() {
    return this._el.useCssColor;
  }
  

  
}

