import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiMediaPlay as ObiMediaPlayElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-media-play.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-media-play.js';

@Component({
  selector: 'obi-media-play',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiMediaPlay {
  private _el: ObiMediaPlayElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiMediaPlayElement>,
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

