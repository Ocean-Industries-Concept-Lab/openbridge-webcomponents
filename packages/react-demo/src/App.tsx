import { useState } from 'react';
import '@tibnor/openbridge-webcomponents/src/palettes/variables.css'
import {ObcTopBar} from '@tibnor/openbridge-webcomponents-react/components/top-bar/top-bar'
import {ObcBrillianceMenu} from '@tibnor/openbridge-webcomponents-react/components/brilliance-menu/brilliance-menu'
import './App.css'

const handleBrillianceChange = (e: CustomEvent) => {
  document.documentElement.setAttribute('data-obc-theme', e.detail.value)
}

function App() {
  const [showBrillianceMenu, setShowBrillianceMenu] = useState(false);

  const handleDimmingButtonClicked = () => {
    setShowBrillianceMenu(!showBrillianceMenu);
  }

  return (
    <>
      <header>
        <ObcTopBar appTitle='React' pageName='Demo' showDimmingButton showAppsButton onDimmingButtonClicked={handleDimmingButtonClicked} />
      </header>
      <main>
      {showBrillianceMenu && (
        <ObcBrillianceMenu
          onPaletteChanged={handleBrillianceChange}
          show-auto-brightness
          className="brilliance"
        />
      )}
      </main>
    </>
  )
}

export default App
