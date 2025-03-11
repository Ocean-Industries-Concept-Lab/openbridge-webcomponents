import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiPitch as ObiPitchElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-pitch.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-pitch.js';

@Component({
  selector: 'obi-pitch',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiPitch {
  private _el: ObiPitchElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiPitchElement>,
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

