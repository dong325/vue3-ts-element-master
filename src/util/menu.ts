/**
 * title: 标题
 * icon: 图标
 * index: 路由地址
 * children: 子节点
 * affix: 选项卡项是否可以关闭
 */
export default [
    {
        "title": "首页",
        "icon": "1",
        "index": "/home",
        "children": [],
        "affix": true,
    },
    {
        "title": "一级标题",
        "icon": "1",
        "index": "/oneLevel",
        "children": [
            {
                "title": "二级标题1",
                "icon": "1",
                "index": "/twoLevel1",
                "children": []
            },
            {
                "title": "二级标题2",
                "icon": "1",
                "index": "/twoLevel2",
                "children": []
            },
            {
                "title": "二级标题3",
                "icon": "1",
                "index": "/twoLevel3",
                "children": [
                    {
                        "title": "三级标题1",
                        "icon": "1",
                        "index": "/threeLevel1",
                        "children": []
                    },
                    {
                        "title": "三级标题2",
                        "icon": "1",
                        "index": "/threeLevel2",
                        "children": []
                    }
                ]
            }
        ]
    }
]