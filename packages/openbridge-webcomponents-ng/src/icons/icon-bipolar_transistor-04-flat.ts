import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiBipolar_transistor04Flat as ObiBipolar_transistor04FlatElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-bipolar_transistor-04-flat.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-bipolar_transistor-04-flat.js';

@Component({
  selector: 'obi-bipolar_transistor-04-flat',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiBipolar_transistor04Flat {
  private _el: ObiBipolar_transistor04FlatElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiBipolar_transistor04FlatElement>,
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

