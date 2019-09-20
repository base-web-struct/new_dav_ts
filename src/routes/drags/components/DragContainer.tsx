import { Component } from 'react'
import DragSoruce from './DragSource'
import DragTarget from './DragTargetContainer'
import './DragContainer.less'

class DragContainer extends Component<{}, {}> {
    public render() {
        return (
            <div className="drag-container">
                <div className="sources">
                    <DragSoruce name="资产名称"/>
                    <DragSoruce name="资产类型"/>
                    <DragSoruce name="申请单号"/>
                    <DragSoruce name="申请人"/>
                    <DragSoruce name="盒子"/>
                </div>
                <div className="targets">
                    <DragTarget/>
                </div>
            </div>
        )
    }
}

export default DragContainer