import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiSwimming as ObiSwimmingElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-swimming.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-swimming.js';

@Component({
  selector: 'obi-swimming',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiSwimming {
  private _el: ObiSwimmingElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiSwimmingElement>,
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

