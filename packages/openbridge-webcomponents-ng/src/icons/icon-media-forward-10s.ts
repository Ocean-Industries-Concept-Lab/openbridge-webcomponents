import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiMediaForward10s as ObiMediaForward10sElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-media-forward-10s.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-media-forward-10s.js';

@Component({
  selector: 'obi-media-forward-10s',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiMediaForward10s {
  private _el: ObiMediaForward10sElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiMediaForward10sElement>,
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

