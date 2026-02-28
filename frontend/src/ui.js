// ui.js — ReactFlow canvas with all node types registered

import { useState, useRef, useCallback } from 'react';
import ReactFlow, { Controls, Background, MiniMap } from 'reactflow';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';

// ── Original 4 nodes ─────────────────────────────────────────────────────────
import { InputNode } from './nodes/inputNode';
import { OutputNode } from './nodes/outputNode';
import { LLMNode } from './nodes/llmNode';
import { TextNode } from './nodes/textNode';

// ── 8 new nodes (all use BaseNode abstraction) ────────────────────────────────
import { FilterNode } from './nodes/filterNode';
import { ApiNode } from './nodes/apiNode';
import { PromptNode } from './nodes/promptNode';
import { MergeNode } from './nodes/mergeNode';
import { ConditionNode } from './nodes/conditionNode';
import { MathNode } from './nodes/mathNode';
import { DatabaseNode } from './nodes/databaseNode';
import { ImageNode } from './nodes/imageNode';

import 'reactflow/dist/style.css';

const gridSize = 20;
const proOptions = { hideAttribution: true };

// Register every node type with ReactFlow
const nodeTypes = {
  customInput: InputNode,
  customOutput: OutputNode,
  llm: LLMNode,
  text: TextNode,
  filter: FilterNode,
  api: ApiNode,
  prompt: PromptNode,
  merge: MergeNode,
  condition: ConditionNode,
  math: MathNode,
  database: DatabaseNode,
  image: ImageNode,
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

export const PipelineUI = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const {
    nodes, edges, getNodeID, addNode,
    onNodesChange, onEdgesChange, onConnect,
  } = useStore(selector, shallow);

  const getInitNodeData = (nodeID, type) => ({ id: nodeID, nodeType: type });

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const bounds = reactFlowWrapper.current.getBoundingClientRect();
      const raw = event?.dataTransfer?.getData('application/reactflow');
      if (!raw) return;

      const { nodeType: type } = JSON.parse(raw);
      if (!type) return;

      const position = reactFlowInstance.project({
        x: event.clientX - bounds.left,
        y: event.clientY - bounds.top,
      });

      const nodeID = getNodeID(type);
      addNode({ id: nodeID, type, position, data: getInitNodeData(nodeID, type) });
    },
    [reactFlowInstance]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  return (
    <div ref={reactFlowWrapper} className="pipeline-canvas">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onInit={setReactFlowInstance}
        nodeTypes={nodeTypes}
        proOptions={proOptions}
        snapGrid={[gridSize, gridSize]}
        connectionLineType="smoothstep"
        fitView
      >
        <Background color="#1e2235" gap={gridSize} variant="dots" />
        <Controls
          style={{
            background: 'rgba(15,17,26,0.9)',
            border: '1px solid rgba(99,102,241,0.3)',
            borderRadius: '10px',
          }}
        />
        <MiniMap
          style={{
            background: 'rgba(15,17,26,0.9)',
            border: '1px solid rgba(99,102,241,0.3)',
            borderRadius: '10px',
          }}
          nodeColor={() => '#6366f1'}
          maskColor="rgba(15,17,26,0.8)"
        />
      </ReactFlow>
    </div>
  );
};
