import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiCrane as ObiCraneElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-crane.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-crane.js';

@Component({
  selector: 'obi-crane',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiCrane {
  private _el: ObiCraneElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiCraneElement>,
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

