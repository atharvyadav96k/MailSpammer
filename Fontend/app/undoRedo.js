import { storeForm } from "./storeFormLocally.js";
import { idStorage } from "./UniqueStack.js";
import { canvasState } from "./canvas.js";
import { updateToCloud } from "./updateChanges/updateToCloud.js";

class SimpleUndo {
    constructor(initialState) {
        this.stack = [initialState];
        this.currentIndex = 0;
        this.version = 0;
    }

    do(newState) {
        this.stack = this.stack.slice(0, this.currentIndex + 1);
        this.stack.push(newState);
        this.currentIndex++;
        this.version++;
        console.log(this.version)
        storeForm(canvasState(), idStorage.getAll(), this.version);
        updateToCloud(canvasState(), idStorage.getAll(), this.version);
    }

    undo() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
        } else {
            throw new Error("Nothing to undo");
        }
    }

    redo() {
        if (this.currentIndex < this.stack.length - 1) {
            this.currentIndex++;
        } else {
            throw new Error("Nothing to redo");
        }
    }

    getState() {
        return this.stack[this.currentIndex];
    }
}

export const undoRedo = new SimpleUndo("");