import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiLocal as ObiLocalElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-local.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-local.js';

@Component({
  selector: 'obi-local',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiLocal {
  private _el: ObiLocalElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiLocalElement>,
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

