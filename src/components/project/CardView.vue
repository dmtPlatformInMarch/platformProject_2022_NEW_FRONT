<template>
    <section class="card-view-container active">
        <div class="card-view-wrapper">
            <card-component
                v-for="(project, index) in projects"
                :key="index"
                :project="project"
            ></card-component>
        </div>
    </section>
</template>

<script>
import CardComponent from '@/components/project/CardComponent.vue';

export default {
    props: {
        projects: {
            type: Array,
            required: true,
        },
    },
    components: {
        CardComponent,
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
