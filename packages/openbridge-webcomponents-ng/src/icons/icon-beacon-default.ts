import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiBeaconDefault as ObiBeaconDefaultElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-beacon-default.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-beacon-default.js';

@Component({
  selector: 'obi-beacon-default',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiBeaconDefault {
  private _el: ObiBeaconDefaultElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiBeaconDefaultElement>,
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

