// nodes/conditionNode.js
// Evaluates a JS expression and routes execution to true or false output.

import { useState } from 'react';
import { BaseNode } from '../components/BaseNode';
import { NodeField, NodeToggle } from '../components/NodeComponents';

export const ConditionNode = ({ id, data }) => {
    const [expression, setExpression] = useState(data?.expression || 'input.length > 0');
    const [stopOnFalse, setStopOnFalse] = useState(data?.stopOnFalse || false);

    return (
        <BaseNode
            id={id}
            title="Condition"
            icon="⚡"
            color="#4ade80"
            inputs={[{ id: 'input', label: 'input' }]}
            outputs={[
                { id: 'true', label: 'true ✓' },
                { id: 'false', label: 'false ✗' },
            ]}
        >
            <NodeField label="Expression">
                <input
                    className="node-input"
                    type="text"
                    value={expression}
                    placeholder="e.g. value > 10"
                    onChange={(e) => setExpression(e.target.value)}
                    style={{ fontFamily: 'monospace', fontSize: '12px' }}
                />
            </NodeField>
            <NodeToggle
                label="Stop on false"
                checked={stopOnFalse}
                onChange={(e) => setStopOnFalse(e.target.checked)}
            />
            <p style={{ margin: '4px 0 0', fontSize: '10px', color: '#475569' }}>
                Evaluates expression and routes to true/false output.
            </p>
        </BaseNode>
    );
};
