import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiSources02On as ObiSources02OnElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-sources-02-on.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-sources-02-on.js';

@Component({
  selector: 'obi-sources-02-on',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiSources02On {
  private _el: ObiSources02OnElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiSources02OnElement>,
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

