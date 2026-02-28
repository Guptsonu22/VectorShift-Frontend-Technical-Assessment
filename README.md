# VectorShift — Frontend Technical Assessment

A fully-featured AI pipeline builder built with React + ReactFlow on the frontend and Python FastAPI on the backend.

---

## 🚀 Quick Start

### Frontend
```bash
cd frontend
npm install
npm start
# → http://localhost:3000
```

### Backend
```bash
cd backend
pip install fastapi uvicorn python-multipart
uvicorn main:app --reload
# → http://127.0.0.1:8000
```

---

## ✅ Assessment Parts Completed

### Part 1 — Node Abstraction

Created a reusable `BaseNode` component at `src/components/BaseNode.js`.

**Before:** Every node had ~45 lines of duplicated wrapper code (border, header, handle positioning, styling).  
**After:** Every node is ~15 lines of unique config. One component handles everything else.

```
src/
├── components/
│   ├── BaseNode.js          ← Core reusable abstraction
│   └── NodeComponents.js    ← Shared helpers (NodeField, NodeSelect, NodeToggle…)
└── nodes/
    ├── inputNode.js         ← uses <BaseNode>
    ├── outputNode.js        ← uses <BaseNode>
    ├── llmNode.js           ← uses <BaseNode>
    ├── textNode.js          ← uses <BaseNode> with dynamic inputs array
    ├── filterNode.js        ← uses <BaseNode>  ┐
    ├── apiNode.js           ← uses <BaseNode>  │
    ├── promptNode.js        ← uses <BaseNode>  │ 8 NEW nodes
    ├── mergeNode.js         ← uses <BaseNode>  │
    ├── conditionNode.js     ← uses <BaseNode>  │
    ├── mathNode.js          ← uses <BaseNode>  │
    ├── databaseNode.js      ← uses <BaseNode>  │
    └── imageNode.js         ← uses <BaseNode>  ┘
```

#### BaseNode Props API

| Prop | Type | Description |
|------|------|-------------|
| `id` | string | ReactFlow node ID, threaded through to all Handles |
| `title` | string | Header label (e.g. `"LLM"`) |
| `icon` | string | Emoji icon shown in header |
| `color` | string | CSS color — used for border, handles, glow, and header gradient |
| `inputs` | `Array<{id, label, style?}>` | Left-side target handles, auto-spaced vertically |
| `outputs` | `Array<{id, label, style?}>` | Right-side source handles, auto-spaced vertically |
| `children` | ReactNode | Node body content (fields, selects, etc.) |
| `minWidth` | number | Minimum width in px (default `220`) |

#### Adding a new node — example (5 lines of config):

```jsx
import { BaseNode } from '../components/BaseNode';

export const MyNode = ({ id, data }) => (
  <BaseNode id={id} title="My Node" icon="✨" color="#6366f1"
    inputs={[{ id: 'in', label: 'input' }]}
    outputs={[{ id: 'out', label: 'output' }]}
  >
    {/* node-specific fields */}
  </BaseNode>
);
```

---

### Part 2 — Styling

Modern dark glassmorphism design system (`src/index.css`):

- **Dark theme** — deep navy (`#070910`) background with subtle radial gradients
- **Per-node accent colors** — each node type has its own color applied to border, handles, and header
- **Google Fonts (Inter)** — loaded via `@import`
- **Sidebar toolbar** — fixed left panel with 3 grouped sections (Core / Logic / Data & AI)
- **Node hover effects** — glow shadow lifts on hover
- **Handle animations** — scale-up on hover with colored glow
- **Submit button** — gradient with shimmer hover + loading spinner
- **Animated edges** — dashed flow animation on active connections

---

### Part 3 — Text Node Logic

**File:** `src/nodes/textNode.js`

#### Auto-resize
The textarea grows in **both width and height** as the user types:
```js
ta.style.height = Math.max(60, ta.scrollHeight) + 'px';
ta.style.width  = Math.min(Math.max(160, longestLine * 8), 480) + 'px';
```

#### Dynamic `{{variable}}` Handles
- Regex `/\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g` extracts all valid JS identifiers
- Each unique variable becomes an entry in the `inputs` array passed to `<BaseNode>`
- BaseNode renders one `<Handle type="target">` per variable, evenly spaced on the left
- Variable badges shown below the textarea update in real time
- Only valid JS identifier names are detected (e.g. `{{my_var}}` ✓, `{{123bad}}` ✗)

---

### Part 4 — Backend Integration

**Frontend (`src/submit.js`):**
- Reads current `nodes` and `edges` from Zustand store
- Sends them as `FormData` (JSON strings) via `POST /pipelines/parse`
- Shows a loading spinner while waiting for response
- Displays a formatted `window.alert()` with the results

**Backend (`backend/main.py`):**
- CORS middleware configured for `localhost:3000`
- `POST /pipelines/parse` accepts `nodes` and `edges` as JSON form fields
- Counts nodes and edges
- **DAG detection** using DFS with 3-color cycle detection (white/gray/black):
  - Builds adjacency list from edges
  - DFS from every unvisited node
  - If a gray (in-stack) neighbor is reached → cycle → **not a DAG**
- Returns `{ num_nodes: int, num_edges: int, is_dag: bool }`

**Example alert output:**
```
📊 Pipeline Analysis
──────────────────────────────
🔷 Nodes:  3
🔗 Edges:  2
🌐 Is DAG: ✅ Yes — This pipeline is a valid DAG
```

---

## 📁 Full Project Structure

```
frontend_technical_assessment/
├── backend/
│   └── main.py                  ← FastAPI server with DAG logic
│
└── frontend/
    └── src/
        ├── components/
        │   ├── BaseNode.js       ← Reusable node abstraction
        │   └── NodeComponents.js ← Shared UI primitives
        ├── nodes/
        │   ├── inputNode.js
        │   ├── outputNode.js
        │   ├── llmNode.js
        │   ├── textNode.js       ← Auto-resize + {{variable}} handles
        │   ├── filterNode.js     ← NEW
        │   ├── apiNode.js        ← NEW
        │   ├── promptNode.js     ← NEW
        │   ├── mergeNode.js      ← NEW
        │   ├── conditionNode.js  ← NEW
        │   ├── mathNode.js       ← NEW
        │   ├── databaseNode.js   ← NEW
        │   └── imageNode.js      ← NEW
        ├── App.js
        ├── ui.js                 ← ReactFlow canvas
        ├── toolbar.js            ← Left sidebar with all nodes
        ├── draggableNode.js      ← Drag-and-drop node cards
        ├── submit.js             ← Backend integration + alert
        ├── store.js              ← Zustand state management
        └── index.css             ← Full design system
```

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, ReactFlow, Zustand |
| Styling | Vanilla CSS (custom design system), Google Fonts |
| Backend | Python, FastAPI, Uvicorn |
| State | Zustand with shallow equality |
