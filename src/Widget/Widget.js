import React, { Component } from 'react';
import Header from './Header';

class Widget extends Component {
    render() {
        const { scale, size, width, height, title } = this.props;
        return (
            <div className={`tile col col_${scale} chart_${size}`}>
                <div
                    className="widget widget--with_title"
                    ref={el => (this.innerWidget = el)}
                >
                    <Header title={title} />
                    <div className="content">
                        <div
                            className="layer_container"
                            style={{
                                width: `${width}px`,
                                height: `${height}px`
                            }}
                        />
                    </div>
                </div>
            </div>
        );
    }

    componentDidMount() {
        this.props.onLoad(this.innerWidget);
    }
}

export default Widget;
