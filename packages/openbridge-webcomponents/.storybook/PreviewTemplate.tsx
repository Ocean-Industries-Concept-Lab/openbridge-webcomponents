import React, { useState, useRef, useEffect } from 'react';
import { Meta, Title, Primary, Controls, Stories, Description, Subtitle } from '@storybook/addon-docs/blocks';
import { ComponentPreview } from './ComponentPreview.js';

const STICKY_MAX_HEIGHT_VH = 80;
const getStickyMaxHeight = () => (window.innerHeight * STICKY_MAX_HEIGHT_VH) / 100;

function useStickyOnSmall(getMaxHeight: () => number, enabled: boolean) {
  const ref = useRef<HTMLDivElement>(null);
  const [isSticky, setIsSticky] = useState(true);

  useEffect(() => {
    if (!ref.current || !enabled) return;

    const checkSticky = () => {
      if (!ref.current) return;
      const height = ref.current.getBoundingClientRect().height;
      setIsSticky(height <= getMaxHeight());
    };

    const observer = new ResizeObserver(() => {
      requestAnimationFrame(checkSticky);
    });

    observer.observe(ref.current);

    window.addEventListener('resize', checkSticky);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', checkSticky);
    };
  }, [getMaxHeight, enabled]);

  return { ref, isSticky };
}

export const PreviewTemplate: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { ref: previewRef, isSticky } = useStickyOnSmall(getStickyMaxHeight, !isCollapsed);

  return (
    <>
      <Meta />
      <Title />
      <ComponentPreview of="meta" />
      <Subtitle />
      <Description />
      <div>
        <div
          ref={previewRef}
          style={{
            position: isSticky ? 'sticky' : 'relative',
            top: isSticky ? 0 : undefined,
            zIndex: 10,
            backgroundColor: 'var(--container-section-color)',
            borderRadius: '2px',
            overflow: 'hidden',
          }}
        >
          {/* Toolbar */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '8px 12px',
            borderBottom: isCollapsed ? 'none' : '1px solid rgba(128, 128, 128, 0.2)',
            backgroundColor: 'rgba(0, 0, 0, 0.05)',
          }}>
            <span style={{ fontSize: '12px', fontWeight: 500, opacity: 0.7 }}>Preview</span>
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              style={{
                padding: '4px 8px',
                fontSize: '11px',
                border: '1px solid rgba(128, 128, 128, 0.3)',
                borderRadius: '4px',
                background: 'transparent',
                cursor: 'pointer',
              }}
            >
              {isCollapsed ? 'Expand' : 'Collapse'}
            </button>
          </div>
          {/* Preview content */}
          {!isCollapsed && (
            <div style={{ padding: '24px' }}>
              <Primary />
            </div>
          )}
        </div>
        <Controls />
      </div>
      <Stories />
    </>
  );
};

export default PreviewTemplate; 