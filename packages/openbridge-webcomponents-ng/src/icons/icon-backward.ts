import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiBackward as ObiBackwardElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-backward.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-backward.js';

@Component({
  selector: 'obi-backward',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiBackward {
  private _el: ObiBackwardElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiBackwardElement>,
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

