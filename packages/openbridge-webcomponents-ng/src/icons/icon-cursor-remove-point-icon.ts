import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiCursorRemovePointIcon as ObiCursorRemovePointIconElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-cursor-remove-point-icon.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-cursor-remove-point-icon.js';

@Component({
  selector: 'obi-cursor-remove-point-icon',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiCursorRemovePointIcon {
  private _el: ObiCursorRemovePointIconElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiCursorRemovePointIconElement>,
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

