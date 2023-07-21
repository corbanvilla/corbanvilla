"use client"

import { useEffect, useState } from 'react';
import ForceGraph2D from 'react-force-graph-2d';

export default function ForceGraph() {

    const [graphHeight, setGraphHeight] = useState(window.innerHeight * 0.7);
    const [graphWidth, setGraphWidth] = useState(window.innerWidth);

    useEffect(() => {
        function handleResize() {
            setGraphHeight(window.innerHeight * 0.7);
            setGraphWidth(window.innerWidth);
        }

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const data = {
        nodes: [
            // Creative
            { 
                "id": "1",
                "name": "Click me",
                "text": "The Gazelle",
                "val": 10 
            },
            { 
                "id": "2",
                "name": "Click me",
                "text": "Louvre Abu Dhabi",
                "val": 5 
            },
            // Cybersecurity
            {
                "id": "3",
                "name": "Click me",
                "text": "Bluetooth Hacking",
                "val": 4
            },
            {
                "id": "4",
                "name": "Click me",
                "text": "Container Hacking",
                "val": 7
            },
            {
                "id": "5",
                "name": "Click me",
                "text": "Copilot Hacking",
                "val": 10
            },
            // SWE
            {
                "id": "6",
                "name": "Click me",
                "text": "Facial Recognition",
                "val": 10
            },
            // Blockchain
            {
                "id": "7",
                "name": "Click me",
                "text": "Smart Contracts",
                "val": 4
            },
        ],
        links: [
            // Creative
            {
                "source": "1",
                "target": "2"
            },
            // Cybersecurity
            {
                "source": "3",
                "target": "4"
            },
            {
                "source": "3",
                "target": "5"
            },
            {
                "source": "4",
                "target": "5"
            },
            // SWE -> Blockchain
            {
                "source": "6",
                "target": "7"
            },
            // SWE -> Gazelle
            {
                "source": "6",
                "target": "1"
            },
            // SWE -> Container Hacking
            {
                "source": "6",
                "target": "4"
            },
        ],
    };

    return (
        <>
            <ForceGraph2D
                graphData={data}
                enableZoomInteraction={false}
                enablePanInteraction={false}
                // nodeRelSize={10}
                minZoom={10}
                nodeColor={() => '#006596'}
                height={graphHeight}
                width={graphWidth}
                onNodeHover={(node, prevNode) =>  {
                    if (node?.val) {
                        node.originalVal = node.val;
                        node.val = node.val + node.val * 0.25;
                        document.body.style.cursor = 'pointer';
                    }

                    if (prevNode) {
                        prevNode.val = prevNode.originalVal;
                        document.body.style.cursor = 'default';
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
            />
        </>
    )
}