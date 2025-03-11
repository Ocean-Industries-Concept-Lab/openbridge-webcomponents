import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiDcdcConverter as ObiDcdcConverterElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-dcdc-converter.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-dcdc-converter.js';

@Component({
  selector: 'obi-dcdc-converter',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiDcdcConverter {
  private _el: ObiDcdcConverterElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiDcdcConverterElement>,
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

