<template>
    <section>
        <div>
            <!-- 이력서 -->
            <div
                class="resume-list-container"
                v-if="isWorker && !isAppliedWorker"
            >
                <label for="" class="custom-label">
                    이력서 선택
                </label>
                <div class="resume-list-wrapper">
                    <div class="resume-list-header">
                        <span>번호</span>
                        <span>이력서 제목</span>
                        <span>공개여부</span>
                        <span>등록일</span>
                        <span>이력서 선택</span>
                    </div>
                    <div
                        v-if="!resumeExists"
                        class="resume-list-content none-list-content"
                        style="font-size: 1.1rem!important;"
                    >
                        아직 이력서를 생성하지 않았습니다. 이력서를 생성해
                        보세요!!<br />
                        이력서가 없으면 지원할 수 없습니다.
                    </div>
                    <div
                        v-else
                        class="resume-list-content my-resume-list-content"
                        v-for="(item, index) in myResumes"
                        :key="index"
                        style="grid-template-columns: 0.5fr 2fr 1fr 1fr 1fr!important;"
                    >
                        <span>{{ index + 1 }}</span>
                        <span
                            ><a
                                href="javascript:;"
                                @click="routeResumeViewPage(item.id)"
                                >{{ item.title }}</a
                            ></span
                        >
                        <span v-if="item.opened">공개</span>
                        <span v-else style="color:gray">
                            비공개
                        </span>
                        <span>{{ item.createdDate | formatDateShortly }}</span>
                        <span
                            ><input
                                type="radio"
                                v-model="selectedResume"
                                v-bind:value="item.id"
                        /></span>
                    </div>
                </div>

                <div class="application-wrapper">
                    <div class="custom-label">지원 내용</div>
                    <div class="application-content">
                        <textarea
                            name="application"
                            id=""
                            cols="30"
                            rows="10"
                            v-model="applicationContent"
                        >
                        </textarea>

                        <span class="register-alert" v-if="!applicationContent">
                            지원 신청 내용을 입력해주세요!
                        </span>
                    </div>
                </div>
                <div class="my-work-files-wrapper"></div>
                <div class="application-btn-wrapper">
                    <button @click="applyJob">지원하기</button>
                </div>
            </div>

            <!-- else -->
            <div v-if="isWorker && isAppliedWorker">
                <div class="resume-list-container">
                    <span class="register-alert">
                        취소할 경우 재신청이 불가할 수 있습니다. 작업이 이미
                        시작된 경우에는 취소가 불가합니다.
                    </span>

                    <label for="" class="custom-label">
                        내 지원 정보
                    </label>
                    <div class="resume-list-wrapper">
                        <div
                            class="resume-list-header"
                            style="grid-template-columns:2fr 2fr 2fr!important;"
                        >
                            <span>이력서 제목</span>
                            <span>지원일</span>
                            <span>상태 변경</span>
                        </div>
                        <div
                            v-if="!applicationExists"
                            class="resume-list-content none-list-content"
                            style="font-size: 1.1rem!important;"
                        >
                            지원한 사실이 없습니다.
                        </div>
                        <div
                            v-else
                            class="resume-list-content my-resume-list-content"
                            style="grid-template-columns:2fr 2fr 2fr!important;"
                        >
                            <span
                                ><a
                                    href="javascript:;"
                                    @click="
                                        routeResumeViewPage(
                                            myApplication.resumeId,
                                        )
                                    "
                                    >{{ myApplication.resumeTitle }}</a
                                ></span
                            >
                            <span>{{
                                myApplication.createdDate | formatDateShortly
                            }}</span>
                            <span
                                style="display: flex;flex-direction: row;justify-content: space-around;"
                            >
                                <div
                                    class="selectBox hoped-field-select"
                                    style="width: 60%!important;"
                                >
                                    <select
                                        class="select"
                                        @change="changeFirstField($event)"
                                        v-model="applicationStatus"
                                    >
                                        <option disabled selected
                                            >--상태 변경--</option
                                        >
                                        <option>지원됨</option>
                                        <option
                                            :disabled="!isAppStatusChangable"
                                            >취소</option
                                        >
                                    </select>
                                    <span class="icoArrow"
                                        ><i class="fas fa-chevron-down"></i
                                    ></span>
                                </div>
                                <button :disabled="!isAppStatusChangable">
                                    변경
                                </button>
                            </span>
                        </div>
                    </div>
                </div>
                <div class="application-wrapper">
                    <div class="custom-label">지원 내용</div>
                    <div
                        class="application-content"
                        style="padding: 1rem; border: 1px solid gray; border-radius: .5rem; font-size: .9rem!important;"
                    >
                        <span>
                            {{ myApplication.applicationContent }}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { fetchResumeMine } from '@/api/resume';
import {
    registerApplicationByWorker,
    fetchWorkerApplicaition,
    changeAppStatusByWorker,
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
            myApplication: {},
            applicationStatus: '지원됨',
        };
    },
    created() {
        this.userEmail = this.$store.getters.getUsername;
        this.userRole = this.$store.getters.getRole;

        this.fetchProject();
    },
    computed: {
        isAppStatusChangable() {
            return (
                this.myApplication.applicationStatus === 'WorkerApplied' ||
                this.myApplication.applicationStatus === 'ManagerApplied'
            );
        },
        resumeExists() {
            return this.myResumes.length > 0;
        },
        jobExists() {
            return this.myJobs.length > 0;
        },
        applicationExists() {
            return this.myApplication !== null;
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

            if (this.applied) {
                this.fetchApplication();
            } else {
                this.fetchResume();
            }
        },
        //이력서
        async fetchResume() {
            console.log('resume fetching');
            const resumeData = {
                createdBy: this.userEmail,
            };
            try {
                const { data } = await fetchResumeMine(resumeData);
                this.myResumes = data;
                console.log(data);
            } catch (error) {
                console.log(error);
            }
        },
        async fetchApplication() {
            console.log('application fetching');
            const appData = {
                workerEmail: this.userEmail,
                projectId: this.project.id,
            };
            try {
                const { data } = await fetchWorkerApplicaition(appData);
                this.myApplication = data;
                console.log(data);
            } catch (error) {
                console.log(error);
            }
        },
        async applyJob() {
            console.log('apply job');
            console.log(this.selectedResume);
            console.log(this.applicationContent);
            console.log(this.project.id + ' project id');
            if (!this.selectedResume || !this.applicationContent) {
                alert('지원 내용이 비어 있습니다.');
                return;
            }

            try {
                const appData = {
                    projectId: this.project.id,
                    resumeId: this.selectedResume,
                    applicationContent: this.applicationContent,
                    workerApplied: true,
                    workerEmail: this.userEmail,
                };
                const { data } = await registerApplicationByWorker(appData);
                alert('지원이 완료되었습니다.');

                console.log(data);
                this.$emit('refresh');
                this.fetchApplication();
            } catch (error) {
                console.log(error);
            }
        },
        async changeAppStatus() {
            alert('정말 지원 정보를 변경하시겠습니까?');
            try {
                const appData = {
                    id: this.myApplication.id,
                };
                const { data } = await changeAppStatusByWorker(appData);
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
