import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiGenericLineDirection as ObiGenericLineDirectionElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-generic-line-direction.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-generic-line-direction.js';

@Component({
  selector: 'obi-generic-line-direction',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiGenericLineDirection {
  private _el: ObiGenericLineDirectionElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiGenericLineDirectionElement>,
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

