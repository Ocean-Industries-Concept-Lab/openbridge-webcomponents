import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiCurrent4 as ObiCurrent4Element} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-current-4.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-current-4.js';

@Component({
  selector: 'obi-current-4',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiCurrent4 {
  private _el: ObiCurrent4Element;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiCurrent4Element>,
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

