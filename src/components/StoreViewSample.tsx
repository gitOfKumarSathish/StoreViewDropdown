import React from 'react';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import { annotationSample } from '../assets/data';

const RichObjectTreeView = () => {

    console.log('annotationSample', annotationSample);


    function parentNodeHandler(nodes: any) {
        let parentNodes: any = [];
        return nodes?.map((node: any) => {
            console.log('node', node);
            parentNodes.push(Object.keys(node)[0]);

            return parentNodes.map((x: string | number, index: string | undefined) => {
                console.log('asasas', node[x]);
                return localArray(x, null, index);
            });
            // return (
            //     <div>
            //         {node[Object.keys(node)].map((x: any) => {
            //             console.log('x', x);
            //             return localArray(x, Object.keys(node));
            //         })}
            //     </div>
            // );
        });
    }


    const renderTree = (nodes: any) => (
        <>
            {

                parentNodeHandler(nodes)
            }
        </>
    );

    const localArray = (node: any, name = '', index = 0) => {
        // console.log('node', node);
        console.log('objectName', node, name, index);
        return (<TreeItem nodeId={(node?.id || index)?.toString()} label={name || node.name} key={(node?.id || index)?.toString()}>
            {/* {console.log('Array.isArray(node.annotation)', Array.isArray(node.annotation))} */}
            {Array.isArray(node.annotation)
                ? node.annotation.map((childNode: any) => {
                    console.log('childNode', Object.keys(node) && typeof node.annotation === 'object');
                    return localArray(childNode,);
                })
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
            {renderTree(annotationSample)}
        </TreeView>
        // <>

        //     {renderTree(annotationSample)}
        // </>
    );


};

export default React.memo(RichObjectTreeView)



