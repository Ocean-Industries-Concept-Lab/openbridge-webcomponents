import React, { useState, useRef, useEffect } from 'react';
import { Meta, Title, Primary, Controls, Stories, Description, Subtitle } from '@storybook/addon-docs/blocks';
import { ComponentPreview } from './ComponentPreview.js';

const STICKY_MAX_HEIGHT = 530;

function useStickyOnSmall(maxHeight: number, enabled: boolean) {
  const ref = useRef<HTMLDivElement>(null);
  const [isSticky, setIsSticky] = useState(true);

  useEffect(() => {
    if (!ref.current || !enabled) return;

    const observer = new ResizeObserver((entries) => {
      requestAnimationFrame(() => {
        const height = entries[0]?.contentRect.height ?? 0;
        setIsSticky(height <= maxHeight);
      });
    });

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [maxHeight, enabled]);

  return { ref, isSticky };
}

export const PreviewTemplate: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { ref: previewRef, isSticky } = useStickyOnSmall(STICKY_MAX_HEIGHT, !isCollapsed);

  return (
    <>
      <Meta />
      <Title />
      <ComponentPreview of="meta" />
      <Subtitle />
      <Description />
      {/* Wrapper div that contains the sticky element - sticky stops at wrapper boundary */}
      <div>
        <div
          ref={previewRef}
          style={{
            position: isSticky ? 'sticky' : 'relative',
            top: isSticky ? '20px' : undefined,
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