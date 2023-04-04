import React from "react";
import { useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import "./add.css";
import axios from "axios";
function Image(props) {
  const [hovers, setHovers] = useState(null);
  const data = props.data;
  const [popUp, setPopUp] = useState(false);
  const [password, setPassword] = useState("");
  const [postDelete, setPostDelete] = useState("");
  function deletePost() {
    if (password === "jennifer") {
      axios
        .delete(`https://i-dream-back-end.vercel.app/post/${postDelete}`)
        .then((res) => {
          alert("Post Deleted");
          setPassword("");
          setPopUp(false);
          props.handleCheckboxChange();
        })
        .catch((err) => {
          console.log(err);
          alert("unable to delete");
        });
    } else {
      alert("Check credential");
    }
  }
  return (
    <div className="imagecon bodycont">
      {data.map((details, index) => {
        return (
          <>
            <div
              className="image"
              onMouseOver={() => setHovers(details._id)}
              onMouseOut={() => setHovers(null)}
              style={{
                backgroundImage: "url(" + details.url + ")",
                borderRadius: "25px",
              }}
            >
              {hovers === details._id ? (
                <>
                  <button
                    onClick={() => {
                      setPostDelete(details._id);
                      setPopUp(true);
                    }}
                    className="btn btn-danger"
                    style={{ alignSelf: "flex-end" }}
                  >
                    <AiFillDelete /> Delete
                  </button>
                  <span style={{ backgroundColor: "white", height: "auto" }}>
                    {details.label}
                  </span>
                </>
              ) : (
                <></>
              )}
            </div>
          </>
        );
      })}
      {popUp && (
        <div className="popupscont">
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              paddingLeft: "25px",
              flexDirection: "column",
              width: "100%",
            }}
          >
            <h6>Are you sure? </h6>
            <span>Enter Password: Password is jennifer</span>
            <br />
            <input
              style={{ width: "90%" }}
              placeholder="**** *** ** *"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="btngr">
            <button
              type="button"
              onClick={() => setPopUp(false)}
              className="btn btn-secondary"
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => deletePost()}
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Image;
