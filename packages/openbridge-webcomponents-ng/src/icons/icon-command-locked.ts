import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiCommandLocked as ObiCommandLockedElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-command-locked.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-command-locked.js';

@Component({
  selector: 'obi-command-locked',
  template: '<ng-content></ng-content>',
})
export class ObiCommandLocked {
  private _el: ObiCommandLockedElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiCommandLockedElement>,
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

