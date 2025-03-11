import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiGenerator as ObiGeneratorElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-generator.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-generator.js';

@Component({
  selector: 'obi-generator',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiGenerator {
  private _el: ObiGeneratorElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiGeneratorElement>,
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

