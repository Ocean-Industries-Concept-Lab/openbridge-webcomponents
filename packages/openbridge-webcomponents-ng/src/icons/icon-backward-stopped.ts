import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiBackwardStopped as ObiBackwardStoppedElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-backward-stopped.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-backward-stopped.js';

@Component({
  selector: 'obi-backward-stopped',
  template: '<ng-content></ng-content>',
})
export class ObiBackwardStopped {
  private _el: ObiBackwardStoppedElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiBackwardStoppedElement>,
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

