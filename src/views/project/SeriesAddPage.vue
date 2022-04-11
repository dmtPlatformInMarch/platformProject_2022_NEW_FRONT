<template>
    <section class="main-content">
        <div class="my-page-wrapper active my-page-caution-container">
            <div class="my-page-title-wrapper my-page-caution-sub-container">
                <div class="my-page-title-wrapper my-page-caution-wrapper">
                    <div class="my-page-title sub-title">
                        <span
                            >시리즈 생성 시 주의사항<i
                                class="fas fa-exclamation"
                            ></i
                        ></span>
                    </div>
                    <div class="my-page-caution-content">
                        <span>
                            <li>
                                프로젝트를 관련 프로젝트끼리 효율적으로
                                관리하고자 할 때 생성합니다.
                            </li>
                        </span>
                    </div>
                </div>
            </div>
        </div>
        <div class="my-page-wrapper active">
            <div class="my-page-title-wrapper">
                <div class="my-page-title">
                    <span>시리즈 생성</span>
                </div>
            </div>
            <div class="resume-list-container">
                <div class="resume-list-header-wrapper"></div>

                <form
                    @submit.prevent="submitSeriesForm"
                    class="resume-write-container"
                >
                    <div class="resume-write-wrapper">
                        <div class="resume-write-title">
                            <span
                                ><i class="fas fa-pen-alt"></i>시리즈 제목<span
                                    class="required"
                                    >required</span
                                ></span
                            >
                            <span>시리즈 제목을 입력해 주세요.</span>
                        </div>
                        <div class="resume-write-content">
                            <input
                                type="text"
                                id="resume-title"
                                class="resume-title"
                                v-model="title"
                            />
                        </div>
                    </div>

                    <div class="resume-write-wrapper">
                        <div class="resume-write-title">
                            <span
                                ><i class="fas fa-pen-alt"></i>시리즈 설명<span
                                    class="required"
                                    >required</span
                                ></span
                            >
                            <span>시리즈를 소개하는 글을 써 보세요.</span>
                        </div>
                        <div class="resume-write-content job-content">
                            <textarea
                                name="resume-content"
                                id="resume-content"
                                cols="30"
                                rows="10"
                                v-model="content"
                            ></textarea>
                        </div>
                    </div>

                    <div class="resume-write-wrapper">
                        <div class="resume-write-title">
                            <span><i class="fas fa-pen-alt"></i>공유 여부</span>
                            <span
                                >다른 매니저와 시리즈를 공유하시겠습니까?</span
                            >
                        </div>
                        <div class="resume-write-content">
                            <label class="switch-button4">
                                <input type="checkbox" v-model="isOpened" />
                                <span class="onoff-switch4"></span>
                            </label>
                        </div>
                    </div>

                    <div class="resume-confirm-wrapper">
                        <button :disabled="!isFormValid" type="submit">
                            생성하기
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </section>
</template>

<script>
import { createSeries } from '@/api/project';

export default {
    data() {
        return {
            title: '',
            content: '',
            isOpened: false,
            createdBy: '',
        };
    },
    computed: {
        isFormValid() {
            return (
                this.title &&
                this.content &&
                this.title !== '' &&
                this.content !== ''
            );
        },
    },
    methods: {
        setCreatedBy() {
            this.createdBy = this.$store.getters.getUsername;
        },
        async submitSeriesForm() {
            console.log('submit series form');
            this.setCreatedBy();
            try {
                const seriesData = {
                    title: this.title,
                    content: this.content,
                    isOpened: this.isOpened,
                    createdBy: this.createdBy,
                };
                const { data } = await createSeries(seriesData);
                console.log('data : ' + data);
                this.$router.push('/main');
            } catch (error) {
                console.log(error.response.data.message);
            }
        },
    },
};
</script>

<style></style>
