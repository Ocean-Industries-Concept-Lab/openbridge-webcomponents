import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiAisTargetActivatedSelectedIec as ObiAisTargetActivatedSelectedIecElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-ais-target-activated-selected-iec.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-ais-target-activated-selected-iec.js';

@Component({
  selector: 'obi-ais-target-activated-selected-iec',
  template: '<ng-content></ng-content>',
})
export class ObiAisTargetActivatedSelectedIec {
  private _el: ObiAisTargetActivatedSelectedIecElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiAisTargetActivatedSelectedIecElement>,
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

