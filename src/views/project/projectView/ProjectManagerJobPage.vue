<template>
    <section>
        <div v-if="isCreatedManager">
            <div class="resume-list-container">
                <label for="" class="custom-label">
                    전체 작업 목록
                </label>
                <div class="resume-list-wrapper">
                    <div
                        class="resume-list-header"
                        style="grid-template-columns: 0.5fr 2fr 2fr 1fr 2fr!important;"
                    >
                        <span>번호</span>
                        <span>작업자 상세 페이지</span>
                        <span>작업물 확인</span>
                        <span>문서 이름</span>
                        <span>상태</span>
                    </div>
                    <div
                        v-if="!jobExists"
                        class="resume-list-content none-list-content"
                        style="font-size: 1.1rem!important;"
                    >
                        아직 할당된 작업이 없습니다.
                    </div>
                    <div
                        v-else
                        class="resume-list-content my-resume-list-content"
                        v-for="(item, index) in myJobs"
                        :key="index"
                        style="grid-template-columns: 0.5fr 2fr 2fr 1fr 2fr!important;"
                    >
                        <span>{{ index + 1 }}</span>
                        <span
                            ><button
                                href="javascript:;"
                                @click="
                                    routeApplicationDetailPage(
                                        item.projectId,
                                        item.applicationId,
                                    )
                                "
                            >
                                작업자 상세 페이지
                            </button></span
                        >
                        <span
                            ><button
                                @click="routeTrPage(item.fileId)"
                            >
                                작업물 확인
                            </button></span
                        >
                        <span>{{ item.fileName }}</span>
                        <span>
                            {{ item.jobStatus }}
                            <!--
                            <button
                                style="width: 60%;"
                                @click="routeDetailPage(item.id)"
                            >
                                변경
                            </button>
                            -->
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { fetchJobsByProject } from '@/api/job';
import { fetchProject } from '@/api/project';

export default {
    data() {
        return {
            project: {},
            applied: false,
            userEmail: '',
            myResumes: [],
            selectedResume: '',
            applicationContent: '',
            myJobs: [],
            myApplications: [],
            applicationStatus: '지원됨',
            jobs: [],
        };
    },
    created() {
        this.userEmail = this.$store.getters.getUsername;
        this.userRole = this.$store.getters.getRole;

        this.fetchProject();
    },
    computed: {
        /*
        isAppStatusChangable() {
            return (
                this.myApplications.applicationStatus === 'WorkerApplied' ||
                this.myApplications.applicationStatus === 'ManagerApplied'
            );
        },
        */
        resumeExists() {
            return this.myResumes.length > 0;
        },
        jobExists() {
            return this.myJobs.length > 0;
        },
        applicationExists() {
            console.log('application exists : ' + this.myApplications.length);
            return this.myApplications.length > 0;
        },
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
        routeApplicationDetailPage(projectId, applicationId) {
            this.$router.push(
                `/project/${projectId}/manager/job/${applicationId}`,
            );
        },
        routeTrPage(fileId) {
            console.log('route tr page');
            this.$router.push(`/tr/${fileId}`);
        },
        routeDetailPage(jobId) {
            const projectId = this.$route.params.id;
            this.$router.push(`/project/${projectId}/manager/job/${jobId}`);
        },
        routeResumeViewPage(id) {
            console.log('resume id', id);
            this.$router.push(`/resume/mine/${id}`);
        },
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

            this.fetchJobs();
        },
        async fetchJobs() {
            console.log('jobs fetching');
            const jobData = {
                projectId: this.project.id,
            };
            console.log(jobData);
            try {
                const { data } = await fetchJobsByProject(jobData);
                this.myJobs = data;
                console.log(data);
            } catch (error) {
                console.log(error);
            }
        },
        ///project/111/manager/job/149
    },
};
</script>

<style></style>
