import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiSources02Off as ObiSources02OffElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-sources-02-off.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-sources-02-off.js';

@Component({
  selector: 'obi-sources-02-off',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiSources02Off {
  private _el: ObiSources02OffElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiSources02OffElement>,
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

