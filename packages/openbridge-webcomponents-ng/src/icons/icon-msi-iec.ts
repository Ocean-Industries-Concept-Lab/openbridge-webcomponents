import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiMsiIec as ObiMsiIecElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-msi-iec.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-msi-iec.js';

@Component({
  selector: 'obi-msi-iec',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiMsiIec {
  private _el: ObiMsiIecElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiMsiIecElement>,
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

