<template>
    <div>
        <div class="main-content">
            <div class="tl-content">
                <div class="tl-header">
                    <div class="tl-header-content">
                        <div class="tl-header-text">
                            <div class="tl-header-explain">
                                <div class="tl-header-tx">
                                    <div
                                        class="tl-header-title"
                                        th:text="${translatorFile.getOriginalName()}"
                                    >
                                        {{ detail.originalFileName }}
                                    </div>
                                    <div class="tl-header-ext"></div>
                                </div>
                                <div class="tl-header-type">
                                    <div class="tl-header-lang">
                                        {{ detail.tr1 }}
                                    </div>
                                    <div class="tl-header-arrow">
                                        <i
                                            class="fas fa-long-arrow-alt-right"
                                            aria-hidden="true"
                                            style="font-size: 1.5rem;"
                                        ></i>
                                    </div>
                                    <div class="tl-header-lang">
                                        {{ detail.tr2 }}
                                    </div>
                                </div>
                            </div>

                            <div class="tl-header-btns">
                                <!-- <div class="tl-header-btn">파일로 저장</div> -->
                                <button
                                    @click="saveData()"
                                    class="tl-header-btn tl-btn-imp"
                                >
                                    저장
                                </button>
                            </div>
                        </div>

                        <div class="tl-header-progress">
                            <div id="progress_container_txt">
                                <div id="progress_container_txt_align_center">
                                    {{ progress }}% (총 {{ length }}건)
                                </div>
                            </div>
                            <progress
                                value="0"
                                max="100"
                                style="height: 2.5rem; width: 100%;"
                                class="progress-bar"
                            >
                            </progress>
                        </div>
                    </div>
                </div>
                <div class="tl-body">
                    <div class="tl-body-content">
                        <form
                            class="tl-card"
                            v-for="(item, index) in data"
                            :key="index"
                            onsubmit="return false;"
                        >
                            <div class="tl-num-bl">
                                <div class="tl-num">
                                    {{ index + 1 }}
                                </div>
                            </div>
                            <div class="tl-text-list">
                                <div class="tl-text">
                                    <div class="tl-text-type">원글</div>
                                    <div class="tl-text-content tl-text-org">
                                        {{ item.originText }}
                                    </div>
                                </div>
                                <div class="tl-text">
                                    <div class="tl-text-type">번역문</div>
                                    <textarea
                                        class="tl-text-content tl-text-tl"
                                    >
                                        {{ item.translatedText }}
                                    </textarea>
                                    <div class="tl-text-btns">
                                        <button
                                            class="tl-text-btn"
                                            @click="clearTxt(index)"
                                        >
                                            번역<br />
                                            초기화
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="tl-card-bottom">
                                <div class="tl-text">
                                    <div class="tl-text-type">AI 번역</div>
                                    <div
                                        class="tl-text-content tl-text-api"
                                    ></div>
                                </div>
                                <div class="tl-text-btns tl-ai-btns">
                                    <button
                                        class="tl-text-btn tl-al-btn"
                                        @click="tlOgTxt(index)"
                                    >
                                        번역
                                    </button>
                                    <button
                                        class="tl-text-btn tl-al-btn"
                                        @click="admitTxt(index)"
                                    >
                                        적용
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                <!--
                <div class="tl-footer">
                    <div class="tl-page-intro">
                        <div class="tl-page-intro-total">전체 0건</div>
                        <div>/</div>
                        <div class="tl-page-intro-current">10 - 20</div>
                    </div>

                </div>
                -->
            </div>
        </div>
    </div>
</template>

<script>
import { fetchTestFile, fetchTrDetail } from '@/api/file';
import { translateTxt } from '@/api/translator';
import { saveSentences } from '@/api/sentence';

export default {
    data() {
        return {
            data: [],
            detail: {},
            progressCnt: 0,
            progress: 0,
            progressArray: Array(100),
            length: 0,
        };
    },
    created() {
        this.getTrInfo();
        this.getTrDetail();
    },
    methods: {
        clearTxt(index) {
            console.log('cleatTxt');
            console.log(index);
            this.data[index].translatedText = '';
        },
        async tlOgTxt(index) {
            console.log('tlOgTxt');
            console.log(index);

            try {
                const trData = {
                    tr1: this.detail.tr1,
                    tr2: this.detail.tr2,
                    ogTxt: this.data[index].originText,
                };
                const { data } = await translateTxt(trData);
                console.log(data);

                const apiTxt = document.querySelectorAll('.tl-text-api');
                apiTxt[index].innerHTML = data;
            } catch (error) {
                console.log(error);
            }
        },
        admitTxt(index) {
            console.log('admitTxt');
            const apiTxt = document.querySelectorAll('.tl-text-api');
            this.data[index].translatedText = apiTxt[index].innerHTML;

            if (this.progressArray[index] !== true) {
                this.progressArray[index] = true;
                this.progressCnt++;
            }
            console.log('progressCnt');
            console.log(this.progressCnt);
            this.progress = Math.ceil(
                (this.progressCnt / this.data.length) * 100,
            );
            console.log('progress');
            console.log(this.progress);

            const progress = document.querySelector('.progress-bar');
            progress.value = this.progress;
        },
        async saveData() {
            this.data[0].comment = this.$route.params.id;
            console.log('save data');
            console.log(this.data[0].comment);
            try {
                console.log(this.data);
                await saveSentences(this.data);
            } catch (error) {
                console.log(error);
            }
        },
        async getTrInfo() {
            try {
                const id = this.$route.params.id;
                console.log('id : ' + id);
                console.log(id);
                const { data } = await fetchTestFile(id);
                console.log(data);
                this.data = data;
            } catch (error) {
                console.log(error);
            }
            this.length = this.data.length;
        },
        async getTrDetail() {
            try {
                const id = this.$route.params.id;
                console.log('id : ' + id);
                const fileData = {
                    id,
                };
                const { data } = await fetchTrDetail(fileData);
                this.detail = data;
                console.log(this.detail);
            } catch (error) {
                console.log(error);
            }
        },
    },
};
</script>

<style></style>
