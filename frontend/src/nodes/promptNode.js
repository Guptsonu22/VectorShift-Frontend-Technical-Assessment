// nodes/promptNode.js
// Builds a structured prompt to pass into an LLM node.

import { useState } from 'react';
import { BaseNode } from '../components/BaseNode';
import { NodeField, NodeSelect } from '../components/NodeComponents';

export const PromptNode = ({ id, data }) => {
    const [systemMsg, setSystemMsg] = useState(data?.systemMsg || 'You are a helpful assistant.');
    const [temperature, setTemperature] = useState(data?.temperature || '0.7');
    const [maxTokens, setMaxTokens] = useState(data?.maxTokens || '512');

    return (
        <BaseNode
            id={id}
            title="Prompt"
            icon="✍️"
            color="#c084fc"
            inputs={[
                { id: 'context', label: 'context' },
                { id: 'userQuery', label: 'user query' },
            ]}
            outputs={[{ id: 'prompt', label: 'prompt' }]}
        >
            <NodeField label="System Message">
                <textarea
                    className="node-input"
                    value={systemMsg}
                    rows={2}
                    onChange={(e) => setSystemMsg(e.target.value)}
                    style={{ resize: 'vertical', width: '100%' }}
                />
            </NodeField>
            <NodeField label="Temperature">
                <input
                    className="node-input"
                    type="number"
                    min="0" max="2" step="0.1"
                    value={temperature}
                    onChange={(e) => setTemperature(e.target.value)}
                />
            </NodeField>
            <NodeField label="Max Tokens">
                <input
                    className="node-input"
                    type="number"
                    value={maxTokens}
                    onChange={(e) => setMaxTokens(e.target.value)}
                />
            </NodeField>
        </BaseNode>
    );
};
