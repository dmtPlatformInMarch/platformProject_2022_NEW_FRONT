<template> </template>

<script>
export default {
    props: {
        myResumes: {
            type: Array,
            required: false,
        },
    },
    methods: {
        routeViewPage() {
            const id = this.project.id;
            this.$router.push(`/project/${id}`);
        },
    },
};
</script>

<style></style>
