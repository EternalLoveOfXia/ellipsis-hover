import {Tooltip} from '../util/createTooltip.js'
import '../assets/css/tooltip.css';
const tooltipTest = new Tooltip('tooltip-test');
tooltipTest.addClass('tooltip-type1')


export default{
  mounted(el,binding,vnode){
    // 默认将使用该指令的元素display设置为inline-block;
    el.style.display = 'inline-block';
    let lineClamp = 1;
    let width
    if(binding.value){
      lineClamp = binding.value.lineClamp || 1;
      width = binding.value.width;
    }
    // 判断是否设置了宽度，如果没有设置，则使用默认宽度（这里设置默认宽度为父元素宽度、若没有父元素则抛出错误）
    if (!width) {
      const parent = el.parentNode;
      if (!parent) {
        throw new Error('未设置宽度，且未找到父元素');
      }
      width = parent.clientWidth;
    }

    // 将el的宽度设置为width、单位是px
    el.style.width = width + 'px';
    // 设置文本溢出固定宽度时显示省略号
    el.style.cssText += `
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: ${lineClamp};
    -webkit-box-orient: vertical;`;
    
    // 监听鼠标移入事件
    el.addEventListener('mouseover',function(e){
      const target = e.target;
      // 获取鼠标移入的元素的内容
      const text = target.textContent;
      // 设置tooltipElement元素的内容为鼠标移入的元素的内容
      tooltipTest.update(text)
      tooltipTest.addClass('tooltip-type1')
      tooltipTest.show()
      const rect = target.getBoundingClientRect();
      tooltipTest.calculateOffset(rect)
    }); 

    el.addEventListener('mouseout', function () {
      tooltipTest.hide();
      tooltipTest.update('')
    });
  }
}