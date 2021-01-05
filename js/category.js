window.pageTools = pageTools || {};
(function() {
  function Category(el, data, callback) {
    this.el = $(el || '');
    this.data = data || [];
    this.callback = callback;
    this.createView();
  }
  Category.prototype.createView = function() {
    var _this = this;   // 缓存对象
    // 创建分类一级菜单
    var category_menu = $('<ul class="category-menu"></ul>');
    this.el.append(category_menu);
    this.data.forEach(function(item) {
      var category_menu_item = $('<li><a href="#">' + item.title + '</a></li>');
      category_menu.append(category_menu_item);

      category_menu_item.mouseenter(function(item) {
        return function(e) {
          e.preventDefault(); // 阻止a标签的默认行为
          _this.callback($(this).text()); // 回调函数模拟处理

          if($('.category-sub-menu')) {   // 如果分类二级菜单有内容，则先清空内容，后续再添加当前一级菜单下的二级菜单的内容
            $('.category-sub-menu').remove();
          }
          // 创建分类二级菜单
          var category_sub_menu = $('<ul class="category-sub-menu"></ul>');
          $(this).append(category_sub_menu);
          category_sub_menu.css('width', category_sub_menu.css('width')!='10rem' ? '10rem' : '0');
          item.des.forEach(function(info) {
            var sub_menu_item = $('<li><a href="#">' + info.title +'</a></li>');
            category_sub_menu.append(sub_menu_item);
          })
        }
      }(item)).mouseleave(function() {
        $('.category-sub-menu').remove();
      })
    }.bind(this))
  }

  window.pageTools.Category = Category;
})();