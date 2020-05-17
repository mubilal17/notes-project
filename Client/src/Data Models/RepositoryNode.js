
class RepositoryNode {

    constructor() {
        return new Proxy(this, {
            set: (obj, property, value) => {
                obj[property] = value;
                if (this.updateHandler != null) {
                    this.updateHandler(obj, property, value);
                }
                return true;
            }
        });
    }

    addOnUpdatePropertyHandler(eventHandler)
    {
        this.updateHandler = eventHandler;
    }
}

export { RepositoryNode };