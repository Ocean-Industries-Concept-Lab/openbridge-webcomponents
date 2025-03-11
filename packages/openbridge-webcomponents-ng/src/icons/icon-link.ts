import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiLink as ObiLinkElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-link.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-link.js';

@Component({
  selector: 'obi-link',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiLink {
  private _el: ObiLinkElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiLinkElement>,
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

