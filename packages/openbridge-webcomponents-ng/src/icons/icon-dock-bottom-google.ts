import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiDockBottomGoogle as ObiDockBottomGoogleElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-dock-bottom-google.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-dock-bottom-google.js';

@Component({
  selector: 'obi-dock-bottom-google',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiDockBottomGoogle {
  private _el: ObiDockBottomGoogleElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiDockBottomGoogleElement>,
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

