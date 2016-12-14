var classNames = require("neeco/ui/view/Editor/classNames")
var React      = require("react")

module.exports = class extends React.Component {
    componentWillMount() {
        this.setState({
        })
    }

    componentDidMount() {
    }
  
    componentWillUnmount() {
    }

    render() {
        var {
            children
        } = this.props

        return (
            <div
                className={classNames.Editor}
            >
                <div
                    className={classNames.Toolbar}
                >
                    <span
                        className={classNames.BoldButton}
                    />
                    <span
                        className={classNames.ItalicButton}
                    />
                    <span
                        className={classNames.UnderlineButton}
                    />
                    <span
                        className={classNames.TextColorButton}
                    />
                </div>
                <section
                    className={classNames.Content}
                    contentEditable
                    suppressContentEditableWarning={true}
                >
                    {children}
                </section>
            </div>
        )
    }
}

