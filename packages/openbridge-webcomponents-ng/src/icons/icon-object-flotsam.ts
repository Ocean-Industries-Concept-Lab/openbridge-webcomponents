import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiObjectFlotsam as ObiObjectFlotsamElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-object-flotsam.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-object-flotsam.js';

@Component({
  selector: 'obi-object-flotsam',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiObjectFlotsam {
  private _el: ObiObjectFlotsamElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiObjectFlotsamElement>,
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

