import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "../styles/Home.css";
// eslint-disable-next-line
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect,
} from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import { addLike, addLike1 } from "../actions/temple";
import { loadUser } from "../actions/auth";
import PropTypes from "prop-types";
import bucket from "../images/icons/bucket.png";
import visited from "../images/icons/visited.png";
// eslint-disable-next-line
import comment from "../images/icons/comment.png";
import { url } from "../Config";
import Loading from "./Loading";

const India = ({ addLike1, addLike, auth }) => {
  const [temples, setTemples] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTemples = async () => {
      const { data } = await axios.get(url + "/api/temple");
      setTemples(data);
      setIsLoading(false);
    };
    fetchTemples();
  }, []);

  const [visibleTemples, setvisibleTemples] = useState(12);
  const handleClick = () => {
    setvisibleTemples((previousvisibletemples) => previousvisibletemples + 12);
  };

  const [searchTerm, setSearchTerm] = useState("");

  return isLoading ? (
    <Loading />
  ) : (
    <div>
      <Header />
      <Navbar />
      <div className="Temples">
        <h1 className="Temples-heading">Temples of India</h1>
        <input
          className="Searchbar"
          placeholder="Search....."
          onChange={(event) => {
            setSearchTerm(event.target.value);
          }}></input>
        {temples
          .filter((temple) => temple.location.includes("India"))
          .filter((temple) => {
            if (
              temple.temple_name
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
              temple.deity.toLowerCase().includes(searchTerm.toLowerCase()) ||
              temple.perumal.toLowerCase().includes(searchTerm.toLowerCase()) ||
              temple.thayar.toLowerCase().includes(searchTerm.toLowerCase()) ||
              temple.temple_category
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
              temple.built_by
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
              temple.built_in
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
              temple.saints_associated
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
              temple.architecture_style
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
              temple.location
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
              temple.address.toLowerCase().includes(searchTerm.toLowerCase())
            ) {
              return temple;
            }
          })
          .map((temple) => (
            <div className="Temple-card1">
              <Link to={`/temple/${temple._id}`} target="_blank">
                <img
                  className="temple-image1"
                  src={temple.image}
                  alt="temple-img"
                />
              </Link>
              <p className="temple-bucket-visited">
                <img className="bkt" src={bucket} alt="bkt"></img> :{" "}
                {temple.likes.length} &nbsp;&nbsp;{" "}
                <img className="vst" src={visited} alt="vst"></img> :{" "}
                {temple.likes1.length}
              </p>
              <p className="temple-name1">{temple.temple_name}</p>
              <div className="social-buttons">
                <button
                  className="add-bkt-button"
                  onClick={(e) => addLike(temple._id)}>
                  Add To Bucket List &nbsp;
                  <img className="bkt" src={bucket} alt="bkt"></img>
                </button>
                <button
                  className="add-vst-button"
                  onClick={(e) => addLike1(temple._id)}>
                  Add To Visited List &nbsp;
                  <img className="vst" src={visited} alt="vst"></img>
                </button>
              </div>
            </div>
          ))
          .slice(0, visibleTemples)}
        <button
          className="load-more-button"
          type="button"
          onClick={handleClick}>
          Load More Temples
        </button>
      </div>
      <Footer />
    </div>
  );
};

India.propTypes = {
  temple: PropTypes.object.isRequired,
  loadUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  addLike1: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { addLike, addLike1, loadUser })(India);
