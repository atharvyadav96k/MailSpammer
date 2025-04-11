class UniqueCollection {
    constructor() {
        this.items = [];
        this.set = new Set();
    }

    push(value) {
        if (!this.set.has(value)) {
            this.items.push(value);
            this.set.add(value);
        } else {
            console.log(`Value "${value}" already exists.`);
        }
        this.print();
    }

    pop() {
        if (this.items.length === 0) return null;
        const value = this.items.pop();
        this.set.delete(value);
        this.print();
        return value;
    }

    delete(value) {
        if (this.set.has(value)) {
            this.items = this.items.filter(item => item !== value);
            this.set.delete(value);
            console.log(`Deleted "${value}" from collection.`);
        } else {
            console.log(`Value "${value}" not found.`);
        }
        this.print();
    }

    getAll() {
        return [...this.items];
    }

    print() {
        console.log('Current Values:', [...this.items]);
    }

    setId(ids){
        this.items = ids;
    }
}

export const idStorage = new UniqueCollection();