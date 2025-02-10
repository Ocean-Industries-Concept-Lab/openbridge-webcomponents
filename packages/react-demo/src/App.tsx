import { useState } from "react";
import "@oicl/openbridge-webcomponents/src/palettes/variables.css";
import { ObcTopBar } from "@oicl/openbridge-webcomponents-react/components/top-bar/top-bar";
import { ObcBrillianceMenu } from "@oicl/openbridge-webcomponents-react/components/brilliance-menu/brilliance-menu";
import "./App.css";
import PoiTargetsWrapper from "./PoiTargetsWrapper.tsx";

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
        />
      </header>
      <main>
        {showBrillianceMenu && (
          <ObcBrillianceMenu
            onPaletteChanged={handleBrillianceChange}
            show-auto-brightness
            className="brilliance"
          />
        )}

        <PoiTargetsWrapper rows={5} columns={5} />
      </main>
    </>
  );
}

export default App;
