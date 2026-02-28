// toolbar.js — Left-side panel with all draggable node types

import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => (
    <div className="toolbar">
        {/* Brand header */}
        <div className="toolbar-brand">
            <span className="toolbar-logo">⚡</span>
            <span className="toolbar-title">VectorShift</span>
            <span className="toolbar-subtitle">Pipeline Builder</span>
        </div>

        {/* Node palette */}
        <div className="toolbar-nodes">
            {/* ── Core Nodes ───────────────── */}
            <span className="toolbar-section-label">Core</span>
            <div className="toolbar-node-list">
                <DraggableNode type="customInput" label="Input" icon="📥" color="#22d3ee" />
                <DraggableNode type="customOutput" label="Output" icon="📤" color="#f472b6" />
                <DraggableNode type="llm" label="LLM" icon="🤖" color="#a78bfa" />
                <DraggableNode type="text" label="Text" icon="📝" color="#34d399" />
            </div>

            {/* ── Logic & Control ───────────── */}
            <span className="toolbar-section-label" style={{ marginTop: '16px' }}>Logic</span>
            <div className="toolbar-node-list">
                <DraggableNode type="filter" label="Filter" icon="🔍" color="#f59e0b" />
                <DraggableNode type="condition" label="Condition" icon="⚡" color="#4ade80" />
                <DraggableNode type="merge" label="Merge" icon="🔀" color="#fb7185" />
                <DraggableNode type="math" label="Math" icon="➕" color="#fb923c" />
            </div>

            {/* ── Data & AI ─────────────────── */}
            <span className="toolbar-section-label" style={{ marginTop: '16px' }}>Data & AI</span>
            <div className="toolbar-node-list">
                <DraggableNode type="api" label="API" icon="🌐" color="#38bdf8" />
                <DraggableNode type="prompt" label="Prompt" icon="✍️" color="#c084fc" />
                <DraggableNode type="database" label="Database" icon="🗄️" color="#818cf8" />
                <DraggableNode type="image" label="Image" icon="🖼️" color="#f472b6" />
            </div>
        </div>
    </div>
);
