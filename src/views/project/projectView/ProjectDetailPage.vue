<template>
    <div class="job-content-wrapper">
        <div class="job-detail-wrapper">
            <div class="job-detail">
                <span>카테고리 : </span>
                <span
                    >{{ project.firstField }} > {{ project.secondField }}</span
                >
            </div>
            <div class="job-detail">
                <span>작업 기한 : </span>
                <span>{{ project.createdDate | formatDateShortly }}</span>
                ~
                <span>{{ project.deadline | formatDateShortly }}</span>
            </div>

            <div class="job-detail">
                <span>즐겨찾기수: </span>
                <span>{{ project.favoriteCnt }}</span>
            </div>
            <div class="job-detail">
                <span>작업 참여 수: </span>
                <span>{{ project.jobCnt }}</span>
            </div>

            <div class="job-detail">
                <span>조회 수 : </span>
                <span>{{ project.viewCnt }}</span>
            </div>
            <div class="job-detail">
                <span>코인 :</span>
                <span v-if="!project.paymentType">
                    <span>{{ project.fixedPayment }}</span>
                </span>
                <span v-if="project.paymentType">
                    <span>{{ project.fromPayment }}</span>
                    <span> ~ </span>
                    <span>{{ project.toPayment }}</span>
                </span>
            </div>
        </div>
        <div class="job-explain-wrapper">
            <div
                th:if="${not #lists.isEmpty( jobFileList )}"
                class="file-wrapper"
            >
                <label class="custom-label file-label">안내 파일</label>

                <div
                    class="file-list file_list"
                    style="overflow:hidden; height:auto;"
                    v-if="project.fileCnt > 0"
                >
                    <div v-for="(item, index) in projectFiles" :key="index">
                        <a style="display:block;" th:href="#">
                            <i class="fas fa-file"></i
                            ><!--style="display:float"-->
                            <span>{{ item.originalName }}</span>
                        </a>
                    </div>
                </div>
                <div v-else class="file-list">
                    <span>파일이 없습니다.</span>
                </div>
            </div>
            <div class="job-explain">
                <label class="custom-label job-label">프로젝트 설명</label>
                <div style="margin: 0.5rem;">
                    {{ project.content }}
                </div>
            </div>

            <div v-if="isCreatedManager" class="application-btn-wrapper">
                <button>
                    <a @click="routeEditPage">프로젝트 수정</a>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { fetchProject } from '@/api/project';

export default {
    data() {
        return {
            project: {},
            projectFiles: [],
        };
    },
    created() {
        //user의 email
        this.userEmail = this.$store.getters.getUsername;
        this.userRole = this.$store.getters.getRole;
        //프로젝트 정보 fetch
        this.fetchProject();
    },
    computed: {
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
        routeViewPage() {
            const id = this.project.id;
            this.$router.push(`/project/${id}`);
        },
        //수정하기로 이동
        routeEditPage() {
            //'/project/edit/:id',
            const id = this.$route.params.id;
            this.$router.push(`/project/edit/${id}`);
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
        },
    },
};
</script>

<style></style>
