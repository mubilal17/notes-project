<template>
    <div class="px-3">
        <div class="mt-5" style="line-height: 0.5em">
            <a class="lead text-decoration-none text-dark-50" style="font-size: 1.25em;">{{section.title}}</a>
            <nav class="nav flex-column px-1 mt-3" style="line-height: 1em">
                <slot />
                <a class="btn w-50 text-muted text-right" style="font-size: 0.75em"
                    v-on:click="addNewPage">
                    Add New Page
                </a>
            </nav>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['section'],
        methods: {
            addNewPage: function(event) {
                this.section.appendNewPage();
                this.$emit('add-new-page-to-section', event)
            }
        }
    }
</script>