import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiDuctDirection as ObiDuctDirectionElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-duct-direction.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-duct-direction.js';

@Component({
  selector: 'obi-duct-direction',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiDuctDirection {
  private _el: ObiDuctDirectionElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiDuctDirectionElement>,
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

