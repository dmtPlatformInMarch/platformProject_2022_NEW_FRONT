<template>
    <section class="main-content">
        <div
            class="my-page-wrapper active my-page-caution-container login-container"
        >
            <div class="my-page-title-wrapper">
                <div class="my-page-title">
                    <span class="main-title">로그인</span>
                </div>
            </div>

            <form
                @submit.prevent="submitLoginForm"
                class="my-page-title-wrapper login-wrapper"
            >
                <div class="resume-write-wrapper login-content-wrapper">
                    <div class="resume-write-title">
                        <span><i class="fas fa-sign-in-alt"></i>이메일</span>
                        <span>가입하신 이메일을 입력해주세요.</span>
                    </div>
                    <div class="resume-write-content">
                        <input type="text" id="account-email" v-model="email" />
                        <div
                            v-if="!isEmailValid && email"
                            class="register-alert"
                        >
                            올바르지 않은 이메일 양식입니다.
                        </div>
                    </div>
                </div>

                <div class="resume-write-wrapper login-content-wrapper">
                    <div class="resume-write-title">
                        <span><i class="fas fa-sign-in-alt"></i>비밀번호</span>
                        <span>비밀번호를 입력해주세요.</span>
                    </div>
                    <div class="resume-write-content">
                        <input
                            type="password"
                            id="account-password"
                            v-model="password"
                        />
                    </div>
                </div>

                <div class="resume-confirm-wrapper login-btn-wrapper">
                    <div>
                        <a href="#">이메일 찾기</a>
                        <a href="#">비밀번호 찾기</a>
                    </div>
                    <button
                        :disabled="!isEmailValid && !password"
                        type="submit"
                    >
                        로그인
                    </button>
                    <div class="register-alert" v-if="message">
                        {{ message }}
                    </div>
                </div>
            </form>
        </div>
    </section>
</template>

<script>
import { validateEmail } from '@/utils/validation';
import { signinUser } from '@/api/auth';

export default {
    data() {
        return {
            // form values
            email: '',
            password: '',
            // log
            message: '',
        };
    },
    computed: {
        isEmailValid() {
            return validateEmail(this.email);
        },
    },
    methods: {
        async submitLoginForm() {
            try {
                const userData = {
                    email: this.email,
                    password: this.password,
                };
                const response = await signinUser(userData);
                console.log(response);
                await this.$store.dispatch('SIGNIN', userData);
                this.$store.commit('setUserRole', response.data.roleName);
                console.log('submitLoginForm ' + this.$store.getters.getRole);
                this.$router.push('/main');
            } catch (error) {
                console.log(error);
            } finally {
                this.initForm();
            }
        },
        initForm() {
            this.email = '';
            this.password = '';
        },
    },
};
</script>

<style></style>
