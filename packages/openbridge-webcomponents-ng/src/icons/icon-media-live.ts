import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiMediaLive as ObiMediaLiveElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-media-live.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-media-live.js';

@Component({
  selector: 'obi-media-live',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiMediaLive {
  private _el: ObiMediaLiveElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiMediaLiveElement>,
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

