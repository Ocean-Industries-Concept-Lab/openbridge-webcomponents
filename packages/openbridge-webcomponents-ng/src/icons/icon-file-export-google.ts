import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiFileExportGoogle as ObiFileExportGoogleElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-file-export-google.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-file-export-google.js';

@Component({
  selector: 'obi-file-export-google',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiFileExportGoogle {
  private _el: ObiFileExportGoogleElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiFileExportGoogleElement>,
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

