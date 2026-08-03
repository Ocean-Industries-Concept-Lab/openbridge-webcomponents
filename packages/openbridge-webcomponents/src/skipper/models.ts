export enum InnerWatchFaceType {
    REGULAR = "REGULAR",
    PORT_STARBOARD = "PORT_STARBOARD",
    POSITIVE_NEGATIVE = "POSITIVE_NEGATIVE"
}

export type  InnerWatchFaceTypeString = keyof typeof InnerWatchFaceType;

export enum WidthSize {
    MIN = "MIN",
    REGULAR  = "REGULAR",
    MAX = "MAX"
}
export type WidthSizeStrings = keyof typeof WidthSize;
