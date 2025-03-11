import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiSources02 as ObiSources02Element} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-sources-02.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-sources-02.js';

@Component({
  selector: 'obi-sources-02',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiSources02 {
  private _el: ObiSources02Element;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiSources02Element>,
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

