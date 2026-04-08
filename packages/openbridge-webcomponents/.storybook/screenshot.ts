import {page} from '@vitest/browser/context';
import {type TestContext, afterEach} from 'vitest';
import defaultSizes from '../default-sizes.json';

export function makeScreenshot() {
  afterEach(async (context: TestContext) => {
    const storybookMeta = getStorybookTestMeta(context);
    const el = document.querySelector(storybookMeta.name);
    if (!el) return;
    // Add a wrapper element to the parent of the element
    const wrapper = document.createElement('div');
    wrapper.style.display = 'block';
    wrapper.style.width = 'fit-content';
    wrapper.style.boxSizing = 'border-box';
    setSize(wrapper, storybookMeta);
    wrapper.appendChild(el);
    document.body.appendChild(wrapper);
    await new Promise((resolve) => setTimeout(resolve, 1));
    const slug = storybookMeta.testName
      .replace(/\s+/g, '-')
      .replace(/[/\\?%*:|"<>]/g, '_');
    await page
      .elementLocator(wrapper)
      .screenshot({
        path: `${storybookMeta.relativePathToSrc}/screenshots/${storybookMeta.name}-${slug}.png`,
      });
    document.body.removeChild(wrapper);
  });
}

interface StorybookTestMeta {
  testName: string;
  name: string;
  relativePathToSrc: string;
}

interface DefaultSizeEntry {
  tagname: string;
  baseHeightPx?: number;
  baseWidthPx?: number;
}

function getCustomElementMeta(tag: string): DefaultSizeEntry | undefined {
  const manifest = Array.from(defaultSizes.defaultSizes);
  return manifest.find((m) => m.tagname === tag);
}

function getStorybookTestMeta(context: TestContext): StorybookTestMeta {
  const {task} = context;
  const testName = task.name;
  const filepath = task.file.filepath;
  const filename = filepath.split('/').pop()!;
  const relativePathFromSrc = task.file.filepath.split('src/').pop()!;
  const count = relativePathFromSrc.split('/').length;
  const relativePathToSrc = '../'.repeat(count);
  const name = 'obc-' + filename.replace(/\.stories\.ts$/, '');
  return {
    testName: testName,
    name: name,
    relativePathToSrc: relativePathToSrc,
  };
}

const setSize = (el: HTMLElement, meta: StorybookTestMeta) => {
  const customElementMeta = getCustomElementMeta(meta.name);
  if (customElementMeta) {
    if (customElementMeta.baseWidthPx) {
      el.style.width = customElementMeta.baseWidthPx + 'px';
    }
    if (customElementMeta.baseHeightPx) {
      el.style.height = customElementMeta.baseHeightPx + 'px';
    }
  }
};
