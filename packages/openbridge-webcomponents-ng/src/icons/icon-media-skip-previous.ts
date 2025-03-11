import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiMediaSkipPrevious as ObiMediaSkipPreviousElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-media-skip-previous.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-media-skip-previous.js';

@Component({
  selector: 'obi-media-skip-previous',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiMediaSkipPrevious {
  private _el: ObiMediaSkipPreviousElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiMediaSkipPreviousElement>,
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

