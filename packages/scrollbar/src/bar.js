import { on, off } from 'element-ui/src/utils/dom';
// renderThumbStyle 主要是动态计算滚动条的位置。
import { renderThumbStyle, BAR_MAP } from './util';

/* istanbul ignore next */
export default {
  name: 'Bar',

  props: {
    vertical: Boolean,
    size: String,
    move: Number
  },

  computed: {
    bar() {
      return BAR_MAP[this.vertical ? 'vertical' : 'horizontal'];
    },

    wrap() {
      return this.$parent.wrap;
    }
  },

  render(h) {
    const { size, move, bar } = this;

    return (
      <div
        class={ ['el-scrollbar__bar', 'is-' + bar.key] }
        onMousedown={ this.clickTrackHandler } >
        <div
          ref="thumb"
          class="el-scrollbar__thumb"
          onMousedown={ this.clickThumbHandler }
          style={ renderThumbStyle({ size, move, bar }) }>
        </div>
      </div>
    );
  },

  methods: {
    clickThumbHandler(e) {
      // prevent click event of right button
      if (e.ctrlKey || e.button === 2) {
        return;
      }
      this.startDrag(e);
      // debugger;

      // 滚动条的高度 - （鼠标点击位置Y坐标 - 滚动条距离顶部的高度 = 鼠标离滚动条顶部的高度）= 滚动条离底部的高度
      this[this.bar.axis] = (e.currentTarget[this.bar.offset] - (e[this.bar.client] - e.currentTarget.getBoundingClientRect()[this.bar.direction]));
    },
    /** 点击轨道时，更新视图 */
    clickTrackHandler(e) {
      // debugger;

      // 鼠标点击位置 离 滚动轨道初始位置的距离。
      const offset = Math.abs(e.target.getBoundingClientRect()[this.bar.direction] - e[this.bar.client]);

      // 滚动条半个长度
      const thumbHalf = (this.$refs.thumb[this.bar.offset] / 2);

      // 滚动条顶部位置/滚动轨道的长度（百分比）
      const thumbPositionPercentage = ((offset - thumbHalf) * 100 / this.$el[this.bar.offset]);

      // 设置视口在画布的位置
      this.wrap[this.bar.scroll] = (thumbPositionPercentage * this.wrap[this.bar.scrollSize] / 100);
    },

    startDrag(e) {

      // 阻止后续的事件处理函数的执行，以及阻止事件冒泡
      e.stopImmediatePropagation();
      this.cursorDown = true;

      on(document, 'mousemove', this.mouseMoveDocumentHandler);
      on(document, 'mouseup', this.mouseUpDocumentHandler);
      document.onselectstart = () => false;
    },

    mouseMoveDocumentHandler(e) {
      if (this.cursorDown === false) return;
      const prevPage = this[this.bar.axis];

      if (!prevPage) return;

      debugger;
      const offset = ((this.$el.getBoundingClientRect()[this.bar.direction] - e[this.bar.client]) * -1);
      const thumbClickPosition = (this.$refs.thumb[this.bar.offset] - prevPage);
      const thumbPositionPercentage = ((offset - thumbClickPosition) * 100 / this.$el[this.bar.offset]);

      // 均是计算滚动条顶点移动的距离。
      this.wrap[this.bar.scroll] = (thumbPositionPercentage * this.wrap[this.bar.scrollSize] / 100);
    },

    mouseUpDocumentHandler(e) {
      this.cursorDown = false;
      this[this.bar.axis] = 0;
      off(document, 'mousemove', this.mouseMoveDocumentHandler);
      document.onselectstart = null;
    }
  },

  destroyed() {
    off(document, 'mouseup', this.mouseUpDocumentHandler);
  }
};
