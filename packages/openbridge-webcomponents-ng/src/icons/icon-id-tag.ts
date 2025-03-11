import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiIdTag as ObiIdTagElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-id-tag.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-id-tag.js';

@Component({
  selector: 'obi-id-tag',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiIdTag {
  private _el: ObiIdTagElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiIdTagElement>,
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

