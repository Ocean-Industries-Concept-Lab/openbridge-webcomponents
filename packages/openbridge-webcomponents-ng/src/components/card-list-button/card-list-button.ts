import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObcCardListButton as ObcCardListButtonElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/card-list-button/card-list-button.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/card-list-button/card-list-button.js';

@Component({
  selector: 'obc-card-list-button',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObcCardListButton {
  private _el: ObcCardListButtonElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObcCardListButtonElement>,
    ngZone: NgZone
  ) {
    this._el = e.nativeElement;
    this._ngZone = ngZone;
    
  }

  
  @Input()
  set icon(v: string) {
    this._ngZone.runOutsideAngular(() => (this._el.icon = v));
  }

  get icon() {
    return this._el.icon;
  }
  
  @Input()
  set variant(v: string) {
    this._ngZone.runOutsideAngular(() => (this._el.variant = v));
  }

  get variant() {
    return this._el.variant;
  }
  

  
}

