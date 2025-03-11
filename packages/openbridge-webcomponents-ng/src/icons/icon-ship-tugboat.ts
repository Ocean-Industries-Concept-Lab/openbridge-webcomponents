import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiShipTugboat as ObiShipTugboatElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-ship-tugboat.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-ship-tugboat.js';

@Component({
  selector: 'obi-ship-tugboat',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiShipTugboat {
  private _el: ObiShipTugboatElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiShipTugboatElement>,
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

