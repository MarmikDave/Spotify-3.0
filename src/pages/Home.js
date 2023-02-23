import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import { Tabs } from "antd";
import { library } from "../helpers/albumList";

const { TabPane } = Tabs;
const Home = () => {
  return (
    <>
      <Tabs defaultActiveKey="1" centered>
        <TabPane tab="FEATURED" key="1">
          <h1 className="featuredTitle">For The Day</h1>
          <div className="albums">
            {library.map((e) => (
              <Link to="/album" state={e} className="albumSelection">
                <img
                  src={e.image}
                  alt="bull"
                  style={{ width: "150px", marginBottom: "10px" }}
                ></img>
                <p>{e.title}</p>
              </Link>
            ))}
          </div>
        </TabPane>
        <TabPane tab="GENRES & MOODS" key="2">
        <h1 className="featuredTitle">Country</h1>
          <div className="albums">
            {library.slice(7,12).map((e) => (
              <Link to="/album" state={e} className="albumSelection">
                <img
                  src={e.image}
                  alt="bull"
                  style={{ width: "150px", marginBottom: "10px" }}
                ></img>
                <p>{e.title}</p>
              </Link>
            ))}
          </div>
          <h1 className="featuredTitle">Classics</h1>
          <div className="albums">
            {library.slice(13,18).map((e) => (
              <Link to="/album" state={e} className="albumSelection">
                <img
                  src={e.image}
                  alt="bull"
                  style={{ width: "150px", marginBottom: "10px" }}
                ></img>
                <p>{e.title}</p>
              </Link>
            ))}
          </div>
          <h1 className="featuredTitle">Pop Hits</h1>
          <div className="albums">
            {library.slice(0,5).map((e) => (
              <Link to="/album" state={e} className="albumSelection">
                <img
                  src={e.image}
                  alt="bull"
                  style={{ width: "150px", marginBottom: "10px" }}
                ></img>
                <p>{e.title}</p>
              </Link>
            ))}
          </div>
        </TabPane>
        <TabPane tab="NEW RELEASES" key="3">
        <h1 className="featuredTitle">Favourits</h1>
          <div className="albums">
            {library.slice(0,10).map((e) => (
              <Link to="/album" state={e} className="albumSelection">
                <img
                  src={e.image}
                  alt="bull"
                  style={{ width: "150px", marginBottom: "10px" }}
                ></img>
                <p>{e.title}</p>
              </Link>
            ))}
          </div>
        </TabPane>
      </Tabs>
    </>
  );
};

export default Home;
