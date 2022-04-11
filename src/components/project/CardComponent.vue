<template>
    <div class="card-wrapper">
        <div class="card-custom-header">
            <div class="card-header-field">
                <span>{{ project.firstFieldName }}</span>
            </div>
            <div class="card-header-favorite-cnt">
                <i class="fas fa-star"></i>
                <span>{{ project.favoriteCnt }}</span>
            </div>
        </div>
        <div class="card-body">
            <div class="card-body-title">
                <span>{{ project.title }}</span>
            </div>
            <div class="card-body-letterpress">
                <span> {{ project.content }} </span>
            </div>
        </div>
        <div class="card-tail">
            <div class="card-tail-wrapper">
                <div class="card-tail-period">
                    <span>{{ project.createdDate | formatDateShortly }}</span>
                    ~
                    <span>{{ project.deadline | formatDateShortly }}</span>
                </div>
                <div class="card-tail-payment">
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
            <div class="card-tail-wrapper">
                <div class="card-tail-btns">
                    <div class="card-tail-btn">
                        <i class="fas fa-briefcase"></i>
                    </div>
                    <div class="card-tail-btn">
                        <i class="fas fa-star"></i>
                    </div>
                    <div class="card-tail-btn">
                        <i class="fas fa-file-word"></i>
                    </div>
                </div>
                <div class="card-tail-view-btn">
                    <button @click="routeViewPage">상세 보기</button>
                </div>
            </div>
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
        console.log(this.project);
    },
};
</script>

<style></style>
