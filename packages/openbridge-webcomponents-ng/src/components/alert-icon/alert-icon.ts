import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';
import {AlertIconName} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/alert-icon/alert-icon.js';
export type {AlertIconName} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/alert-icon/alert-icon.js';
import type {ObcAlertIcon as ObcAlertIconElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/alert-icon/alert-icon.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/alert-icon/alert-icon.js';

@Component({
  selector: 'obc-alert-icon',
  template: '<ng-content></ng-content>',
})
export class ObcAlertIcon {
  private _el: ObcAlertIconElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObcAlertIconElement>,
    ngZone: NgZone
  ) {
    this._el = e.nativeElement;
    this._ngZone = ngZone;
    
  }

  
  @Input()
  set name(v: AlertIconName) {
    this._ngZone.runOutsideAngular(() => (this._el.name = v));
  }

  get name() {
    return this._el.name;
  }
  

  
}

