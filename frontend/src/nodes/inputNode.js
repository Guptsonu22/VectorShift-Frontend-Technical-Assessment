// nodes/inputNode.js
// Uses BaseNode abstraction — only node-specific logic lives here.

import { useState } from 'react';
import { BaseNode } from '../components/BaseNode';
import { NodeField, NodeSelect } from '../components/NodeComponents';

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(
    data?.inputName || id.replace('customInput-', 'input_')
  );
  const [inputType, setInputType] = useState(data?.inputType || 'Text');

  return (
    <BaseNode
      id={id}
      title="Input"
      icon="📥"
      color="#22d3ee"
      inputs={[]}
      outputs={[{ id: 'value', label: 'value' }]}
    >
      <NodeField label="Name">
        <input
          className="node-input"
          type="text"
          value={currName}
          onChange={(e) => setCurrName(e.target.value)}
        />
      </NodeField>
      <NodeSelect
        label="Type"
        value={inputType}
        onChange={(e) => setInputType(e.target.value)}
        options={['Text', 'File']}
      />
    </BaseNode>
  );
};
