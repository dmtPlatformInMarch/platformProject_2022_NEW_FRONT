<template>
    <section class="main-content">
        <div class="my-page-wrapper active my-page-caution-container">
            <div class="my-page-title-wrapper">
                <div class="my-page-title">
                    <span class="main-title">회원 가입</span>
                </div>
            </div>

            <div class="my-page-title-wrapper my-page-caution-sub-container">
                <div class="my-page-title-wrapper my-page-caution-wrapper">
                    <div class="my-page-title sub-title register-sub-title">
                        <span
                            ><i class="fas fa-exclamation"></i>약관에 동의해
                            주세요</span
                        >
                    </div>
                    <div class="register-terms-container">
                        <div class="register-terms-pos">
                            <div class="register-terms-wrapper">
                                <div class="check-group">
                                    <input
                                        ref="cursor"
                                        type="checkbox"
                                        id="ruleCheck1"
                                        v-model="isRuleCheck1"
                                    />
                                    <label for="ruleCheck1"></label>
                                </div>
                                <div class="register-terms-explain">
                                    이용약관에 동의합니다.
                                </div>
                                <i
                                    class="fas fa-chevron-right"
                                    id="arrow1"
                                    aria-hidden="true"
                                    v-on:click="showRule1"
                                ></i>
                                <span
                                    class="register-alert"
                                    v-if="!isRuleCheck1"
                                    style="margin-left: 1rem"
                                >
                                    약관에 동의해주세요!
                                </span>
                            </div>
                            <textarea id="ruleDetail1" readonly="">
                                        - 1. 목적   
                
                                        본 약관은 디엠티랩스(이하 "회사")가 제공하는 디엠티클라우드 (DMT Cloud) 및 관련 제반 서비스의 이용조건 및 절차, 이용자와 홈페이지의 **권리, 의무, 책임사항**과 **기타 필요한 사항**을 규정함을 목적으로 합니다.
                                    </textarea
                            >
                        </div>
                    </div>

                    <div class="register-terms-container">
                        <div class="register-terms-pos">
                            <div class="register-terms-wrapper">
                                <div class="check-group">
                                    <input
                                        type="checkbox"
                                        id="ruleCheck2"
                                        v-model="isRuleCheck2"
                                    />
                                    <label for="ruleCheck2"></label>
                                </div>
                                <div class="register-terms-explain">
                                    개인 정보 처리 방침에 동의합니다.
                                </div>
                                <i
                                    class="fas fa-chevron-right"
                                    id="arrow2"
                                    aria-hidden="true"
                                    v-on:click="showRule2"
                                ></i>
                                <span
                                    style="margin-left: 1rem"
                                    class="register-alert"
                                    v-if="!isRuleCheck2"
                                >
                                    약관에 동의해주세요!
                                </span>
                            </div>
                            <textarea id="ruleDetail2" readonly="">
                                        - 1. 목적   
                
                                        본 약관은 디엠티랩스(이하 "회사")가 제공하는 디엠티클라우드 (DMT Cloud) 및 관련 제반 서비스의 이용조건 및 절차, 이용자와 홈페이지의 **권리, 의무, 책임사항**과 **기타 필요한 사항**을 규정함을 목적으로 합니다.
                                    </textarea
                            >
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="my-page-wrapper register-wrapper active">
            <div class="resume-list-container">
                <div class="resume-list-header-wrapper">
                    <label for="" class="custom-label custom-label-bigger"
                        >회원 정보 입력
                    </label>
                </div>

                <form
                    @submit.prevent="submitAccountForm"
                    class="resume-write-container"
                >
                    <div class="resume-write-wrapper">
                        <div class="resume-write-title">
                            <span
                                ><i class="fas fa-pen-alt"></i>가입 역할<span
                                    class="required"
                                    >required</span
                                ></span
                            >
                            <span>가입할 역할을 선택해 주세요.</span>
                        </div>
                        <div class="resume-write-content">
                            <input
                                id="account-role"
                                v-model="role"
                                type="hidden"
                                hidden
                            />
                            <ul class="rg-role-ul">
                                <li class="rg-role-li rg-role-li-cl">
                                    <a
                                        class="rg-role-a rg-role-a-cl"
                                        id="workerBtn"
                                        v-on:click="selectRoleWorker"
                                    >
                                        작업자로 가입할 예정입니다.
                                    </a>
                                </li>

                                <li class="rg-role-li">
                                    <a
                                        class="rg-role-a"
                                        id="managerBtn"
                                        v-on:click="selectRoleManager"
                                    >
                                        관리자로 가입할 예정입니다.
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="resume-write-wrapper">
                        <div class="resume-write-title">
                            <span>
                                <i class="fas fa-pen-alt"></i>
                                이메일
                                <span class="required">required</span>
                            </span>
                            <span
                                >이메일 양식에 맞게 입력해주세요.
                                (dmblabs@gmail.com 등)</span
                            >
                        </div>
                        <div class="resume-write-content">
                            <input
                                type="text"
                                id="account-email"
                                v-model="email"
                            />
                            <div class="register-explain">
                                이메일 인증이 완료되어야 원활한 서비스를
                                이용하실 수 있습니다<br />
                                메일함을 확인해주세요.
                            </div>
                            <span
                                class="register-alert"
                                v-if="!isEmailValid && email"
                            >
                                정확한 양식의 이메일을 입력해주세요!
                            </span>
                        </div>
                    </div>

                    <div class="resume-write-wrapper">
                        <div class="resume-write-title">
                            <span>
                                <i class="fas fa-pen-alt"></i>
                                비밀번호
                                <span class="required">required</span>
                            </span>
                            <span
                                >4자 이상 10자 이내, 특수문자와 알파벳, 숫자를
                                1자 이상 혼합해야 합니다.</span
                            >
                        </div>
                        <div class="resume-write-content">
                            <input
                                type="password"
                                id="account-password"
                                v-model="password"
                            />
                            <div class="register-explain">
                                특수문자는 *, #, @, !, ^, %, +, =, -, $만 사용할
                                수 있습니다.
                            </div>
                            <div
                                class="register-alert"
                                v-if="!isPasswordValid && password"
                            >
                                정확한 양식의 비밀번호를 입력해 주세요!
                            </div>
                            <input
                                type="password"
                                id="account-password-confirm"
                                v-model="passwordConfirm"
                            />
                            <div class="register-explain">
                                비밀번호 확인란입니다. 위에 입력한 비밀번호와
                                동일하게 입력해주세요.
                            </div>
                            <div
                                class="register-alert"
                                v-if="!matchPassword && passwordConfirm"
                            >
                                입력한 비밀번호가 위와 일치하지 않습니다!
                            </div>
                        </div>
                    </div>

                    <div class="resume-write-wrapper">
                        <div class="resume-write-title">
                            <span
                                ><i class="fas fa-pen-alt"></i>이름<span
                                    class="required"
                                    >required</span
                                ></span
                            >
                            <span>성과 이름을 정확히 기입해 주세요.</span>
                        </div>
                        <div class="resume-write-content register-name-pos">
                            <input
                                type="text"
                                id="account-family-name"
                                v-model="firstName"
                            />

                            <input
                                type="text"
                                id="account-first-name"
                                v-model="lastName"
                            />
                        </div>
                    </div>

                    <div class="resume-write-wrapper">
                        <div class="resume-write-title">
                            <span
                                ><i class="fas fa-pen-alt"></i>연락처<span
                                    class="required"
                                    >required</span
                                ></span
                            >
                            <span>핸드폰 번호를 정확히 기입해 주세요.</span>
                        </div>
                        <div class="resume-write-content register-name-pos">
                            <input type="hidden" hidden v-model="phoneNumber" />
                            <div class="selectBox phone-select">
                                <select
                                    name="ability"
                                    class="select"
                                    v-model="phoneFirst"
                                >
                                    <option value="010">010</option>
                                    <option value="011">011</option>
                                    <option value="017">017</option>
                                </select>
                                <span class="icoArrow"
                                    ><i class="fas fa-chevron-down"></i
                                ></span>
                            </div>

                            <input
                                type="text"
                                id="account-phone"
                                v-model="phoneLast"
                                @input="phoneLastChange($event)"
                            />

                            <div class="register-explain">
                                핸드폰 뒷자리는 숫자만 입력해 주세요.
                            </div>

                            <div
                                class="register-alert"
                                v-if="!isPhoneLastValid && phoneLast"
                            >
                                핸드폰 번호가 바르지 않습니다.
                            </div>
                        </div>
                    </div>

                    <div
                        class="resume-confirm-wrapper account-register-btn-wrapper"
                    >
                        <button :disabled="!isFormValid" type="submit">
                            회원가입
                        </button>

                        <div class="register-alert" v-if="message">
                            {{ message }}
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </section>
</template>

<script>
import {
    validateEmail,
    validatePassword,
    validatePhone,
} from '@/utils/validation';
import { registerAccount } from '@/api/auth';

export default {
    data() {
        return {
            role: 'ROLE_WORKER',
            email: '',
            password: '',
            passwordConfirm: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            phoneFirst: '',
            phoneLast: '',
            isRuleCheck1: '',
            isRuleCheck2: '',
            message: '',
        };
    },
    mounted() {
        this.startCursor();
    },
    computed: {
        isEmailValid() {
            return validateEmail(this.email);
        },
        isPasswordValid() {
            return validatePassword(this.password);
        },
        isPhoneLastValid() {
            return validatePhone(this.phoneLast);
        },
        matchPassword() {
            return this.password === this.passwordConfirm;
        },
        isFormValid() {
            this.ruleChecking();
            return (
                this.isEmailValid &&
                this.isPasswordValid &&
                this.isPhoneLastValid &&
                this.matchPassword &&
                this.firstName &&
                this.lastName &&
                this.phoneFirst &&
                this.isRuleCheck1 &&
                this.isRuleCheck2
            );
        },
    },
    methods: {
        startCursor() {
            this.$refs.cursor.focus();
        },
        async submitAccountForm() {
            this.reorganizePhoneNumber();
            try {
                const account = {
                    role: this.role,
                    email: this.email,
                    password: this.password,
                    firstName: this.firstName,
                    lastName: this.lastName,
                    phoneNumber: this.phoneNumber,
                };
                const { data } = await registerAccount(account);
                console.log(data);
                // await this.$store.dispatch('REGISTER', userData);
                this.initForm();
                this.$router.push('/signin');
            } catch (error) {
                console.log(error.response.data.message);
                this.message = error.response.data.message;
            }
        },
        initForm() {
            this.role = '';
            this.email = '';
            this.password = '';
            this.passwordConfirm = '';
            this.firstName = '';
            this.lastName = '';
            this.phoneNumber = '';
            this.phoneLast = '';
            this.isRuleCheck1 = false;
            this.isRuleCheck2 = false;
        },
        selectRoleWorker() {
            this.role = 'ROLE_WORKER';
            this.changeRoleBtn(0);
        },
        selectRoleManager() {
            this.role = 'ROLE_MANAGER';
            this.changeRoleBtn(1);
        },
        changeRoleBtn(num) {
            const hasSelectedLi = document.querySelector('.rg-role-li-cl');
            if (hasSelectedLi.classList.contains('rg-role-li-cl'))
                hasSelectedLi.classList.remove('rg-role-li-cl');

            const selectedLi = document.querySelectorAll('.rg-role-li')[num];
            if (!selectedLi.classList.contains('rg-role-li-cl'))
                selectedLi.classList.add('rg-role-li-cl');
        },
        phoneLastChange(event) {
            let val = event.target.value;
            if (val.length >= 7) {
                val = val.replace('-', '');
                val =
                    val.substr(0, val.length - 4) +
                    '-' +
                    val.substr(val.length - 4, val.length - 1);
            }
            this.phoneLast = val;
            event.target.value = val;
        },
        showRule1() {
            const rule1 = document.querySelector('#ruleDetail1');
            rule1.classList.toggle('active');
            const i1 = document.querySelectorAll('.register-terms-wrapper')[0];
            i1.classList.toggle('active');
        },
        showRule2() {
            const rule2 = document.querySelector('#ruleDetail2');
            rule2.classList.toggle('active');
            const i2 = document.querySelectorAll('.register-terms-wrapper')[1];
            i2.classList.toggle('active');
        },
        ruleChecking() {
            if (this.isRuleCheck1 !== true) this.isRuleCheck1 = false;
            if (this.isRuleCheck2 !== true) this.isRuleCheck2 = false;
        },
        reorganizePhoneNumber() {
            this.phoneNumber = this.phoneFirst + '-' + this.phoneLast;
        },
    },
};
</script>

<style></style>
