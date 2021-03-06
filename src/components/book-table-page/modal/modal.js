import React from 'react';
import { Link } from 'react-router-dom';
import './modal.css'

const Modal = props => {
    const activeClassName = props.show
        ? 'modal-book--active'
        : 'modal-book--disabled';
    return (
        <div className={`modal-book ${activeClassName}`}>
            <article className="modal-book__content">
                <h2 className="heading">Thank you</h2>
                <p className="modal-book__text text-center">
                    Thank you for booking reservation. Detailed information will be send
                    to restourant-owner email address.
                </p>
                <Link to="/">
                    <button className="site-header__btn">Continue</button>
                </Link>
            </article>
        </div>
    );
};

export default Modal;
