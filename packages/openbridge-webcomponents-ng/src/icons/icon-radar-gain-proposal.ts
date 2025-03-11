import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiRadarGainProposal as ObiRadarGainProposalElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-radar-gain-proposal.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-radar-gain-proposal.js';

@Component({
  selector: 'obi-radar-gain-proposal',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiRadarGainProposal {
  private _el: ObiRadarGainProposalElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiRadarGainProposalElement>,
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

