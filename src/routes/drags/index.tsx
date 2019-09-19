import { Component } from 'react'
import HTML5Backend from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
import DragContainer from './components/DragContainer'
import './index.less'

class DragsComponent extends Component<{}, {}> {

    public render () {
        return (
            <DndProvider backend={HTML5Backend}>
                <DragContainer/>
            </DndProvider>
        )
    }
}

export default DragsComponent