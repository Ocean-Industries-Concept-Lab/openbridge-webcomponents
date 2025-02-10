import React, { useReducer, useEffect } from "react";
import { ObcPoiTarget } from "../../openbridge-webcomponents-react/navigation-instruments/poi-target/poi-target";
import "./PoiTargetsWrapper.css";

const UPDATE_HEIGHTS = "UPDATE_HEIGHTS";

interface PoiTarget {
  id: number;
  height: number;
  incrementing: boolean;
}

interface Action {
  type: string;
}

function reducer(state: PoiTarget[], action: Action): PoiTarget[] {
  switch (action.type) {
    case UPDATE_HEIGHTS:
      return state.map((poi) => {
        let { height, incrementing } = poi;

        if (incrementing) {
          if (height < 250) {
            height += 1;
          } else {
            incrementing = false;
            height -= 1;
          }
        } else {
          if (height > 50) {
            height -= 1;
          } else {
            incrementing = true;
            height += 1;
          }
        }

        return { ...poi, height, incrementing };
      });
    default:
      return state;
  }
}

function PoiTargetsWrapper({ rows, columns }: { rows: number; columns: number }) {
  const totalComponents = rows * columns;

  const [poiTargets, dispatch] = useReducer(
    reducer,
    Array.from({ length: totalComponents }, (_, index) => {
      const randomHeight = Math.floor(Math.random() * 201) + 50; // Between 50 and 250
      return {
        id: index,
        height: randomHeight,
        incrementing: Math.random() >= 0.5,
      };
    })
  );

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch({ type: UPDATE_HEIGHTS });
    }, 16.6666667);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="poi-grid"
      style={{
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
      }}
    >
      {poiTargets.map((poi) => (
        <ObcPoiTarget key={poi.id} height={poi.height} />
      ))}
    </div>
  );
}

export default React.memo(PoiTargetsWrapper);
