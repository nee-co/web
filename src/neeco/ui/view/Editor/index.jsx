let React = require("react")

let classNames = require("neeco/ui/view/Editor/classNames")

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
        let {
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

