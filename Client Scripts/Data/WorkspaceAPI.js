class WorkspaceAPI
{
    async fetch()
    {
        const data = await fetch('/workspace');
        console.log(await data.json());
    }
}

module.exports = WorkspaceAPI;