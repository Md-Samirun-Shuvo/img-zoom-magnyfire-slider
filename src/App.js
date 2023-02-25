import "./App.css";
import { useState, useRef, useEffect } from "react";
import ReactImageMagnify from "react-image-magnify";
import axios from "axios";

function App() {
  const [product, setProduct] = useState([]);
  useEffect(() => {
    axios
      .get(`https://backend.bppshop.com.bd/api/v1/products/details/7433`)
      .then((res) => {
        setProduct(res?.data?.data);
      });
  }, []);

  const [img, setImg] = useState();

  const hoverHandler = (image, i) => {
    setImg(image);
    refs.current[i].classList.add("active");
    for (var j = 0; j < product?.images?.length; j++) {
      if (i !== j) {
        refs.current[j].classList.remove("active");
      }
    }
  };

  const refs = useRef([]);
  refs.current = [];
  const addRefs = (el) => {
    if (el && !refs.current.includes(el)) {
      refs.current.push(el);
    }
  };

  return (
    <div className="container">
      <div className="container_section">
        <div className="imgZoomContainer">
          <div className="left_2">
            <ReactImageMagnify
              {...{
                smallImage: {
                  alt: "Wristwatch by Ted Baker London",
                  isFluidWidth: true,
                  src: `https://backend.bppshop.com.bd/storage/product/${img}`,
                },
                largeImage: {
                  src: `https://backend.bppshop.com.bd/storage/product/${img}`,
                  width: 1200,
                  height: 1800,
                },
                enlargedImageContainerDimensions: {
                  width: "100%",
                  height: "100%",
                },
              }}
            />
          </div>
          <div className="left_1">
            {product?.images?.map((image, i) => (
              <div
                className={i === 0 ? "img_wrap active" : "img_wrap"}
                key={i}
                onMouseOver={() => hoverHandler(image, i)}
                ref={addRefs}
              >
                <img
                  src={`https://backend.bppshop.com.bd/storage/product/${image}`}
                  alt=""
                />
              </div>
            ))}
          </div>
        </div>
        <div className="right"></div>
      </div>
    </div>
  );
}

export default App;
