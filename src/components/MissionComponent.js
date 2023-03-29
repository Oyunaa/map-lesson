import React from "react";
import { MapContainer, TileLayer, Marker, Popup, Polygon } from "react-leaflet";

export default function MissionComponent({
  curLocation,
  activeFuncName,
  data,
  dataAll,
}) {
  const purpleOptions = { color: "purple" };

  const changePosition = (arr) => {
    arr.map((item) => {
      const elem = item.splice(0, 1)[0];
      item.splice(1, 0, elem);
    });
  };

  return (
    <div>
      <MapContainer
        center={[40.82302903, -73.93414657]}
        zoom={5}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker
          position={[curLocation?.lat, curLocation?.long]}
          eventHandlers={{
            click: () => {
              console.log("marker clicked");
            },
          }}
        >
          <Popup>Sukhbaatar Square</Popup>
        </Marker>
        {(data || dataAll) && (
          <>
            {activeFuncName == "1" && (
              <>
                {data.length > 0 &&
                  data?.map((item, index) => {
                    return (
                      <Marker
                        position={[
                          item.location.coordinates[1],
                          item.location.coordinates[0],
                        ]}
                        eventHandlers={{
                          click: () => {
                            console.log("marker clicked");
                          },
                        }}
                      >
                        <Popup>{item.name}</Popup>
                      </Marker>
                    );
                  })}
              </>
            )}

            {activeFuncName == "2" &&
              data?.map((item, index) => {
                if (
                  item.geometry.coordinates &&
                  item.geometry.coordinates.length > 0
                ) {
                  return (
                    <>
                      {changePosition(item.geometry.coordinates[0])}
                      <Polygon
                        pathOptions={purpleOptions}
                        positions={[item.geometry.coordinates[0]]}
                      />
                    </>
                  );
                }
              })}

            {activeFuncName == "3" && (
              <>
                {dataAll?.restaurants?.length &&
                  dataAll.currentNeighborHood && (
                    <>
                      {dataAll?.restaurants?.map((item, index) => {
                        return (
                          <Marker
                            position={[
                              item.location.coordinates[1],
                              item.location.coordinates[0],
                            ]}
                            eventHandlers={{
                              click: () => {
                                console.log("marker clicked");
                              },
                            }}
                          >
                            <Popup>{item.name}</Popup>
                          </Marker>
                        );
                      })}

                      <>
                        {changePosition(
                          dataAll.currentNeighborHood.geometry.coordinates[0]
                        )}
                        <Polygon
                          pathOptions={purpleOptions}
                          positions={[
                            dataAll.currentNeighborHood.geometry.coordinates[0],
                          ]}
                        />
                      </>
                    </>
                  )}
              </>
            )}
          </>
        )}
      </MapContainer>
    </div>
  );
}
