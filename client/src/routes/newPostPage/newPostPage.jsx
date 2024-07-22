import { useState } from "react";
import "./newPostPage.scss";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import apiRequest from "../../lib/apiRequest";
import UploadWidget from "../../components/uploadWidget/UploadWidget";
import { useNavigate } from "react-router-dom";

function NewPostPage() {
  const [value, setValue] = useState("");
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");
  const [type, setType] = useState("rent");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const inputs = Object.fromEntries(formData);

    try {
      const res = await apiRequest.post("/posts", {
        postData: {
          title: inputs.title,
          price: parseInt(inputs.price),
          land_area: parseFloat(inputs.land_area),
          city: inputs.city,
          address: inputs.address,
          bedroom: parseInt(inputs.bedroom),
          bathroom: parseInt(inputs.bathroom),
          no_of_flat: parseInt(inputs.no_of_flat),
          living_room: parseInt(inputs.living_room),
          kitchen: parseInt(inputs.kitchen),
          type: inputs.type,
          property: inputs.property,
          latitude: inputs.latitude,
          district: inputs.district,
          longitude: inputs.longitude,
          road_size: parseInt(inputs.road_size),
          built_year: parseInt(inputs.built_year),
          house_type: inputs.house_type,
          balcony: parseInt(inputs.balcony),
          OverallCondition : parseInt(inputs. OverallCondition),
          images: images,
        },
        postDetail: {
          desc: value,
          parking: parseInt(inputs.parking),
          direction: inputs.direction,
          utilities: inputs.utilities,
          pet: inputs.pet,
          built_up_area: parseInt(inputs.built_up_area),
          school: parseInt(inputs.school),
          bus: parseInt(inputs.bus),
          restaurant: parseInt(inputs.restaurant),
        },
      });
      navigate("/" + res.data.id);
    } catch (err) {
      console.log(err);
      setError(error);
    }
  };

  return (
    <div className="newPostPage">
      <div className="formContainer">
        <h2>Add Post</h2>
        <div className="wrapper">
          <form onSubmit={handleSubmit}>
            <div className="item">
              <label htmlFor="title">Title</label>
              <input id="title" name="title" type="text" />
            </div>
            <div className="item">
              <label htmlFor="price">Price</label>
              <input id="price" name="price" type="number" />
            </div>
            <div className="item">
              <label htmlFor="land_area">Land Area(sqft)</label>
              <input
                id="land_area"
                name="land_area"
                type="number"
                step="0.001"
              />
            </div>
            <div className="item">
              <label htmlFor="type">District</label>
              <select name="district">
                <option value="Kathmandu">Kathmandu</option>
                <option value="Kaski">Kaski</option>
                <option value="Lalitpur">Lalitpur</option>
                <option value="Bhaktapur">Bhaktapur</option>
              </select>
            </div>
            <div className="item description">
              <label htmlFor="desc">Description</label>
              <ReactQuill theme="snow" onChange={setValue} value={value} />
            </div>
            <div className="item">
              <label htmlFor="city">City</label>
              <input id="city" name="city" type="text" />
            </div>
            <div className="item">
              <label htmlFor="address">Address</label>
              <input id="address" name="address" type="text" />
            </div>
            <div className="item">
              <label htmlFor="bedroom">Bedroom Number</label>
              <input min={1} id="bedroom" name="bedroom" type="number" />
            </div>
            <div className="item">
              <label htmlFor="bathroom">Bathroom Number</label>
              <input min={1} id="bathroom" name="bathroom" type="number" />
            </div>
            <div className="item">
              <label htmlFor="no_of_flat">Number of Flat</label>
              <input min={1} id="no_of_flat" name="no_of_flat" type="number" />
            </div>
            <div className="item">
              <label htmlFor="living_room">No of Living Room</label>
              <input
                min={1}
                id="living_room"
                name="living_room"
                type="number"
              />
            </div>
            <div className="item">
              <label htmlFor="kitchen">No of Kitchen</label>
              <input min={1} id="kitchen" name="kitchen" type="number" />
            </div>
            <div className="item">
              <label htmlFor="latitude">Latitude</label>
              <input id="latitude" name="latitude" type="text" />
            </div>
            <div className="item">
              <label htmlFor="longitude">Longitude</label>
              <input id="longitude" name="longitude" type="text" />
            </div>
            <div className="item">
              <label htmlFor="road_size">Road Size</label>
              <input id="road_size" name="road_size" type="number" />
            </div>
            <div className="item">
              <label htmlFor="built_year">Built Year</label>
              <input id="built_year" name="built_year" type="number" />
            </div>

            <div className="item">
              <label htmlFor="balcony">No of Balcony</label>
              <input id="balcony" name="balcony" type="number" />
            </div>
            <div className="item">
              <label htmlFor="OverallCondition">
                Overall Condition Out of 10(Rating)
              </label>
              <input
                id="OverallCondition"
                name="OverallCondition"
                type="number"
              />
            </div>
            <div className="item">
              <label htmlFor="type">Type</label>
              <select
                name="type"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="rent">Rent</option>
                <option value="sell">Sell</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="house_type">House Type</label>
              <select name="house_type">
                <option value="Semicommercial">Semi-Commercial</option>
                <option value="Residential">Residential</option>
                <option value="Furnished">Furnished</option>
                <option value="Commercial">Commercial</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="utilities">Utilities Policy</label>
              <select name="utilities" disabled={type === "sell"}>
                <option value="owner">Owner is responsible</option>
                <option value="tenant">Tenant is responsible</option>
                <option value="shared">Shared</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="pet">Pet Policy</label>
              <select name="pet" disabled={type === "sell"}>
                <option value="allowed">Allowed</option>
                <option value="not-allowed">Not Allowed</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="direction">Direction</label>
              <select name="direction">
                <option value="East">East</option>
                <option value="West">West</option>
                <option value="North">North</option>
                <option value="South">South</option>
                <option value="North_east">North East</option>
                <option value="North_west">North West</option>
                <option value="South_east">South East</option>
                <option value="South_west">South West</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="parking">Parking Area</label>
              <select name="parking">
                <option value="1">One or Two Bike Parking</option>
                <option value="2">One Car Parking</option>
                <option value="3">Two or More Car Parking</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="built_up_area">Total Size (sqft)</label>
              <input
                min={0}
                id="built_up_area"
                name="built_up_area"
                type="number"
              />
            </div>
            <div className="item">
              <label htmlFor="school">Distance From School</label>
              <input min={0} id="school" name="school" type="number" />
            </div>
            <div className="item">
              <label htmlFor="bus">Distance From Bus Stop</label>
              <input min={0} id="bus" name="bus" type="number" />
            </div>
            <div className="item">
              <label htmlFor="restaurant">Distance From Restaurant</label>
              <input min={0} id="restaurant" name="restaurant" type="number" />
            </div>
            <button className="sendButton">Add</button>
            {type === "sell" && <button className="sendButton">Predict</button>}
            {error && <span>error</span>}
          </form>
        </div>
      </div>
      <div className="sideContainer">
        {images.map((image, index) => (
          <img src={image} key={index} alt="" />
        ))}
        <UploadWidget
          uwConfig={{
            multiple: true,
            cloudName: "dkeppefn6",
            uploadPreset: "estate",
            folder: "posts",
          }}
          setState={setImages}
        />
      </div>
    </div>
  );
}

export default NewPostPage;
