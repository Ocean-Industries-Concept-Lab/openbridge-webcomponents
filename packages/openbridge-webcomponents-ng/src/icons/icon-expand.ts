import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiExpand as ObiExpandElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-expand.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-expand.js';

@Component({
  selector: 'obi-expand',
  template: '<ng-content></ng-content>',
})
export class ObiExpand {
  private _el: ObiExpandElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiExpandElement>,
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

