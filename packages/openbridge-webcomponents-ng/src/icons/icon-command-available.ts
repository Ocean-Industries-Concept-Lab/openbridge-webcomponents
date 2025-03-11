import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiCommandAvailable as ObiCommandAvailableElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-command-available.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-command-available.js';

@Component({
  selector: 'obi-command-available',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiCommandAvailable {
  private _el: ObiCommandAvailableElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiCommandAvailableElement>,
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

