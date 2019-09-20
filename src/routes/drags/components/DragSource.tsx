import { Component } from 'react';
import { DragSource as Source } from 'react-dnd';
import ItemTypes from './ItemTypes';
import './DragSource.less';

interface DragSourceProps {
  name: string;
  connectDragSource: any;
  isDragging: boolean;
}

class DragSource extends Component<DragSourceProps, any> {
  constructor(props: any) {
    super(props);
  }

  public render() {
    const { connectDragSource, isDragging } = this.props;
    const opacity = isDragging ? 0.3 : 1;
    return connectDragSource(
      <div className="item" style={{ opacity }}>
        {this.props.name}
      </div>
    );
  }
}

const sourceSpec = {
  beginDrag(props: any) {
    const item = { name: props.name };
    return item;
  }
};

const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
});

export default Source(ItemTypes.EXTERNAL, sourceSpec, collect)(DragSource);
