import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-heavy-sleet-showers-day')
export class ObiHeavySleetShowersDay extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="32" height="32" viewBox="0 0 32 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.6726 1.73559C10.8094 1.31501 11.4045 1.24899 11.6302 1.62937L12.8485 3.68309C13.0037 3.9446 13.3653 4.01422 13.6188 3.83136L15.6092 2.39533C15.9778 2.12935 16.4963 2.40973 16.4435 2.84648L16.1581 5.20454C16.1218 5.5048 16.3693 5.76462 16.6853 5.75791L19.1672 5.70515C19.6269 5.69538 19.8707 6.21506 19.5596 6.54135L18.1679 8.00059C18.3829 7.99706 18.6026 8.00379 18.827 8.02185C22.242 8.29662 24.1524 10.0866 25.107 11.9189C25.4389 12.5559 25.645 13.1746 25.774 13.6989C25.9743 13.7573 26.1852 13.8251 26.3986 13.9033C26.9122 14.0916 27.5831 14.3908 28.1495 14.8676C28.733 15.3588 29.4242 16.2439 29.3274 17.5021C29.178 19.4449 27.6727 21.3487 25.3333 21.3487H6.66662C4.45749 21.3487 2.66663 19.5579 2.66663 17.3487C2.66663 16.4054 2.95372 15.385 3.69549 14.5796C4.46207 13.7473 5.52695 13.3487 6.66663 13.3487H7.25983C7.2893 13.2064 7.32722 13.0596 7.37559 12.9108C7.35561 12.9091 7.33529 12.9084 7.31467 12.9088L4.83277 12.9616C4.37309 12.9713 4.12928 12.4516 4.44046 12.1254L6.1206 10.3637C6.33454 10.1393 6.29563 9.78855 6.03773 9.61656L4.01236 8.26588C3.63723 8.01571 3.76123 7.45524 4.21188 7.36403L6.64501 6.8716C6.95483 6.8089 7.13943 6.50114 7.03817 6.21614L6.24296 3.97794C6.09568 3.5634 6.54012 3.1762 6.9581 3.35492L9.21485 4.31985C9.50221 4.44272 9.83981 4.29555 9.93387 4.00639L10.6726 1.73559ZM8.36309 11.3875C8.57294 11.2042 8.81849 11.0367 9.10553 10.8932C10.3817 10.2551 11.5414 10.5915 12.333 11.0276C12.4855 10.8521 12.6503 10.6732 12.8272 10.4944C13.5967 9.71689 14.6977 8.8461 16.0951 8.36647C15.6162 6.43897 13.6897 5.1214 11.559 5.35774C9.24779 5.6141 7.5716 7.60187 7.81515 9.79755C7.8796 10.3786 8.07206 10.9161 8.36309 11.3875ZM27.3333 17.3487C27.4497 15.8351 24 15.3487 24 15.3487C24 15.3487 24 10.4445 18.6666 10.0154C16.5282 9.84334 14.8895 11.1453 13.8692 12.309C13.0854 13.203 12.6666 14.0154 12.6666 14.0154C12.6666 14.0154 11.999 13.014 11.1362 12.6646C10.7796 12.5202 10.3898 12.4871 9.99996 12.6821C9.66663 12.8487 9.45829 13.0987 9.33329 13.38C8.95829 14.2237 9.33329 15.3487 9.33329 15.3487H6.66663C5.33329 15.3487 4.66663 16.2442 4.66663 17.3487C4.66663 18.4533 5.56206 19.3487 6.66663 19.3487H25.3333C26.4379 19.3487 27.2486 18.4501 27.3333 17.3487Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M25.878 23.337C26.1487 22.7507 26.7878 22.5309 27.3564 22.7496L27.3665 22.7535L27.3764 22.7581C27.9627 23.0287 28.1825 23.6678 27.9638 24.2364L27.9584 24.2505L26.84 26.8059C26.6532 27.2665 26.2312 27.4901 25.7967 27.4901C25.6458 27.4901 25.4765 27.444 25.3713 27.409L25.3538 27.4031L25.337 27.3954C24.7507 27.1248 24.5309 26.4856 24.7496 25.9171L24.755 25.903L25.878 23.337Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M15.2114 23.337C15.482 22.7507 16.1211 22.5309 16.6897 22.7496L16.6998 22.7535L16.7097 22.7581C17.2961 23.0287 17.5158 23.6678 17.2971 24.2364L17.2917 24.2505L16.1734 26.8059C15.9866 27.2665 15.5645 27.4901 15.13 27.4901C14.9791 27.4901 14.8098 27.444 14.7046 27.409L14.6871 27.4031L14.6703 27.3954C14.084 27.1248 13.8642 26.4856 14.0829 25.9171L14.0883 25.903L15.2114 23.337Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M9.87804 26.0037C10.1487 25.4174 10.7878 25.1976 11.3564 25.4163L11.3665 25.4202L11.3764 25.4247C11.9627 25.6954 12.1825 26.3345 11.9638 26.9031L11.9584 26.9171L10.84 29.4725C10.6532 29.9332 10.2312 30.1567 9.79669 30.1567C9.64576 30.1567 9.47651 30.1107 9.37128 30.0756L9.35377 30.0698L9.33701 30.0621C8.75065 29.7914 8.53091 29.1523 8.74958 28.5837L8.75499 28.5697L9.87804 26.0037Z" fill="currentColor"/>
<path d="M4 27.9006C3.68114 27.6959 3.57189 27.2427 3.75598 26.8882L4.17863 26.0744H3.33329C2.9651 26.0744 2.66663 25.7426 2.66663 25.3333C2.66663 24.924 2.9651 24.5922 3.33329 24.5922H4.17863L3.75598 23.7784C3.57189 23.424 3.68114 22.9707 4 22.7661C4.31886 22.5614 4.72659 22.6829 4.91068 23.0373L5.33333 23.8511L5.75598 23.0373C5.94008 22.6829 6.3478 22.5614 6.66666 22.7661C6.98553 22.9707 7.09478 23.424 6.91068 23.7784L6.48804 24.5922H7.33329C7.70148 24.5922 7.99996 24.924 7.99996 25.3333C7.99996 25.7426 7.70148 26.0744 7.33329 26.0744H6.48803L6.91068 26.8882C7.09478 27.2427 6.98553 27.6959 6.66666 27.9006C6.3478 28.1052 5.94008 27.9838 5.75598 27.6293L5.33333 26.8155L4.91068 27.6293C4.72659 27.9838 4.31886 28.1052 4 27.9006Z" fill="currentColor"/>
<path d="M19.3333 30.5673C19.0145 30.3626 18.9052 29.9094 19.0893 29.5549L19.512 28.7411H18.6666C18.2984 28.7411 18 28.4093 18 28C18 27.5907 18.2984 27.2589 18.6666 27.2589H19.512L19.0893 26.4451C18.9052 26.0906 19.0145 25.6374 19.3333 25.4327C19.6522 25.2281 20.0599 25.3495 20.244 25.704L20.6667 26.5178L21.0893 25.704C21.2734 25.3495 21.6811 25.2281 22 25.4327C22.3189 25.6374 22.4281 26.0906 22.244 26.4451L21.8214 27.2589H22.6666C23.0348 27.2589 23.3333 27.5907 23.3333 28C23.3333 28.4093 23.0348 28.7411 22.6666 28.7411H21.8214L22.244 29.5549C22.4281 29.9094 22.3189 30.3626 22 30.5673C21.6811 30.7719 21.2734 30.6505 21.0893 30.296L20.6667 29.4822L20.244 30.296C20.0599 30.6505 19.6522 30.7719 19.3333 30.5673Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.6726 1.73559C10.8094 1.31501 11.4045 1.24899 11.6302 1.62937L12.8485 3.68309C13.0037 3.9446 13.3653 4.01422 13.6188 3.83136L15.6092 2.39533C15.9778 2.12935 16.4963 2.40973 16.4435 2.84648L16.1581 5.20454C16.1218 5.5048 16.3693 5.76462 16.6853 5.75791L19.1672 5.70515C19.6269 5.69538 19.8707 6.21506 19.5596 6.54135L18.1679 8.00059C18.3829 7.99706 18.6026 8.00379 18.827 8.02185C22.242 8.29662 24.1524 10.0866 25.107 11.9189C25.4389 12.5559 25.645 13.1746 25.774 13.6989C25.9743 13.7573 26.1852 13.8251 26.3986 13.9033C26.9122 14.0916 27.5831 14.3908 28.1495 14.8676C28.733 15.3588 29.4242 16.2439 29.3274 17.5021C29.178 19.4449 27.6727 21.3487 25.3333 21.3487H6.66662C4.45749 21.3487 2.66663 19.5579 2.66663 17.3487C2.66663 16.4054 2.95372 15.385 3.69549 14.5796C4.46207 13.7473 5.52695 13.3487 6.66663 13.3487H7.25983C7.2893 13.2064 7.32722 13.0596 7.37559 12.9108C7.35561 12.9091 7.33529 12.9084 7.31467 12.9088L4.83277 12.9616C4.37309 12.9713 4.12928 12.4516 4.44046 12.1254L6.1206 10.3637C6.33454 10.1393 6.29563 9.78855 6.03773 9.61656L4.01236 8.26588C3.63723 8.01571 3.76123 7.45524 4.21188 7.36403L6.64501 6.8716C6.95483 6.8089 7.13943 6.50114 7.03817 6.21614L6.24296 3.97794C6.09568 3.5634 6.54012 3.1762 6.9581 3.35492L9.21485 4.31985C9.50221 4.44272 9.83981 4.29555 9.93387 4.00639L10.6726 1.73559ZM8.36309 11.3875C8.57294 11.2042 8.81849 11.0367 9.10553 10.8932C10.3817 10.2551 11.5414 10.5915 12.333 11.0276C12.4855 10.8521 12.6503 10.6732 12.8272 10.4944C13.5967 9.71689 14.6977 8.8461 16.0951 8.36647C15.6162 6.43897 13.6897 5.1214 11.559 5.35774C9.24779 5.6141 7.5716 7.60187 7.81515 9.79755C7.8796 10.3786 8.07206 10.9161 8.36309 11.3875ZM27.3333 17.3487C27.4497 15.8351 24 15.3487 24 15.3487C24 15.3487 24 10.4445 18.6666 10.0154C16.5282 9.84334 14.8895 11.1453 13.8692 12.309C13.0854 13.203 12.6666 14.0154 12.6666 14.0154C12.6666 14.0154 11.999 13.014 11.1362 12.6646C10.7796 12.5202 10.3898 12.4871 9.99996 12.6821C9.66663 12.8487 9.45829 13.0987 9.33329 13.38C8.95829 14.2237 9.33329 15.3487 9.33329 15.3487H6.66663C5.33329 15.3487 4.66663 16.2442 4.66663 17.3487C4.66663 18.4533 5.56206 19.3487 6.66663 19.3487H25.3333C26.4379 19.3487 27.2486 18.4501 27.3333 17.3487Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M25.878 23.337C26.1487 22.7507 26.7878 22.5309 27.3564 22.7496L27.3665 22.7535L27.3764 22.7581C27.9627 23.0287 28.1825 23.6678 27.9638 24.2364L27.9584 24.2505L26.84 26.8059C26.6532 27.2665 26.2312 27.4901 25.7967 27.4901C25.6458 27.4901 25.4765 27.444 25.3713 27.409L25.3538 27.4031L25.337 27.3954C24.7507 27.1248 24.5309 26.4856 24.7496 25.9171L24.755 25.903L25.878 23.337Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M15.2114 23.337C15.482 22.7507 16.1211 22.5309 16.6897 22.7496L16.6998 22.7535L16.7097 22.7581C17.2961 23.0287 17.5158 23.6678 17.2971 24.2364L17.2917 24.2505L16.1734 26.8059C15.9866 27.2665 15.5645 27.4901 15.13 27.4901C14.9791 27.4901 14.8098 27.444 14.7046 27.409L14.6871 27.4031L14.6703 27.3954C14.084 27.1248 13.8642 26.4856 14.0829 25.9171L14.0883 25.903L15.2114 23.337Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M9.87804 26.0037C10.1487 25.4174 10.7878 25.1976 11.3564 25.4163L11.3665 25.4202L11.3764 25.4247C11.9627 25.6954 12.1825 26.3345 11.9638 26.9031L11.9584 26.9171L10.84 29.4725C10.6532 29.9332 10.2312 30.1567 9.79669 30.1567C9.64576 30.1567 9.47651 30.1107 9.37128 30.0756L9.35377 30.0698L9.33701 30.0621C8.75065 29.7914 8.53091 29.1523 8.74958 28.5837L8.75499 28.5697L9.87804 26.0037Z" style="fill: var(--element-active-color)"/>
<path d="M4 27.9006C3.68114 27.6959 3.57189 27.2427 3.75598 26.8882L4.17863 26.0744H3.33329C2.9651 26.0744 2.66663 25.7426 2.66663 25.3333C2.66663 24.924 2.9651 24.5922 3.33329 24.5922H4.17863L3.75598 23.7784C3.57189 23.424 3.68114 22.9707 4 22.7661C4.31886 22.5614 4.72659 22.6829 4.91068 23.0373L5.33333 23.8511L5.75598 23.0373C5.94008 22.6829 6.3478 22.5614 6.66666 22.7661C6.98553 22.9707 7.09478 23.424 6.91068 23.7784L6.48804 24.5922H7.33329C7.70148 24.5922 7.99996 24.924 7.99996 25.3333C7.99996 25.7426 7.70148 26.0744 7.33329 26.0744H6.48803L6.91068 26.8882C7.09478 27.2427 6.98553 27.6959 6.66666 27.9006C6.3478 28.1052 5.94008 27.9838 5.75598 27.6293L5.33333 26.8155L4.91068 27.6293C4.72659 27.9838 4.31886 28.1052 4 27.9006Z" style="fill: var(--element-active-color)"/>
<path d="M19.3333 30.5673C19.0145 30.3626 18.9052 29.9094 19.0893 29.5549L19.512 28.7411H18.6666C18.2984 28.7411 18 28.4093 18 28C18 27.5907 18.2984 27.2589 18.6666 27.2589H19.512L19.0893 26.4451C18.9052 26.0906 19.0145 25.6374 19.3333 25.4327C19.6522 25.2281 20.0599 25.3495 20.244 25.704L20.6667 26.5178L21.0893 25.704C21.2734 25.3495 21.6811 25.2281 22 25.4327C22.3189 25.6374 22.4281 26.0906 22.244 26.4451L21.8214 27.2589H22.6666C23.0348 27.2589 23.3333 27.5907 23.3333 28C23.3333 28.4093 23.0348 28.7411 22.6666 28.7411H21.8214L22.244 29.5549C22.4281 29.9094 22.3189 30.3626 22 30.5673C21.6811 30.7719 21.2734 30.6505 21.0893 30.296L20.6667 29.4822L20.244 30.296C20.0599 30.6505 19.6522 30.7719 19.3333 30.5673Z" style="fill: var(--element-active-color)"/>
</svg>
`;

  override render() {
    return html`
      <div class="wrapper">${this.useCssColor ? this.iconCss : this.icon}</div>
    `;
  }

  static override styles = css`
    .wrapper {
      height: 100%;
      width: 100%;
      line-height: 0;
    }
    .wrapper > * {
      height: 100%;
      width: 100%;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'obi-heavy-sleet-showers-day': ObiHeavySleetShowersDay;
  }
}
