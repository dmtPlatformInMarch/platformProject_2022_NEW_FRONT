<template>
    <div class="job-menu-wrapper">
        <slot>
            <div class="job-menu-pos">
                <div class="job-menu ">
                    <a href="#" @click="goDetail">상세사항</a>
                </div>
            </div>
            <!-- 우측 메뉴 -->
            <div class="job-menu-pos">
                <div class="job-menu" v-if="isWorker && !isAppliedWorker">
                    <a href="#" @click="goApplyWorker">
                        <span>지원하기</span>
                    </a>
                </div>

                <div class="job-menu" v-if="isCreatedManager">
                    <a href="#" @click="goApplyManager">
                        <span>지원 정보</span>
                    </a>
                </div>

                <div class="job-menu" v-if="isAppliedWorker">
                    <a href="#" @click="goApplyWorker">
                        <span>지원 정보</span>
                    </a>
                </div>

                <!--
            <div class="job-menu" v-if="isWorker || isCreatedManager">
                <a href="#" @click="goMyJob" :disabled="!applyValid">
                    <span v-if="isAppliedWorker">지원 정보</span>
                    <span v-if="isCreatedManager">지원 목록</span>
                    <span v-if="isWorker && !isAppliedWorker">지원하기</span>
                </a>
            </div>
            -->

                <div class="job-menu" v-if="isAppliedWorker">
                    <a href="#" @click="goMyJobWorker">
                        <!-- goApply -->
                        <span>나의 작업</span>
                    </a>
                </div>
                <div class="job-menu" v-if="isCreatedManager">
                    <a href="#" @click="goMyJobManager">
                        <span>작업 목록</span>
                    </a>
                </div>
            </div>
        </slot>
    </div>
</template>

<script>
export default {
    data() {
        return {
            userEmail: '',
            userRole: '',
        };
    },
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
    created() {
        this.userEmail = this.$store.getters.getUsername;
        this.userRole = this.$store.getters.getRole;
    },
    methods: {
        goDetail() {
            const id = this.$route.params.id;
            this.$router.push(`/project/${id}`);
        },

        goApplyWorker() {
            const id = this.$route.params.id;
            this.$router.push(`/project/${id}/worker/apply`);
        },
        goApplyManager() {
            const id = this.$route.params.id;
            this.$router.push(`/project/${id}/manager/apply`);
        },
        goMyJobWorker() {
            const id = this.$route.params.id;
            this.$router.push(`/project/${id}/worker/job`);
        },
        goMyJobManager() {
            const id = this.$route.params.id;
            this.$router.push(`/project/${id}/manager/job`);
        },
        activeProjectMenu(index) {
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
    },
};
</script>
