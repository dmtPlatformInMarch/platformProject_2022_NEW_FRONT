<template>
    <div class="row-package">
        <div class="row-wrapper">
            <div class="row-position">
                <div class="row-header">
                    <div class="row-header-favorite-cnt">
                        <i class="fas fa-star"></i>
                        <span>{{ project.favoriteCnt }}</span>
                    </div>

                    <div class="row-header-field">
                        <span>{{ project.firstFieldName }}</span>
                    </div>
                </div>
                <div class="row-body">
                    <div class="row-body-title">
                        {{ project.title }}
                    </div>
                    <div class="row-body-wrapper">
                        <div class="row-body-period">
                            <span>{{
                                project.createdDate | formatDateShortly
                            }}</span>
                            ~
                            <span>{{
                                project.deadline | formatDateShortly
                            }}</span>
                        </div>
                        <div class="row-body-payment">
                            <i class="fas fa-coins"></i>
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
                </div>
            </div>
            <div class="row-tail">
                <div class="row-tail-wrapper">
                    <div class="row-tail-btns">
                        <div class="row-tail-btn">
                            <i class="fas fa-briefcase"></i>
                        </div>
                        <div class="row-tail-btn">
                            <i class="fas fa-star"></i>
                        </div>
                        <div class="row-tail-btn">
                            <i class="fas fa-file-word"></i>
                        </div>
                    </div>
                    <div class="row-tail-view-btn">
                        <button @click="routeViewPage">상세 보기</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="row-letterpress-space">
            {{ project.content }}
        </div>
    </div>
</template>

<script>
export default {
    props: {
        project: {
            type: Object,
            required: true,
        },
    },
    methods: {
        routeViewPage() {
            const id = this.project.id;
            this.$router.push(`/project/${id}`);
        },
    },
    created() {
        console.log('component created!');
    },
};
</script>

<style></style>
