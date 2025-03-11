import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiForwardStopped as ObiForwardStoppedElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-forward-stopped.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-forward-stopped.js';

@Component({
  selector: 'obi-forward-stopped',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiForwardStopped {
  private _el: ObiForwardStoppedElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiForwardStoppedElement>,
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

