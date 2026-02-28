// nodes/textNode.js
// Part 3: Auto-resize textarea + dynamic {{variable}} handles via BaseNode
//
// Key insight: BaseNode already renders handles from an `inputs` array.
// We just update that array dynamically whenever the text changes —
// so TextNode properly uses the BaseNode abstraction like every other node.

import { useState, useEffect, useRef, useCallback } from 'react';
import { BaseNode } from '../components/BaseNode';

// ── Extract valid JS variable names from {{varName}} patterns ─────────────────
const extractVariables = (text) => {
  const regex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;
  const seen = new Set();
  const vars = [];
  let match;
  while ((match = regex.exec(text)) !== null) {
    if (!seen.has(match[1])) {
      seen.add(match[1]);
      vars.push(match[1]);
    }
  }
  return vars;
};

const NODE_COLOR = '#34d399';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [variables, setVariables] = useState(() => extractVariables(data?.text || '{{input}}'));
  const textareaRef = useRef(null);

  // ── Auto-resize: grow height AND width as user types ─────────────────────
  const autoResize = useCallback(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    // Height grows with content
    ta.style.height = 'auto';
    ta.style.height = Math.max(60, ta.scrollHeight) + 'px';
    // Width grows with longest line (capped at 480px)
    const longestLine = Math.max(...ta.value.split('\n').map((l) => l.length), 10);
    ta.style.width = Math.min(Math.max(160, longestLine * 8), 480) + 'px';
  }, []);

  useEffect(() => {
    autoResize();
    setVariables(extractVariables(currText));
  }, [currText, autoResize]);

  // Build the `inputs` array BaseNode expects — one entry per {{variable}}
  // BaseNode will auto-space and render them as target handles
  const dynamicInputs = variables.map((varName) => ({
    id: varName,       // becomes handle id: `${nodeId}-${varName}`
    label: varName,
  }));

  return (
    <BaseNode
      id={id}
      title="Text"
      icon="📝"
      color={NODE_COLOR}
      inputs={dynamicInputs}                    // ← dynamic, updates on each keystroke
      outputs={[{ id: 'output', label: 'output' }]}
    >
      {/* ── Auto-resizing textarea ─────────────────────────── */}
      <label
        style={{
          display: 'block',
          fontSize: '11px',
          color: '#94a3b8',
          marginBottom: '4px',
          fontWeight: 600,
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
        }}
      >
        Text
      </label>
      <textarea
        ref={textareaRef}
        className="node-input"
        value={currText}
        onChange={(e) => setCurrText(e.target.value)}
        rows={2}
        style={{
          resize: 'none',
          overflow: 'hidden',
          minWidth: '160px',
          width: '100%',
          minHeight: '60px',
          transition: 'width 0.15s ease, height 0.15s ease',
          display: 'block',
        }}
      />

      {/* ── Variable badges ────────────────────────────────── */}
      {variables.length > 0 && (
        <div style={{ marginTop: '8px' }}>
          <p
            style={{
              margin: '0 0 4px',
              fontSize: '10px',
              color: '#64748b',
              fontWeight: 600,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
            }}
          >
            Variables ({variables.length})
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
            {variables.map((v) => (
              <span
                key={v}
                style={{
                  fontSize: '10px',
                  background: `${NODE_COLOR}20`,
                  border: `1px solid ${NODE_COLOR}66`,
                  borderRadius: '4px',
                  padding: '1px 6px',
                  color: NODE_COLOR,
                  fontFamily: 'monospace',
                }}
              >
                {`{{${v}}}`}
              </span>
            ))}
          </div>
        </div>
      )}
    </BaseNode>
  );
};
