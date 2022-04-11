<template>
    <section>
        <category-component></category-component>
        <section class="main-content">
            <project-header @viewToggle="toggleCard"></project-header>
            <loading-spinner v-if="isLoading"></loading-spinner>
            <section class="list-container" v-if="!isLoading">
                <card-view v-if="card" :projects="projects"></card-view>
                <row-view v-else :projects="projects"></row-view>
            </section>
        </section>
    </section>
</template>

<script>
import LoadingSpinner from '@/components/common/LoadingSpinner.vue';
import CategoryComponent from '@/components/project/CategoryComponent.vue';
import CardView from '@/components/project/CardView.vue';
import RowView from '@/components/project/RowView.vue';
import ProjectHeader from '@/components/project/ProjectHeader.vue';
import { fetchAllProject } from '@/api/project';

export default {
    data() {
        return {
            isCard: true,
            isLoading: false,
            projects: [],
            createdBy: '',
        };
    },
    created() {
        this.createdBy = this.$store.getters.getUsername;
        this.fetchAllProject();
    },
    computed: {
        card() {
            return this.isCard;
        },
    },
    components: {
        LoadingSpinner,
        CardView,
        RowView,
        CategoryComponent,
        ProjectHeader,
    },
    methods: {
        toggleCard() {
            this.isCard = !this.isCard;
        },
        async fetchAllProject() {
            const projectData = {
                createdBy: this.createdBy,
            };
            this.isLoading = true;
            const { data } = await fetchAllProject(projectData);
            this.isLoading = false;
            this.projects = data;
        },
    },
};
</script>

<style></style>
