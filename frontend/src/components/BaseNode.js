// components/BaseNode.js
// ─────────────────────────────────────────────────────────────────────────────
// CORE ABSTRACTION for all pipeline nodes.
//
// Before this abstraction, every node file (InputNode, OutputNode, LLMNode,
// TextNode) repeated ~45 lines of identical wrapper code — border styling,
// handle positioning, header layout, body padding, etc.
//
// Now every node is defined in ~10-15 lines by just passing config props:
//
//   <BaseNode id={id} title="Input" icon="📥" color="#22d3ee"
//     inputs={[]} outputs={[{ id: 'value', label: 'value' }]}>
//     {/* node-specific fields here */}
//   </BaseNode>
//
// Props API:
//  ┌──────────┬──────────┬───────────────────────────────────────────────┐
//  │ Prop     │ Type     │ Description                                   │
//  ├──────────┼──────────┼───────────────────────────────────────────────┤
//  │ id       │ string   │ ReactFlow node ID (passed through to Handles) │
//  │ title    │ string   │ Header label text (e.g. "LLM", "Input")       │
//  │ icon     │ string   │ Emoji icon shown in the header                │
//  │ color    │ string   │ CSS color for accent/border/handles/glow      │
//  │ inputs   │ Array    │ [{id, label, style?}] — left-side handles     │
//  │ outputs  │ Array    │ [{id, label, style?}] — right-side handles    │
//  │ children │ ReactNode│ Node body content (fields, selects, etc.)     │
//  │ minWidth │ number   │ Minimum node width in px (default 220)        │
//  │ style    │ object   │ Extra inline styles for the wrapper div       │
//  └──────────┴──────────┴───────────────────────────────────────────────┘
// ─────────────────────────────────────────────────────────────────────────────

import { Handle, Position } from 'reactflow';

export const BaseNode = ({
    id,
    title,
    icon = '⚙️',
    color = '#6366f1',
    inputs = [],
    outputs = [],
    children,
    style = {},
    minWidth = 220,
}) => {

    // Calculate evenly-spaced vertical positions for handles
    const handleTop = (index, total) =>
        total === 1 ? '50%' : `${((index + 1) / (total + 1)) * 100}%`;

    return (
        <div
            className="base-node"
            style={{
                minWidth,
                background: 'linear-gradient(135deg, rgba(15,17,26,0.97) 0%, rgba(22,26,40,0.97) 100%)',
                border: `1.5px solid ${color}55`,
                borderRadius: '14px',
                boxShadow: `0 4px 32px 0 ${color}22, 0 1.5px 8px rgba(0,0,0,0.5)`,
                fontFamily: "'Inter', 'Segoe UI', sans-serif",
                color: '#e2e8f0',
                overflow: 'visible',
                position: 'relative',
                transition: 'box-shadow 0.2s',
                ...style,
            }}
        >
            {/* ── Header ───────────────────────────────────────── */}
            <div
                className="base-node-header"
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '10px 14px 8px 14px',
                    borderBottom: `1px solid ${color}33`,
                    background: `linear-gradient(90deg, ${color}22 0%, transparent 100%)`,
                    borderRadius: '13px 13px 0 0',
                }}
            >
                <span style={{ fontSize: '16px', lineHeight: 1 }}>{icon}</span>
                <span
                    style={{
                        fontWeight: 700,
                        fontSize: '13px',
                        letterSpacing: '0.04em',
                        color: '#f1f5f9',
                        textTransform: 'uppercase',
                    }}
                >
                    {title}
                </span>
                {/* Status dot */}
                <span
                    style={{
                        marginLeft: 'auto',
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        background: color,
                        boxShadow: `0 0 6px ${color}`,
                        display: 'inline-block',
                        flexShrink: 0,
                    }}
                />
            </div>

            {/* ── Body (node-specific content) ─────────────────── */}
            <div
                className="base-node-body"
                style={{ padding: '10px 14px 12px 14px' }}
            >
                {children}
            </div>

            {/* ── Input Handles (left side) ─────────────────────── */}
            {inputs.map((input, index) => {
                const top = input.style?.top || handleTop(index, inputs.length);
                return (
                    <div key={`in-${input.id}`}>
                        <Handle
                            type="target"
                            position={Position.Left}
                            id={`${id}-${input.id}`}
                            style={{
                                background: color,
                                border: '2px solid #0f1119',
                                width: 12,
                                height: 12,
                                top,
                                boxShadow: `0 0 6px ${color}`,
                                ...input.style,
                            }}
                        />
                        {input.label && (
                            <span
                                style={{
                                    position: 'absolute',
                                    left: '16px',
                                    top,
                                    transform: 'translateY(-50%)',
                                    fontSize: '10px',
                                    color: '#94a3b8',
                                    pointerEvents: 'none',
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                {input.label}
                            </span>
                        )}
                    </div>
                );
            })}

            {/* ── Output Handles (right side) ───────────────────── */}
            {outputs.map((output, index) => {
                const top = output.style?.top || handleTop(index, outputs.length);
                return (
                    <div key={`out-${output.id}`}>
                        <Handle
                            type="source"
                            position={Position.Right}
                            id={`${id}-${output.id}`}
                            style={{
                                background: color,
                                border: '2px solid #0f1119',
                                width: 12,
                                height: 12,
                                top,
                                boxShadow: `0 0 6px ${color}`,
                                ...output.style,
                            }}
                        />
                        {output.label && (
                            <span
                                style={{
                                    position: 'absolute',
                                    right: '16px',
                                    top,
                                    transform: 'translateY(-50%)',
                                    fontSize: '10px',
                                    color: '#94a3b8',
                                    pointerEvents: 'none',
                                    whiteSpace: 'nowrap',
                                    textAlign: 'right',
                                }}
                            >
                                {output.label}
                            </span>
                        )}
                    </div>
                );
            })}
        </div>
    );
};
