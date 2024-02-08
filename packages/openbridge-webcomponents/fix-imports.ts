import * as fs from 'fs';
import glob from 'glob';

function parseAllFiles() {
    const files = glob.sync('dist/**/*.js');
    files.forEach(file => {
        let content = fs.readFileSync(file, 'utf-8');
        // replace "../../node_modules/lit-element/lit-element.js"; with "lit-element";
        content = content.replace(/["'][./]*\/node_modules\/lit-element\/lit-element.js["'];/g, '"lit-element";');
        // replace  "../../node_modules/@lit/reactive-element/css-tag.js";
        content = content.replace(/["'][./]*\/node_modules\/@lit\/reactive-element\/css-tag.js["'];/g, '"@lit/reactive-element/css-tag.js";');
        // replace "../../node_modules/@lit/reactive-element/reactive-element.js";
        content = content.replace(/["'][./]*\/node_modules\/@lit\/reactive-element\/reactive-element.js["'];/g, '"@lit/reactive-element";');
        // relplace ""../../node_modules/lit-html/lit-html.js";
        content = content.replace(/["'][./]*\/node_modules\/lit-html\/lit-html.js["'];/g, '"lit-html";');
        // replace "../../node_modules/lit-html/directives/class-map.js";
        content = content.replace(/["'][./]*\/node_modules\/lit-html\/directives\/class-map.js["'];/g, '"lit-html/directives/class-map.js";');
        // replace "../../node_modules/lit-html/directives/style-map.js";
        content = content.replace(/["'][./]*\/node_modules\/lit-html\/directives\/style-map.js["'];/g, '"lit-html/directives/style-map.js";');
        // replace "../../node_modules/@lit/reactive-element/decorators/custom-element.js";
        content = content.replace(/["'][./]*\/node_modules\/@lit\/reactive-element\/decorators\/custom-element.js["'];/g, '"@lit/reactive-element/decorators/custom-element.js";');
        // "../../node_modules/@lit/reactive-element/decorators/property.js";
        content = content.replace(/["'][./]*\/node_modules\/@lit\/reactive-element\/decorators\/property.js["'];/g, '"@lit/reactive-element/decorators/property.js";');
        // "../../node_modules/@lit/reactive-element/decorators/query-assigned-elements.js"
        content = content.replace(/["'][./]*\/node_modules\/@lit\/reactive-element\/decorators\/query-assigned-elements.js["'];/g, '"@lit/reactive-element/decorators/query-assigned-elements.js";');
        // replace "../../node_modules/lit-html/directives/if-defined.js"
        content = content.replace(/["'][./]*\/node_modules\/lit-html\/directives\/if-defined.js["'];/g, '"lit-html/directives/if-defined.js";');
        fs.writeFileSync(file, content);
    });
}

parseAllFiles();