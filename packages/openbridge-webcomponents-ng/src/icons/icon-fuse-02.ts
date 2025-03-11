import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiFuse02 as ObiFuse02Element} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-fuse-02.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-fuse-02.js';

@Component({
  selector: 'obi-fuse-02',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiFuse02 {
  private _el: ObiFuse02Element;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiFuse02Element>,
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

