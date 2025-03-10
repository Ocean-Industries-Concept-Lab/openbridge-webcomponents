import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiCommandShared as ObiCommandSharedElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-command-shared.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-command-shared.js';

@Component({
  selector: 'obi-command-shared',
  template: '<ng-content></ng-content>',
})
export class ObiCommandShared {
  private _el: ObiCommandSharedElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiCommandSharedElement>,
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

