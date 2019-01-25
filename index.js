// =========================
// 撤销(Undo)管理类.
//
// @update 2019/01/25
// @author Jesonhu(github)
// @email jesonhu_web@163.com
// @inspiration https://github.com/ArthurClemens/Javascript-Undo-Manager/
// =========================

/**
 * 撤销(Undo)管理类.
 */
class UndoManager {
  constructor(options = {}) {
    this.init(options);
  }
  init(options) {
    this.initData(options);
  }
  initData(options) {
    /** 撤销的内容. */
    this.commands = [];
    /** 当前撤销的索引 */
    this.index = -1;
    /** 次数限制 */
    this.limit = options.limist || 5;
    /** 是否正在执行 Undo/Redo 事件. */
    this.isExecuting = false;
    /** 处理回调 */
    this.callback = null;
  }
  /**
   * 执行. 
   */
  execute(command, action) {
    if (!command || typeof command[action] !== 'function') return this;

    this.isExecuting = true;
    command[action]();
    // command[action].apply(this);
    this.isExecuting = false;
    return this;
  }
  /**
   * Add a command to the queue. 
   * 
   * @param {} command
   */
  add(command) {
    if (this.isExecuting) return this;

    const commands = this.commands;
    const callback = this.callback;
    
    commands.splice(this.index + 1, commands.length - this.index);

    commands.push(command);

    // 设置了次数限制.
    if (this.limit && commands.length > this.limit) {
      const to = -(this.limit + 1);
      removeFromTo(commands, 0, to);
    }

    // 设置当前索引.
    this.index = commands.length - 1;
    if (callback) callback;

    return this;
  }

  /**
   * set after undo and redo actions. 
   */
  setCallback(callbackFunc) {
    if (typeof callbackFunc !== 'function') return this;
    this.callback = callbackFunc;
  }
  /**
   * 
   */
  undo() {
    const command = this.commands[this.index];
    const callback = this.callback;

    if (!command) return this;
    this.execute(command, 'undo');
    this.index -= 1;
    if (callback) callback();

    return this;
  }
  /**
   * 
   */
  redo() {
    const command = this.commands[this.index + 1];
    const callback = this.callback;
    if (!command) return this;
    this.execute(command, 'redo');
    this.index += 1;

    if (callback) callback();

    return this;
  }
  /**
   * 清除所有数据. 
   */
  clear() {
    const commandsLen = this.commands.length;
    const callback = this.callback;

    this.commands = [];
    this.index = -1;

    if (callback && (commandsLen > 0)) callback();
  }
  isHasUndo() {
    return this.index !== -1;
  }
  isHasRedo() {
    const commands = this.commands;
    return this.index < (commands.length - 1);
  }
  getCommands() {
    return this.commands();
  }
  getIndex() {
    return this.index;
  }
  setLimit(limit) {
    this.limit = limit;
  }
}

/**
 * 我来自哪里，想去哪？
 * 
 * @parma {Array} arr
 * @param {} from
 * @param {} to 
 */
function removeFromTo(arr, from , to) {
  if (!Array.isArray(arr)) return;
  const deleteCount = !to || 1 + to - from + (!(to < 0 ^ from >= 0) && (to < 0 || -1) * arr.length);
  arr.splice(from, deleteCount);

  return arr.length;
}


// 模块导出
if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {
  // AMD. Register as an anonymous module.
  define(function() {
    return UndoManager;
  });
} else if (typeof module !== 'undefined' && module.exports) {
  module.exports = UndoManager;
} else {
  window.UndoManager = UndoManager;
}
