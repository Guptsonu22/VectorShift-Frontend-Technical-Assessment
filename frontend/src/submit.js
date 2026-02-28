// submit.js
// Part 4: Backend integration — sends nodes/edges, shows alert

import { useState } from 'react';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';

const selector = (state) => ({
    nodes: state.nodes,
    edges: state.edges,
});

export const SubmitButton = () => {
    const { nodes, edges } = useStore(selector, shallow);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (nodes.length === 0) {
            alert('⚠️ Add at least one node before submitting!');
            return;
        }
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('nodes', JSON.stringify(nodes));
            formData.append('edges', JSON.stringify(edges));

            const response = await fetch('http://127.0.0.1:8000/pipelines/parse', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`Server error: ${response.status}`);
            }

            const data = await response.json();
            const dagStatus = data.is_dag
                ? '✅ Yes — This pipeline is a valid DAG'
                : '❌ No — This pipeline contains cycles';

            alert(
                `📊 Pipeline Analysis\n` +
                `${'─'.repeat(30)}\n` +
                `🔷 Nodes:  ${data.num_nodes}\n` +
                `🔗 Edges:  ${data.num_edges}\n` +
                `🌐 Is DAG: ${dagStatus}`
            );
        } catch (err) {
            alert(`❌ Error submitting pipeline:\n${err.message}\n\nMake sure the backend is running at http://127.0.0.1:8000`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="submit-bar">
            <button
                className={`submit-btn ${loading ? 'submit-btn--loading' : ''}`}
                onClick={handleSubmit}
                disabled={loading}
                id="submit-pipeline-btn"
            >
                {loading ? (
                    <>
                        <span className="submit-spinner" />
                        Analyzing…
                    </>
                ) : (
                    <>
                        <span>⚡</span>
                        Submit Pipeline
                    </>
                )}
            </button>
        </div>
    );
};
