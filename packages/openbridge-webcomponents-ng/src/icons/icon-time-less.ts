import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiTimeLess as ObiTimeLessElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-time-less.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-time-less.js';

@Component({
  selector: 'obi-time-less',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiTimeLess {
  private _el: ObiTimeLessElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiTimeLessElement>,
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

