// baseNode.js
// Reusable base abstraction for all pipeline nodes

import { Handle, Position } from 'reactflow';

/**
 * BaseNode - A reusable abstraction for building pipeline nodes.
 *
 * Props:
 *  - id          : string  — unique node ID from ReactFlow
 *  - title       : string  — displayed header label (e.g. "LLM", "Input")
 *  - icon        : string  — emoji or short icon to show beside title
 *  - color       : string  — accent gradient color (e.g. '#6366f1')
 *  - inputs      : Array<{ id, label, style? }> — left-side target handles
 *  - outputs     : Array<{ id, label, style? }> — right-side source handles
 *  - children    : ReactNode — arbitrary body content (fields, selects, etc.)
 *  - style       : object  — optional additional inline styles for the wrapper
 *  - minWidth    : number  — minimum width (default 220)
 */
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
            {/* Header */}
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
                {/* Accent dot */}
                <span
                    style={{
                        marginLeft: 'auto',
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        background: color,
                        boxShadow: `0 0 6px ${color}`,
                        display: 'inline-block',
                    }}
                />
            </div>

            {/* Body */}
            <div
                className="base-node-body"
                style={{ padding: '10px 14px 12px 14px' }}
            >
                {children}
            </div>

            {/* Input Handles (Left) */}
            {inputs.map((input, index) => {
                const top = inputs.length === 1
                    ? '50%'
                    : `${((index + 1) / (inputs.length + 1)) * 100}%`;
                return (
                    <div key={input.id}>
                        <Handle
                            type="target"
                            position={Position.Left}
                            id={`${id}-${input.id}`}
                            style={{
                                background: color,
                                border: `2px solid #0f1119`,
                                width: 12,
                                height: 12,
                                top: input.style?.top || top,
                                boxShadow: `0 0 6px ${color}`,
                                ...input.style,
                            }}
                        />
                        {input.label && (
                            <span
                                style={{
                                    position: 'absolute',
                                    left: '16px',
                                    top: input.style?.top || top,
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

            {/* Output Handles (Right) */}
            {outputs.map((output, index) => {
                const top = outputs.length === 1
                    ? '50%'
                    : `${((index + 1) / (outputs.length + 1)) * 100}%`;
                return (
                    <div key={output.id}>
                        <Handle
                            type="source"
                            position={Position.Right}
                            id={`${id}-${output.id}`}
                            style={{
                                background: color,
                                border: `2px solid #0f1119`,
                                width: 12,
                                height: 12,
                                top: output.style?.top || top,
                                boxShadow: `0 0 6px ${color}`,
                                ...output.style,
                            }}
                        />
                        {output.label && (
                            <span
                                style={{
                                    position: 'absolute',
                                    right: '16px',
                                    top: output.style?.top || top,
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
