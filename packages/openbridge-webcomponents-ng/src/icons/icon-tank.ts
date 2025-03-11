import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiTank as ObiTankElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-tank.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-tank.js';

@Component({
  selector: 'obi-tank',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiTank {
  private _el: ObiTankElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiTankElement>,
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

