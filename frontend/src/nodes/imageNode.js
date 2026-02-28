// nodes/imageNode.js
// Processes or generates an image using a vision/image model.

import { useState } from 'react';
import { BaseNode } from '../components/BaseNode';
import { NodeSelect, NodeField, NodeToggle } from '../components/NodeComponents';

export const ImageNode = ({ id, data }) => {
    const [mode, setMode] = useState(data?.mode || 'Generate');
    const [model, setModel] = useState(data?.model || 'DALL-E 3');
    const [resolution, setResolution] = useState(data?.resolution || '1024×1024');
    const [hd, setHd] = useState(data?.hd || false);

    const isGenerate = mode === 'Generate';
    const isAnalyze = mode === 'Analyze';

    return (
        <BaseNode
            id={id}
            title="Image"
            icon="🖼️"
            color="#f472b6"
            inputs={
                isGenerate
                    ? [{ id: 'prompt', label: 'prompt' }]
                    : [
                        { id: 'image', label: 'image' },
                        { id: 'prompt', label: 'prompt' },
                    ]
            }
            outputs={
                isAnalyze
                    ? [
                        { id: 'description', label: 'description' },
                        { id: 'tags', label: 'tags' },
                    ]
                    : [{ id: 'image', label: 'image' }]
            }
        >
            <NodeSelect
                label="Mode"
                value={mode}
                onChange={(e) => setMode(e.target.value)}
                options={['Generate', 'Edit', 'Analyze', 'Resize']}
            />
            <NodeSelect
                label="Model"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                options={
                    isAnalyze
                        ? ['GPT-4 Vision', 'Claude 3 Opus', 'Gemini Vision']
                        : ['DALL-E 3', 'DALL-E 2', 'Stable Diffusion', 'Midjourney']
                }
            />
            {isGenerate && (
                <>
                    <NodeSelect
                        label="Resolution"
                        value={resolution}
                        onChange={(e) => setResolution(e.target.value)}
                        options={['256×256', '512×512', '1024×1024', '1792×1024', '1024×1792']}
                    />
                    <NodeToggle
                        label="HD Quality"
                        checked={hd}
                        onChange={(e) => setHd(e.target.checked)}
                    />
                </>
            )}
        </BaseNode>
    );
};
