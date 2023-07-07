import React, { useEffect, useState } from 'react';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import { data } from '../assets/data';


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


const annotationSample = [
    {
        "device1": [ // level 1
            {
                "id": "1", // level 2
                "bt": 123,
                "tt": 456,
                "name": "Sub device1",
                "annotation": [  // level 2
                    {
                        "name": "templ", // level 3
                        "bt": 1,
                        "tt": 2,
                        "id": 5,
                    },
                    {
                        "name": "temp2", // level 3
                        "bt": 12,
                        "tt": 21,
                        "id": 6,
                    }
                ]
            }
        ]
    }
];




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
    const [nodeCollection, setNodeCollection] = useState<any>({});
    useEffect(() => {
        console.log('annotationSample', annotationSample);
        annotationSample.map((annotation) => {
            const checkSubChildExist = Array.isArray(annotation[Object.keys(annotation)]);
            console.log('annotation', annotation);
            console.log('boolean', checkSubChildExist);
            console.log('annotation[Object.keys(annotation)', annotation[Object.keys(annotation)]);
            passerFunction(Object.keys(annotation)[0], checkSubChildExist);
            // console.log('annotation', Object.keys(annotation));
        });
    }, []);

    const passerFunction = (node: string, subChild: boolean) => {
        const sampleObject: any = {
            id: Math.floor(Math.random() * 100),
            name: node
        };
        if (subChild) {
            sampleObject['children'] = {

            };
        }
        setNodeCollection((prevState: any) => [{ ...prevState, ...sampleObject }]);
        console.log('sampleObject', sampleObject);

    };

    console.log('nodeCollection', nodeCollection);

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
            {mainer?.map((node: Device) => {
                return localArray(node);
            })}
        </TreeView>
    );
};

export default React.memo(RichObjectTreeView)



