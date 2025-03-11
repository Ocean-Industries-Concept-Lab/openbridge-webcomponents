import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiTimeMore as ObiTimeMoreElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-time-more.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-time-more.js';

@Component({
  selector: 'obi-time-more',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiTimeMore {
  private _el: ObiTimeMoreElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiTimeMoreElement>,
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

