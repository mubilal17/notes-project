
<template>
    <form>
        <div  class="form-row my-3" v-on:dragover="dragOver" v-on:drop="drop">
            <div class="col align-middle p-auto" draggable="true" v-on:dragstart="drag"  >
                <span class="btn btn-outline-secondary border-0 material-icons">drag_handle</span>
            </div>
            <div class="col-11">
                <input class="form-control border-0" v-model="element.content"
                       placeholder="Content goes here..."
                       v-bind:class="{shadow: showShadow}"
                       v-on:input="onInputChange"
                       v-on:focusin="isFocused = true" v-on:focusout="isFocused = false"
                       v-on:mouseenter="isHovered = true" v-on:mouseleave="isHovered = false" 
                       />
            </div>
        </div>
    </form>
</template>



<script>
    export default {
        data: function ()
        {
            return { isFocused: false, isHovered: false };
        },
        computed: {
            showShadow: function ()
            {
                return this.isFocused || this.isHovered;
            }
        },
        props: ['element'],
        methods: {
            onInputChange: function (event)
            {
                this.$emit('inputModified', event);
            },
            dragOver: function (event)
            {

                event.preventDefault();
            },
            drag: function (event)
            {
                let element = this.element;
                console.log('drag start on element.id = ' + element.id);
                event.dataTransfer.setData('elementId', element.id);
            },
            drop: function (event)
            {
                let elementId = event.dataTransfer.getData('elementId');
                console.log('drag dropped from element.id = ' + elementId +  ' onto element.id = ' + this.element.id);
            }
        }
    }
</script>

<style scoped>
    input {
        font-size: 1.25em;
    }
</style>