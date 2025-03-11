import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiRunning as ObiRunningElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-running.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-running.js';

@Component({
  selector: 'obi-running',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiRunning {
  private _el: ObiRunningElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiRunningElement>,
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

