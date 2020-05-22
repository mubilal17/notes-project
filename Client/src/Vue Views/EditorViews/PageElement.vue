
<template class="m-0 p-0">
    <form v-bind:id="elementId" v-on:dragover="dragOver" v-on:drop="drop" v-on:submit.prevent
          v-on:dragenter="onDragEnter" v-on:dragleave="onDragLeave" class="m-0 p-0">
        <div class="form-row">
            <div class="col align-middle pt-2">
                <a class="border-0 material-icons hover-icon" v-on:click="onDeleteClick">close</a>
                <a class="border-0 material-icons hover-icon" draggable="true" v-on:dragstart="drag">drag_handle</a>
            </div>
            <div class="col-11">
                <input v-bind:id="elementId + 'input'"
                       class="form-control border-0" v-model="element.content"
                       placeholder="Content goes here..."
                       v-bind:class="{shadow: showShadow}"
                       v-on:input="onInputChange"
                       v-on:keyup.enter="onKeyEnter"
                       v-on:focusin="isFocused = true" v-on:focusout="isFocused = false"
                       v-on:mouseenter="isHovered = true" v-on:mouseleave="isHovered = false" />
            </div>
        </div>
        <hr v-if="isDragHovered" />
    </form>
</template>



<script>
    export default {
        created: function ()
        {
        },
        data: function ()
        {
            return { isFocused: false, isHovered: false, isDragHovered: false};
        },
        computed: {
            showShadow: function ()
            {
                return this.isFocused || this.isHovered;
            },
            elementId: function ()
            {
                return 'pageElement' + this.element.id;
            },
        },
        props: ['element'],
        methods: {
            onDragEnter: function (event)
            {
                this.isDragHovered = true;
            },
            onDragLeave: function ()
            {
                this.isDragHovered = false;
            },
            onInputChange: function (event)
            {
                //console.log(event);
            },
            onKeyEnter: function (event)
            {
                this.$emit('onkeyenter', { elementId: this.element.id, index: this.element.index });
            },
            dragOver: function (event)
            {
                event.preventDefault();
            },
            drag: function (event)
            {
                let element = this.element;
                event.dataTransfer.setData('elementId', element.id);
                event.dataTransfer.setData('elementIndex', element.index);
            },
            drop: function (event)
            {
                let elementId = event.dataTransfer.getData('elementId');
                let elementIndex = event.dataTransfer.getData('elementIndex');
                this.isDragHovered = false;
                if (elementId != this.element.id)
                {
                    const elementReorderedEvent = { elementId: elementId, index: this.element.index, isPlaceBefore: elementIndex < this.element.index};
                    this.$emit('elementReordered', elementReorderedEvent);
                }
            },
            onDeleteClick: function (event)
            {
                this.$emit('onDeleteClick', { elementId: this.element.id });
            }
        }
    }
</script>

<style scoped>
    input {
        font-size: 1.25em;
    }

    hr {
        height: 1px;
        margin: 0px;
        padding: 0px;
    }

    .hover-icon {
        opacity: 0;
    }

    .hover-icon:hover {
        background-color: darkgray;
        border-radius: 1em;
    }

    form:hover .hover-icon {
        animation-name: hoverIconAnim;
        animation-duration: 0.5s;
        animation-fill-mode: forwards;
    }

    @keyframes hoverIconAnim {
        from {
            opacity: 0;
        }

        to {
            opacity: 0.5;
        }
    }


</style>