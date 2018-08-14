import React, { Component } from 'react';
import { SortableElement } from 'react-sortable-hoc';
import Widget from './Widget';
import Placeholder from './Placeholder';

const SortableWidget = SortableElement(Widget);

const WIDGET_DIM_OPTIONS = {
    xs: {
        height: 80
    },
    s: {
        height: 120
    },
    m: {
        height: 170
    },
    l: {
        height: 300
    },
    xl: {
        height: 300
    }
};

class WidgetContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            width: 412,
            placeholderTop: 0,
            placeholderLeft: 0,
            placeholderWidth: 0,
            placeholderHeight: 0
        };
    }

    componentWillUpdate() {
        if (this.widget && this.placeholder) {
            const widgetDims = this.widget.getBoundingClientRect();

            const {
                placeholderTop,
                placeholderLeft,
                placeholderWidth,
                placeholderHeight
            } = this.state;

            const newPlaceholderTop = widgetDims.top + window.scrollY;
            const newPlaceholderLeft = widgetDims.left + window.scrollX;
            if (
                newPlaceholderTop !== placeholderTop ||
                newPlaceholderLeft !== placeholderLeft ||
                widgetDims.width !== placeholderWidth ||
                widgetDims.height !== placeholderHeight
            ) {
                this.setState({
                    placeholderHeight: widgetDims.height,
                    placeholderWidth: widgetDims.width,
                    placeholderTop: newPlaceholderTop,
                    placeholderLeft: newPlaceholderLeft
                });
            }
        }
    }

    componentDidUpdate() {
        const dims = document.querySelector('.widget').getBoundingClientRect();
        if (dims.width !== this.state.width) {
            this.setState({
                width: dims.width
            });
        }
    }

    render() {
        const { index, title, scale = 6, size = 'm' } = this.props;
        const { height } = WIDGET_DIM_OPTIONS[size];
        const {
            width,
            placeholderTop,
            placeholderLeft,
            placeholderWidth,
            placeholderHeight
        } = this.state;

        return (
            <div>
                <Placeholder
                    ref={el => (this.placeholder = el)}
                    top={placeholderTop}
                    left={placeholderLeft}
                    width={placeholderWidth}
                    height={placeholderHeight}
                />
                <SortableWidget
                    onLoad={el => (this.widget = el)}
                    index={index}
                    title={title}
                    scale={scale}
                    size={size}
                    width={width}
                    height={height}
                />
            </div>
        );
    }
}

export default WidgetContainer;
