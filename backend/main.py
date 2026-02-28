from fastapi import FastAPI, Form
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Dict, Any
import json

app = FastAPI(title="VectorShift Pipeline API", version="1.0.0")

# Allow requests from the React dev server
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"Ping": "Pong"}


def is_dag(nodes: List[Dict[str, Any]], edges: List[Dict[str, Any]]) -> bool:
    """
    Checks whether the directed graph formed by nodes and edges is a
    Directed Acyclic Graph (DAG) using DFS-based cycle detection.
    Returns True if it is a DAG (no cycles), False otherwise.
    """
    # Build adjacency list
    node_ids = {node["id"] for node in nodes}
    adj: Dict[str, List[str]] = {nid: [] for nid in node_ids}

    for edge in edges:
        src = edge.get("source")
        tgt = edge.get("target")
        if src in adj and tgt in node_ids:
            adj[src].append(tgt)

    # DFS cycle detection
    # States: 0 = unvisited, 1 = in-stack, 2 = done
    state = {nid: 0 for nid in node_ids}

    def dfs(node: str) -> bool:
        """Returns True if a cycle is detected."""
        state[node] = 1
        for neighbor in adj.get(node, []):
            if state[neighbor] == 1:
                return True  # back edge → cycle
            if state[neighbor] == 0 and dfs(neighbor):
                return True
        state[node] = 2
        return False

    for nid in node_ids:
        if state[nid] == 0:
            if dfs(nid):
                return False  # cycle found → NOT a DAG

    return True  # no cycles → IS a DAG


@app.post("/pipelines/parse")
def parse_pipeline(
    nodes: str = Form(...),
    edges: str = Form(...),
):
    """
    Parses a pipeline and returns:
      - num_nodes: int
      - num_edges: int
      - is_dag:    bool
    """
    nodes_list: List[Dict[str, Any]] = json.loads(nodes)
    edges_list: List[Dict[str, Any]] = json.loads(edges)

    num_nodes = len(nodes_list)
    num_edges = len(edges_list)
    pipeline_is_dag = is_dag(nodes_list, edges_list)

    return {
        "num_nodes": num_nodes,
        "num_edges": num_edges,
        "is_dag": pipeline_is_dag,
    }
