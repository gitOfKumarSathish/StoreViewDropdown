import React from 'react';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import { data } from '../assets/data';

interface RenderTree {
    id: string;
    name: string;
    children?: readonly RenderTree[];
}


// {
//     device1
//   - session1
//          - annotation1
//          - annot2
//   - session2

//  device2
//   - session1

//  device3


//  [
//  device1: [session1: [annot1, annot2], sess2:{}]
//   device1:


//  ]
// }
// const local = {
//     // name: 'Parent',
//     // children: ['Child - 1', 'Child - 2', 'Child - 3'],
//     'parent1': ['Child - 1', 'Child - 2', 'Child - 3' : ['child - 4', 'child - 5']],
// };

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

// [
//     {
//         []
//     },
//     {

//     }
// ];

const mainer: Device[] = [
    {
        id: 'device-1',
        name: 'device1',
        children: [
            {
                id: 'device-1.1',
                name: 'Child - 1',
                children: [
                    { id: 'device-1.1.1', name: 'Sub Child - 1' },
                    { id: 'device-1.1.2', name: 'Sub Child - 2' }
                ]
            },
            { id: 'device-1.2', name: 'Child - 2' }
        ]
    },
    {
        id: 'device-2',
        name: 'device1',
        children: [
            { id: 'device-2.1', name: 'Child - 1' },
            { id: 'device-2.2', name: 'Child - 2' }
        ]
    }
];





const RichObjectTreeView = () => {
    const renderTree = (nodes: Device[]) => (
        <>
            {nodes?.map((node: Device) => {
                return localArray(node);
            })}
        </>
    );

    const localArray = (node: Child) => {
        return (<TreeItem nodeId={node.id} label={node.name} key={node.id}>
            {Array.isArray(node.children)
                ? node.children.map((childNode: Child) => localArray(childNode))
                : null}
        </TreeItem>);
    };

    return (
        <TreeView
            aria-label="Store View"
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpanded={['root']}
            defaultExpandIcon={<ChevronRightIcon />}
        >
            {renderTree(mainer)}
        </TreeView>
    );
};

export default React.memo(RichObjectTreeView)



