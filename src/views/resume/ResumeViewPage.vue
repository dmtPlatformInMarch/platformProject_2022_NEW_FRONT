<template>
    <section class="main-content">
        <div @submit.prevent="submitResumeForm" class="my-page-wrapper active">
            <div class="my-page-title-wrapper">
                <div class="my-page-title">
                    <span>이력서 작성</span>
                </div>
            </div>
            <div class="resume-list-container">
                <div class="resume-list-header-wrapper">
                    <label for="" class="custom-label custom-label-bigger"
                        >이력서 목록
                        <span>이력서를 등록해 작업에 지원해 보세요!</span>
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

export default {
    data() {
        return {
            id: '',
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
        };
    },
    async created() {
        this.userEmail = this.$store.getters.getUsername;
        try {
            const id = this.$route.params.id;
            const resumeData = {
                id,
            };
            const { data } = await fetchResume(resumeData);
            this.resume = data;
        } catch (error) {
            console.log(error);
        }
        this.injectData(this.resume);
    },
    computed: {
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
        injectData(data) {
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
        routeEditPage() {
            const id = this.id;
            this.$router.push(`/resume/edit/${id}`);
        },
    },
};
</script>

<style></style>
