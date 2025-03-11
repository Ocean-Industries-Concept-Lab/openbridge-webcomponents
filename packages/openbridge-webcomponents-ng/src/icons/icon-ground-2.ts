import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiGround2 as ObiGround2Element} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-ground-2.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-ground-2.js';

@Component({
  selector: 'obi-ground-2',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiGround2 {
  private _el: ObiGround2Element;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiGround2Element>,
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

