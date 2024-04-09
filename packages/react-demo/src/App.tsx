import { useState } from 'react';
import '@oicl/openbridge-webcomponents/src/palettes/variables.css'
import {ObcTopBar} from '@oicl/openbridge-webcomponents-react/components/top-bar/top-bar'
import {ObcBrillianceMenu} from '@oicl/openbridge-webcomponents-react/components/brilliance-menu/brilliance-menu'
import {ObcRichButton} from '@oicl/openbridge-webcomponents-react/components/rich-button/rich-button'
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
      <ObcRichButton className="rich-button" position="top" size="double-line">
        <div slot="label">React Demo</div>
        <div slot="description">This demonstrates use of slots</div>
      </ObcRichButton>
      </main>
    </>
  )
}

export default App
