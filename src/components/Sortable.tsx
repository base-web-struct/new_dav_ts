import React, { Component, RefObject } from 'react';
import SortableJS from 'sortablejs';

const store: any = {
    nextSibling: null,
    activeComponent: null
};

interface SortableProps {
  options: any
  onChange?: (items: any, instance: any, event: any) => void
  tag?: any
  style?: any
  className?: string
}

class Sortable extends Component<SortableProps> {
    public static defaultProps = {
        options: {},
        tag: 'div',
        style: {}
    };

    private sortable: any = null;
    private node: RefObject<any>

    constructor (props: any) {
        super(props)
    }

    public componentDidMount() {
        const options = { ...this.props.options };

        [
            'onChoose',
            'onStart',
            'onEnd',
            'onAdd',
            'onUpdate',
            'onSort',
            'onRemove',
            'onFilter',
            'onMove',
            'onClone'
        ].forEach((name) => {
            const eventHandler = options[name];

            options[name] = (...params) => {
                const [evt] = params;

                if (name === 'onChoose') {
                    store.nextSibling = evt.item.nextElementSibling;
                    store.activeComponent = this;
                } else if ((name === 'onAdd' || name === 'onUpdate') && this.props.onChange) {
                    const items = this.sortable.toArray();
                    const remote = store.activeComponent;
                    const remoteItems = remote.sortable.toArray();

                    const referenceNode = (store.nextSibling && store.nextSibling.parentNode !== null) ? store.nextSibling : null;
                    evt.from.insertBefore(evt.item, referenceNode);
                    if (remote !== this) {
                        const remoteOptions = remote.props.options || {};

                        if ((typeof remoteOptions.group === 'object') && (remoteOptions.group.pull === 'clone')) {
                            // Remove the node with the same data-reactid
                            evt.item.parentNode.removeChild(evt.item);
                        }

                        remote.props.onChange && remote.props.onChange(remoteItems, remote.sortable, evt);
                    }

                    this.props.onChange && this.props.onChange(items, this.sortable, evt);
                }

                if (evt.type === 'move') {
                    const [evt, originalEvent] = params;
                    const canMove = eventHandler ? eventHandler(evt, originalEvent) : true;
                    return canMove;
                }

                setTimeout(() => {
                    eventHandler && eventHandler(evt);
                }, 0);
            };
        });

        this.sortable = SortableJS.create(this.node, options);
    }

    public shouldComponentUpdate(nextProps: SortableProps) {
        // If onChange is null, it is an UnControlled component
        // Don't let React re-render it by setting return to false
        if (!nextProps.onChange) {
            return false;
        }
        return true;
    }

    public componentWillUnmount() {
        if (this.sortable) {
            this.sortable.destroy();
            this.sortable = null;
        }
    }

    public render() {
        const {
            tag: Component,
            options,
            onChange,
            ...props
        } = this.props;

        return (
            <Component 
                {...props}
                ref={ (node: RefObject<any>) => {
                    this.node = node;
                }}
            />
        );
    }
}

export default Sortable;
