import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiDownIec as ObiDownIecElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-down-iec.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-down-iec.js';

@Component({
  selector: 'obi-down-iec',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiDownIec {
  private _el: ObiDownIecElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiDownIecElement>,
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

