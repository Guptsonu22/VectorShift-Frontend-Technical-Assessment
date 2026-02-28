// nodes/mergeNode.js
// Combines multiple data streams into a single output.

import { useState } from 'react';
import { BaseNode } from '../components/BaseNode';
import { NodeField, NodeSelect } from '../components/NodeComponents';

export const MergeNode = ({ id, data }) => {
    const [strategy, setStrategy] = useState(data?.strategy || 'Concatenate');
    const [separator, setSeparator] = useState(data?.separator || '\\n');

    return (
        <BaseNode
            id={id}
            title="Merge"
            icon="🔀"
            color="#fb7185"
            inputs={[
                { id: 'a', label: 'stream A' },
                { id: 'b', label: 'stream B' },
                { id: 'c', label: 'stream C' },
            ]}
            outputs={[{ id: 'merged', label: 'merged' }]}
            minWidth={230}
        >
            <NodeSelect
                label="Strategy"
                value={strategy}
                onChange={(e) => setStrategy(e.target.value)}
                options={['Concatenate', 'JSON Array', 'Zip', 'First Non-empty']}
            />
            {strategy === 'Concatenate' && (
                <NodeField label="Separator">
                    <input
                        className="node-input"
                        type="text"
                        value={separator}
                        onChange={(e) => setSeparator(e.target.value)}
                        style={{ width: '80px', fontFamily: 'monospace' }}
                    />
                </NodeField>
            )}
        </BaseNode>
    );
};
