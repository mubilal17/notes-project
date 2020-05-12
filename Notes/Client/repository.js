
class Repository
{
    constructor()
    {
        this.loaded = false;
        fetch('/api/workspace?workspaceId=1')
            .then(response => response.json())
            .then(data => {
                this.sections = data.sections;
            });
    }
}

module.exports = Repository;