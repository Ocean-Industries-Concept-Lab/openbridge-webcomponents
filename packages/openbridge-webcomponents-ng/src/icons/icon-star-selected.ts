import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiStarSelected as ObiStarSelectedElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-star-selected.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-star-selected.js';

@Component({
  selector: 'obi-star-selected',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiStarSelected {
  private _el: ObiStarSelectedElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiStarSelectedElement>,
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

