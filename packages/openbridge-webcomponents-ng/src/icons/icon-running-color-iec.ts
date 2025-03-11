import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiRunningColorIec as ObiRunningColorIecElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-running-color-iec.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-running-color-iec.js';

@Component({
  selector: 'obi-running-color-iec',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiRunningColorIec {
  private _el: ObiRunningColorIecElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiRunningColorIecElement>,
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

