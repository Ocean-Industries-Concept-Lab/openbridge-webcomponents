import { Component, Prop, h } from '@stencil/core';
import Placeholder from '../../assets/icons/01-placeholder.svg';
import Support from '../../assets/icons/03-support.svg';

const icons = {
  placeholder: Placeholder,
  support: Support
}

@Component({
  tag: 'obc-icon',
  styleUrl: 'obc-icon.css',
  shadow: true,
})
export class ObcIcon {

  /**
   * The icon name
   */
  @Prop() icon: string;

  /**
   * The icon size in pixels
   */
  @Prop() sizePx: number = 24;

  render() {
    let icon = icons[this.icon];
    if (!icon) { console.error(`Icon ${this.icon} not found`)
    icon = icons.placeholder;
  }

    return (
       <div class="wrapper" style={{'--size': this.sizePx + 'px'}} innerHTML={icon}> 
      </div>
    );
  }

}