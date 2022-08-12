/*
  Based on -> https://github.com/ankeetmaini/react-infinite-scroll-component
*/

import { Component, ReactNode, CSSProperties } from 'react';
import { throttle } from 'throttle-debounce';
import { ThresholdUnits, parseThreshold } from 'src/utils/threshhold';

type Fn = () => any;
export interface Props {
  next: Fn;
  hasMore: boolean;
  children: ReactNode;
  loader: ReactNode;
  scrollThreshold?: number | string;
  endMessage?: ReactNode;
  style?: CSSProperties;
  scrollableTarget?: ReactNode;
  inverse?: boolean;
  dataLength: number;
  initialScrollY?: number;
  className?: string;
}

interface State {
  showLoader: boolean;
  pullToRefreshThresholdBreached: boolean;
  prevDataLength: number | undefined;
}

export default class InfiniteScroll extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      showLoader: false,
      pullToRefreshThresholdBreached: false,
      prevDataLength: props.dataLength,
    };

    this.throttledOnScrollListener = throttle(150, this.onScrollListener).bind(
      this
    );
    this.onStart = this.onStart.bind(this);
    this.onMove = this.onMove.bind(this);
    this.onEnd = this.onEnd.bind(this);
  }

  private throttledOnScrollListener: (e: MouseEvent) => void;
  private _scrollableNode: HTMLElement | undefined | null;
  private el: HTMLElement | undefined | (Window & typeof globalThis);
  private _infScroll: HTMLDivElement | undefined;
  private lastScrollTop = 0;
  private actionTriggered = false;

  // variables to keep track of pull down behaviour
  private startY = 0;
  private currentY = 0;
  private dragging = false;

  componentDidMount() {
    if (typeof this.props.dataLength === 'undefined') {
      throw new Error(
        `mandatory prop "dataLength" is missing. The prop is needed` +
          ` when loading more content.`
      );
    }

    this._scrollableNode = this.getScrollableTarget();
    this.el = this._scrollableNode || window;

    if (this.el) {
      this.el.addEventListener(
        'scroll',
        this.throttledOnScrollListener as EventListenerOrEventListenerObject
      );
    }

    if (
      typeof this.props.initialScrollY === 'number' &&
      this.el &&
      this.el instanceof HTMLElement &&
      this.el.scrollHeight > this.props.initialScrollY
    ) {
      this.el.scrollTo(0, this.props.initialScrollY);
    }
  }

  componentWillUnmount() {
    if (this.el) {
      this.el.removeEventListener(
        'scroll',
        this.throttledOnScrollListener as EventListenerOrEventListenerObject
      );
    }
  }

  componentDidUpdate(prevProps: Props) {
    // do nothing when dataLength is unchanged
    if (this.props.dataLength === prevProps.dataLength) return;

    this.actionTriggered = false;

    // update state when new data was sent in
    this.setState({
      showLoader: false,
    });
  }

  static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    const dataLengthChanged = nextProps.dataLength !== prevState.prevDataLength;

    // reset when data changes
    if (dataLengthChanged) {
      return {
        ...prevState,
        prevDataLength: nextProps.dataLength,
      };
    }
    return null;
  }

  getScrollableTarget = () => {
    if (this.props.scrollableTarget instanceof HTMLElement)
      return this.props.scrollableTarget;
    if (typeof this.props.scrollableTarget === 'string') {
      return document.getElementById(this.props.scrollableTarget);
    }
    return null;
  };

  onStart: EventListener = (evt: Event) => {
    if (this.lastScrollTop) return;

    this.dragging = true;

    if (evt instanceof MouseEvent) {
      this.startY = evt.pageY;
    } else if (evt instanceof TouchEvent) {
      this.startY = evt.touches[0].pageY;
    }
    this.currentY = this.startY;

    if (this._infScroll) {
      this._infScroll.style.willChange = 'transform';
      this._infScroll.style.transition = `transform 0.2s cubic-bezier(0,0,0.31,1)`;
    }
  };

  onMove: EventListener = (evt: Event) => {
    if (!this.dragging) return;

    if (evt instanceof MouseEvent) {
      this.currentY = evt.pageY;
    } else if (evt instanceof TouchEvent) {
      this.currentY = evt.touches[0].pageY;
    }

    // user is scrolling down to up
    if (this.currentY < this.startY) return;

    if (this._infScroll) {
      this._infScroll.style.overflow = 'visible';
      this._infScroll.style.transform = `translate3d(0px, ${
        this.currentY - this.startY
      }px, 0px)`;
    }
  };

  onEnd: EventListener = () => {
    this.startY = 0;
    this.currentY = 0;

    this.dragging = false;

    requestAnimationFrame(() => {
      // this._infScroll
      if (this._infScroll) {
        this._infScroll.style.overflow = 'auto';
        this._infScroll.style.transform = 'none';
        this._infScroll.style.willChange = 'unset';
      }
    });
  };

  isAtTop(target: HTMLElement, scrollThreshold: string | number = 0.8) {
    const clientHeight =
      target === document.body || target === document.documentElement
        ? window.screen.availHeight
        : target.clientHeight;

    const loader = document.querySelector('.ChannelSpinner_Top');
    const threshold = parseThreshold(loader?.scrollHeight ?? scrollThreshold);

    if (threshold.unit === ThresholdUnits.Pixel) {
      return (
        target.scrollTop <=
        threshold.value + clientHeight - target.scrollHeight + 50
      );
    }

    return (
      target.scrollTop <=
      threshold.value / 100 + clientHeight - target.scrollHeight + 1
    );
  }

  isAtBottom(target: HTMLElement, scrollThreshold: string | number = 0.8) {
    const clientHeight =
      target === document.body || target === document.documentElement
        ? window.screen.availHeight
        : target.clientHeight;

    const threshold = parseThreshold(scrollThreshold);

    if (threshold.unit === ThresholdUnits.Pixel) {
      return (
        target.scrollTop + clientHeight >= target.scrollHeight - threshold.value
      );
    }

    return (
      target.scrollTop + clientHeight >=
      (threshold.value / 100) * target.scrollHeight
    );
  }

  onScrollListener = (event: MouseEvent) => {
    const target = this._scrollableNode
      ? (event.target as HTMLElement)
      : document.documentElement.scrollTop
      ? document.documentElement
      : document.body;

    // return immediately if the action has already been triggered,
    // prevents multiple triggers.
    if (this.actionTriggered) return;

    const atBottom = this.props.inverse
      ? this.isAtTop(target, this.props.scrollThreshold)
      : this.isAtBottom(target, this.props.scrollThreshold);

    // call the `next` function in the props to trigger the next data fetch
    if (atBottom && this.props.hasMore) {
      this.actionTriggered = true;
      this.setState({ showLoader: true });
      this.props.next && this.props.next();
    }

    this.lastScrollTop = target.scrollTop;
  };

  render() {
    const style = {
      WebkitOverflowScrolling: 'touch',
      ...this.props.style,
    } as CSSProperties;

    return (
      <div className="infinite-scroll-component__outerdiv">
        <div
          className={this.props.className}
          ref={(infScroll: HTMLDivElement) => (this._infScroll = infScroll)}
          style={style}
        >
          {this.props.children}
          {!this.state.showLoader && this.props.hasMore && this.props.loader}
          {this.state.showLoader && this.props.hasMore && this.props.loader}
          {!this.props.hasMore && this.props.endMessage}
        </div>
      </div>
    );
  }
}
