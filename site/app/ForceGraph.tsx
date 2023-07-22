"use client"

import { useEffect, useState, useRef } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import { ForceGraphMethods } from 'react-force-graph-2d';

import DraggableModal from './DraggableModal';
import data from '../data/nodes';

const NODE_REL_SIZE = 4;




export default function ForceGraph() {

    const [graphHeight, setGraphHeight] = useState(window.innerHeight * 0.7);
    const [graphWidth, setGraphWidth] = useState(window.innerWidth);
    const [showModal, setShowModal] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalDescription, setModalDescription] = useState('');

    const forceGraphRef = useRef();

    // Setup function
    useEffect(() => {
        // Enable resizing
        function handleResize() {
            setGraphHeight(window.innerHeight * 0.7);
            setGraphWidth(window.innerWidth);
        }
        window.addEventListener('resize', handleResize);

        if (forceGraphRef.current) {
            let fg: ForceGraphMethods = forceGraphRef.current;
            // fg.d3Force('center', forceCenter(10));
            // fg.d3Force('link', null);
        }


    }, []);

    return (
        <>
            <DraggableModal isOpen={showModal} onClose={() => setShowModal(false)} title={modalTitle} description={modalDescription} />
            <ForceGraph2D
                graphData={data}
                ref={forceGraphRef}
                enableZoomInteraction={false}
                enablePanInteraction={false}
                nodeRelSize={NODE_REL_SIZE}
                minZoom={10}
                nodeColor={() => '#006596'}
                height={graphHeight}
                width={graphWidth}
                onEngineTick={() => {
                    if (!forceGraphRef.current) {
                        return
                    }
                    const container: ForceGraphMethods = forceGraphRef.current;
                    data.nodes.forEach((node: any) => {
                        const coordinates = container.graph2ScreenCoords(node.x, node.y);
                        const boxWidth = graphWidth;
                        const boxHeight = graphHeight;
                        const nodeRadius = NODE_REL_SIZE * node.val;
                        const margin = 15; // how to get node radius? If we can get it we don't need margin

                        // right boundary
                        if (coordinates.x > (boxWidth - nodeRadius - margin)) {
                            const desiredScreenX = boxWidth - nodeRadius - margin;
                            const graphUnits = container.screen2GraphCoords(desiredScreenX, node.y);
                            node.x = graphUnits.x;
                        }

                        // left boundary
                        if (coordinates.x < 0 + nodeRadius + margin) {
                            const desiredScreenX = nodeRadius + margin;
                            const graphUnits = container.screen2GraphCoords(desiredScreenX, node.y);
                            node.x = graphUnits.x;
                        }

                        // bottom boundary
                        if (coordinates.y > (boxHeight - nodeRadius - margin)) {
                            const desiredScreenY = boxHeight - nodeRadius - margin;
                            const graphUnits = container.screen2GraphCoords(node.x, desiredScreenY);
                            node.y = graphUnits.y;
                        }

                        // top boundary
                        if (coordinates.y < 0 + nodeRadius + margin) {
                            const desiredScreenY = nodeRadius + margin;
                            const graphUnits = container.screen2GraphCoords(node.x, desiredScreenY);
                            node.y = graphUnits.y;
                        }
                    });
                }}
                onNodeHover={(node, prevNode) =>  {
                    // Node is being hovered
                    if (node?.val) {
                        node.originalVal = node.val;
                        node.val = node.val + node.val * 0.25;
                        document.body.style.cursor = 'pointer';

                        // Freeze the node
                        if (node.vx &&  node.vy) {
                            node.vx = 0;
                            node.vy = 0;
                        }
                    }

                    // Node is no longer hovered
                    if (prevNode) {
                        prevNode.val = prevNode.originalVal;
                        document.body.style.cursor = 'default';

                        if (forceGraphRef.current) {
                            let fg: ForceGraphMethods = forceGraphRef.current;
                            fg.d3ReheatSimulation();
                        }
                    }
                }}
                nodeCanvasObject={(node, ctx, globalScale) => {
                    const label = node.text;
                    const fontSize = 14/globalScale * node.val**(1/4);
                    let fontSelect = document.querySelector('.font-sourceSans');
                    let fontComputedStyle;
                    let fontName;
                    if (fontSelect) {
                        fontComputedStyle = getComputedStyle(fontSelect);
                    }
                    if (fontComputedStyle) {
                        fontName = fontComputedStyle.getPropertyValue('--font-source-sans');
                    }
                    ctx.font = `200 ${fontSize}px ${fontName}`;
                    

                    // Slightly improves clarity
                    ctx.imageSmoothingEnabled = true;

                    // center of the circle
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillStyle = '#FFFFFF';
                    ctx.fillText(label, node.x || 0, node.y || 0);
                }}
                nodeCanvasObjectMode={() => 'after'}
                onNodeClick={(node) => {
                    setModalTitle(node.title);
                    setModalDescription(node.description);
                    setShowModal(true);
                }}
            />
        </>
    )
}