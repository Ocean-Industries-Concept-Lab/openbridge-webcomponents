# Building block

## Value container

value: number | null // Null should show a dash '-'
maxDigits?: number // reserve space for digits, but shows all digits if value has more digits than maxDigits
fractionDigits?: number = 0
hintedZeros?: boolean = false // add zeros before value
hasDegree?: boolean = false
hasIcon?: boolean = false
size: TextboxSize
--color

html`

<div class="wrapper">
  <div class="icon-containar"><slot name="icon">
  <div class="number">
     <obc-textbox .size .fontWeight>
      ${formatted value}
      <span slot="spacer">${formatted spacer -> 0000.0}</snap>
      </obc-textbox>
   </div>
</div>

## Readout-list-item

label: string | undefined
unit: string | undefined

// Numbers
hasValue: boolean = true
value: number | null // Null should show a dash
hasSetpoint: boolean = false
setpoint: number
hasAdvice: boolean = false
advice: number

options: {
// Global layout
size: enum: base, priority, enhanced
priority: enum: regular, enhanced
stacking: enum: leading-unit, trailing-unit, leading-src
interactions: // Jon? flip-flop, etc.?
clickable: false | true | { // Jon from isInteractive
border: squared, round, round-corners
}
}

    // Global options
    hasDegree: boolean = false
    hasDegreeSpacer
    maxDigits // Jon?
    hintedZeros // Jon?

    alert= false | undefined | {
        ...alertFrameOptions
    }

    value?: {
        zeroPadding?
        weight?: regular, active // Jon?
        hasIcon?: boolean = false // Add a slot
    }

    setpoint?: {
        zeroPadding?
        weight?: regular, active // Jon?
    }

    advice?: {
        zeroPadding?
        state // Jon?
    }

    unit?: {
         reserver?: string // Used to align multiple list-item with different unit
    }

    src?: {
        reserver?: string // Used to align multiple list-item with different unit
    }

}

## Readout-list-item simple

label: string | undefined
unit: string | undefined

// Numbers
hasValue: boolean = true
value: number | null // Null should show a dash
hasSetpoint: boolean = false
setpoint: number
hasAdvice: boolean = false
advice: number

options: {
// Global layout
size: enum: base, priority, enhanced
priority: enum: regular, enhanced
stacking: enum: leading-unit, trailing-unit, leading-src
clickable: false | true | { // Jon from isInteractive default squared
border: squared, round, round-corners
}
}

    // Global options
    hasDegree: boolean = false // all items
    hasDegreeSpacer
    maxDigits // Jon?
    dataQuality: undefined, low-integrity, invalid

    alert= false | undefined | {
        ...alertFrameOptions
    }

    value?: {
        hintedZeros?
        weight?: regular, active // Jon?
        hasIcon?: boolean = false // Add a slot
    }

    setpoint?: {
        hintedZeros?
    }

    advice?: {
        hintedZeros?
    }

    unit?: {
         spaceReserver?: string // Used to align multiple list-item with different unit
    }

    src?: {
        spaceReserver?: string // Used to align multiple list-item with different unit
    }

}
