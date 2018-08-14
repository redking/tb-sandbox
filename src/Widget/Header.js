import React, { Component } from 'react';
import { SortableHandle } from 'react-sortable-hoc';

class Header extends Component {
    render() {
        return (
            <div className="react_header">
                <div className="toolbar">
                    <div className="controls">
                        <button
                            className="ui_form_button ui_form_button--sm ui_form_button--default ui_form_button--icon-only ui_form_button--borderless ui_form_button--knockout"
                            type="button"
                            aria-label="Edit this widget"
                            title="Edit this widget"
                        >
                            Edit
                        </button>
                    </div>
                </div>
                <header className="widget__header">
                    <div className="widget__title widget__title--no-overflow">
                        <div
                            className={`widget__title-text widget__title-text--no-overflow text-left`}
                            style={{ fontSize: `16px` }}
                        >
                            {this.props.title}
                        </div>
                    </div>
                </header>
            </div>
        );
    }
}

export default SortableHandle(Header);
