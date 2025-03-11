import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiOn as ObiOnElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-on.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-on.js';

@Component({
  selector: 'obi-on',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiOn {
  private _el: ObiOnElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiOnElement>,
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

