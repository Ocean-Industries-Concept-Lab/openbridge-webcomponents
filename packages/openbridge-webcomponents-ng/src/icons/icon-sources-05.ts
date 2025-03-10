import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiSources05 as ObiSources05Element} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-sources-05.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-sources-05.js';

@Component({
  selector: 'obi-sources-05',
  template: '<ng-content></ng-content>',
})
export class ObiSources05 {
  private _el: ObiSources05Element;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiSources05Element>,
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

