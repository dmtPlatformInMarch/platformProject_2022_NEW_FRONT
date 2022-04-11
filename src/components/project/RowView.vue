<template>
    <section class="row-view-container active">
        <div class="row-list">
            <row-component
                v-for="(project, index) in projects"
                :key="index"
                :project="project"
            ></row-component>
        </div>
    </section>
</template>

<script>
import RowComponent from '@/components/project/RowComponent.vue';

export default {
    props: {
        projects: {
            type: Array,
            required: true,
        },
    },
    components: {
        RowComponent,
    },
    data() {
        return {
            projectItems: [],
        };
    },
    created() {
        console.log(this.projects);
    },
};
</script>

<style></style>
