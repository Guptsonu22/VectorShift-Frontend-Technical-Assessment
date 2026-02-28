// nodes/filterNode.js
// Filters data based on a field/operator/value condition.

import { useState } from 'react';
import { BaseNode } from '../components/BaseNode';
import { NodeField, NodeSelect } from '../components/NodeComponents';

export const FilterNode = ({ id, data }) => {
    const [field, setField] = useState(data?.field || '');
    const [operator, setOperator] = useState(data?.operator || 'equals');
    const [value, setValue] = useState(data?.value || '');

    return (
        <BaseNode
            id={id}
            title="Filter"
            icon="🔍"
            color="#f59e0b"
            inputs={[{ id: 'data', label: 'data' }]}
            outputs={[
                { id: 'matched', label: 'matched' },
                { id: 'unmatched', label: 'unmatched' },
            ]}
        >
            <NodeField label="Field">
                <input
                    className="node-input"
                    type="text"
                    value={field}
                    placeholder="e.g. user.age"
                    onChange={(e) => setField(e.target.value)}
                />
            </NodeField>
            <NodeSelect
                label="Operator"
                value={operator}
                onChange={(e) => setOperator(e.target.value)}
                options={['equals', 'not equals', 'contains', 'greater than', 'less than']}
            />
            <NodeField label="Value">
                <input
                    className="node-input"
                    type="text"
                    value={value}
                    placeholder="comparison value"
                    onChange={(e) => setValue(e.target.value)}
                />
            </NodeField>
        </BaseNode>
    );
};
