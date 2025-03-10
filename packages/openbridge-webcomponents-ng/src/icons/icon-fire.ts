import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiFire as ObiFireElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-fire.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-fire.js';

@Component({
  selector: 'obi-fire',
  template: '<ng-content></ng-content>',
})
export class ObiFire {
  private _el: ObiFireElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiFireElement>,
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

