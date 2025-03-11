import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiCursorPlaceholderIcon as ObiCursorPlaceholderIconElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-cursor-placeholder-icon.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-cursor-placeholder-icon.js';

@Component({
  selector: 'obi-cursor-placeholder-icon',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiCursorPlaceholderIcon {
  private _el: ObiCursorPlaceholderIconElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiCursorPlaceholderIconElement>,
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

