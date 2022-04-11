<template>
    <section class="main-content">
        <div class="job-wrapper">
            <project-detail-header :project="project" :applied="applied" />
            <div class="job-body">
                <project-menu-component :project="project" :applied="applied" />

                <router-view :key="$route.path" @refresh="refresh" />
            </div>
        </div>
    </section>
</template>

<script>
import ProjectDetailHeader from '@/components/project/detail/ProjectDetailHeader.vue';
import ProjectMenuComponent from '@/components/project/detail/ProjectMenuComponent.vue';

import { fetchProject } from '@/api/project';

export default {
    data() {
        return {
            userEmail: '',
            project: {},
            projectFiles: [],
            myResumes: [],
            selectedResume: '',
            applicationContent: '',
            myJobs: [],
            applied: false,
            myApplications: [],
        };
    },
    components: {
        ProjectDetailHeader,
        ProjectMenuComponent,
    },
    created() {
        //user의 email
        this.userEmail = this.$store.getters.getUsername;
        this.userRole = this.$store.getters.getRole;
        //프로젝트 정보 fetch
        this.fetchProject();
    },
    computed: {
        applyValid() {
            return this.applied;
        },
        isWorker() {
            return this.$store.getters.isWorker;
        },
        isManagerAbove() {
            return this.$store.getters.isManager || this.$store.getters.isAdmin;
        },
        isAppliedWorker() {
            return this.$store.getters.isWorker && this.applied;
        },
        isCreatedManager() {
            return (
                (this.$store.getters.isManager ||
                    this.$store.getters.isAdmin) &&
                this.project.createdBy == this.$store.getters.getUsername
            );
        },
    },
    methods: {
        refresh() {
            this.fetchProject();
            this.$router.go();
        },
        //project 정보 fetch
        async fetchProject() {
            try {
                const id = this.$route.params.id;
                console.log('id : ' + id);
                console.log('this.userEmail : ' + this.userEmail);
                const projectData = {
                    id,
                    userEmail: this.userEmail,
                };
                const { data } = await fetchProject(projectData);
                console.log(data);
                this.project = data;
                this.projectFiles = data.files;
                this.applied = data.applied;
                console.log(this.projectFiles);
            } catch (error) {
                console.log(error);
            }
        },
    },
};
</script>

<style></style>
