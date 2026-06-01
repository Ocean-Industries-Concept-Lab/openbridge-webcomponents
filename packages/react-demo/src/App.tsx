import { useState } from "react";
import "@oicl/openbridge-webcomponents/dist/openbridge.css";
import { ObcTopBar } from "../../openbridge-webcomponents-react/components/top-bar/top-bar";
import { ObcBrillianceMenu } from "../../openbridge-webcomponents-react/components/brilliance-menu/brilliance-menu";
import "./App.css";
import { ObcClock } from "../../openbridge-webcomponents-react/components/clock/clock";
import { ObcButton } from "../../openbridge-webcomponents-react/components/button/button";
import { ReRenderingInput } from "./ReRenderingInput";

const handleBrillianceChange = (e: CustomEvent) => {
  document.documentElement.setAttribute("data-obc-theme", e.detail.value);
};

function App() {
  const [showBrillianceMenu, setShowBrillianceMenu] = useState(false);

  const handleDimmingButtonClicked = () => {
    setShowBrillianceMenu(!showBrillianceMenu);
  };

  return (
    <>
      <header>
        <ObcTopBar
          appTitle="React"
          pageName="Demo"
          showDimmingButton
          showAppsButton
          onDimmingButtonClicked={handleDimmingButtonClicked}
        >
          <ObcClock
            date={new Date().toISOString()}
            timeZoneOffsetHours={new Date().getTimezoneOffset() / -60}
            showTimezone
            blinkOnlyBreakpointPx={600}
          />
        </ObcTopBar>
      </header>
      <ObcButton></ObcButton>
      <main>
        <ReRenderingInput />
        {showBrillianceMenu && (
          <ObcBrillianceMenu
            onPaletteChanged={handleBrillianceChange}
            show-auto-brightness
            className="brilliance"
          />
        )}
      </main>
    </>
  );
}

export default App;
