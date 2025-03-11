import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiMoored as ObiMooredElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-moored.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-moored.js';

@Component({
  selector: 'obi-moored',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiMoored {
  private _el: ObiMooredElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiMooredElement>,
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

