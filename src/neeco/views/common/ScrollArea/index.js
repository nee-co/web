import React from 'react';

class ScrollArea extends React.Component {
    constructor() {
        super();

        this.state = {
            ready: false,
            top : 0,
            left: 0,
            scrollAreaHeight: null,
            scrollAreaWidth: null,
            scrollWrapperHeight: null,
            scrollWrapperWidth: null,
            vMovement: 0,
            hMovement: 0,
            dragging: false,
            start: [0, 0]
        }
    }
    
    componentDidMount() {
        this.calculateSize()

        window.addEventListener('resize', this.calculateSize.bind(this))
    }

    componentWillUnmount(){
        window.removeEventListener('resize', this.calculateSize.bind(this))
    }

    render() {
        return (
          <div
            className={"react-scrollbar__wrapper" + " " + this.props.className}
            onClick={this.calculateSize.bind(this) }
            ref="scrollWrapper"
            style={this.props.style}>

            <div
              className={"react-scrollbar__area" + ( this.state.dragging ? ' ' : 'react-scrollbar-transition') }
              ref="scrollArea"
              onWheel={(e) => {
                e.preventDefault()

                this.calculateSize(() => {
                    let num = this.props.speed

                    let shifted = e.shiftKey

                    let scroll = [
                        e.deltaX > 0 ? num : -(num),
                        e.deltaY > 0 ? num : -(num)
                    ]

                    if (shifted && e.deltaX == 0)
                        scroll[0] = e.deltaY > 0 ? num : -(num)

                    let next_position = [
                        this.state.left + scroll[0],
                        this.state.top  + scroll[1]
                    ]

                    let scrollable = [
                        this.state.scrollAreaWidth  > this.state.scrollWrapperWidth,
                        this.state.scrollAreaHeight > this.state.scrollWrapperHeight
                    ]

                    if (shifted && scrollable[0])
                        this.normalizeHorizontal(next_position[0])

                    if (!shifted && scrollable[1])
                        this.normalizeVertical(next_position[1])
                 })
              }}
              onTouchStart={(e) => {
                  e.preventDefault()
                  e.stopPropagation()

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
              {this.state.ready 
                  ? <VerticalScrollbar
                    area={{height: this.state.scrollAreaHeight}}
                    wrapper={{height: this.state.scrollWrapperHeight}}
                    scrolling={this.state.vMovement}
                    draggingFromParent={this.state.dragging}
                    onChangePosition={this.handleChangePosition.bind(this)}
                    onDragging={this.handleScrollbarDragging.bind(this)}
                    onStopDrag={this.handleScrollbarStopDrag.bind(this)}
                  />
                  : null
              }
              {this.state.ready
                  ? <HorizontalScrollbar
                    area={{width: this.state.scrollAreaWidth}}
                    wrapper={{width: this.state.scrollWrapperWidth}}
                    scrolling={this.state.hMovement}
                    draggingFromParent={this.state.dragging}
                    onChangePosition={this.handleChangePosition.bind(this)}
                    onDragging={this.handleScrollbarDragging.bind(this)}
                    onStopDrag={this.handleScrollbarStopDrag.bind(this)}
                  />
                  : null
              }
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

    normalizeVertical(next){
        let elementSize = this.getSize()

        let lowerEnd = elementSize.scrollAreaHeight - elementSize.scrollWrapperHeight

        if (next > lowerEnd)
            next = lowerEnd
        else if (next < 0)
            next = 0

        // Update the Vertical Value
        this.setState({
            top: next,
            vMovement: next / elementSize.scrollAreaHeight * 100
        })
    }

    normalizeHorizontal(next){
        let elementSize = this.getSize()
        let rightEnd = elementSize.scrollAreaWidth - this.state.scrollWrapperWidth

        if (next > rightEnd)
            next = rightEnd;
        else if (next < 0)
            next = 0

        this.setState({
            left: next,
            hMovement: next / elementSize.scrollAreaWidth * 100
        })
    }

    handleChangePosition(movement, orientation){
        this.calculateSize(() => {
            let next = movement / 100

            if (orientation == 'vertical')
                this.normalizeVertical(next * this.state.scrollAreaHeight)
            if (orientation == 'horizontal')
                this.normalizeHorizontal(next * this.state.scrollAreaWidth)
        })
    }

    handleScrollbarDragging() {
        this.setState({ dragging: true })
    }

    handleScrollbarStopDrag() {
        this.setState({ dragging: false })
    }

    getSize(){
        let scrollArea = this.refs.scrollArea
        let scrollWrapper = this.refs.scrollWrapper

        return {
            scrollAreaHeight   : scrollArea.children[0].clientHeight,
            scrollAreaWidth    : scrollArea.children[0].clientWidth,
            scrollWrapperHeight: scrollWrapper.clientHeight,
            scrollWrapperWidth : scrollWrapper.clientWidth,
        }
    }

    calculateSize(cb){
        if (typeof cb !== 'function')
            cb = null;

        let elementSize = this.getSize()

        if (elementSize.scrollWrapperHeight != this.state.scrollWrapperHeight
         || elementSize.scrollWrapperWidth != this.state.scrollWrapperWidth
         || elementSize.scrollAreaHeight != this.state.scrollAreaHeight
         || elementSize.scrollAreaWidth != this.state.scrollAreaWidth
        ) {
            return this.setState(
                {
                    scrollAreaHeight: elementSize.scrollAreaHeight,
                    scrollAreaWidth: elementSize.scrollAreaWidth,
                    scrollWrapperHeight: elementSize.scrollWrapperHeight,
                    scrollWrapperWidth: elementSize.scrollWrapperWidth,
                    ready: true
                },
                () => cb ? cb() : false
            )
        } else {
            return cb ? cb() : false
        }
    }
}

ScrollWrapper.propTypes = {
  speed: React.PropTypes.number,
  className: React.PropTypes.string,
  style: React.PropTypes.object
}

ScrollWrapper.defaultProps = {
  speed: 53,
  className: "",
  style: {  }
}
