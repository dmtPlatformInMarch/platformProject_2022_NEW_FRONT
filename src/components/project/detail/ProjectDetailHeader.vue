<template>
    <div>
        <slot>
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
                            <span v-if="isCreatedManager">관리 중인 작업</span>
                            <span v-if="isWorker && !isAppliedWorker"
                                >참여 가능한 작업</span
                            >
                            <span v-if="isWorker && isAppliedWorker"
                                >참여하고 있는 작업</span
                            >
                            <span
                                v-if="!isCreatedManager && isManagerAbove"
                            ></span>
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
            </div>
        </slot>
    </div>
</template>

<script>
export default {
    props: {
        project: {
            type: Object,
            required: true,
        },
        applied: {
            type: Boolean,
            required: false,
        },
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
    },
};
</script>

<style></style>
