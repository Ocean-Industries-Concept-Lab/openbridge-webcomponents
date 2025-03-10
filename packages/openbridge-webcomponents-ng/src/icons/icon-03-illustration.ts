import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {Obi03Illustration as Obi03IllustrationElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-03-illustration.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-03-illustration.js';

@Component({
  selector: 'obi-03-illustration',
  template: '<ng-content></ng-content>',
})
export class Obi03Illustration {
  private _el: Obi03IllustrationElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<Obi03IllustrationElement>,
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

