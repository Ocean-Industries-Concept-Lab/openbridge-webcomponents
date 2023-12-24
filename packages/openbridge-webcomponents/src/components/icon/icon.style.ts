import { css } from 'lit-element';

export default css`
.wrapper {
  height: var(--size);
  width: var(--size);
}
.wrapper > * {
    height: 100%;
    width: 100%;
  }
`;