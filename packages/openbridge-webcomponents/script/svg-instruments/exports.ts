export interface ExportDef {
  name: string;
  path: string[]; // Array of subpath for targeting the svg export in Figma
  outputFolder: string; // sub folder of ./gen
  nonScaling?: boolean;
}

const staticExportComponents: ExportDef[] = [

];


function tickMarks(): ExportDef[] {
  const circleDegrees = ["0", "1", "2", "5", "9", "10", "30", "45", "90"];
  const tickType = ["Primary", "Secondary", "Tertiary"];
  const circleTickMarks: ExportDef[] = [];

  for (const degree of circleDegrees) {
    for (const tick of tickType) {
      const def: ExportDef = {
        name: `${tick}Tickmark${degree}`,
        path: [
          "P2 Building blocks",
          "Watchface elements",
          "Tickmarks - Compass",
          `Degree=${degree}°, Tick size=${tick}`
        ],
        outputFolder: "Tickmarks",
        nonScaling: true
      };
      circleTickMarks.push(def);
    }
  }

  const size = ["Medium", "Large"];
  const toplines: ExportDef[] = size.map(s => ({
    name: `Topline${s}`,
    path: [
      "P2 Building blocks",
      "Watchface",
      "Azimuth watchface",
      `Size=${s}, Tickmarks=90°, Labels=False, Detailed=False, PORT / STBD=False`,
      "watchface",
      "top-line"
    ],
    outputFolder: "Tickmarks",
  })
  );
  return [...circleTickMarks, ...toplines];
}

function watchface(): ExportDef[] {
  const watchface: ExportDef[] = [];
  const types = [{ name: "Regular", tag: "Regular" }, { name: "PORT STBD", tag: "PORT_STBD" }, { name: "Positive / Negative", tag: "Positive_Negative" }, { name: "Off", tag: "Off" }, { name: "Bar", tag: "Bar" }];
  const size = ["Small", "Medium", "Large"];

  for (const type of types) {
    for (const s of size) {
      const def: ExportDef = {
        name: `${type.tag}Watchface${s}`,
        path: [
          "P2 Building blocks",
          "Watchface elements",
          "Watchface circle",
          `Size=${s}, Type=${type.name}, Condensed=False, Arc=Off`
        ],
        outputFolder: "Watchface",
      };
      watchface.push(def);
    }
  }

  return watchface;
}

export const exportComponents = [...staticExportComponents, ...tickMarks(), ...watchface()];
