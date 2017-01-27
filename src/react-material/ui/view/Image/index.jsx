let classNames = require("react-material/ui/view/Image/classNames")
let React      = require("react")

module.exports = ({
    className,
    height,
    src,
    width,
    ...props
}) => 
    <div
        className={[className, classNames.Image].join(" ")}
        style={{
            backgroundImage: "url(" + src + ")",
            height         : height + "px",
            width          : width + "px"
        }}
    >
        <img
            {...props}
            height={height}
            src={src}
            width={width}
        />
    </div>
