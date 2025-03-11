import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiSources05Off as ObiSources05OffElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-sources-05-off.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-sources-05-off.js';

@Component({
  selector: 'obi-sources-05-off',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiSources05Off {
  private _el: ObiSources05OffElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiSources05OffElement>,
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

