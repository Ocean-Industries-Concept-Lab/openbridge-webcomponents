import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiComMessageImportantGoogle as ObiComMessageImportantGoogleElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-com-message-important-google.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-com-message-important-google.js';

@Component({
  selector: 'obi-com-message-important-google',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiComMessageImportantGoogle {
  private _el: ObiComMessageImportantGoogleElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiComMessageImportantGoogleElement>,
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

