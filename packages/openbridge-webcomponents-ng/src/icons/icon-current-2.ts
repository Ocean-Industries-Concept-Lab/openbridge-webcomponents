import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiCurrent2 as ObiCurrent2Element} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-current-2.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-current-2.js';

@Component({
  selector: 'obi-current-2',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiCurrent2 {
  private _el: ObiCurrent2Element;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiCurrent2Element>,
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

