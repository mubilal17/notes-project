<template>
    <div id="editor-container" class="col-9">
        <div id="editor" class="container bg-white shadow w-100 vh-100 px-4 pt-2 border rounded">
            <header class="mt-5 px-3 py-3 pb-1  display-4" style="font-size: 25px" >
                <span class="text-muted"> {{sectionTitle}} / </span>
                <input class="page-title" type="text" v-model:value="page.title" />
                <hr />
            </header>

            <div class="m-5">
                <div v-for="element in page.elements">
                    <PageElement v-bind:element="element" />
                </div>
                <button class="btn btn-sm btn-outline-light text-muted border-0 ml-5" href="#"
                    v-on:click="addNewElementToPage">
                    <span class="material-icons align-middle py-1">vertical_align_top</span>
                    Add New Element
                </button>
            </div>
        </div>
    </div>
</template>

<script>
    import PageElement from './EditorViews/PageElement.vue';

    export default {
        props: ['page', 'section-title', 'onAddNewElementClick'],
        methods: {
            addNewElementToPage: function() {
                this.page.appendNewElement()
            }
        },
        components: {
            PageElement: PageElement
        }
    };
</script>


<style scoped>
    .page-title {
        border: none;
        font-weight: lighter;
    }
</style>