<template>
    <div class="main-content" style="width: 90vw;">
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
                                    원문 파일 제목
                                </div>
                                <div class="tl-header-ext"></div>
                            </div>
                            <div class="tl-header-type">
                                <div class="tl-header-lang">한국어</div>
                                <div class="tl-header-arrow">
                                    <i
                                        class="fas fa-long-arrow-alt-right"
                                        aria-hidden="true"
                                        style="font-size: 1.5rem;"
                                    ></i>
                                </div>
                                <div class="tl-header-lang">중국어</div>
                            </div>
                        </div>

                        <div class="tl-header-btns">
                            <div class="tl-header-btn">파일로 저장</div>
                            <button
                                onclick="saveData(this);"
                                class="tl-header-btn tl-btn-imp"
                            >
                                저장
                            </button>
                        </div>
                    </div>

                    <div class="tl-header-progress">
                        <div id="progress_container_txt">
                            <div id="progress_container_txt_align_center">
                                30% (총 100건)
                            </div>
                        </div>
                        <progress
                            value="20"
                            max="100"
                            style="width: 100%; height: 2.5rem;"
                            >20%</progress
                        >
                    </div>
                </div>
            </div>
            <div class="tl-body">
                <div class="tl-body-content">
                    <form
                        class="tl-card"
                        th:each="tx : ${texts}"
                        th:id="'card' + ${txStat.count}"
                        onclick="formClicked(this)"
                        onsubmit="return false;"
                    >
                        <div class="tl-num-bl">
                            <div class="tl-num" th:text="${txStat.count}">
                                1
                            </div>
                        </div>
                        <div class="tl-text-list">
                            <div class="tl-text">
                                <div class="tl-text-type">원글</div>
                                <div
                                    class="tl-text-content tl-text-org"
                                    th:text="${tx.getOriginText()}"
                                ></div>
                            </div>
                            <div class="tl-text">
                                <div class="tl-text-type">번역문</div>
                                <textarea
                                    class="tl-text-content tl-text-tl"
                                    th:text="${tx.getTranslatedText()}"
                                >
번역번역번역 번역번역번역 번역번역번역 번역번역번역 번역번역번역 번역번역번역 번역번역번역 번역번역번역 번역번역번역 번역번역번역 번역번역번역 번역번역번역 번역번역번역 번역번역번역 번역번역번역 번역번역번역 번역번역번역 번역번역번역 번역번역번역 번역번역번역 번역번역번역 번역번역번역 번역번역번역 번역번역번역 번역번역번역 번역번역번역 번역번역번역 번역번역번역 번역번역번역 번역번역번역 번역번역번역 </textarea
                                >
                                <div class="tl-text-btns">
                                    <button
                                        class="tl-text-btn"
                                        onclick="clearTxt(this);"
                                    >
                                        초기화
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="tl-card-bottom">
                            <div class="tl-text">
                                <div class="tl-text-type">AI 번역</div>
                                <div class="tl-text-content tl-text-api"></div>
                            </div>
                            <div class="tl-text-btns tl-ai-btns">
                                <button
                                    class="tl-text-btn tl-al-btn"
                                    onclick="tlOgTxt(this);"
                                >
                                    번역
                                </button>
                                <button
                                    class="tl-text-btn tl-al-btn"
                                    onclick="admitTxt(this);"
                                >
                                    적용
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {};
</script>

<style></style>
