<template>
    <section class="main-content">
        <div class="my-page-wrapper active">
            <div class="my-page-title-wrapper">
                <div class="my-page-title">
                    <span>내 이력서</span>
                </div>
            </div>
            <div class="resume-list-container">
                <div class="resume-list-header-wrapper">
                    <label for="" class="custom-label custom-label-bigger"
                        >이력서 목록
                        <span>이력서는 5개까지만 등록 가능합니다.</span>
                    </label>

                    <div class="my-resume-list-btn">
                        <button @click="toResumeLink">
                            <span
                                ><router-link
                                    to="/resume/new"
                                    style="text-decoration:none; color: white;"
                                    >새 이력서 작성</router-link
                                ></span
                            ><i class="fas fa-pencil-alt"></i>
                        </button>
                    </div>
                </div>

                <div class="resume-list-wrapper">
                    <div class="resume-list-header my-resume-list-header">
                        <span>번호</span>
                        <span>이력서 제목</span>
                        <span>공개여부</span>
                        <span>등록일</span>
                        <span>수정</span>
                        <span>삭제</span>
                    </div>
                    <div
                        v-if="!resumeExists"
                        class="resume-list-content none-list-content"
                    >
                        아직 이력서를 생성하지 않았습니다. 이력서를 생성해
                        보세요!!
                    </div>
                    <div
                        v-else
                        class="resume-list-content my-resume-list-content"
                        v-for="(item, index) in myResumes"
                        :key="index"
                    >
                        <span>{{ index + 1 }}</span>
                        <span
                            ><a
                                href="javascript:;"
                                @click="routeViewPage(item.id)"
                                >{{ item.title }}</a
                            ></span
                        >
                        <span v-if="item.opened">공개</span>
                        <span v-else style="color:gray">비공개</span>
                        <span>{{ item.createdDate | formatDateShortly }}</span>
                        <span
                            ><button @click="routeEditPage(item.id)">
                                수정
                            </button></span
                        >
                        <span
                            ><button @click="deleteItem(item.id)">
                                삭제
                            </button></span
                        >
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { fetchResumeMine, deleteResume } from '@/api/resume';

export default {
    data() {
        return {
            createdBy: '',
            myResumes: [],
        };
    },
    created() {
        this.createdBy = this.$store.getters.getUsername;
        this.fetchData();
    },
    computed: {
        resumeExists() {
            return this.myResumes.length > 0;
        },
    },
    methods: {
        toResumeLink() {
            this.$router.push('/resume/new');
        },
        async fetchData() {
            const resumeData = {
                createdBy: this.createdBy,
            };
            try {
                const { data } = await fetchResumeMine(resumeData);
                this.myResumes = data;
                console.log(data);
            } catch (error) {
                console.log(error);
            }
        },
        routeViewPage(id) {
            this.$router.push(`/resume/mine/${id}`);
        },
        routeEditPage(id) {
            this.$router.push(`/resume/mine/edit/${id}`);
        },
        async deleteItem(id) {
            const resumeData = {
                id,
            };
            if (confirm('정말 삭제하시겠습니까?')) {
                try {
                    const { data } = await deleteResume(resumeData);
                    console.log(data);
                    this.fetchData();
                } catch (error) {
                    console.log(error);
                }
            }
        },
    },
};
</script>

<style></style>
