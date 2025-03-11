import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiPlsComponent as ObiPlsComponentElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-pls-component.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-pls-component.js';

@Component({
  selector: 'obi-pls-component',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiPlsComponent {
  private _el: ObiPlsComponentElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiPlsComponentElement>,
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

