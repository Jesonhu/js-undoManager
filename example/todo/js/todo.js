;(function(win, doc) {
  const page = {
    init() {
      this.initData();
      this.initEvent();
    },
    initData() {
      this.initUndoManager();
      this.times = 0;
    },
    initUndoManager() {
      const self = this;
      this.undoManager = new win.UndoManager();
      // this.undoManager.setCallback(this.changeTimes);
    },
    initEvent() {
      const self = this;
      // `+` 按钮点击
      doc.querySelector('.btn-add').addEventListener('click', () => {
        self.changeTimes(true);

        // add undoManager commant stack
        this.undoManager.add({
          undo: function() {
            self.changeTimes(false);
          },
          redo: function() {
            self.changeTimes(true);
          }
        });
      });
      // `-` 按钮点击
      doc.querySelector('.btn-reduce').addEventListener('click', () => {
        self.changeTimes(false);

        // add undoManager commant stack
        this.undoManager.add({
          undo() {
            self.changeTimes(true);
          },
          redo() {
            self.changeTimes(false);
          }
        });
      });
      // `Undo` 按钮点击
      doc.querySelector('.btn-undo').addEventListener('click', () => {
        console.log('undoManager', self.undoManager);
        self.undoManager.undo();
      });
      // `redo` 按钮点击
      doc.querySelector('.btn-redo').addEventListener('click', () => {
        self.undoManager.redo();
      });
      // `清除所有` 按钮点击
      doc.querySelector('.btn-clear').addEventListener('click', () => {
        self.undoManager.clear();
      });
      
    },
    changeTimes(mark) {
      let times = this.times;
      // console.table([['changeTimes'], [_times], [mark], [this]]);
      if (mark) {
        times++;
        if (times > this.undoManager.limit) return;
      } else {
        times--;
        if (times < 0) return;
      }
      this.times = times;
      
      this.updateTimes(this.times);
    },
    updateTimes(times) {
      const oValue = doc.querySelector('.value');
      oValue.innerHTML = times;
    }
  }
  page.init();
})(window, document);