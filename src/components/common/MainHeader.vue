<template>
    <section class="headers">
        <section class="header desktop-header">
            <div class="main-header">
                <div class="main-header-container">
                    <div class="main-header-left">
                        <div class="main-logo">
                            <router-link :to="logoLink">
                                <img :src="logoUrl" alt="로고" />
                            </router-link>
                        </div>
                        <div class="main-header-left-menus">
                            <!-- active -->
                            <a
                                href="javascript:;"
                                @click="activateJobSubMenu"
                                class="main-header-menu"
                                >프로젝트</a
                            >
                            <a
                                href="javascript:;"
                                @click="activateManualSubMenu"
                                class="main-header-menu"
                                >매뉴얼</a
                            >
                            <a
                                href="javascript:;"
                                @click="activateCommunitySubMenu"
                                class="main-header-menu"
                                >커뮤니티</a
                            >
                        </div>
                        <div class="main-search-form">
                            <div class="main-search-wrapper">
                                <input
                                    type="search"
                                    placeholder="프로젝트 검색"
                                />
                                <a href="#"><i class="fas fa-search"></i></a>
                                <span class="main-search-btn">
                                    <i class="fas fa-times-circle"></i>
                                </span>
                            </div>
                            <div class="my-search-list-container">
                                <div class="my-searcch-list">
                                    <div class="my-search-list-setting">
                                        <div>최근 검색어</div>
                                        <span>전체 삭제</span>
                                    </div>
                                    <div class="my-search-items">
                                        <li class="my-search-item">
                                            번역
                                            <i class="fas fa-times"></i>
                                        </li>
                                        <li class="my-search-item">
                                            불어
                                            <i class="fas fa-times"></i>
                                        </li>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <template v-if="isUserLogin">
                        <div class="main-header-right-menus">
                            <div class="main-header-icon-wrapper has-contents">
                                <a href="#"> <i class="fas fa-bell"></i></a>
                            </div>
                            <div class="main-header-icon-wrapper">
                                <!-- i에 active -->
                                <a href="#"><i class="fas fa-envelope"></i></a>
                            </div>
                            <div class="main-header-icon-wrapper">
                                <a href="#"><i class="fas fa-star"></i></a>
                            </div>
                            <div class="main-header-menu my-profile">
                                <a href="#">내 프로필</a>
                                <i class="fas fa-chevron-down"></i>
                                <div class="main-header-dropdown">
                                    <div
                                        class="main-header-dropdown-wrapper first"
                                    >
                                        <div class="main-header-dropdown-item">
                                            <a href="#">마이페이지</a>
                                        </div>
                                        <div class="main-header-dropdown-item">
                                            <router-link to="/project/mine"
                                                >내프로젝트</router-link
                                            >
                                        </div>
                                        <div
                                            class="main-header-dropdown-item"
                                            v-if="isWorker"
                                        >
                                            <router-link to="/resume/mine"
                                                >내 이력서</router-link
                                            >
                                        </div>
                                        <div class="main-header-dropdown-item">
                                            <a href="#">고객센터</a>
                                        </div>
                                    </div>
                                    <div
                                        class="main-header-dropdown-wrapper first"
                                        v-if="isManagerAbove"
                                    >
                                        <div class="main-header-dropdown-item">
                                            <router-link to="/series/new"
                                                >새시리즈</router-link
                                            >
                                        </div>
                                        <div class="main-header-dropdown-item">
                                            <router-link to="/project/new"
                                                >새프로젝트</router-link
                                            >
                                        </div>
                                    </div>
                                    <div class="main-header-dropdown-wrapper">
                                        <div class="main-header-dropdown-item">
                                            <a
                                                href="javascript:;"
                                                @click="logoutUser"
                                                class="logout-button"
                                                >로그아웃</a
                                            >
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </template>
                    <template v-else>
                        <div class="main-header-right-menus">
                            <a
                                class="main-header-right-menu"
                                v-bind:class="{ active: isSignin }"
                                href="javascript:;"
                                @click="signinLink"
                            >
                                로그인
                            </a>
                            <a
                                class="main-header-right-menu"
                                v-bind:class="{ active: isRegister }"
                                href="javascript:;"
                                @click="registerLink"
                            >
                                회원가입
                            </a>
                        </div>
                    </template>
                </div>
            </div>

            <div class="sub-header">
                <div class="sub-header-wrapper">
                    <div class="sub-header-container">
                        <!-- active, menu-item 하나도 active -->
                        <div class="sub-header-menu-item not-last">
                            <a href="javascript:;" @click="projectListLink">
                                신규 프로젝트
                            </a>
                        </div>
                    </div>
                </div>
                <div class="sub-header-wrapper second">
                    <div class="sub-header-container">
                        <div class="sub-header-menu-item not-last">
                            <a href="#">매뉴얼</a>
                        </div>
                        <div class="sub-header-menu-item not-last">
                            <a href="#">공지</a>
                        </div>
                        <div class="sub-header-menu-item">
                            <a href="#">문의</a>
                        </div>
                    </div>
                </div>
                <div class="sub-header-wrapper third ">
                    <div class="sub-header-container">
                        <div class="sub-header-menu-item not-last">
                            <a href="#">프로젝트후기</a>
                        </div>
                        <div class="sub-header-menu-item">
                            <a href="#">커뮤니티</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- mobile header -->
        <section class="header mobile-header">
            <div class="main-header">
                <div class="main-header-container">
                    <div class="main-logos">
                        <div class="main-logo">
                            <router-link :to="logoLink">
                                <img :src="logoUrl" alt="로고" />
                            </router-link>
                        </div>
                        <div class="main-nav-logo">
                            <a
                                class="toggleMobileMenu"
                                href="javascript:;"
                                @click="toggleMobileMenu"
                            >
                                <i class="fas fa-bars"></i>
                            </a>
                        </div>
                    </div>
                    <div class="main-mobile-nav">
                        <div class="main-header-left">
                            <div class="main-header-left-menus">
                                <div class="main-left-menu-wrapper">
                                    <div class="main-left-menu-header">
                                        <a
                                            href="javascript:;"
                                            @click="activateJobSubMenu"
                                            class="main-header-menu"
                                            >프로젝트</a
                                        >
                                        <a
                                            href="javascript:;"
                                            @click="activateJobSubMenu"
                                        >
                                            <i class="fas fa-chevron-down"></i>
                                        </a>
                                    </div>
                                    <div class="sub-header-wrapper">
                                        <div class="sub-header-container">
                                            <div
                                                class="sub-header-menu-item active"
                                            >
                                                <a
                                                    href="javascript:;"
                                                    @click="projectListLink"
                                                    >신규프로젝트</a
                                                >
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="main-left-menu-wrapper">
                                    <div class="main-left-menu-header">
                                        <a
                                            href="javascript:;"
                                            @click="activateManualSubMenu"
                                            class="main-header-menu"
                                            >매뉴얼</a
                                        >
                                        <a
                                            href="javascript:;"
                                            @click="activateManualSubMenu"
                                        >
                                            <i class="fas fa-chevron-down"></i>
                                        </a>
                                    </div>
                                    <div class="sub-header-wrapper">
                                        <div class="sub-header-container">
                                            <div class="sub-header-menu-item">
                                                <a href="#">매뉴얼</a>
                                            </div>
                                            <div class="sub-header-menu-item">
                                                <a href="#">공지</a>
                                            </div>
                                            <div class="sub-header-menu-item">
                                                <a href="#">문의</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="main-left-menu-wrapper">
                                    <div class="main-left-menu-header">
                                        <a
                                            href="javascript:;"
                                            @click="activateCommunitySubMenu"
                                            class="main-header-menu"
                                            >커뮤니티</a
                                        >
                                        <a
                                            href="javascript:;"
                                            @click="activateCommunitySubMenu"
                                        >
                                            <i class="fas fa-chevron-down"></i>
                                        </a>
                                    </div>
                                    <div class="sub-header-wrapper">
                                        <div class="sub-header-container">
                                            <div class="sub-header-menu-item">
                                                <a href="#">프로젝트후기</a>
                                            </div>
                                            <div class="sub-header-menu-item">
                                                <a href="#">커뮤니티</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="main-search-form">
                                <div class="main-search-wrapper">
                                    <input
                                        type="search"
                                        placeholder="프로젝트 검색"
                                    />
                                    <a href="#"
                                        ><i class="fas fa-search"></i
                                    ></a>
                                    <span class="main-search-btn">
                                        <i class="fas fa-times-circle"></i>
                                    </span>
                                </div>
                                <div class="my-search-list-container">
                                    <div class="my-searcch-list">
                                        <div class="my-search-list-setting">
                                            <div>최근 검색어</div>
                                            <span>전체 삭제</span>
                                        </div>
                                        <div class="my-search-items">
                                            <li class="my-search-item">
                                                번역
                                                <i class="fas fa-times"></i>
                                            </li>
                                            <li class="my-search-item">
                                                불어
                                                <i class="fas fa-times"></i>
                                            </li>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="main-header-right-menus">
                            <div class="main-header-icon-wrapper active">
                                <a href="#"> 알림 </a>
                            </div>
                            <div class="main-header-icon-wrapper">
                                <a href="#"> 쪽지 </a>
                            </div>
                            <div class="main-header-icon-wrapper">
                                <a href="#"> 즐겨찾기 </a>
                            </div>
                            <div class="main-header-menu my-profile">
                                <a href="#">내 프로필</a>
                                <i class="fas fa-chevron-down"></i>
                                <div class="main-header-dropdown">
                                    <div
                                        class="main-header-dropdown-wrapper first"
                                    >
                                        <div class="main-header-dropdown-item">
                                            <a href="#">마이페이지</a>
                                        </div>
                                        <div class="main-header-dropdown-item">
                                            <a href="#">내프로젝트</a>
                                        </div>
                                        <div
                                            v-if="isManagerAbove"
                                            class="main-header-dropdown-item"
                                        >
                                            <router-link to="/series/new"
                                                >새시리즈</router-link
                                            >
                                        </div>
                                        <div
                                            v-if="isManagerAbove"
                                            class="main-header-dropdown-item"
                                        >
                                            <router-link to="/job/new"
                                                >새프로젝트</router-link
                                            >
                                        </div>
                                        <div
                                            class="main-header-dropdown-item"
                                            v-if="isWorker"
                                        >
                                            <a href="#">내 이력서</a>
                                        </div>
                                        <div class="main-header-dropdown-item">
                                            <a href="#">고객센터</a>
                                        </div>
                                    </div>
                                    <div class="main-header-dropdown-wrapper">
                                        <div class="main-header-dropdown-item">
                                            <a href="#">로그아웃</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </section>
</template>

<script>
import { deleteCookie } from '@/utils/cookies';
import { logoutAccount } from '@/api/auth';

export default {
    data() {
        return {
            logoUrl: require('@/img/logo.png'),
            pathname: '',
        };
    },
    beforeMount() {
        this.setPathName();
    },
    computed: {
        isUserLogin() {
            console.log('isUserLogin : ' + this.$store.getters.isLogin);
            return this.$store.getters.isLogin;
        },
        logoLink() {
            return this.$store.getters.isLogin ? '/main' : '/signin';
        },
        isRegister() {
            return this.pathname === '/register';
        },
        isSignin() {
            return this.pathname === '/signin';
        },
        isWorker() {
            return this.$store.getters.isWorker;
        },
        isManagerAbove() {
            console.log(
                'isManagerAbove! : ' +
                    (this.$store.getters.isManager ||
                        this.$store.getters.isAdmin),
            );
            return this.$store.getters.isManager || this.$store.getters.isAdmin;
        },
    },
    methods: {
        toggleMobileMenu() {
            const mainMobileNav = document.querySelector('.main-mobile-nav');
            mainMobileNav.classList.toggle('active');
        },
        /* menu activate */
        /* 공통 */
        activateByindex(index) {
            this.toggleClassByClassName('main-header-menu', index);
            this.toggleClassByClassName('main-left-menu-header', index);
            this.toggleClassByClassName('sub-header-wrapper', index);
            this.toggleClassByClassName('main-left-menu-wrapper', index);
        },
        toggleClassByClassName(className, index) {
            const menus = document.querySelectorAll(`.${className}`);
            for (let i = 0; i < menus.length; i++) {
                if (menus[i].classList.contains('active'))
                    menus[i].classList.remove('active');
            }
            const menu = menus[index];
            menu.classList.toggle('active');
        },
        /* 개별 */
        activateJobSubMenu() {
            this.activateByindex(0);
        },
        activateManualSubMenu() {
            this.activateByindex(1);
        },
        activateCommunitySubMenu() {
            this.activateByindex(2);
        },
        /* logout */
        async logoutUser() {
            this.$store.commit('clearUsername');
            this.$store.commit('clearToken');
            this.$store.commit('clearRole');
            deleteCookie('til_auth');
            deleteCookie('til_user');

            await logoutAccount();
            this.$router.push('/signin');
        },
        /* set url */
        setPathName() {
            this.pathname = window.location.pathname;
            console.log('pathname', this.pathname);
        },
        signinLink() {
            if (this.pathname !== '/signin') {
                this.pathname = '/signin';
                this.$router.push('/signin');
            }
        },
        registerLink() {
            if (this.pathname !== '/register') {
                this.pathname = '/register';
                this.$router.push('/register');
            }
        },
        projectListLink() {
            this.$router.push('/projects');
        },
        /* */
    },
};
</script>

<style scoped></style>
