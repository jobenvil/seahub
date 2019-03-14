import React from 'react';
import PropTypes from 'prop-types';
import { gettext } from '../../utils/constants';

const propTypes = {
  scrollToNode: PropTypes.func.isRequired,
  isViewer: PropTypes.bool.isRequired,
  document: PropTypes.object.isRequired,
  editor: PropTypes.object.isRequired,
};

class OutlineItem extends React.PureComponent {

  constructor(props) {
    super(props);
  }

  onClick = (event) => {
    this.props.scrollToNode(this.props.node);
  }

  render() {
    const node = this.props.node;
    var c;
    if (node.type === 'header_two') {
      c = 'outline-h2';
    } else if (node.type === 'header_three') {
      c = 'outline-h3';
    }
    c = c + this.props.active;

    return (
      <div className={c} key={node.key} onClick={this.onClick}>{node.text}</div>
    );
  }
}

class OutlineView extends React.PureComponent {

  render() {
    const document = this.props.document;
    var headerList = document.nodes.filter(node => {
      return (node.type === 'header_two' || node.type === 'header_three');
    });

    return (
      <div className="seafile-editor-outline">
        {headerList.size > 0 ?
        headerList.map((node, index) => {
          let active = (index === this.props.activeTitleIndex) ? ' active' : ''; 
          return (
            <OutlineItem
              key={node.key}
              editor={this.props.editor}
              value={this.props.value}
              node={node}
              active={active}
              scrollToNode={this.props.scrollToNode}
            />
          );
        }) : <div className={'size-panel-no-content'}>{gettext('No out line.')}</div>}
      </div>
    );
  }

}

OutlineView.propTypes = propTypes;

export default OutlineView;