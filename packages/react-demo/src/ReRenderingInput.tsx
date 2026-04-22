/**
 * This component is used to test the re-rendering of the input component.
 * It is used to test the re-rendering of the input component when the value changes.
 */

import { ObcTextInputField } from "@oicl/openbridge-webcomponents-react/components/text-input-field/text-input-field";
import { useEffect, useState } from "react";

export function ReRenderingInput() {
  const [value, setValue] = useState("");
  const [count, setCount] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => prevCount + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [setCount]);

  useEffect(() => {
    const interval = setInterval(() => {
      setValue((prevValue) => prevValue + "a");
    }, 5_000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div>Count: {count}</div>
      <div>Value: {value}</div>
      <ObcTextInputField
        rejectDuplicateUpdates={true}
        value={value}
        onChange={(e) => setValue((e.target as HTMLInputElement).value)}
      />
    </div>
  );
}
