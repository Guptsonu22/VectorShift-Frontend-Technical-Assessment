// nodes/apiNode.js
// Makes an HTTP request to an external endpoint.

import { useState } from 'react';
import { BaseNode } from '../components/BaseNode';
import { NodeField, NodeSelect } from '../components/NodeComponents';

export const ApiNode = ({ id, data }) => {
    const [url, setUrl] = useState(data?.url || 'https://api.example.com/');
    const [method, setMethod] = useState(data?.method || 'GET');
    const [authType, setAuthType] = useState(data?.authType || 'None');

    return (
        <BaseNode
            id={id}
            title="API Request"
            icon="🌐"
            color="#38bdf8"
            inputs={[
                { id: 'body', label: 'body' },
                { id: 'headers', label: 'headers' },
            ]}
            outputs={[
                { id: 'response', label: 'response' },
                { id: 'error', label: 'error' },
            ]}
        >
            <NodeField label="URL">
                <input
                    className="node-input"
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://..."
                />
            </NodeField>
            <NodeSelect
                label="Method"
                value={method}
                onChange={(e) => setMethod(e.target.value)}
                options={['GET', 'POST', 'PUT', 'PATCH', 'DELETE']}
            />
            <NodeSelect
                label="Auth"
                value={authType}
                onChange={(e) => setAuthType(e.target.value)}
                options={['None', 'Bearer Token', 'API Key', 'Basic Auth']}
            />
        </BaseNode>
    );
};
