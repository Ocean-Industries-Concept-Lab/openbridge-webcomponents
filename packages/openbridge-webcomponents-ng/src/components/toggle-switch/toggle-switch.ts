import {
  Component,
  ElementRef,
  NgZone,
  Input,
  EventEmitter,
  Output

} from '@angular/core';


import type {ObcToggleSwitch as ObcToggleSwitchElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/toggle-switch/toggle-switch.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/toggle-switch/toggle-switch.js';

@Component({
  selector: 'obc-toggle-switch',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObcToggleSwitch {
  private _el: ObcToggleSwitchElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObcToggleSwitchElement>,
    ngZone: NgZone
  ) {
    this._el = e.nativeElement;
    this._ngZone = ngZone;
    
    this._el.addEventListener('input', (e: Event) => {
      // TODO(justinfagnani): we need to let the element say how to get a value
      // from an event, ex: e.value
      this.inputEvent.emit(e);
    });
    
  }

  
  @Input()
  set label(v: string) {
    this._ngZone.runOutsideAngular(() => (this._el.label = v));
  }

  get label() {
    return this._el.label;
  }
  
  @Input()
  set checked(v: boolean) {
    this._ngZone.runOutsideAngular(() => (this._el.checked = v));
  }

  get checked() {
    return this._el.checked;
  }
  

  
  @Output()
  inputEvent = new EventEmitter<unknown>();
  
}

