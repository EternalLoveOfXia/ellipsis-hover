export class Tooltip {
  constructor(id) {
    this.tooltip = null;
    this.viewportWidth = window.innerWidth || document.documentElement.clientWidth;
    this.viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    this._id = id;
    this._init();
  }

  _init() {
    // 初始化提示框
    this.tooltip = document.createElement('div');
    this.tooltip.id = this._id;
    this.tooltip.style.cssText = `
      position: fixed;
      left:0;
      top:0;
      opacity: 0; 
      z-index: -9999;
    `
    document.body.appendChild(this.tooltip);
    // 监听浏览器窗口大小变化事件
    window.addEventListener('resize', () => {
      this.viewportWidth = window.innerWidth || document.documentElement.clientWidth;
      this.viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    })
  }

  show() {
    // 显示提示框
    this.tooltip.style.opacity = 1;
    this.tooltip.style.zIndex = 9999;
  }
  hide() {
    // 隐藏提示框
    this.tooltip.style.opacity = 0;
    this.tooltip.style.zIndex = -9999;
  }
  update(content) {
    // 更新提示框内容
    this.tooltip.textContent = content;
  }
  destroy() {
    // 销毁提示框
    document.body.removeChild(this.tooltip);
  }
  // 添加类
  addClass(className) {
    this.tooltip.classList.add(className);
  }
  // 移除类
  removeClass(className) {
    this.tooltip.classList.remove(className);
  }
  // 计算x方向与y方向偏移量
  calculateOffset(rect) {
    const { left, top, width, height, right, bottom } = rect;
  
    // 获取提示框的宽高
    const tooltipWidth = this.tooltip.offsetWidth;
    const tooltipHeight = this.tooltip.offsetHeight;
    
    // 提示框显示在正下方并居中显示
    let tooltipX = left + (width - tooltipWidth) / 2;
    let tooltipY = bottom;
    
    // 应用基本的 transform 属性
    this.tooltip.style.transform = `translate(${tooltipX}px, ${tooltipY}px)`;
    
    // 获取包含 transform 属性后的布局信息
    const tooltipRect = this.tooltip.getBoundingClientRect();
    
    // 计算是否超出视窗边界
    let transformX = 0;
    let transformY = 0;
    
    if (tooltipRect.right > this.viewportWidth) {
      transformX = this.viewportWidth - tooltipRect.right;
    } else if (tooltipRect.left < 0) {
      transformX = -tooltipRect.left;
    }
    
    if (tooltipRect.bottom > this.viewportHeight) {
      tooltipY = top - tooltipRect.height;
    } else if (tooltipRect.top < 0) {
      transformY = bottom;
    }
    
    // 应用最终的 transform 属性
    this.tooltip.style.transform = `translate(${tooltipX + transformX}px, ${tooltipY + transformY}px)`;
  }
}