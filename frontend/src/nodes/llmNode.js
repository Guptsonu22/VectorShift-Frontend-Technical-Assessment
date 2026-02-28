// nodes/llmNode.js
// Uses BaseNode abstraction — only node-specific logic lives here.

import { useState } from 'react';
import { BaseNode } from '../components/BaseNode';
import { NodeSelect } from '../components/NodeComponents';

export const LLMNode = ({ id, data }) => {
  const [model, setModel] = useState(data?.model || 'GPT-4o');

  return (
    <BaseNode
      id={id}
      title="LLM"
      icon="🤖"
      color="#a78bfa"
      inputs={[
        { id: 'system', label: 'system' },
        { id: 'prompt', label: 'prompt' },
      ]}
      outputs={[{ id: 'response', label: 'response' }]}
    >
      <NodeSelect
        label="Model"
        value={model}
        onChange={(e) => setModel(e.target.value)}
        options={['GPT-4o', 'GPT-4', 'GPT-3.5', 'Claude 3', 'Gemini 1.5']}
      />
      <p style={{ margin: '6px 0 0', fontSize: '11px', color: '#64748b' }}>
        Generates a text response from the selected model.
      </p>
    </BaseNode>
  );
};
