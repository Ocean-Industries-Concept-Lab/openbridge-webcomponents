import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiObjectJetsam as ObiObjectJetsamElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-object-jetsam.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-object-jetsam.js';

@Component({
  selector: 'obi-object-jetsam',
  template: '<ng-content></ng-content>',
})
export class ObiObjectJetsam {
  private _el: ObiObjectJetsamElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiObjectJetsamElement>,
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

