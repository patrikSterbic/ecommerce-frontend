import React, { PureComponent } from 'react';

// styles
import classes from './Modal.css';

// components
import Aux from '../../../hoc/_Aux/_Aux';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends PureComponent {
  render() {
    return (
      <Aux>
        <Backdrop show={this.props.show} clicked={this.props.modalClosed}/>
          <div 
            className={classes.Modal}
            style={{
              transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
              opacity: this.props.show ? '1' : '0'
            }}
          >
            {this.props.children}
          </div>
      </Aux>
    );
  }
}

export default Modal;