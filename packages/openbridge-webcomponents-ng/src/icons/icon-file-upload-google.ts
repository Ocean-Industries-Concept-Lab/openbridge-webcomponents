import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiFileUploadGoogle as ObiFileUploadGoogleElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-file-upload-google.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-file-upload-google.js';

@Component({
  selector: 'obi-file-upload-google',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiFileUploadGoogle {
  private _el: ObiFileUploadGoogleElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiFileUploadGoogleElement>,
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

