import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';
import {CommandStatus} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/navigation-instruments/badge-command/badge-command.js';
export type {CommandStatus} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/navigation-instruments/badge-command/badge-command.js';
import type {ObcBadgeCommand as ObcBadgeCommandElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/navigation-instruments/badge-command/badge-command.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/navigation-instruments/badge-command/badge-command.js';

@Component({
  selector: 'obc-badge-command',
  template: '<ng-content></ng-content>',
})
export class ObcBadgeCommand {
  private _el: ObcBadgeCommandElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObcBadgeCommandElement>,
    ngZone: NgZone
  ) {
    this._el = e.nativeElement;
    this._ngZone = ngZone;
    
  }

  
  @Input()
  set status(v: CommandStatus) {
    this._ngZone.runOutsideAngular(() => (this._el.status = v));
  }

  get status() {
    return this._el.status;
  }
  
  @Input()
  set large(v: boolean) {
    this._ngZone.runOutsideAngular(() => (this._el.large = v));
  }

  get large() {
    return this._el.large;
  }
  

  
}

