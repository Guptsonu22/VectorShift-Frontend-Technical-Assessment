// nodes/databaseNode.js
// Queries or writes to a database table.

import { useState } from 'react';
import { BaseNode } from '../components/BaseNode';
import { NodeField, NodeSelect } from '../components/NodeComponents';

export const DatabaseNode = ({ id, data }) => {
    const [dbType, setDbType] = useState(data?.dbType || 'PostgreSQL');
    const [operation, setOperation] = useState(data?.operation || 'SELECT');
    const [tableName, setTableName] = useState(data?.tableName || '');

    // Read operations return rows; write operations return status
    const isRead = ['SELECT', 'COUNT'].includes(operation);

    return (
        <BaseNode
            id={id}
            title="Database"
            icon="🗄️"
            color="#818cf8"
            inputs={[
                { id: 'query', label: 'query / data' },
                { id: 'filter', label: 'filter' },
            ]}
            outputs={
                isRead
                    ? [
                        { id: 'rows', label: 'rows' },
                        { id: 'count', label: 'count' },
                    ]
                    : [{ id: 'status', label: 'status' }]
            }
        >
            <NodeSelect
                label="Database"
                value={dbType}
                onChange={(e) => setDbType(e.target.value)}
                options={['PostgreSQL', 'MySQL', 'SQLite', 'MongoDB', 'Supabase']}
            />
            <NodeSelect
                label="Operation"
                value={operation}
                onChange={(e) => setOperation(e.target.value)}
                options={['SELECT', 'COUNT', 'INSERT', 'UPDATE', 'DELETE']}
            />
            <NodeField label="Table / Collection">
                <input
                    className="node-input"
                    type="text"
                    value={tableName}
                    placeholder="e.g. users"
                    onChange={(e) => setTableName(e.target.value)}
                />
            </NodeField>
        </BaseNode>
    );
};
