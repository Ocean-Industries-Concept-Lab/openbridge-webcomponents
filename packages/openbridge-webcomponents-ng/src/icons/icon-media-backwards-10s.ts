import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiMediaBackwards10s as ObiMediaBackwards10sElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-media-backwards-10s.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-media-backwards-10s.js';

@Component({
  selector: 'obi-media-backwards-10s',
  template: '<ng-content></ng-content>',
})
export class ObiMediaBackwards10s {
  private _el: ObiMediaBackwards10sElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiMediaBackwards10sElement>,
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

