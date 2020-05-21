<template>
    <div id="editor-container" class="col-12 col-lg-10 col-xl-10">
        <div id="editor" class="container bg-white shadow w-100 vh-100 px-4 pt-2 border rounded">
            <transition name="fade">
                <div v-if="showContents">
                    <header class="mt-5 px-3 py-3 pb-1  display-4" style="font-size: 25px">
                        <span class="text-muted"> {{sectionTitle}} / </span>
                        <input class="page-title" type="text" v-model:value="page.title" v-on:input="$emit('pageTitleChange', $event)" />
                        <hr />
                    </header>

                    <div class="m-5">
                        <div v-for="element in page.elements" class="m-0 p-0">
                            <PageElement v-bind:element="element"
                                         v-on:inputModified="$emit('pageElementModified', $event)"
                                         v-on:elementReordered="onPageElementReordered" />
                        </div>
                        <button class="btn btn-sm btn-outline-light text-muted border-0 ml-5" href="#"
                                v-on:click="addNewElementToPage">
                            <span class="material-icons align-middle py-1">vertical_align_top</span>
                            Add New Element
                        </button>
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>

<script>
    import PageElement from './EditorViews/PageElement.vue';

    export default {
        props: ['page', 'section-title', 'onAddNewElementClick', 'show-contents'],
        methods: {
            addNewElementToPage: function(event) {
                this.page.appendNewElement()
                this.$emit('newElementToPage', event);
            },
            onPageElementReordered: function (event)
            {
                this.page.moveElementTo(event.elementId, event.index, event.isPlaceBefore);
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

    .fade-enter-active {
        transition: all .1s linear;
    }

    .fade-leave-active {
        transition: all .1s linear;
    }

    .fade-enter, .fade-leave-to {
        opacity: 0.4;
    }
</style>