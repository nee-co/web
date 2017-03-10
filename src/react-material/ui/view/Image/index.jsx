let React    = require("react")
let ReactDOM = require("react-dom")

let classNames = require("react-material/ui/view/Image/classNames")

module.exports = ({
    className,
    alt,
    crossOrigin,
    height,
    onLoad,
    sizes,
    src,
    srcSet,
    style,
    width,
    ...props
}) =>
    <span
        className={[className, classNames.Host].join(" ")}
        style={{
            backgroundImage: src && "url(" + src + ")",
            width          : width != undefined ? width + "px"
                           :                      undefined,
            height         : height != undefined ? height + "px"
                           :                       undefined,
            ...style
        }}
        {...props}
    >
        <img
            alt={alt}
            crossOrigin={crossOrigin}
            height={height}
            onLoad={onLoad}
            sizes={sizes}
            src={src}
            srcSet={srcSet}
            width={width}
        />
    </span>

