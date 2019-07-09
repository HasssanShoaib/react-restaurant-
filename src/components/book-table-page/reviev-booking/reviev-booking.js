import React, { Fragment, Component } from "react";
import { Link } from "react-router-dom";
import propTypes from "prop-types";
import contactInfo from "../contact-info";
import { splitDate, splitTime } from "../helpers";
import * as emailjs from "emailjs-com";
import Modal from "../modal/modal";
import "./style.css";

class ReviewBooking extends Component {
  state = {
    confirmed: false,
    show: false,
    location: {},
    hours: {}
  };

  render() {
    const query = new URLSearchParams(this.props.location.search);
    const { street, number, code, city, province } = contactInfo.info.location;
    const reservation = {};
    for (let param of query.entries()) {
      //Transforming data from array ["queryName", "queryValue"]
      // - to reservation object in format queryName:queryValue
      reservation[param[0]] = param[1];
    }

    const templateParams = {
      name: reservation.name,
      email: reservation.email
    };

    const sendEmail = () => {
      emailjs
        .send("user_deyepDmTaCWpYyN6YqTOa", "template_a175PJEL", templateParams)
        .then(
          response => {
            console.log("SUCCESS!", response.status, response.text);
          },
          err => {
            console.log("FAILED...", err);
          }
        );
    };

    const showModal = () => {
      this.setState({ show: true });
      const formData = new FormData();
      for (let key in reservation) {
        formData.append(key, reservation[key]);
      }

      fetch("http://localhost:5000/reservation/0", {
        method: "POST",
        body: formData
      }).then(function(response) {
        console.log(response);
      });
    };

    return (
      <Fragment>
        <Modal show={this.state.show} />
        <Link to="/">
          <h1 className="heading review-booking__title">{contactInfo.name}</h1>
        </Link>
        <article className="review-booking" onLoad={sendEmail}>
          <p className="review-booking__address">
            {street} {number}
          </p>
          <p className="review-booking__address">
            {city}, {province}, {code}{" "}
          </p>
          <p className="review-booking__name">
            <span>{reservation.name}</span> reservation
          </p>
          <div className="row">
            <div className="col-sm-4">
              <p className="review-booking__value">{reservation.people}</p>
              <p className="review-booking__description">Guests</p>
            </div>
            <div className="col-sm-4">
              <p className="review-booking__value">
                {splitDate(reservation.date)}
              </p>
              <p className="review-booking__description">Date</p>
            </div>
            <div className="col-sm-4">
              <p className="review-booking__value">
                {splitTime(reservation.date)}
              </p>
              <p className="review-booking__description">Time</p>
            </div>
          </div>
          <footer className="review-booking__footer text-center">
            <Link to="/book-table">
              <button className="site-header__btn site-header__btn--reverse">
                Back to booking
              </button>
            </Link>
            <button className="site-header__btn" onClick={showModal}>
              Confirm Reservation
            </button>
          </footer>
        </article>
      </Fragment>
    );
  }
}

ReviewBooking.propTypes = {
  location: propTypes.shape({
    pathname: propTypes.string,
    search: propTypes.string
  })
};

export default ReviewBooking;
