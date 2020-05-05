import {GridSpan, Responsitivity, WhiteSpace, TextFont, ColorTheme} from "./style-interfaces";

class ComponentStyle {
    gridspan: GridSpan;
    responsitivity: Responsitivity;
    whitespace: WhiteSpace;
    text: TextFont;

    constructor(gridspan: GridSpan, responsitivity: Responsitivity, whitespace: WhiteSpace, text: TextFont)
    {
        this.gridspan = gridspan;
        this.responsitivity = responsitivity;
        this.whitespace = whitespace;
        this.text = text;
    }

}

export {ComponentStyle}