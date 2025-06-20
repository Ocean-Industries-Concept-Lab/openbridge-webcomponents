import { CustomElementDecorator } from '@lit/reactive-element/decorators/custom-element';
import { Constructor } from '@lit/reactive-element/decorators/base';

type CustomElementClass = Omit<typeof HTMLElement, 'new'>;

/**
 * Class decorator factory that defines the decorated class as a custom element.
 *
 *  It warns if the element is already registered, instead of throwing an error.
 *  First registered element wins.
 *
 * ```js
 * @customElement('my-element')
 * class MyElement extends LitElement {
 *   render() {
 *     return html``;
 *   }
 * }
 * ```
 * @category Decorator
 * @param tagName The tag name of the custom element to define.
 */
export const customElement =
    (tagName: string): CustomElementDecorator =>
        (
            classOrTarget: CustomElementClass | Constructor<HTMLElement>,
            context?: ClassDecoratorContext<Constructor<HTMLElement>>
        ) => {
            if (context !== undefined) {
                context.addInitializer(() => {
                    if (customElements.get(tagName) && process.env.NODE_ENV !== 'development') {
                        console.error(`Element ${tagName} is already registered`);
                        return;
                    }
                    customElements.define(
                        tagName,
                        classOrTarget as CustomElementConstructor
                    );
                });
            } else {
                if (customElements.get(tagName) && process.env.NODE_ENV !== 'development') {
                    console.error(`Element ${tagName} is already registered`);
                    return;
                }
                customElements.define(tagName, classOrTarget as CustomElementConstructor);
            }
        };
