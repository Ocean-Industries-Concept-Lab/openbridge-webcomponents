import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiConfigure as ObiConfigureElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-configure.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-configure.js';

@Component({
  selector: 'obi-configure',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiConfigure {
  private _el: ObiConfigureElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiConfigureElement>,
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

