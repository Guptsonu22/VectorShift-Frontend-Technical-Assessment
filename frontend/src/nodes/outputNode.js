// nodes/outputNode.js
// Uses BaseNode abstraction — only node-specific logic lives here.

import { useState } from 'react';
import { BaseNode } from '../components/BaseNode';
import { NodeField, NodeSelect } from '../components/NodeComponents';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(
    data?.outputName || id.replace('customOutput-', 'output_')
  );
  const [outputType, setOutputType] = useState(data?.outputType || 'Text');

  return (
    <BaseNode
      id={id}
      title="Output"
      icon="📤"
      color="#f472b6"
      inputs={[{ id: 'value', label: 'value' }]}
      outputs={[]}
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
        value={outputType}
        onChange={(e) => setOutputType(e.target.value)}
        options={['Text', 'Image']}
      />
    </BaseNode>
  );
};
