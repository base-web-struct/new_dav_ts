import { Component } from 'react'
import { DropTarget as Target } from 'react-dnd'
import { uniqueId } from 'lodash'
import ItemTypes from './ItemTypes'
import './DragTarget.less'

interface DragTargetProps {
    connectDropTarget: any,
    item: any
}

interface DragTargetState {
    items: any[]
}

class DragTarget extends Component<DragTargetProps, DragTargetState> {
    public readonly state: Readonly<DragTargetState> = {
        items: []
    }

    constructor (props: any) {
        super(props)
    }

    public dropItem = (item) => {
        this.setState({
            items: [...this.state.items, item]
        })
    }

    public render () {
        const { connectDropTarget } = this.props
        return connectDropTarget(
            <div className="drag-target">
                {
                    this.state.items.map((item: any) => (<div className="item" key={ uniqueId() }>{item.name}</div>))
                }
            </div>
        )
    }
}

const targetSpec = {
    drop: (props: any, monitor: any, component: any) => {
        const item = monitor.getItem()
        component.dropItem(item)
    }
}

const collect = (connect, monitor) => ({
    connectDropTarget: connect.dropTarget()
})

export default Target(ItemTypes.SOURCE, targetSpec, collect)(DragTarget)