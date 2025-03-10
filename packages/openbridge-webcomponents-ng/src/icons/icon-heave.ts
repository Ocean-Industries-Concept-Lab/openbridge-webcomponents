import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiHeave as ObiHeaveElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-heave.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-heave.js';

@Component({
  selector: 'obi-heave',
  template: '<ng-content></ng-content>',
})
export class ObiHeave {
  private _el: ObiHeaveElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiHeaveElement>,
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

