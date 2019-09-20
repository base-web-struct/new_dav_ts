import React, { Component } from 'react';
import { DropTarget, DragSource } from 'react-dnd';
import ItemTypes from './ItemTypes';
import './DragItem.less';

interface DragItemProps {
    active: boolean;    
    index: number;
    name: string;
    exchangeItem: (target: number, source: number) => void;
    onActive: (index: number) => void;
    connectDragSource: any;
    connectDropTarget: any;
    isDragging: boolean;
}

class DragItem extends Component<DragItemProps> {
  public ref: React.RefObject<HTMLDivElement>;
  public constructor(props: any) {
    super(props);
    this.ref = React.createRef();
  }

  public active = () => {
      this.props.onActive(this.props.index)
  }

  public render() {
    const { connectDragSource, connectDropTarget, isDragging } = this.props;
    const opacity = isDragging ? 0.2 : 1;

    return connectDropTarget(
      connectDragSource(
        <div className={`item ${this.props.active ? 'active' : ''}`}
          onClick={this.active}
          ref={this.ref}
          style={{ opacity }}>
          {this.props.name}
        </div>,
      ),
    );
  }
}

// drag source
const sourceSpec = {
  beginDrag: (props: any) => ({
    name: props.name,
    index: props.index,
  }),
};

const sourceCollect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
});

// drop target
const targetSpec = {
  hover: (props, monitor, component) => {
    const item = monitor.getItem();
    const itemType = monitor.getItemType()

    if (props.index === item.index) {
      return;
    }

    const hoverBoundingRect = component.ref.current.getBoundingClientRect();

    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
    const hoverClientY = monitor.getClientOffset().y - hoverBoundingRect.top;

    if ((props.index > item.index && hoverMiddleY > hoverClientY)
        || (props.index < item.index && hoverMiddleY < hoverClientY)) {
      return;
    }

    props.exchangeItem(item.index, props.index);

    itemType === ItemTypes.INTERNAL && (item.index = props.index)
  },
};

const targetCollect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
});

const sourceWrapper = DragSource(ItemTypes.INTERNAL, sourceSpec, sourceCollect);
const targetWrapper = DropTarget([ItemTypes.INTERNAL, ItemTypes.EXTERNAL], targetSpec, targetCollect);

export default targetWrapper(sourceWrapper(DragItem));
