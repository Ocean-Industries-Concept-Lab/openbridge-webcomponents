import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiIo as ObiIoElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-io.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-io.js';

@Component({
  selector: 'obi-io',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiIo {
  private _el: ObiIoElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiIoElement>,
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

