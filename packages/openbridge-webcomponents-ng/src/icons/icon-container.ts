import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiContainer as ObiContainerElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-container.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-container.js';

@Component({
  selector: 'obi-container',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiContainer {
  private _el: ObiContainerElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiContainerElement>,
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

