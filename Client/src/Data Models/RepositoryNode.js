
class RepositoryNode {


    constructor() {
        this.onUpdate = null;
        return new Proxy(this, {
            set: (obj, property, value) => {
                obj[property] = value;
                if (this.onUpdate != null) {
                    this.updateHandler(obj, property);
                }
                return true;
            }
        });
    }

    onPropertyUpdate(updateHandler) {
        this.updateHandler = updateHandler;
    }
}

export { RepositoryNode };