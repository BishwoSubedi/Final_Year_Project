import "./singlePage.scss";
import Slider from "../../components/slider/Slider";
import Map from "../../components/map/Map";
import { useNavigate, useLoaderData } from "react-router-dom";
import DOMPurify from "dompurify";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";
import { IoBed, IoCube, IoCompass, IoExpand, IoAperture, IoResize, IoCalendar } from "react-icons/io5";

function SinglePage() {
  const post = useLoaderData();
  const [saved, setSaved] = useState(post.isSaved);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSave = async () => {
    if (!currentUser) {
      navigate("/login");
    }

    setSaved((prev) => !prev);
    try {
      await apiRequest.post("/users/save", { postId: post.id });
    } catch (err) {
      console.log(err);
      setSaved((prev) => !prev);
    }
  };

  const handleUpdate = () => {
    navigate(`/update-post/${post.id}`);
  };

  const handleDelete = async () => {
    try {
      await apiRequest.delete(`/posts/${post.id}`);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="singlePage">
      <div className="details">
        <div className="wrapper">
          <Slider images={post.images} />
          <div className="info">
            <div className="top">
              <div className="post">
                <h3>{post.title}</h3>
                <div className="address">
                  
                  <span>{post.address}</span>
                </div>
                <div className="user">
                <img src={post.user.avatar ? post.user.avatar : 'noavatar.jpg'} alt="" />
                <span>{post.user.username}</span>
              </div>
                <div className="price">$ {post.price}</div>
              </div>
             
            </div>
            <div
              className="bottom"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(post.postDetail.desc),
              }}
            ></div>
            {currentUser?.id === post.userId &&
              <div>
                <button className="updateButton" onClick={handleUpdate}>
                  Update Post
                </button>
                <button className="deleteButton" onClick={handleDelete}>
                  Delete Post
                </button>
              </div>
            }
          </div>
        </div>
      </div>
      <div className="features">
        <div className="wrapper">
          <p className="title">General</p>
          <div className="listVertical">
            {post.isForRent && (
              <>
                <div className="feature">
                  <img src="/utility.png" alt="" />
                  <div className="featureText">
                    <span>Utilities</span>
                    {post.postDetail.utilities === "owner" ? (
                      <p>Owner is responsible</p>
                    ) : (
                      <p>Tenant is responsible</p>
                    )}
                  </div>
                </div>
                <div className="feature">
                  <img src="/pet.png" alt="" />
                  <div className="featureText">
                    <span>Pet Policy</span>
                    {post.postDetail.pet === "allowed" ? (
                      <p>Pets Allowed</p>
                    ) : (
                      <p>Pets not Allowed</p>
                    )}
                  </div>
                </div>
              </>
            )}
            <div className="feature">
              <IoCube />
              <div className="featureText">
                <span>No. of Flats</span>
                <p>{post.no_of_flat}</p>
              </div>
            </div>
            <div className="feature">
              <IoExpand />
              <div className="featureText">
                <span>No. of Balconies</span>
                <p>{post.balcony}</p>
              </div>
            </div>
            <div className="feature">
              <IoCompass />
              <div className="featureText">
                <span>Direction</span>
                <p>{post.postDetail.direction}</p>
              </div>
            </div>
            <div className="feature">
              <IoExpand />
              <div className="featureText">
                <span>Land Area</span>
                <p>{post.land_area}</p>
              </div>
            </div>
            <div className="feature">
              <IoAperture />
              <div className="featureText">
                <span>Kitchen</span>
                <p>{post.kitchen}</p>
              </div>
            </div>
            <div className="feature">
              <IoResize />
              <div className="featureText">
                <span>Road Size</span>
                <p>{post.road_size}</p>
              </div>
            </div>
            <div className="feature">
              <IoCalendar />
              <div className="featureText">
                <span>Built Year</span>
                <p>{post.built_year}</p>
              </div>
            </div>
            <div className="feature">
              <IoBed />
              <div className="featureText">
                <span>Living Room</span>
                <p>{post.living_room}</p>
              </div>
            </div>
          </div>
          <p className="title">Sizes</p>
          <div className="sizes">
            <div className="size">
              <img src="/size.png" alt="" />
              <span>{post.postDetail.built_up_area} sqft</span>
            </div>
            <div className="size">
              <img src="/bed.png" alt="" />
              <span>{post.bedroom} beds</span>
            </div>
            <div className="size">
              <img src="/bath.png" alt="" />
              <span>{post.bathroom} bathroom</span>
            </div>
          </div>
          <p className="title">Nearby Places</p>
          <div className="listHorizontal">
            <div className="feature">
              <img src="/school.png" alt="" />
              <div className="featureText">
                <span>School</span>
                <p>
                  {post.postDetail.school > 999
                    ? post.postDetail.school / 1000 + "km"
                    : post.postDetail.school + "m"}{" "}
                  away
                </p>
              </div>
            </div>
            <div className="feature">
              <img src="/pet.png" alt="" />
              <div className="featureText">
                <span>Bus Stop</span>
                <p>{post.postDetail.bus}m away</p>
              </div>
            </div>
            <div className="feature">
              <img src="/fee.png" alt="" />
              <div className="featureText">
                <span>Restaurant</span>
                <p>{post.postDetail.restaurant}m away</p>
              </div>
            </div>
          </div>
          <p className="title">Location</p>
          <div className="mapContainer">
            <Map items={[post]} />
          </div>
          <div className="buttons">
            <button>
              <img src="/chat.png" alt="" />
              Send a Message
            </button>
            <button
              onClick={handleSave}
              style={{
                backgroundColor: saved ? "#fece51" : "white",
              }}
            >
              <img src="/save.png" alt="" />
              {saved ? "Place Saved" : "Save the Place"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SinglePage;
