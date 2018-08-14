import React, { Component } from 'react';
import { SortableContainer, arrayMove } from 'react-sortable-hoc';
import Widget from './Widget';

const WIDTHS = {
    xs: 157,
    s: 235,
    m: 313,
    l: 470,
    xl: 940
};

class WidgetContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            size: 'm',
            scale: 6,
            scaling: 6 / 4 // x 940 = reference page width, used in tile sizing.
        };
    }

    resize(size) {
        const containerDimensions = document
            .querySelector('.root-drag-container')
            .getBoundingClientRect();
        let minWidth = WIDTHS[size] || WIDTHS.m;
        minWidth *= this.state.scaling;

        let chartsPerRow = Math.floor(containerDimensions.width / minWidth) || 1;
        chartsPerRow = Math.min(chartsPerRow, 6);
        const scale = Math.floor(12 / chartsPerRow);

        if (this.state.scale !== scale) {
            this.setState({
                scale,
                size
            });
        }
    }

    render() {
        const { widgets } = this.props;
        return (
            <div>
                <span className="tile_sizes tool_buttons">
                    <button
                        className="button left"
                        onClick={() => this.resize('xs')}
                    >
                        XS
                    </button>
                    <button
                        className="button middle"
                        onClick={() => this.resize('s')}
                    >
                        S
                    </button>
                    <button
                        className="button middle active"
                        onClick={() => this.resize('m')}
                    >
                        M
                    </button>
                    <button
                        className="button middle"
                        onClick={() => this.resize('l')}
                    >
                        L
                    </button>
                    <button
                        className="button right"
                        onClick={() => this.resize('xl')}
                    >
                        XL
                    </button>
                </span>
                <div className="root-drag-container">
                    <div className="drag-container">
                        <div className="row">
                            {widgets.map((widget, index) => (
                                <Widget
                                    key={widget.id}
                                    index={index}
                                    title={widget.title}
                                    size={this.state.size}
                                    scale={this.state.scale}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const SortableWidgets = SortableContainer(WidgetContainer);

class SortableComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            widgets: props.widgets,
            activeIndex: -1
        };
    }

    onSortEnd = ({ oldIndex, newIndex }) => {
        document.body.classList.remove('moving');
        this.setState({
            widgets: arrayMove(this.state.widgets, oldIndex, newIndex),
            activeIndex: -1
        });
    };

    onSortStart = ({ index }) => {
        console.log(`sort start ${index}`);
        document.body.classList.add('moving');
        this.setState({
            activeIndex: index
        });
    };

    render() {
        return (
            <SortableWidgets
                activeIndex={this.state.activeIndex}
                widgets={this.state.widgets}
                onSortStart={this.onSortStart}
                onSortEnd={this.onSortEnd}
                axis={'xy'}
                useWindowAsScrollContainer={true}
                transitionDuration={500}
                hideSortableGhost={true}
                useDragHandle={true}
            />
        );
    }
}

export default SortableComponent;
