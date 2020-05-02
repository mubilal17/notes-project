
class Repository {
    getPage()
    {
        return {
            id: 3,
            title: "Test Page",
            elements: [
                { type: 'p', content: 'Test Page element 1' },
                { type: 'p', content: 'Test Page element 2' }
            ]
        };
    }
}
export {Repository};
