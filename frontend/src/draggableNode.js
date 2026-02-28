// draggableNode.js

export const DraggableNode = ({ type, label, icon = '⚙️', color = '#6366f1' }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      className="draggable-node"
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.target.style.cursor = 'grab')}
      draggable
      style={{
        '--node-color': color,
        borderColor: `${color}44`,
      }}
    >
      <div
        className="draggable-node-icon"
        style={{ background: `${color}22`, color }}
      >
        {icon}
      </div>
      <span className="draggable-node-label">{label}</span>
    </div>
  );
};