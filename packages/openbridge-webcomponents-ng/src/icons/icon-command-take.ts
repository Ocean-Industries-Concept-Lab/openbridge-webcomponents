import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiCommandTake as ObiCommandTakeElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-command-take.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-command-take.js';

@Component({
  selector: 'obi-command-take',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiCommandTake {
  private _el: ObiCommandTakeElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiCommandTakeElement>,
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

