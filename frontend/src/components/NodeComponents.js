// components/NodeComponents.js
// Shared UI helpers used inside every node body.
// Import these wherever you need labelled fields, selects, toggles, etc.

// ── NodeField ─────────────────────────────────────────────────────────────────
// Wraps a label + any input in consistent node styling.
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

// ── NodeSelect ────────────────────────────────────────────────────────────────
// Dropdown select with styled arrow and dark theme.
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
            {options.map((opt) =>
                typeof opt === 'string' ? (
                    <option key={opt} value={opt}>{opt}</option>
                ) : (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                )
            )}
        </select>
    </div>
);

// ── NodeTextarea ──────────────────────────────────────────────────────────────
// Resizable textarea for longer content fields.
export const NodeTextarea = ({ label, value, onChange, rows = 2, placeholder = '' }) => (
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
            placeholder={placeholder}
            style={{ resize: 'vertical', width: '100%' }}
        />
    </div>
);

// ── NodeToggle ────────────────────────────────────────────────────────────────
// Styled checkbox + label pair.
export const NodeToggle = ({ label, checked, onChange }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
        <input
            type="checkbox"
            checked={checked}
            onChange={onChange}
            style={{ accentColor: '#6366f1', width: 14, height: 14, cursor: 'pointer' }}
        />
        <span style={{ fontSize: '12px', color: '#cbd5e1' }}>{label}</span>
    </div>
);

// ── NodeBadge ─────────────────────────────────────────────────────────────────
// Small coloured tag for status, type indicators, etc.
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
            fontFamily: 'monospace',
        }}
    >
        {text}
    </span>
);
