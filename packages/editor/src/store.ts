import { createSlice, configureStore, PayloadAction } from "@reduxjs/toolkit";
import {
  Node,
  Edge,
  NodeChange,
  EdgeChange,
  applyNodeChanges,
  applyEdgeChanges,
  Viewport,
} from "reactflow";

interface AppState {
  minimalistic: boolean;
  lightTheme: boolean;
  selectedNodeId: string | null;
  hoveredNodeId: string | null;
  selectedEdgeId: string | null;
  hoveredEdgeId: string | null;
  nodes: Node[];
  edges: Edge[];
  viewport: Viewport;
  isSheetOpen: boolean;
}

const initialNodes: Node[] = [
  {
    id: "1",
    type: "custom",
    position: { x: 100, y: 100 },
    data: {
      label: "Start",
      color: "rgb(34 197 94)",
      sourceHandle: true,
      targetHandle: false,
      icon: "Play",
    },
  },
  {
    id: "2",
    type: "custom",
    position: { x: 400, y: 200 },
    data: {
      label: "Node 2",
      color: "rgb(234 179 8)",
      sourceHandle: true,
      targetHandle: true,
      icon: "Activity",
    },
  },
  {
    id: "3",
    type: "custom",
    position: { x: 700, y: 100 },
    data: {
      label: "End",
      color: "rgb(239 68 68)",
      sourceHandle: false,
      targetHandle: true,
      icon: "Square",
    },
  },
];

const initialEdges: Edge[] = [
  { id: "e1-2", source: "1", target: "2", type: "custom" },
  { id: "e2-3", source: "2", target: "3", type: "custom" },
  { id: "e1-3", source: "1", target: "3", type: "custom" },
];

const initialState: AppState = {
  minimalistic: false,
  lightTheme: false,
  selectedNodeId: null,
  hoveredNodeId: null,
  selectedEdgeId: null,
  hoveredEdgeId: null,
  nodes: initialNodes,
  edges: initialEdges,
  viewport: { x: 0, y: 0, zoom: 1 },
  isSheetOpen: false,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    toggleMinimalistic: (state) => {
      state.minimalistic = !state.minimalistic;
    },
    toggleLightTheme: (state) => {
      state.lightTheme = !state.lightTheme;
    },
    setSelectedNodeId: (state, action: PayloadAction<string | null>) => {
      state.selectedEdgeId = null;
      state.selectedNodeId = action.payload;
    },
    setHoveredNodeId: (state, action: PayloadAction<string | null>) => {
      state.hoveredNodeId = action.payload;
    },
    setSelectedEdgeId: (state, action: PayloadAction<string | null>) => {
      state.selectedEdgeId = action.payload;
    },
    setHoveredEdgeId: (state, action: PayloadAction<string | null>) => {
      state.hoveredEdgeId = action.payload;
    },
    setNodes: (state, action: PayloadAction<Node[]>) => {
      state.nodes = action.payload;
    },
    updateNodes: (state, action: PayloadAction<NodeChange[]>) => {
      state.nodes = applyNodeChanges(action.payload, state.nodes);
    },
    updateEdges: (state, action: PayloadAction<EdgeChange[]>) => {
      state.edges = applyEdgeChanges(action.payload, state.edges);
    },
    setEdges: (state, action: PayloadAction<Edge[]>) => {
      state.edges = action.payload;
    },
    setZoom: (state, action: PayloadAction<number>) => {
      state.viewport = { ...state.viewport, zoom: action.payload };
    },
    zoomIn: (state) => {
      state.viewport = { ...state.viewport, zoom: state.viewport.zoom + 0.1 };
    },
    zoomOut: (state) => {
      state.viewport = { ...state.viewport, zoom: state.viewport.zoom - 0.1 };
    },
    addNewNode: (state) => {
      const newNode: Node = {
        id: `${state.nodes.length + 1}`,
        type: "custom",
        position: { x: Math.random() * 500, y: Math.random() * 500 },
        data: {
          label: `Node ${state.nodes.length + 1}`,
          color: "rgb(107 114 128)",
          sourceHandle: true,
          targetHandle: true,
          icon: "Circle",
        },
      };
      state.nodes.push(newNode);
    },
    setViewport: (state, action: PayloadAction<Viewport>) => {
      if (action.payload.x !== undefined) {
        state.viewport.x = action.payload.x;
      }
      if (action.payload.y !== undefined) {
        state.viewport.y = action.payload.y;
      }
      if (action.payload.zoom !== undefined) {
        state.viewport.zoom = action.payload.zoom;
      }
    },
    setIsSheetOpen: (state, action: PayloadAction<boolean>) => {
      state.isSheetOpen = action.payload;
    },
  },
});

export const {
  toggleMinimalistic,
  toggleLightTheme,
  setSelectedNodeId,
  setHoveredNodeId,
  setNodes,
  updateNodes,
  updateEdges,
  setEdges,
  setSelectedEdgeId,
  setHoveredEdgeId,
  setZoom,
  zoomIn,
  zoomOut,
  addNewNode,
  setViewport,
  setIsSheetOpen,
} = appSlice.actions;

const store = configureStore({
  reducer: {
    app: appSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
