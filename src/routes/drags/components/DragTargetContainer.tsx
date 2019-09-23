import { Component } from 'react'
import { DropTarget as Target } from 'react-dnd'
import update from 'immutability-helper'
import { uniqueId } from 'lodash';
import ItemTypes from './ItemTypes'
import DragItem from './DragItem'
import './DragTargetContainer.less'

interface DragTargetProps {
    connectDropTarget: any,
    item: any
}

interface DragTargetState {
    items: any[],
    dropIndex: number | undefined,
    activeIndex: number | undefined
}

class DragTargetContainer extends Component<DragTargetProps, DragTargetState> {
    public readonly state: Readonly<DragTargetState> = {
        items: [],
        dropIndex: undefined,
        activeIndex: undefined
    }

    constructor (props: any) {
        super(props)
    }

    public dropItem = (item: any) => {
        const items = this.state.items
        const index = this.state.dropIndex === undefined ? items.length : this.state.dropIndex

        items.splice(index, 0, { ...item, id: uniqueId() })

        this.setState({
            ...this.state,
            items,
            dropIndex: undefined,
            activeIndex: index,
        })
    }

    public exchangeItem = (source: number, target: number) => {
        if (source === undefined) {
            this.setState({
                dropIndex: target
            })
            return
        }

        const items = [ ...this.state.items ];
        const drag = items[source]
    
        this.setState({
            items: update(items, {
                $splice: [[source, 1], [target, 0, drag]]
            })
        })
    }

    public active = (index: number) => {
        this.setState({
            ...this.state,
            activeIndex: index
        })
    }

    public render () {
        const { connectDropTarget } = this.props
        const { activeIndex } = this.state
        return connectDropTarget(
            <div className="drag-target">
                {
                    this.state.items.map((item: any, index: number) => (
                        <DragItem key={item.id}
                            index={index}
                            name={item.name}
                            active = {activeIndex === index}
                            onActive={this.active}
                            exchangeItem = {this.exchangeItem}/>
                    ))
                }
            </div>
        )
    }
}

const targetSpec = {
    drop: (props: any, monitor: any, component: any) => {
        const item = monitor.getItem()
        item.index === undefined && component.dropItem(item)
    }
}

const targetCollect = (connect, monitor) => ({
    connectDropTarget: connect.dropTarget()
})

export default Target(ItemTypes.EXTERNAL, targetSpec, targetCollect)(DragTargetContainer)