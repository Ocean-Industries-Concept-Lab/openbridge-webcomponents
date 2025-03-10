import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObcToggleButtonGroup as ObcToggleButtonGroupElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/toggle-button-group/toggle-button-group.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/toggle-button-group/toggle-button-group.js';

@Component({
  selector: 'obc-toggle-button-group',
  template: '<ng-content></ng-content>',
})
export class ObcToggleButtonGroup {
  private _el: ObcToggleButtonGroupElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObcToggleButtonGroupElement>,
    ngZone: NgZone
  ) {
    this._el = e.nativeElement;
    this._ngZone = ngZone;
    
  }

  
  @Input()
  set hasLabels(v: boolean) {
    this._ngZone.runOutsideAngular(() => (this._el.hasLabels = v));
  }

  get hasLabels() {
    return this._el.hasLabels;
  }
  
  @Input()
  set value(v: string) {
    this._ngZone.runOutsideAngular(() => (this._el.value = v));
  }

  get value() {
    return this._el.value;
  }
  

  
}

