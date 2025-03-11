import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiKeepingArea as ObiKeepingAreaElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-keeping-area.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-keeping-area.js';

@Component({
  selector: 'obi-keeping-area',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiKeepingArea {
  private _el: ObiKeepingAreaElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiKeepingAreaElement>,
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

