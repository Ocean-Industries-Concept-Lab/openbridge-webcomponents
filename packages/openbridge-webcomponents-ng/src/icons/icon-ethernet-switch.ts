import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiEthernetSwitch as ObiEthernetSwitchElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-ethernet-switch.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-ethernet-switch.js';

@Component({
  selector: 'obi-ethernet-switch',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiEthernetSwitch {
  private _el: ObiEthernetSwitchElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiEthernetSwitchElement>,
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

