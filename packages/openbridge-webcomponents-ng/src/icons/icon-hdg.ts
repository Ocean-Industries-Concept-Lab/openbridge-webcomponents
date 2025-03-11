import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiHdg as ObiHdgElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-hdg.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-hdg.js';

@Component({
  selector: 'obi-hdg',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiHdg {
  private _el: ObiHdgElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiHdgElement>,
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

