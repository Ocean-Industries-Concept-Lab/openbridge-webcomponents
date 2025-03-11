import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiLinkRemove as ObiLinkRemoveElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-link-remove.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-link-remove.js';

@Component({
  selector: 'obi-link-remove',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiLinkRemove {
  private _el: ObiLinkRemoveElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiLinkRemoveElement>,
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

