import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiCommandPartial as ObiCommandPartialElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-command-partial.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-command-partial.js';

@Component({
  selector: 'obi-command-partial',
  template: '<ng-content></ng-content>',
})
export class ObiCommandPartial {
  private _el: ObiCommandPartialElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiCommandPartialElement>,
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

