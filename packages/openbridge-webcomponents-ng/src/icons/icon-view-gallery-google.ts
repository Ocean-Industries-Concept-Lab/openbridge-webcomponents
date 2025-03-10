import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiViewGalleryGoogle as ObiViewGalleryGoogleElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-view-gallery-google.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-view-gallery-google.js';

@Component({
  selector: 'obi-view-gallery-google',
  template: '<ng-content></ng-content>',
})
export class ObiViewGalleryGoogle {
  private _el: ObiViewGalleryGoogleElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiViewGalleryGoogleElement>,
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

