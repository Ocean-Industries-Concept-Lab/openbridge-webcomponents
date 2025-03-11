import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiSilenceIec as ObiSilenceIecElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-silence-iec.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-silence-iec.js';

@Component({
  selector: 'obi-silence-iec',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiSilenceIec {
  private _el: ObiSilenceIecElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiSilenceIecElement>,
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

