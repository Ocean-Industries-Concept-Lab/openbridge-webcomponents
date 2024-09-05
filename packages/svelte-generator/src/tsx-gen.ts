import { Prop, PropEnum, PropTree } from "./analyze";

export function genSvelte(d: {
    className: string, distFile: string, tagName: string, componentId: string, props: PropTree, events: string[],
    slots: string[]
}): string {
    const propsDef: string[] = [];
    for (const [name, prop] of Object.entries(d.props)) {
        if (propIsEnum(prop)) {
            if (prop.canBeUndefined) {
                if (prop.default === 'undefined') {
                    propsDef.push(`export let ${name}: ${prop.enumDef.name} | undefined = undefined;`);
                } else {
                    propsDef.push(`export let ${name}: ${prop.enumDef.name} | undefined = ${prop.enumDef.name}.${prop.default};`);
                }
            } else {
                propsDef.push(`export let ${name}: ${prop.enumDef.name} = ${prop.enumDef.name}.${prop.default};`);
            }
        } else if (prop.type === 'string' && prop.options) {
            propsDef.push(`export let ${name}: ${prop.options} = ${prop.default};`);
        }
        else if (prop.canBeUndefined) {
            propsDef.push(`export let ${name}: ${prop.type} | undefined = ${prop.default};`);
        } else {
            propsDef.push(`export let ${name}: ${prop.type} = ${prop.default};`);
        }
    }
    const importStatements = Object.values(d.props).filter(propIsEnum).map(p => {
        let path = p.enumDef.path;
        return `import { ${p.enumDef.name} } from "${path}"`
    })
    // Deduplicate import statements
    const importSet = new Set(importStatements);
    const importStatementsDeduped = Array.from(importSet);

    const propsSets = Object.keys(d.props).map(p => `$: if (element) element.${p} = ${p}`).join('\n');
    return `
<script lang="ts">
import { ${d.className} as Element } from "@oicl/openbridge-webcomponents/dist/${d.distFile}"
let element: Element;
${importStatementsDeduped.join('\n')}
${propsDef.join('\n')}

${propsSets}
</script>
<${d.tagName} bind:this={element} ${d.events.map(e => `on:${e}`)}>
    <slot></slot>
    ${d.slots.map(s => `<slot name="${s}"></slot>`).join('\n    ')}
</${d.tagName}>`
};

function propIsEnum(prop: Prop): prop is PropEnum {
    return prop.type === 'enum';
}