import { Component } from 'react'
import { DragSource as Source } from 'react-dnd'
import ItemTypes from './ItemTypes'
import './DragSource.less'

interface DragSourceProps {
    name: string,
    collector: any,
    connectDragSource: any
}

class DragSource extends Component<DragSourceProps, any> {
    public static defaultProps = {
        collector: {}
    }

    constructor (props: any) {
        super(props)
    }

    public render() {
        const { collector, connectDragSource} = this.props
        const opacity = collector.isDragging ? 0.1 : 1
        return connectDragSource(
            <div className="item"
                style={{ opacity }}>
                {this.props.name}
            </div>
        )
    }
}

const sourceSpec = {
    beginDrag(props: any) {
      const item = { name: props.name }
      return item
    }
}

const collect = (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
})

export default Source(
    ItemTypes.SOURCE,
    sourceSpec,
    collect
)(DragSource)