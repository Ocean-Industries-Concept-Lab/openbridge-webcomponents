import type {PartialStoryFn, Renderer} from 'storybook/internal/types';

import {makeDecorator, useEffect} from 'storybook/preview-api';
import {getCustomElements} from '@storybook/web-components';

import {action} from 'storybook/actions';

const actionsFn = (e: Event) => {
  const eventName = e.type;
  const detail =
    e instanceof CustomEvent ? JSON.parse(JSON.stringify(e.detail)) : undefined;
  action(eventName)({
    detail,
    type: e.type,
    bubbles: e.bubbles,
    composed: e.composed,
    cancelable: e.cancelable,
    target: e.target,
  });
};

const recursiveFindObcElement = (element: HTMLElement): HTMLElement | null => {
  if (element.tagName.startsWith('OBC-')) {
    return element;
  }
  if (element.children.length > 0) {
    for (const child of element.children) {
      const obcElement = recursiveFindObcElement(child as HTMLElement);
      if (obcElement) {
        return obcElement;
      }
    }
  }
  return null;
};

const applyEventHandlers = (...handles: string[]) => {
  useEffect(() => {
    const root = document.getElementById('storybook-root');
    const obcElement = root && recursiveFindObcElement(root);
    if (obcElement) {
      handles.forEach((eventName) => {
        obcElement.addEventListener(eventName, actionsFn);
      });
      return () =>
        handles.forEach((eventName) =>
          obcElement.removeEventListener(eventName, actionsFn)
        );
    }
    return undefined;
  }, [handles]);
};

export const withActions: <T extends Renderer>(
  storyFn: PartialStoryFn<T>
) => T['storyResult'] = makeDecorator({
  name: 'withActions',
  parameterName: 'actions',
  skipIfNoParametersOrOptions: false,
  wrapper: (getStory, context) => {
    const customElements = getCustomElements();
    const component = customElements.modules
      .find((m: {declarations: {tagName: string}[]}) =>
        m.declarations.find((e) => e.tagName === context.component)
      )
      .declarations.find(
        (e: {tagName: string}) => e.tagName === context.component
      );
    const events = component?.events?.map((e: {name: string}) => e.name);
    if (events) {
      applyEventHandlers(...events);
    }

    return getStory(context);
  },
});