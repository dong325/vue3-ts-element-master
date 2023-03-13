// 获取菜单第一项
export const getFirstMenu = (obj: any, result: any) => {
    if (obj.children && obj.children.length) {
        obj.children.forEach((item:any) => {
            getFirstMenu(item, result)
        });
    } else {
        result.defaltActive = obj.index;
        result.breadList.push(obj)
        result.tagList.push(obj)
    }
}

// 浏览器前进后退: 根据index定位菜单
export const forIndexGetTitle = (data: any[], index: string, arr: string[]) => {
    for (var i = 0; i < data.length; i++) {
      if (data[i].children && data[i].children.length) {
        arr.push(data[i]);
        forIndexGetTitle(data[i].children, index, arr);
      } else {
        if (data[i].index == index) {
          arr.push(data[i]);
          return;
        }
      }
    }
};