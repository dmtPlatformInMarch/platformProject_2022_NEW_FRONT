<template>
    <section class="headers">
        <section class="header desktop-header">
            <div class="main-header">
                <div class="main-header-container">
                    <div class="main-header-left">
                        <div class="main-logo">
                            <img :src="logoUrl" alt="로고" />
                        </div>
                        <div class="main-header-left-menus">
                            <a href="#" class="main-header-menu">작업</a>
                            <a href="#" class="main-header-menu">매뉴얼</a>
                            <a href="#" class="main-header-menu active">
                                커뮤니티
                            </a>
                        </div>
                        <div class="main-search-form">
                            <div class="main-search-wrapper">
                                <input type="search" placeholder="작업 검색" />
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
                    <div class="main-header-right-menus">
                        <div class="main-header-icon-wrapper has-contents">
                            <a href="#"> <i class="fas fa-bell"></i></a>
                        </div>
                        <div class="main-header-icon-wrapper">
                            <a href="#">
                                <i class="fas fa-envelope active"> </i>
                            </a>
                        </div>
                        <div class="main-header-icon-wrapper">
                            <a href="#"><i class="fas fa-star"></i></a>
                        </div>
                        <div class="main-header-menu my-profile">
                            <a href="#">내 프로필</a>
                            <i class="fas fa-chevron-down"></i>
                            <div class="main-header-dropdown">
                                <div class="main-header-dropdown-wrapper first">
                                    <div class="main-header-dropdown-item">
                                        <a href="#">마이페이지</a>
                                    </div>
                                    <div class="main-header-dropdown-item">
                                        <a href="#">내 작업</a>
                                    </div>
                                    <div class="main-header-dropdown-item">
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

            <div class="sub-header">
                <div class="sub-header-wrapper">
                    <div class="sub-header-container">
                        <div class="sub-header-menu-item not-last active">
                            <a href="#">신규 작업</a>
                        </div>
                        <div class="sub-header-menu-item">
                            <a href="#">베스트 작업</a>
                        </div>
                    </div>
                </div>
                <div class="sub-header-wrapper second">
                    <div class="sub-header-container">
                        <div class="sub-header-menu-item not-last active">
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
                <div class="sub-header-wrapper third active">
                    <div class="sub-header-container">
                        <div class="sub-header-menu-item not-last">
                            <a href="#">작업후기</a>
                        </div>
                        <div class="sub-header-menu-item active">
                            <a href="#">커뮤니티</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="header mobile-header">
            <div class="main-header">
                <div class="main-header-container">
                    <div class="main-logos">
                        <div class="main-logo">
                            <img :src="logoUrl" alt="로고" />
                        </div>
                        <div class="main-nav-logo">
                            <a href="#"><i class="fas fa-bars"></i></a>
                        </div>
                    </div>
                    <div class="main-mobile-nav active">
                        <div class="main-header-left">
                            <div class="main-header-left-menus">
                                <div class="main-left-menu-wrapper active">
                                    <div class="main-left-menu-header">
                                        <a href="#" class="main-header-menu">
                                            작업
                                        </a>
                                        <i class="fas fa-chevron-down"></i>
                                    </div>
                                    <div class="sub-header-wrapper">
                                        <div class="sub-header-container">
                                            <div
                                                class="sub-header-menu-item active"
                                            >
                                                <a href="#">신규 작업</a>
                                            </div>
                                            <div class="sub-header-menu-item">
                                                <a href="#">베스트 작업</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="main-left-menu-wrapper">
                                    <div class="main-left-menu-header">
                                        <a href="#" class="main-header-menu">
                                            매뉴얼
                                        </a>
                                        <i class="fas fa-chevron-down"></i>
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
                                        <a href="#" class="main-header-menu"
                                            >커뮤니티</a
                                        >
                                        <i class="fas fa-chevron-down"></i>
                                    </div>
                                    <div class="sub-header-wrapper">
                                        <div class="sub-header-container">
                                            <div class="sub-header-menu-item">
                                                <a href="#">작업후기</a>
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
                                        placeholder="작업 검색"
                                    />
                                    <a href="#">
                                        <i class="fas fa-search"></i>
                                    </a>
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
                                            <a href="#">내 작업</a>
                                        </div>
                                        <div class="main-header-dropdown-item">
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

export default {
    data() {
        return {
            logoUrl: require('@/img/logo.png'),
        };
    },
    computed: {
        isUserLogin() {
            return this.$store.getters.isLogin;
        },
        logoLink() {
            return this.$store.getters.isLogin ? '/main' : '/login';
        },
    },
    methods: {
        logoutUser() {
            this.$store.commit('clearUsername');
            this.$store.commit('clearToken');
            deleteCookie('til_auth');
            deleteCookie('til_user');
            this.$router.push('/login');
        },
    },
};
</script>

<style scoped></style>
