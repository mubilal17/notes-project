<template>
    <div class="d-none d-lg-block d-xl-block col-2 bg-light h-100 w-100 m-0 shadow-sm border-right">
        <div>
            <button class="btn float-left p-auto mt-1">
                <span class="material-icons align-bottom">apps</span>
                Dashboard
            </button>
            <button class="btn btn-light border-0 rounded-circle float-right p-auto">
                <span class="material-icons align-middle py-1">settings</span>
            </button>
            <br />

        </div>

        <slot />

    </div>


</template>


<script>
    export default {

        data: function() {
            return {
                greeting: "Hello"
            };
        },
        props: ['workspace-title'],
        methods: {
        }
    };
</script>