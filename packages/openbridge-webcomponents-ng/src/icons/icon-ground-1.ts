import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiGround1 as ObiGround1Element} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-ground-1.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-ground-1.js';

@Component({
  selector: 'obi-ground-1',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiGround1 {
  private _el: ObiGround1Element;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiGround1Element>,
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

