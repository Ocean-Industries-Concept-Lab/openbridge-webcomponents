import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiCommandLockedF as ObiCommandLockedFElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-command-locked-f.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-command-locked-f.js';

@Component({
  selector: 'obi-command-locked-f',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiCommandLockedF {
  private _el: ObiCommandLockedFElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiCommandLockedFElement>,
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

