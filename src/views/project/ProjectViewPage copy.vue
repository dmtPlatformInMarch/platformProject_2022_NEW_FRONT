<template>
    <section class="main-content">
        <div class="job-wrapper">
            <div class="job-header">
                <div class="job-header-wrapper">
                    <div class="job-header-pos">
                        <div class="job-categorys">
                            <div class="job-category">
                                <a
                                    href="#"
                                    @click="
                                        routeFirstField(project.firstFieldId)
                                    "
                                    >{{ project.firstField }}</a
                                >
                            </div>
                            <span>></span>
                            <div class="job-category">
                                <a
                                    href="#"
                                    @click="
                                        routeSecondField(project.secondFieldId)
                                    "
                                    >{{ project.secondField }}</a
                                >
                            </div>
                        </div>
                    </div>
                    <div class="job-header-pos">
                        <div class="job-status">
                            <span>참여 가능한 작업</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="job-body">
                <div class="job-body-wrapper">
                    <div class="job-related-jobs">
                        <span>
                            <a href="#" @click="routeSeries(project.series)">
                                <span>{{ project.seriesTitle }}</span>
                                (관련 작업 보기)</a
                            >
                        </span>
                    </div>
                </div>

                <div class="job-title-wrapper">
                    <div class="job-title">
                        <span>{{ project.title }}</span>
                    </div>

                    <div class="job-btns">
                        <!-- active -->
                        <div class="job-btn">
                            <i class="fas fa-star"><span>즐겨찾기</span></i>
                        </div>
                        <div class="job-btn">
                            <i class="fas fa-briefcase"
                                ><span>참여작업</span></i
                            >
                        </div>
                        <div class="job-btn">
                            <i class="fas fa-paper-plane"
                                ><span>문의하기</span></i
                            >
                        </div>
                    </div>
                </div>
                <div class="job-menu-wrapper">
                    <div class="job-menu-pos">
                        <div class="job-menu ">
                            <a href="#" @click="goDetail">디테일</a>
                        </div>
                        <div
                            class="job-menu"
                            v-if="isAppliedWorker || isCreatedManager"
                        >
                            <a href="#" @click="goApply">
                                <span v-if="isAppliedWorker">나의 작업(n)</span>
                                <span v-else>작업 목록</span>
                            </a>
                        </div>
                    </div>
                    <div class="job-menu-pos">
                        <div
                            class="job-menu"
                            v-if="isWorker || isCreatedManager"
                        >
                            <a
                                href="#"
                                @click="goMyJob"
                                :disabled="!applyValid"
                            >
                                <span v-if="isAppliedWorker">지원 정보</span>
                                <span v-if="isCreatedManager">지원 목록</span>
                                <span v-if="isWorker && !isAppliedWorker"
                                    >지원하기</span
                                >
                            </a>
                        </div>
                    </div>
                </div>
                <div class="job-content-wrapper">
                    <div class="job-detail-wrapper">
                        <div class="job-detail">
                            <span>카테고리 : </span>
                            <span
                                >{{ project.firstField }} >
                                {{ project.secondField }}</span
                            >
                        </div>
                        <div class="job-detail">
                            <span>작업 기한 : </span>
                            <span>{{
                                project.createdDate | formatDateShortly
                            }}</span>
                            ~
                            <span>{{
                                project.deadline | formatDateShortly
                            }}</span>
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
                            <label class="custom-label file-label"
                                >안내 파일</label
                            >

                            <div
                                class="file-list file_list"
                                style="overflow:hidden; height:auto;"
                                v-if="project.fileCnt > 0"
                            >
                                <div
                                    v-for="(item, index) in projectFiles"
                                    :key="index"
                                >
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
                            <label class="custom-label job-label"
                                >프로젝트 설명</label
                            >
                            <div style="margin: 0.5rem;">
                                {{ project.content }}
                            </div>
                        </div>

                        <div
                            v-if="isCreatedManager"
                            class="application-btn-wrapper"
                        >
                            <button>
                                <a @click="routeEditPage">프로젝트 수정</a>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- 지원 관련 -->
                <div class="job-content-wrapper">
                    <!-- 이력서 -->
                    <div v-if="isWorker && !isAppliedWorker">
                        <div class="resume-list-container">
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
                                    아직 이력서를 생성하지 않았습니다. 이력서를
                                    생성해 보세요!!<br />
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
                                            @click="
                                                routeResumeViewPage(item.id)
                                            "
                                            >{{ item.title }}</a
                                        ></span
                                    >
                                    <span v-if="item.opened">공개</span>
                                    <span v-else style="color:gray">
                                        비공개
                                    </span>
                                    <span>{{
                                        item.createdDate | formatDateShortly
                                    }}</span>
                                    <span
                                        ><input
                                            type="radio"
                                            v-model="selectedResume"
                                            v-bind:value="item.id"
                                    /></span>
                                </div>
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
                            </div>
                        </div>
                        <div class="my-work-files-wrapper"></div>
                        <div class="application-btn-wrapper">
                            <button @click="applyJob">지원하기</button>
                        </div>
                    </div>
                    <!-- 지원 목록 -->
                    <div v-if="isCreatedManager">
                        <div class="resume-list-container">
                            <label for="" class="custom-label">
                                전체 지원 목록
                            </label>
                            <div class="resume-list-wrapper">
                                <div class="resume-list-header">
                                    <span>번호</span>
                                    <span>이력서 제목</span>
                                    <span>지원 코멘트</span>
                                    <span>지원일</span>
                                    <span>상태 변경</span>
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
                                    style="grid-template-columns: 0.5fr 2fr 1fr 1fr 1fr!important;"
                                >
                                    <span>{{ index + 1 }}</span>
                                    <span
                                        ><a
                                            href="javascript:;"
                                            @click="
                                                routeResumeViewPage(
                                                    item.resumeId,
                                                )
                                            "
                                            >{{ item.resumeTitle }}</a
                                        ></span
                                    >
                                    <span>{{
                                        item.createdDate | formatDateShortly
                                    }}</span>
                                    <span>변경</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- else -->
                    <div v-if="isAppliedWorker">
                        <div class="resume-list-container">
                            <label for="" class="custom-label">
                                내 지원 정보
                            </label>
                            <div class="resume-list-wrapper">
                                <div class="resume-list-header">
                                    <span>번호</span>
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
                                    v-for="(item, index) in myApplications"
                                    :key="index"
                                    style="grid-template-columns: 0.5fr 2fr 1fr 1fr 1fr!important;"
                                >
                                    <span>{{ index + 1 }}</span>
                                    <span
                                        ><a
                                            href="javascript:;"
                                            @click="
                                                routeResumeViewPage(
                                                    item.resumeId,
                                                )
                                            "
                                            >{{ item.resumeTitle }}</a
                                        ></span
                                    >
                                    <span>{{
                                        item.createdDate | formatDateShortly
                                    }}</span>
                                    <span>변경</span>
                                </div>
                            </div>
                        </div>
                        <div class="application-wrapper">
                            <div class="custom-label">지원 내용</div>
                            <div
                                class="application-content"
                                style="padding-top: 1rem"
                            >
                                <span>
                                    {{ myApplications[0].applicationContent }}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 작업들 -->
                <div class="job-content-wrapper">
                    <div class="resume-list-container">
                        <label for="" class="custom-label"
                            >작업 완료 / 수정</label
                        >

                        <div class="work-list-wrapper">
                            <div class="work-list-header">
                                <span>번호</span>
                                <span>할당받은 파일</span>
                                <span>등록일</span>
                                <span>수정</span>
                                <span>작업포기</span>
                                <span>예정코인</span>
                            </div>
                            <div
                                v-if="!jobExists"
                                class="resume-list-content none-list-content"
                            >
                                지원한 작업이 없습니다.
                            </div>
                            <div
                                v-else
                                v-for="(item, index) in myJobs"
                                :key="index"
                                class="work-list-content"
                            >
                                <span>{{ index + 1 }}</span>
                                <span>
                                    <div
                                        class="file-list file_list"
                                        style="margin: 0!important"
                                    >
                                        <a th:href="#">
                                            <i class="fas fa-file"></i>
                                            <span>파일 이름</span>
                                        </a>
                                    </div></span
                                >
                                <span>등록일</span>
                                <span><button>수정</button></span>
                                <span><button>작업포기</button></span>
                                <span><i class="fas fa-coins"></i> -</span>
                            </div>
                        </div>
                    </div>
                    <!--
                        <div class="application-wrapper">
                            <div class="custom-label">추가 코멘트</div>
                            <div class="application-content">
                                <textarea
                                    name="application"
                                    id=""
                                    cols="30"
                                    rows="10"
                                >
                                </textarea>
                            </div>
                        </div>
                        <div class="my-work-files-wrapper"></div>
                        <div class="application-btn-wrapper">
                            <button>코멘트 저장</button>
                        </div>
                    -->
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { fetchProject } from '@/api/project';
import { fetchResumeMine } from '@/api/resume';
import {
    registerJob,
    fetchJobsWithFiles,
    fetchAllJobsAsManager,
    fetchAllJobsAsWorker,
} from '@/api/job';

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
    //생성 시
    created() {
        //user의 email
        this.userEmail = this.$store.getters.getUsername;
        this.userRole = this.$store.getters.getRole;
        //프로젝트 정보 fetch
        this.fetchProject();
    },
    mounted() {
        this.goDetail();
    },
    computed: {
        resumeExists() {
            return this.myResumes.length > 0;
        },
        jobExists() {
            return this.myJobs.length > 0;
        },
        applicationExists() {
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
        routeResumeViewPage(id) {
            console.log('resume id', id);
            this.$router.push(`/resume/mine/${id}`);
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
            //지원 목록
            this.fetchApplication();
        },
        /* 지원 목록 */
        //지원 목록 관련
        fetchApplication() {
            console.log('fetch application');
            //createdManager이면
            if (
                (this.userRole == 'ROLE_MANAGER' ||
                    this.userRole == 'ROLE_ADMIN') &&
                this.userEmail == this.project.createdBy
            ) {
                console.log('currently createdManager application');
                this.fetchAllJobAsManager();
            }
            //appliedWorker이면
            else if (this.userRole == 'ROLE_WORKER' && this.applied) {
                console.log('currently appliedWorker application');
                this.fetchAllJobAsWorker();
            } else if (this.userRole == 'ROLE_WORKER') {
                console.log('currently worker application');
                this.fetchResume();
            }
        },
        //모든 지원 목록이나 지원 데이터 가져오기
        async fetchAllJobAsManager() {
            console.log('fetch all jobs');
            const jobData = {
                userEmail: this.userEmail,
                projectId: this.project.id,
            };
            console.log(jobData);
            try {
                const { data } = await fetchAllJobsAsManager(jobData);
                console.log('application info');
                this.myApplications = data;
                console.log(data);
            } catch (error) {
                console.log(error);
            }

            //작업 목록
            this.fetchJob();
        },
        async fetchAllJobAsWorker() {
            console.log('fetch all jobs');
            const jobData = {
                userEmail: this.userEmail,
                projectId: this.project.id,
            };
            console.log(jobData);
            try {
                const { data } = await fetchAllJobsAsWorker(jobData);
                console.log('application info');
                this.myApplications = data;
                console.log(data);
            } catch (error) {
                console.log(error);
            }

            //작업 목록
            this.fetchJob();
        },
        //혹은 이력서
        async fetchResume() {
            console.log('resume');
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

            //작업 목록
            this.fetchJob();
        },
        /* 작업 목록 */
        async fetchJob() {
            const jobData = {
                projectId: this.project.id,
                userEmail: this.userEmail,
            };
            try {
                const { data } = await fetchJobsWithFiles(jobData);
                console.log('fetch job data with files');
                this.myJobs = data;
                console.log(data);
            } catch (error) {
                console.log(error);
            }
        },
        //Menu 이동
        goDetail() {
            this.activeProjectMenu(0);
        },
        goMyJob() {
            this.activeProjectMenu(1);
        },
        goApply() {
            this.activeProjectMenu(2);
        },
        activeProjectMenu(index) {
            const menus = document.querySelectorAll('.job-content-wrapper');
            menus.forEach(element => {
                if (element.classList.contains('active'))
                    element.classList.remove('active');
            });
            const menu = menus[index];
            menu.classList.add('active');

            const menus2 = document.querySelectorAll('.job-menu');
            menus2.forEach(element => {
                if (element.classList.contains('active'))
                    element.classList.remove('active');
            });
            if (index == 1) index = 2;
            else if (index == 2) index = 1;
            const menu2 = menus2[index];
            menu2.classList.add('active');
        },
        /* resume */
        async applyJob() {
            console.log('apply job');
            console.log(this.selectedResume);
            console.log(this.applicationContent);
            if (!this.selectedResume || !this.applicationContent) {
                alert('지원 내용이 비어 있습니다.');
                return;
            }

            try {
                const jobData = {
                    projectId: this.project.id,
                    resumeId: this.selectedResume,
                    applicationContent: this.applicationContent,
                    workerApplied: true,
                    userEmail: this.userEmail,
                };
                const { data } = await registerJob(jobData);
                alert('지원이 완료되었습니다.');
                this.$router.reload();
                console.log(data);
            } catch (error) {
                console.log(error);
            }
        },
        //수정하기로 이동
        routeEditPage() {
            //'/project/edit/:id',
            const id = this.$route.params.id;
            this.$router.push(`/project/edit/${id}`);
        },
    },
};
</script>

<style></style>
