import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiHarbourBerthing as ObiHarbourBerthingElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-harbour-berthing.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-harbour-berthing.js';

@Component({
  selector: 'obi-harbour-berthing',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiHarbourBerthing {
  private _el: ObiHarbourBerthingElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiHarbourBerthingElement>,
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

