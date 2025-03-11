import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {Obi02Illustration as Obi02IllustrationElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-02-illustration.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-02-illustration.js';

@Component({
  selector: 'obi-02-illustration',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class Obi02Illustration {
  private _el: Obi02IllustrationElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<Obi02IllustrationElement>,
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

