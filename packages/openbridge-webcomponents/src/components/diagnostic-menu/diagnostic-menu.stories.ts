import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html, nothing, render, type TemplateResult} from 'lit';
import {ObcDiagnosticMenu} from './diagnostic-menu.js';
import './diagnostic-menu.js';
import '../message-menu-item/message-menu-item.js';
import '../top-bar/top-bar.js';
import '../diagnostic-button/diagnostic-button.js';
import '../../icons/icon-placeholder.js';
import '../../icons/icon-simulate.js';

type MenuArgs = Pick<
  ObcDiagnosticMenu,
  'canAckAll' | 'menuTitle' | 'showAckAllButton' | 'showDiagnosticListButton'
>;

const DESCRIPTION =
  'A long notification message of more than one line of text and meaningful content. Sometimes it might be quite long and that is ok.';

const row = (
  title: string,
  open = false,
  icon = html`<obi-placeholder></obi-placeholder>`
) =>
  html`<obc-message-menu-item
    title=${title}
    description=${DESCRIPTION}
    day="Yesterday"
    time="09:12:34"
    primaryActionLabel="Action"
    hasPrimaryIcon
    ?open=${open}
    ><span slot="primary-icon">${icon}</span></obc-message-menu-item
  >`;

/** The five rows of the design, the third expanded. */
const diagnosticRows = (): TemplateResult =>
  html`${row('Simulate', false, html`<obi-simulate></obi-simulate>`)}
  ${row('Title')} ${row('Title', true)} ${row('Title')} ${row('Title')}`;

const renderMenu = (
  args: Partial<MenuArgs>,
  rows: TemplateResult | typeof nothing = diagnosticRows()
) =>
  html`<obc-diagnostic-menu
    .canAckAll=${args.canAckAll ?? false}
    .menuTitle=${args.menuTitle ?? ''}
    .showAckAllButton=${args.showAckAllButton ?? true}
    .showDiagnosticListButton=${args.showDiagnosticListButton ?? true}
    >${rows}</obc-diagnostic-menu
  >`;

const meta: Meta<MenuArgs> = {
  title: 'Application Components/Alerts/Diagnostic Menu',
  tags: ['autodocs', '6.1', 'experimental'],
  component: 'obc-diagnostic-menu',
  args: {
    canAckAll: true,
    menuTitle: '',
    showAckAllButton: true,
    showDiagnosticListButton: true,
  },
  render: (args) => renderMenu(args),
} satisfies Meta<MenuArgs>;

export default meta;
type Story = StoryObj<MenuArgs>;

export const Regular: Story = {};

export const Empty: Story = {
  render: (args) => renderMenu(args, nothing),
};

export const NoDiagnosticListButton: Story = {
  args: {showDiagnosticListButton: false},
};

/**
 * The menu opened from the top bar's diagnostic button, with the three
 * bindings every soft-dismiss menu needs: a flag the app keeps, bound to
 * `open` and to the button's `activated` and `aria-expanded`, flipped on
 * the button's `click` and reset on `close`. A click outside closes the
 * menu and reaches nothing else; the bar stays clickable.
 */
export const SoftDismissFromATopBarButton: Story = {
  // Nothing to snapshot: the story is about what the clicks do.
  tags: ['skip-test'],
  parameters: {layout: 'fullscreen'},
  render: (args) => {
    const bar = document.createElement('obc-top-bar');
    bar.appTitle = 'App';
    bar.pageName = 'Page';
    bar.showDimmingButton = true;
    bar.showUserButton = true;

    const button = document.createElement('obc-diagnostic-button');
    button.slot = 'diagnostics';
    button.nAlerts = 3;
    bar.append(button);

    const menu = document.createElement('obc-diagnostic-menu');
    Object.assign(menu, args, {softDismiss: true});
    render(diagnosticRows(), menu);
    // Under the bar's right end, where its diagnostic button sits.
    menu.style.cssText =
      'position: fixed; right: 4px;' +
      'top: calc(var(--app-components-topbar-touch-target-size) + 4px);';

    let open = false;
    const apply = () => {
      menu.open = open;
      button.activated = open;
      button.ariaExpanded = String(open);
    };
    button.addEventListener('click', () => {
      open = !open;
      apply();
    });
    menu.addEventListener('close', () => {
      open = false;
      apply();
    });

    let hits = 0;
    const behind = document.createElement('button');
    behind.textContent = 'a button behind the menu';
    behind.style.cssText = 'display: block; margin: 240px 16px 0 auto;';
    behind.addEventListener('click', () => {
      behind.textContent = `clicked ${++hits} time${hits === 1 ? '' : 's'}`;
    });

    return html`${bar}${menu}${behind}`;
  },
};
