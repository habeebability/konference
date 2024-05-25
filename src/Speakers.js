import React, {
  useEffect,
  useReducer,
  useState,
  useCallback,
  useMemo,
} from "react";

import { Header } from "./Header";
import { Menu } from "./Menu";
import SpeakerData from "./SpeakerData.js";
import SpeakerDetail from "./SpeakerDetail";
import { ConfigContext } from "./App";
import speakersReducer from "./SpeakersReducer";
const Speakers = ({}) => {
  const [speakingSaturday, setSpeakingSaturday] = useState(true);
  const [speakingSunday, setSpeakingSunday] = useState(true);

  // use state
  // const [speakerList, setSpeakerList] = useState([]);

  // use reducer
  //   const [speakerList, setSpeakerList] = useReducer(
  //     (state, action) => action,
  //     []
  //   );

  //   optimized reducer
  const [speakerList, dispatch] = useReducer(speakersReducer, []);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    new Promise(function (resolve) {
      setTimeout(function () {
        resolve();
      }, 1000);
    }).then(() => {
      setIsLoading(false);
      const speakerListServerFilter = SpeakerData.filter(({ sat, sun }) => {
        return (speakingSaturday && sat) || (speakingSunday && sun);
      });

      dispatch({
        type: "setSpeakerList",
        data: speakerListServerFilter,
      });
    });

    return () => {
      console.log("clean up");
    };
  }, []);
  // setSpeakerList(SpeakerData);

  const heartFavoriteHandler = useCallback((e, favoriteValue) => {
    e.preventDefault();

    const sessionId = parseInt(e.target.attributes["data-sessionid"].value);

    dispatch({
      type: favoriteValue === true ? "favorite" : "unfavorite",
      sessionId,
    });
    // setSpeakerList(
    //   speakerList.map((item) => {
    //     if (item.id === sessionId) {
    //       return { ...item, favorite: favoriteValue };
    //     }

    //     return item;
    //   })
    // );
  }, []);

  const handleChangeSaturday = () => {
    setSpeakingSaturday(!speakingSaturday);
  };
  const handleChangeSunday = () => {
    setSpeakingSunday(!speakingSunday);
  };

  const speakersListFiltered = isLoading
    ? []
    : speakerList
        .filter(
          ({ sat, sun }) => (speakingSaturday && sat) || (speakingSunday && sun)
        )
        .sort((a, b) => a.firstName.localeCompare(b.firstName));

  // useMemo(
  //     () =>
  //       speakerList
  //         .filter(
  //           ({ sat, sun }) =>
  //             (speakingSaturday && sat) || (speakingSunday && sun)
  //         )
  //         .sort(function (a, b) {
  //           if (a.firstName < b.firstName) {
  //             return -1;
  //           }
  //           if (a.firstName > b.firstName) {
  //             return 1;
  //           }
  //           return 0;
  //         }),
  //     [speakingSaturday, speakingSunday, speakerList]
  //   );

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <Header />
      <Menu />

      <div className="container">
        <div className="btn-toolbar margintopbottom5 checkbox-bigger">
          {ConfigContext.showSpeakerSpeakingDays === false ? null : (
            <div className="hide">
              <div className="form-check-inline">
                <label className="form-check-label">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    onChange={handleChangeSaturday}
                    checked={speakingSaturday}
                  />
                  Saturday Speakers
                </label>
              </div>
              <div className="form-check-inline">
                <label className="form-check-label">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    onChange={handleChangeSunday}
                    checked={speakingSunday}
                  />
                  Sunday Speakers
                </label>
              </div>
            </div>
          )}
        </div>
        <div className="row">
          <div className="card-deck">
            {speakersListFiltered.map(
              ({ id, firstName, lastName, bio, favorite }) => {
                return (
                  <SpeakerDetail
                    key={id}
                    id={id}
                    firstName={firstName}
                    lastName={lastName}
                    bio={bio}
                    favorite={favorite}
                    onHeartFavoriteHandler={heartFavoriteHandler}
                  />
                );
              }
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Speakers;
