import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiSwitch02On as ObiSwitch02OnElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-switch-02-on.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-switch-02-on.js';

@Component({
  selector: 'obi-switch-02-on',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiSwitch02On {
  private _el: ObiSwitch02OnElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiSwitch02OnElement>,
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

