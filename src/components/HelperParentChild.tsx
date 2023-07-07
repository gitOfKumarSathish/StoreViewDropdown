import React, { useEffect, useState } from 'react';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import { annotationSample, data } from '../assets/data';

interface Child {
    id: string;
    name: string;
    children?: Child[];
}

interface Device {
    id: string;
    name: string;
    children?: Child[];
}

const HelperParentChild = () => {
    const [deviceNodes, setDeviceNodes] = useState<Device[]>([]);

    useEffect(() => {
        const transformData = (annotations: any[]) => {
            const transformedNodes: Device[] = [];

            annotations.forEach((annotation) => {
                for (const key in annotation) {
                    const elements = annotation[key];
                    const children: Child[] = [];

                    elements.forEach((element: any) => {
                        const child: Child = {
                            id: element.id.toString(),
                            name: element.name,
                            children: element.annotation || [],
                        };

                        for (const field in element) {
                            if (field !== 'id' && field !== 'name' && field !== 'annotation') {
                                child[field] = element[field];
                            }
                        }

                        children.push(child);
                    });

                    const deviceNode: Device = {
                        id: key,
                        name: key,
                        children,
                    };

                    for (const field in annotation) {
                        if (field !== key) {
                            deviceNode[field] = annotation[field];
                        }
                    }

                    transformedNodes.push(deviceNode);
                }
            });
            console.log('transformedNodes', transformedNodes);
            return transformedNodes;
        };

        const transformedNodes = transformData(annotationSample);
        setDeviceNodes(transformedNodes);
    }, []);

    const renderTree = (nodes: Device | Child) => (
        <TreeItem key={nodes.id} nodeId={nodes.id} label={`${nodes.name} - ${nodes.id}`}>
            {Object.entries(nodes).map(([key, value]) => {
                if (key !== 'id' && key !== 'name' && key !== 'children') {
                    return (
                        <TreeItem key={`${nodes.id}-${key}`} nodeId={`${nodes.id}-${key}`} label={`${key}: ${value}`} />
                    );
                }
                return null;
            })}
            {Array.isArray(nodes.children)
                ? nodes.children.map((node) => renderTree(node))
                : null}
        </TreeItem>
    );

    return (
        <TreeView
            aria-label="Store View"
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
        >
            {deviceNodes.map((node) => renderTree(node))}
        </TreeView>
    );
};

export default React.memo(HelperParentChild);
