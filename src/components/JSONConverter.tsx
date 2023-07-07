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


// const annotationSample = [
//     {
//         "device1": [ // level 1
//             {
//                 "id": "1", // level 2
//                 "bt": 123,
//                 "tt": 456,
//                 "name": "Sub device1",
//                 "annotation": [  // level 2
//                     {
//                         "name": "templ", // level 3
//                         "bt": 1,
//                         "tt": 2,
//                         "id": 5,
//                     },
//                     {
//                         "name": "temp2", // level 3
//                         "bt": 12,
//                         "tt": 21,
//                         "id": 6,
//                     }
//                 ]
//             }
//         ],
//         "device2": [ // level 1
//             {
//                 "id": "1", // level 2
//                 "bt": 123,
//                 "tt": 456,
//                 "name": "Sub device1",
//                 "annotation": [  // level 2
//                     {
//                         "name": "templ", // level 3
//                         "bt": 1,
//                         "tt": 2,
//                         "id": 5,
//                     },
//                     {
//                         "name": "temp2", // level 3
//                         "bt": 12,
//                         "tt": 21,
//                         "id": 6,
//                     }
//                 ]
//             }
//         ]// level 2
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




let deviceNode = [];
const RichObjectTreeView = () => {
    const [nodeCollection, setNodeCollection] = useState<any>(annotationSample);
    const [outp, setOutp] = useState([]);
    useEffect(() => {
        nodeCollection.map((annotation) => {
            for (const key in annotation) {
                const element = annotation[key];
                console.log('element: ', key, element);
                let captureChild: any = [];
                const sampleObject: any = {
                    id: Math.floor(Math.random() * 10000),
                    name: key,
                    children: captureChild
                };
                const checkSubChildExist = Array.isArray(element);
                if (checkSubChildExist) {
                    let captureSubs: any = [];
                    for (const ele in element[0]) {
                        const kk = element[0][ele];
                        const childObject: any = {
                            id: Math.floor(Math.random() * 10000),
                            name: ele,
                            children: captureSubs
                        };
                        captureChild.push(childObject);
                        console.log('childObject', childObject);
                        const level2Sub = Array.isArray(kk);
                        if (level2Sub) {
                            console.log('available level', kk);
                            childObject.children = kk;
                            // captureSubs.push([...kk]);
                            captureSubs = kk;
                        }
                    }
                }
                setOutp(prev => [{ ...prev, ...sampleObject }]);
                deviceNode.push(sampleObject);
                console.log('sampleObject', sampleObject);
            }
            return;
        });
    }, [nodeCollection]);



    const localArray = (node: Child) => {
        return (<TreeItem nodeId={node.id.toString()} label={node.name} key={node.id}>
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
            {deviceNode?.map((node: Device) => {
                return localArray(node);
            })}
        </TreeView>
    );
};

export default React.memo(RichObjectTreeView)



