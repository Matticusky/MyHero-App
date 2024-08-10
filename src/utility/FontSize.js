import { RFValue } from "./ResponsiveSize";

const FontSize = {
    // EXAMPLE: require("your path") | File
    BODY_TEXT: RFValue(16),
    VALUE: (number) => RFValue(number),
}

export default FontSize;