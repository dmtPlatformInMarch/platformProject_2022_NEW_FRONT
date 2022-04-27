<template>
    <section class="main-content">
        <div @submit.prevent="submitResumeForm" class="my-page-wrapper active">
            <div class="my-page-title-wrapper">
                <div class="my-page-title">
                    <span>상세 지원 정보 / 작업 할당</span>
                </div>
            </div>

            <!-- file 할당 -->
            <div class="resume-list-container">
                <div class="resume-list-header-wrapper">
                    <label for="" class="custom-label custom-label-bigger"
                        >작업 할당
                    </label>
                </div>
                <div class="resume-write-container">
                    <form
                        style="padding: 1rem;display: flex;flex-direction: row;justify-content: space-between;"
                        class="form-horizontal"
                        method="post"
                        enctype="multipart/form-data"
                        @submit.prevent="submitFile($event)"
                    >
                        <div data-name="" class="file-container">
                            <div
                                class="file-wrapper"
                                v-for="(index, item) in files"
                                :key="item.fileIdx"
                            >
                                <input
                                    type="text"
                                    class="upload-name"
                                    value="파일 찾기"
                                    readonly
                                    v-bind:id="'file_label_' + index.fileIdx"
                                />
                                <label
                                    style="    line-height: 3rem;"
                                    v-bind:for="'file_' + index.fileIdx"
                                    class="control-label"
                                    >찾아보기</label
                                >
                                <input
                                    type="file"
                                    name="files"
                                    v-bind:id="'file_' + index.fileIdx"
                                    class="upload-hidden"
                                    @change="changeFilename(index, $event)"
                                />
                            </div>
                        </div>
                        <span
                            class="resume-confirm-wrapper"
                            style="margin: 0!important; margin-top: 1rem!important;"
                        >
                            <button
                                type="submit"
                                style="font-size: .9rem!important;  padding: 1rem!important; ling-height: 1.2rem"
                            >
                                작업 파일 할당
                            </button>
                        </span>
                    </form>
                </div>
            </div>

            <!-- 할당된 file 목록 -->
            <div class="resume-list-container">
                <div class="resume-list-header-wrapper">
                    <label for="" class="custom-label custom-label-bigger"
                        >작업 파일 목록
                    </label>
                </div>

                <div class="resume-write-container">
                    <div class="resume-list-header my-resume-list-header">
                        <span>번호</span>
                        <span>ID</span>
                        <span>파일 원이름</span>
                        <span>등록일</span>
                        <span>작업물 확인</span>
                    </div>
                    <div
                        v-if="!fileExists"
                        class="resume-list-content none-list-content"
                    >
                        아직 할당된 파일이 없습니다.
                    </div>
                    <div
                        v-else
                        class="resume-list-content my-resume-list-content"
                        v-for="(item, index) in testFiles"
                        :key="index"
                    >
                        <span>{{ index + 1 }}</span>
                        <span>{{ item.id }}</span>
                        <span>{{ item.originalName }}</span>
                        <span>{{ item.createdDate | formatDateShortly }}</span>
                        <span
                            ><button
                                @click="routeTrPage(item.id)"
                            >
                                작업물 확인
                            </button></span
                        >
                    </div>
                </div>
            </div>

            <!-- account 정보 -->
            <div class="resume-list-container">
                <div class="resume-list-header-wrapper">
                    <label for="" class="custom-label custom-label-bigger"
                        >인적 사항
                    </label>
                </div>

                <div class="resume-write-container">
                    <div class="resume-list-wrapper">
                        <div
                            class="resume-list-header"
                            style="grid-template-columns: 5fr 5fr!important;"
                        >
                            <span>이메일</span>
                            <span>이름</span>
                        </div>
                        <div
                            class="resume-list-content my-resume-list-content"
                            style="grid-template-columns: 5fr 5fr!important;"
                        >
                            <span>{{ account.email }}</span>
                            <span
                                >{{ account.firstName
                                }}{{ account.lastName }}</span
                            >
                        </div>
                        <div
                            class="resume-list-header"
                            style="grid-template-columns: 5fr 5fr!important;"
                        >
                            <span>핸드폰번호</span>
                        </div>
                        <div
                            class="resume-list-content my-resume-list-content"
                            style="grid-template-columns: 5fr 5fr!important;"
                        >
                            <span>{{ account.phoneNumber }}</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- applicationContent -->
            <div class="resume-list-container">
                <div class="resume-list-header-wrapper">
                    <label for="" class="custom-label custom-label-bigger"
                        >지원 내용
                    </label>
                </div>

                <div class="resume-write-container">
                    <div class="resume-write-wrapper">
                        {{ application.applicationContent }}
                    </div>
                </div>
            </div>

            <!-- 지원한 이력서 정보 -->
            <div class="resume-list-container">
                <div class="resume-list-header-wrapper">
                    <label for="" class="custom-label custom-label-bigger"
                        >이력서 정보
                    </label>
                </div>

                <div class="resume-write-container">
                    <div class="resume-write-wrapper">
                        <div class="resume-write-title">
                            <span
                                ><i class="fas fa-pen-alt"></i>이력서 제목</span
                            >
                        </div>
                        <div class="resume-write-content">
                            <div>{{ title }}</div>
                        </div>
                    </div>
                    <!-- -->
                    <div class="resume-write-wrapper">
                        <div class="resume-write-title">
                            <span
                                ><i class="fas fa-pen-alt"></i>검색 허용
                                여부</span
                            >
                        </div>
                        <div class="resume-write-content">
                            <div v-if="isOpened">공개</div>
                            <div v-else>비공개</div>
                        </div>
                    </div>
                    <!-- -->
                    <div class="resume-write-wrapper">
                        <div class="resume-write-title">
                            <span><i class="fas fa-pen-alt"></i>희망 분야</span>
                        </div>
                        <div class="resume-write-content">
                            <div
                                class="resume-write-pos resume-hoped-field-pos"
                            >
                                <span>1차 분류</span>
                                <span>2차 분류</span>
                            </div>
                            <div
                                class="resume-write-pos resume-hoped-field-pos"
                                v-for="(item, index) in resumeHopedFieldDtos"
                                :key="index"
                            >
                                <div
                                    class="resume-hoped-workfield-1st resume-list-info"
                                >
                                    {{ item.firstFieldType }}
                                </div>
                                <div
                                    class="resume-hoped-workfield-2nd resume-list-info"
                                >
                                    {{ item.secondFieldType }}
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- -->
                    <div class="resume-write-wrapper">
                        <div class="resume-write-title">
                            <span
                                ><i class="fas fa-pen-alt"></i>자기소개서</span
                            >
                        </div>
                        <div class="resume-write-content">
                            <div>{{ content }}</div>
                        </div>
                    </div>
                    <!-- -->
                    <div class="resume-write-wrapper">
                        <div class="resume-write-title">
                            <span
                                ><i class="fas fa-pen-alt"></i>희망 작업
                                조건</span
                            >
                        </div>
                        <div class="resume-write-content">
                            <div
                                class="resume-write-pos resume-hoped-field-pos"
                            >
                                <span>희망 작업 장소</span>
                                <div>{{ hopedWorkingPlace }}</div>
                            </div>
                            <div
                                class="resume-write-pos resume-hoped-field-pos"
                            >
                                <span>희망 작업 기간</span>
                                <div>{{ hopedWorkingPeriod }}</div>
                            </div>
                        </div>
                    </div>
                    <!-- -->
                    <div class="resume-write-wrapper">
                        <div class="resume-write-title">
                            <span
                                ><i class="fas fa-pen-alt"></i>공인시험 /
                                자격증</span
                            >
                        </div>
                        <div class="resume-write-content">
                            <div
                                class="resume-write-pos resume-certificate-pos"
                            >
                                <span>자격증 이름</span>
                                <span>점수/등급</span>
                            </div>
                            <div
                                class="resume-write-pos resume-certificate-pos"
                                v-for="(item, index) in resumeCertificateDtos"
                                :key="index"
                            >
                                <div
                                    class="resume-list-info resume-certificate-name"
                                >
                                    {{ item.certificateName }}
                                </div>
                                <div
                                    class="resume-list-info resume-certificate-grade"
                                >
                                    {{ item.grade }}
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- -->
                    <div class="resume-write-wrapper">
                        <div class="resume-write-title">
                            <span><i class="fas fa-pen-alt"></i>학력/전공</span>
                        </div>
                        <div class="resume-write-content">
                            <div class="resume-write-pos resume-academy-pos">
                                <span>학력</span>
                                <span>학교이름</span>
                                <span>전공</span>
                            </div>
                            <div
                                class="resume-write-pos resume-academy-pos"
                                v-for="(item, index) in resumeAcademyDtos"
                                :key="index"
                            >
                                <div
                                    class="resume-academy-course resume-list-info"
                                >
                                    {{ item.schoolType }}
                                </div>
                                <div
                                    class="resume-academy-name resume-list-info"
                                >
                                    {{ item.schoolName }}
                                </div>
                                <div
                                    class="resume-academy-major resume-list-info"
                                >
                                    {{ item.majorOrDesc }}
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- -->
                    <div class="resume-write-wrapper">
                        <div class="resume-write-title">
                            <span><i class="fas fa-pen-alt"></i>능력 요소</span>
                        </div>
                        <div class="resume-write-content">
                            <div class="resume-write-pos resume-ability-pos">
                                <span>능력 요소</span>
                                <span>부연 설명</span>
                            </div>
                            <div
                                class="resume-write-pos resume-ability-pos"
                                v-for="(item, index) in resumeAbilityDtos"
                                :key="index"
                            >
                                <div
                                    class="resume-list-info resume-certificate-name"
                                >
                                    {{ item.abilityType }}
                                </div>
                                <div
                                    class="resume-list-info resume-certificate-grade"
                                >
                                    {{ item.desc }}
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- -->
                    <div class="resume-write-wrapper">
                        <div class="resume-write-title">
                            <span
                                ><i class="fas fa-pen-alt"></i>추가 연락처</span
                            >
                            <span></span>
                        </div>
                        <div class="resume-write-content">
                            <div
                                class="resume-write-pos resume-hoped-field-pos"
                            >
                                <span>연락처 종류</span>
                                <span>연락처</span>
                            </div>
                            <div
                                class="resume-write-pos resume-hoped-field-pos"
                                v-for="(item,
                                index) in resumeAdditionalContactDtos"
                                :key="index"
                            >
                                <div class="resume-list-info">
                                    {{ item.contactType }}
                                </div>
                                <div class="resume-list-info">
                                    {{ item.contact }}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="resume-confirm-wrapper">
                        <button @click="routeEditPage" v-if="isResumeEditable">
                            이력서 수정
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { fetchResume } from '@/api/resume';
import { fetchProject } from '@/api/project';
import { fetchApplication } from '@/api/application';
import { fetchOneAccountWithApp } from '@/api/account';
import { fetchAppFiles, uploadAppFile } from '@/api/file';

export default {
    data() {
        return {
            applied: '',
            resumeId: '',
            title: '',
            content: '',
            resumeAbilityDtos: [],
            resumeAcademyDtos: [],
            resumeCertificateDtos: [],
            resumeHopedFieldDtos: [],
            resumeAdditionalContactDtos: [],
            createdBy: '',
            isOpened: true,
            hopedWorkingPeriod: '',
            hopedWorkingPlace: '',
            allFields: [],
            firstFields: [],
            secondFields: [],
            abilitySources: [],
            contactTypes: [],
            /*resume*/
            resume: {},
            userEmail: '',
            project: {},
            projectFiles: [],
            application: [],
            account: {},

            testFiles: [],
            files: [
                {
                    fileIdx: 0, //진짜 index
                    file: '',
                    Idx: 0, //구분하기 위한 index
                    fileName: '',
                },
            ],
            fileIdx: 0,
            Idx: 0,
        };
    },
    created() {
        this.userEmail = this.$store.getters.getUsername;
        this.fetchProject();
    },
    computed: {
        fileExists() {
            return this.testFiles.length > 0;
        },
        isFormValid() {
            return (
                this.title &&
                this.content &&
                this.resumeHopedFieldDtos.length !== 0
            );
        },
        isResumeEditable() {
            return this.userEmail === this.createdBy;
        },
    },
    methods: {
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
                console.log('project');
                console.log(this.project);
            } catch (error) {
                console.log(error);
            }

            this.getApplication();
        },
        /* 단일 application fetch */
        async getApplication() {
            console.log('application fetching');
            const appData = {
                id: this.$route.params.jobId,
            };
            try {
                const { data } = await fetchApplication(appData);
                this.application = data;
                console.log('application');
                console.log(data);
            } catch (error) {
                console.log(error);
            }

            this.getResume();
            this.getAppFiles();
        },
        async getResume() {
            try {
                const resumeData = {
                    id: this.application.resumeId,
                };
                const { data } = await fetchResume(resumeData);
                console.log('resume');
                console.log(data);
                this.injectResumeData(data);
            } catch (error) {
                console.log(error);
            }

            this.getAccountInfo();
        },
        injectResumeData(data) {
            this.id = data.id;
            this.title = data.title;
            this.content = data.title;
            this.createdBy = data.createdBy;
            this.isOpened = data.opened;
            this.hopedWorkingPeriod = data.hopedWorkingPeriod;
            this.hopedWorkingPlace = data.hopedWorkingPlace;
            this.resumeAbilityDtos = data.resumeAbilityDtos;
            this.resumeAcademyDtos = data.resumeAcademyDtos;
            this.resumeCertificateDtos = data.resumeCertificateDtos;
            this.resumeHopedFieldDtos = data.resumeHopedFieldDtos;
            this.resumeAdditionalContactDtos = data.resumeAdditionalContactDtos;
        },
        async getAccountInfo() {
            try {
                const accountData = {
                    email: this.application.workerEmail,
                };
                const { data } = await fetchOneAccountWithApp(accountData);
                console.log('account');
                console.log(data);
                this.account = data;
            } catch (error) {
                console.log(error);
            }
        },
        routeEditPage() {
            const id = this.id;
            this.$router.push(`/resume/edit/${id}`);
        },
        /* file */
        async getAppFiles() {
            const fileData = {
                id: this.application.id,
            };
            console.log('id : ' + this.application.id);
            const { data } = await fetchAppFiles(fileData);
            console.log('get job files');
            console.log(data);
            this.testFiles = data;
        },
        changeFilename(index, event) {
            console.log('change file name');
            console.log('index : ' + index);
            console.log('event.target : ' + event.target);
            const nameDiv =
                event.target.previousElementSibling.previousElementSibling;
            const file = event.target.files[0];
            const filename = file.name;
            console.log('filename : ' + filename);
            nameDiv.value = filename;
            console.log('this.fileIdx : ' + this.files[index.fileIdx]);
            console.log(this.files[index.fileIdx]);
            this.files[index.fileIdx].file = file;
            this.files[index.fileIdx].fileName = filename;
            console.log('this.fileIdx : ' + this.files[index.fileIdx]);
            console.log(this.files[index.fileIdx]);
        },
        async submitFile(event) {
            event.preventDefault();
            console.log('submit file');
            let form = new FormData();
            this.files.forEach(element => {
                form.append('files', element.file);
            });
            form.append('applicationId', this.application.id);
            try {
                const { data } = await uploadAppFile(form);
                console.log(data);
            } catch (error) {
                console.log(error);
            }
            this.getAppFiles();
        },
        routeTrPage(id) {
            console.log('route tr page');
            console.log('id : ' + id);
            this.$router.push(`/tr/${id}`);
        },
    },
};
</script>

<style></style>
