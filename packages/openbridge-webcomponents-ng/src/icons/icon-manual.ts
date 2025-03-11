import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiManual as ObiManualElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-manual.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-manual.js';

@Component({
  selector: 'obi-manual',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiManual {
  private _el: ObiManualElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiManualElement>,
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

