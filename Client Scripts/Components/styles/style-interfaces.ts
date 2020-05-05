interface GridSpan {
    mobile: number,
    tablet: number,
    medium: number,
    large: number
}

interface Responsitivity {
    displayMobile: boolean,
    span: GridSpan
}

interface ColorTheme {
    primary: string,
    content: string,
    secondary: string
}

interface WhiteSpace {
    isContainer: boolean,
    margins: number,
    padding: number
}

interface TextFont {
    font: string,
    fontSize: number
    textSize: number,
    lineHeight: number,
}

export {GridSpan, Responsitivity, ColorTheme, WhiteSpace, TextFont};