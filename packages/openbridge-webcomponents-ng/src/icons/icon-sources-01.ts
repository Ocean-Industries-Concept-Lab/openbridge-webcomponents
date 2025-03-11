import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiSources01 as ObiSources01Element} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-sources-01.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-sources-01.js';

@Component({
  selector: 'obi-sources-01',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiSources01 {
  private _el: ObiSources01Element;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiSources01Element>,
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

