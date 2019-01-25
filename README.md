# JS 的撤销管理类

## 使用

### 初始化
```js
const undoManager = new UndoManager();
```

### 实例对象属性说明

|属性|类型|说明|默认值|可选值|
|--|:--:|--|:--:|:--:|
|`commands`|Array|保存需要操作的内容|[]|-|
|`index`|Number|当前撤销对应的索引|-1|-|
|`limit`|Number|可以撤销的最大步数|5|-|
|`isExecuting`|Boolean|是否正在执行`undo`或`redo`功能|false|-|
|`callback`|Function|执行完毕后的回调函数|-|-|

`commands`的内容如下所示
```
[
  {
    undo: function() {},
    redo: function() {}
  },
  ...
]
```

### 实例对象方法说明

|方法名|说明|参数|返回值|
|--|--|:--:|:--:|
|`add`|添加需要撤销的功能|Object|实例对象|
|`undo`|触发 `undo` 功能|-|实例对象|
|`redo`|触发 `redo` 功能|-|实例对象|
|`clear`|清除 `undo` 和 `redo` 功能|-|实例对象|
|`execute`|触发 `undo` 或 `redo` 功能|-|实例对象|

## Demo
+ [Todo-增减数字](./example/todo/index.html)
+ [CircleDraw-画圈](./example/drawCircle/index.html)

## 参考资料
+ [https://github.com/ArthurClemens/Javascript-Undo-Manager](https://github.com/ArthurClemens/Javascript-Undo-Manager)