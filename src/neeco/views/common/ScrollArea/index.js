import style from "neeco/views/common/ScrollArea/style"
import React from "react"

export default class extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            ready: false,
            top : 0,
            left: 0,
            childrenWrapperHeight: null,
            childrenWrapperWidth: null,
            scrollAreaHeight: null,
            scrollAreaWidth: null,
            vMovement: 0,
            hMovement: 0,
            dragging: false,
            start: [0, 0]
        }
    }
    
    componentDidMount() {
        this.calculateSize()

        window.addEventListener("resize", this.calculateSize.bind(this))
    }

    componentWillUnmount(){
        window.removeEventListener("resize", this.calculateSize.bind(this))
    }

    render() {
        return (
          <div
            className={style.ScrollArea + " " + this.props.className}
            ref="scrollArea"
            style={this.props.style}
          >
            <div
              className={style.ChildrenWrapper}
              ref="childrenWrapper"
              onWheel={(e) => {
                e.preventDefault()

                this.calculateSize(() => {
                    let num = 53

                    let shifted = e.shiftKey

                    let scroll = [
                        e.deltaX > 0 ? num : -num,
                        e.deltaY > 0 ? num : -num
                    ]

                    if (shifted && e.deltaX == 0)
                        scroll[0] = e.deltaY > 0 ? num : -num

                    let next_position = [
                        this.state.left + scroll[0],
                        this.state.top  + scroll[1]
                    ]

                    let scrollable = [
                        this.state.childrenWrapperWidth  > this.state.scrollAreaWidth,
                        this.state.childrenWrapperHeight > this.state.scrollAreaHeight
                    ]

                    if (shifted && scrollable[0])
                        this.normalizeHorizontal(next_position[0])

                    if (!shifted && scrollable[1])
                        this.normalizeVertical(next_position[1])
                 })
              }}
              onTouchStart={(e) => {
                  e.preventDefault()

                  e = e.changedTouches ? e.changedTouches[0] : e

                  this.calculateSize(() => {
                      this.setState({
                          dragging: true,
                          start: [e.pageX, e.pageY]
                      })
                  })
              }}
              onTouchMove={(e) => {
                  if (this.state.dragging) {
                      e.preventDefault()
                      e = e.changedTouches ? e.changedTouches[0] : e

                      let movement = [
                          this.state.start[0] - e.clientX,
                          this.state.start[1] - e.clientY
                      ]

                      this.setState({
                          start: [e.clientX, e.clientY]
                      })

                      let nextX = this.state.left + movement[0]
                      let nextY = this.state.top  + movement[1]

                      this.normalizeVertical(nextY)
                      this.normalizeHorizontal(nextX)
                  }
              }}
              onTouchEnd={(e) => {
                  this.setState({dragging: false})
              }}
              style={{
                  marginTop : this.state.top  * -1 + "px",
                  marginLeft: this.state.left * -1 + "px"
              }}
            >
              {this.props.children}
            </div>
          </div>
        )
    }

    scrollToY(y) {
        this.normalizeVertical(y)
    }

    scrollToX(x) {
        this.normalizeVertical(x)
    }

    normalizeVertical(next) {
        let elementSize = this.getSize()

        let lowerEnd = elementSize.childrenWrapperHeight - elementSize.scrollAreaHeight

        if (next > lowerEnd)
            next = lowerEnd
        else if (next < 0)
            next = 0

        this.setState({
            top: next,
            vMovement: next / elementSize.childrenWrapperHeight * 100
        })
    }

    normalizeHorizontal(next) {
        let elementSize = this.getSize()
        let rightEnd = elementSize.childrenWrapperWidth - this.state.scrollAreaWidth

        if (next > rightEnd)
            next = rightEnd;
        else if (next < 0)
            next = 0

        this.setState({
            left: next,
            hMovement: next / elementSize.childrenWrapperWidth * 100
        })
    }

    handleScrollbarDragging() {
        this.setState({dragging: true})
    }

    handleScrollbarStopDrag() {
        this.setState({dragging: false})
    }

    getSize(){
        let childrenWrapper = this.refs.childrenWrapper
        let scrollArea = this.refs.scrollArea

        return {
            childrenWrapperWidth : childrenWrapper.children[0].clientWidth,
            childrenWrapperHeight: childrenWrapper.children[0].clientHeight,
            scrollAreaWidth      : scrollArea.clientWidth,
            scrollAreaHeight     : scrollArea.clientHeight
        }
    }

    calculateSize(cb){
        if (typeof cb !== 'function')
            cb = null;

        let {
            scrollAreaWidth,
            scrollAreaHeight,
            childrenWrapperWidth,
            childrenWrapperHeight
        } = this.getSize()

        return this.setState({
            childrenWrapperWidth : childrenWrapperWidth,
            childrenWrapperHeight: childrenWrapperHeight,
            scrollAreaWidth      : scrollAreaWidth,
            scrollAreaHeight     : scrollAreaHeight,
            ready: true
        })
    }
}
