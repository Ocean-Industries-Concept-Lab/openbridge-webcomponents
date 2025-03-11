import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiFileDownloadGoogle as ObiFileDownloadGoogleElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-file-download-google.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-file-download-google.js';

@Component({
  selector: 'obi-file-download-google',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiFileDownloadGoogle {
  private _el: ObiFileDownloadGoogleElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiFileDownloadGoogleElement>,
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

