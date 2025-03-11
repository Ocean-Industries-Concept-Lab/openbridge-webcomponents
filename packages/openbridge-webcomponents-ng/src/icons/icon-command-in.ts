import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiCommandIn as ObiCommandInElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-command-in.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-command-in.js';

@Component({
  selector: 'obi-command-in',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiCommandIn {
  private _el: ObiCommandInElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiCommandInElement>,
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

