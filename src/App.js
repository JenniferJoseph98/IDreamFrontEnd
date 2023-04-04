import "./App.css";
import { MdAddAPhoto } from "react-icons/md";
import { FaUserTie } from "react-icons/fa";
import { CgNametag } from "react-icons/cg";
import { useEffect, useState } from "react";
import { TfiWorld } from "react-icons/tfi";
import { TfiSave } from "react-icons/tfi";
import { GiCancel } from "react-icons/gi";
import axios from "axios";
import { AiOutlineClear } from "react-icons/ai";
import Image from "./components/Image";
function App() {
  function addpost() {
    if (url.length !== 0 && label.length !== 0) {
      axios
        .post("https://i-dream-back-end.vercel.app/post/add", {
          label: label,
          url: url,
        })
        .then((res) => {
          console.log(res);
          setAddPopup(false);
          setIsChecked(!isChecked);
          setUrl("");
          setLabel("");
          alert("Post added");
        })
        .catch((error) => alert("Error Occured"));
    } else {
      alert("Enter Data");
    }
  }
  const [isChecked, setIsChecked] = useState(false);
  const [url, setUrl] = useState("");
  const [label, setLabel] = useState("");
  const [addPopup, setAddPopup] = useState(false);
  function searchAlgo() {
    const searchOption = search.toLowerCase();

    let searchResult = data.filter((details) =>
      details.label.includes(searchOption)
    );
    setSearchData(searchResult);
    setSearch("");
  }
  function handleCheckboxChange() {
    setIsChecked(!isChecked);
  }
  const [data, setData] = useState([]);
  const [searchData, setSearchData] = useState([]);
  useEffect(() => {
    axios
      .get("https://i-dream-back-end.vercel.app/post")
      .then((res) => setData(res.data.data))
      .catch((error) => console.log(error));
  }, [isChecked]);

  const [search, setSearch] = useState("");

  return (
    <div className="App container">
      <header>
        <div className="headerleft">
          <span style={{ fontSize: "3rem" }}>
            <FaUserTie />
          </span>
          <div style={{ textAlign: "start" }}>
            <h6>My Unsplash</h6>
            <span>Jennifer Jo</span>
          </div>
          <div className="input-group mb-3" style={{ width: "65%" }}>
            <input
              type="text"
              className="form-control"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Enter Label"
              aria-label="Enter Label"
              aria-describedby="basic-addon2"
            />
            <div className="input-group-append" onClick={() => searchAlgo()}>
              <span className="input-group-text" id="basic-addon2">
                Search
              </span>
            </div>
          </div>
        </div>
        <div className="headerright">
          <button
            onClick={() => setAddPopup(true)}
            className="btn"
            style={{
              backgroundColor: "black",
              color: "whitesmoke",
            }}
          >
            <MdAddAPhoto /> Add Photo
          </button>
        </div>
      </header>
      {data.length === 0 ? (
        <>
          <h1>Add Data to View</h1>
        </>
      ) : (
        <>
          {searchData.length !== 0 ? (
            <>
              <div
                className="bodycont"
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "end",
                }}
              >
                <button
                  type="button"
                  style={{ alignSelf: "flex-start", margin: "20px 0" }}
                  class="btn btn-dark"
                  onClick={() => setSearchData([])}
                >
                  <AiOutlineClear />
                  clear
                </button>
              </div>
              <Image
                data={searchData}
                handleCheckboxChange={handleCheckboxChange}
              />
            </>
          ) : (
            <>
              <Image data={data} handleCheckboxChange={handleCheckboxChange} />
            </>
          )}
        </>
      )}
      {addPopup && (
        <div className="addpopup">
          <h3 style={{ marginBottom: "20px" }}>Add Post</h3>
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="basic-addon1">
                <CgNametag />
              </span>
            </div>
            <input
              type="text"
              required
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              class="form-control"
              placeholder="Enter Label"
              aria-label="Enter Label"
              aria-describedby="basic-addon1"
            />
          </div>
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="basic-addon1">
                <TfiWorld />
              </span>
            </div>
            <input
              type="url"
              required
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              class="form-control"
              placeholder="Enter Url"
              aria-label="Enter Url"
              aria-describedby="basic-addon1"
            />
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-evenly",
            }}
          >
            <button
              onClick={() => setAddPopup(false)}
              type="button"
              class="btn btn-secondary"
            >
              <GiCancel /> Cancel
            </button>
            <button
              type="submit"
              onClick={() => addpost()}
              class="btn btn-primary"
            >
              <TfiSave /> Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
