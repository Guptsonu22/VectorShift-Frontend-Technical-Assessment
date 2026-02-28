// nodes/mathNode.js
// Performs a mathematical operation on one or two numeric inputs.

import { useState } from 'react';
import { BaseNode } from '../components/BaseNode';
import { NodeSelect } from '../components/NodeComponents';

export const MathNode = ({ id, data }) => {
    const [operation, setOperation] = useState(data?.operation || 'Add');

    // Unary operations only need one input; binary need two
    const unary = ['Square', 'Square Root', 'Absolute', 'Negate', 'Floor', 'Ceil'];
    const isUnary = unary.includes(operation);

    return (
        <BaseNode
            id={id}
            title="Math"
            icon="➕"
            color="#fb923c"
            inputs={
                isUnary
                    ? [{ id: 'a', label: 'a' }]
                    : [
                        { id: 'a', label: 'a' },
                        { id: 'b', label: 'b' },
                    ]
            }
            outputs={[{ id: 'result', label: 'result' }]}
        >
            <NodeSelect
                label="Operation"
                value={operation}
                onChange={(e) => setOperation(e.target.value)}
                options={[
                    'Add', 'Subtract', 'Multiply', 'Divide', 'Modulo', 'Power',
                    'Square', 'Square Root', 'Absolute', 'Negate', 'Floor', 'Ceil',
                ]}
            />
            <p style={{ margin: '6px 0 0', fontSize: '10px', color: '#64748b' }}>
                {isUnary
                    ? `Computes ${operation.toLowerCase()}(a)`
                    : `Computes a ${operation.toLowerCase()} b`}
            </p>
        </BaseNode>
    );
};
