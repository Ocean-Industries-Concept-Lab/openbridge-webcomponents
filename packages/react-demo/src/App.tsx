import { useState } from "react";
import "@ocean-industries-concept-lab/openbridge-webcomponents/dist/openbridge.css";
import { ObcTopBar } from "../../openbridge-webcomponents-react/components/top-bar/top-bar";
import { ObcBrillianceMenu } from "../../openbridge-webcomponents-react/components/brilliance-menu/brilliance-menu";
import "./App.css";
import PoiTargetsWrapper from "./PoiTargetsWrapper.tsx";
import { ObcTest } from "../../openbridge-webcomponents-react/components/test/test";
import { html } from "lit";

const handleBrillianceChange = (e: CustomEvent) => {
  document.documentElement.setAttribute("data-obc-theme", e.detail.value);
};

function App() {
  const [showBrillianceMenu, setShowBrillianceMenu] = useState(false);

  const handleDimmingButtonClicked = () => {
    setShowBrillianceMenu(!showBrillianceMenu);
  };

  const data = [
    { name: "John Doe", age: 30, city: "New York" },
    { name: "Jane Smith", age: 25, city: "Los Angeles" },
    { name: "Mike Johnson", age: 35, city: "Chicago" },
  ];
  const columns = [
    { label: "Name", key: "name" },
    { label: "Age", key: "age" },
    {
      label: "City",
      key: "city",
      renderCell: (value: string) =>
        html`<a part="link" href="https://www.google.com/maps/place/${value}"
          >${value}</a
        >`,
    },
  ];

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
        <ObcTest data={data} columns={columns} />

        <PoiTargetsWrapper rows={5} columns={5} />
      </main>
    </>
  );
}

export default App;
