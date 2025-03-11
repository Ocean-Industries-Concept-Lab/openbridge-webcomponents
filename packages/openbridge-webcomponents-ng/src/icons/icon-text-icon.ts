import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiTextIcon as ObiTextIconElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-text-icon.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-text-icon.js';

@Component({
  selector: 'obi-text-icon',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiTextIcon {
  private _el: ObiTextIconElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiTextIconElement>,
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

