import React, { Component } from 'react';

class Placeholder extends Component {
    render() {
        const { width, height, top, left } = this.props;
        return (
            <div
                className="placeholder"
                style={{
                    top: `${top}px`,
                    left: `${left}px`,
                    width: `${width}px`,
                    height: `${height}px`
                }}
            >
                <div className="placeholder-inner" />
            </div>
        );
    }
}

export default Placeholder;
