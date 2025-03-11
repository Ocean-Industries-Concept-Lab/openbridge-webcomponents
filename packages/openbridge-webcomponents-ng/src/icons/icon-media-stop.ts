import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiMediaStop as ObiMediaStopElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-media-stop.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-media-stop.js';

@Component({
  selector: 'obi-media-stop',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiMediaStop {
  private _el: ObiMediaStopElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiMediaStopElement>,
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

