import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiSources05On as ObiSources05OnElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-sources-05-on.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-sources-05-on.js';

@Component({
  selector: 'obi-sources-05-on',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiSources05On {
  private _el: ObiSources05OnElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiSources05OnElement>,
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

