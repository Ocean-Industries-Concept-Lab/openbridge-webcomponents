import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiSources04 as ObiSources04Element} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-sources-04.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-sources-04.js';

@Component({
  selector: 'obi-sources-04',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiSources04 {
  private _el: ObiSources04Element;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiSources04Element>,
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

