<template>
    <section>
        <div v-if="isCreatedManager">
            <div class="resume-list-container">
                <label for="" class="custom-label">
                    전체 지원 목록
                </label>
                <div class="resume-list-wrapper">
                    <div
                        class="resume-list-header"
                        style="grid-template-columns: 0.5fr 2fr 2fr 1fr 4fr!important;"
                    >
                        <span>번호</span>
                        <span>이력서 제목</span>
                        <span>지원 코멘트</span>
                        <span>지원일</span>
                        <span>상세보기 및 상태 변경</span>
                    </div>
                    <div
                        v-if="!applicationExists"
                        class="resume-list-content none-list-content"
                        style="font-size: 1.1rem!important;"
                    >
                        아직 지원한 작업자가 없습니다.
                    </div>
                    <div
                        v-else
                        class="resume-list-content my-resume-list-content"
                        v-for="(item, index) in myApplications"
                        :key="index"
                        style="grid-template-columns: 0.5fr 2fr 2fr 1fr 4fr!important;"
                    >
                        <span>{{ index + 1 }}</span>
                        <span
                            ><a
                                href="javascript:;"
                                @click="routeResumeViewPage(item.resumeId)"
                                >{{ item.resumeTitle }}</a
                            ></span
                        >
                        <span>{{ item.applicationContent }}</span>
                        <span>{{ item.createdDate | formatDateShortly }}</span>
                        <span>
                            <button
                                style="width: 60%;"
                                @click="routeDetailPage(item.id)"
                            >
                                상세 보기 및 상태 변경
                            </button>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import {
    fetchManagerApplicaition,
    changeAppStatusByManager,
} from '@/api/application';
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

            this.fetchApplication();
        },
        async fetchApplication() {
            console.log('application fetching');
            const appData = {
                managerEmail: this.userEmail,
                projectId: this.project.id,
            };
            try {
                const { data } = await fetchManagerApplicaition(appData);
                this.myApplications = data;
                console.log(data);
            } catch (error) {
                console.log(error);
            }
        },
        async changeAppStatus() {
            alert('정말 지원 정보를 변경하시겠습니까?');
            try {
                const appData = {
                    id: this.myApplications.id,
                };
                const { data } = await changeAppStatusByManager(appData);
                alert('변경이 완료되었습니다.');
                console.log(data);
                this.$emit('refresh');
                this.fetchApplication();
            } catch (error) {
                console.log(error);
            }
        },
    },
};
</script>

<style></style>
