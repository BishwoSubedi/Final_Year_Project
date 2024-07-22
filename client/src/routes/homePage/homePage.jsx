import SearchBar from "../../components/searchBar/SearchBar";
import "./homePage.scss";

function HomePage() {
  return (
    <div className="homePage">
      <div className="textContainer">
        <div className="wrapper">
          <h2 className="title">Find & Get Your Dream House</h2>
          <p>
            Discover the perfect place to call home with our curated listings.
            Whether you’re looking for a cozy apartment in the heart of the city
            or a spacious house in a tranquil neighborhood, we have something
            for everyone. Enjoy modern amenities, beautiful surroundings, and a
            community that feels like family. Start your journey to finding your
            dream home today and experience the difference!
          </p>
          <SearchBar />
        </div>
      </div>
      <div className="imgContainer">
        <img src="/realState.jpeg" alt="" />
      </div>
    </div>
  );
}

export default HomePage;
