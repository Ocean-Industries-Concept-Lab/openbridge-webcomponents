import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiMediaSkipNext as ObiMediaSkipNextElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-media-skip-next.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-media-skip-next.js';

@Component({
  selector: 'obi-media-skip-next',
  template: '<ng-content></ng-content>',
})
export class ObiMediaSkipNext {
  private _el: ObiMediaSkipNextElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiMediaSkipNextElement>,
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

