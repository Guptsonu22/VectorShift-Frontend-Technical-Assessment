// nodeComponents.js
// Shared helper components used inside nodes

/**
 * NodeField - Wraps a label + input field pair with consistent styling.
 */
export const NodeField = ({ label, children }) => (
    <div style={{ marginBottom: '8px' }}>
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
            {label}
        </label>
        {children}
    </div>
);

/**
 * NodeSelect - Dropdown select with consistent node styling.
 */
export const NodeSelect = ({ label, value, onChange, options }) => (
    <div style={{ marginBottom: '8px' }}>
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
            {label}
        </label>
        <select className="node-select" value={value} onChange={onChange}>
            {options.map((opt) => (
                <option key={opt} value={opt}>
                    {opt}
                </option>
            ))}
        </select>
    </div>
);

/**
 * NodeTextarea - Auto-sizing textarea for node bodies.
 */
export const NodeTextarea = ({ label, value, onChange, rows = 2 }) => (
    <div style={{ marginBottom: '8px' }}>
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
            {label}
        </label>
        <textarea
            className="node-input"
            value={value}
            onChange={onChange}
            rows={rows}
            style={{ resize: 'vertical', width: '100%' }}
        />
    </div>
);

/**
 * NodeToggle - Simple toggle/checkbox field.
 */
export const NodeToggle = ({ label, checked, onChange }) => (
    <div
        style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '8px',
        }}
    >
        <input
            type="checkbox"
            checked={checked}
            onChange={onChange}
            style={{ accentColor: '#6366f1', width: 14, height: 14 }}
        />
        <span style={{ fontSize: '12px', color: '#cbd5e1' }}>{label}</span>
    </div>
);

/**
 * NodeBadge - A small status or type indicator badge.
 */
export const NodeBadge = ({ text, color = '#6366f1' }) => (
    <span
        style={{
            display: 'inline-block',
            fontSize: '10px',
            background: `${color}20`,
            border: `1px solid ${color}66`,
            borderRadius: '4px',
            padding: '1px 7px',
            color,
            fontWeight: 600,
            letterSpacing: '0.05em',
        }}
    >
        {text}
    </span>
);
