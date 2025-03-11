import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiStopped as ObiStoppedElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-stopped.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-stopped.js';

@Component({
  selector: 'obi-stopped',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiStopped {
  private _el: ObiStoppedElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiStoppedElement>,
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

