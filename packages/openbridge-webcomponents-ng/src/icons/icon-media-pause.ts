import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiMediaPause as ObiMediaPauseElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-media-pause.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-media-pause.js';

@Component({
  selector: 'obi-media-pause',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiMediaPause {
  private _el: ObiMediaPauseElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiMediaPauseElement>,
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

