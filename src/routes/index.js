import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store/index';

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    scrollBehavior() {
        return { x: 0, y: 0 };
    },
    routes: [
        {
            /* home 화면, 차후에 꾸밀 것 */
            path: '/',
            component: () => import('@/views/MainPage.vue'),
        },
        /* 회원 관련 */
        {
            path: '/register',
            component: () => import('@/views/account/RegisterPage.vue'),
        },
        {
            path: '/signin',
            component: () => import('@/views/account/SigninPage.vue'),
        },
        /* 프로젝트 관련 */
        {
            path: '/projects',
            component: () => import('@/views/project/ProjectListPage.vue'),
        },
        //새 프로젝트 생성
        {
            path: '/project/new',
            component: () => import('@/views/project/ProjectAddPage.vue'),
            meta: { authorize: ['ROLE_ADMIN', 'ROLE_MANAGER'] },
        },
        //내 프로젝트
        {
            path: '/project/mine',
            component: () => import('@/views/project/ProjectMyListPage.vue'),
            meta: { authorize: [] },
        },
        //프로젝트 하나
        /* project apply */
        //component: () =>  import('@/views/project/ProjectWorkerApplyPage.vue'),
        {
            path: '/project/:id',
            component: () => import('@/views/project/ProjectViewPage.vue'),
            meta: { authorize: ['ROLE_WORKER'] },
            children: [
                {
                    path: '',
                    component: () =>
                        import(
                            '@/views/project/projectView/ProjectDetailPage.vue'
                        ),
                },
                {
                    path: 'manager/apply',
                    component: () =>
                        import(
                            '@/views/project/projectView/ProjectManagerApplyPage.vue'
                        ),
                },
                {
                    path: 'worker/apply',
                    component: () =>
                        import(
                            '@/views/project/projectView/ProjectWorkerApplyPage.vue'
                        ),
                },

                {
                    path: 'manager/job',
                    component: () =>
                        import(
                            '@/views/project/projectView/ProjectManagerJobPage.vue'
                        ),
                },
                {
                    path: 'worker/job',
                    component: () =>
                        import(
                            '@/views/project/projectView/ProjectWorkerJobPage.vue'
                        ),
                },
                {
                    path: 'manager/job/:jobId',
                    component: () =>
                        import(
                            '@/views/project/projectView/job/ProjectManagerJobDetailPage.vue'
                        ),
                },
            ],
        },
        /*
        {
            path: '/project/:id',
            component: () => import('@/views/project/ProjectViewPage.vue'),
            meta: { authorize: [] },
        },
        */
        {
            path: '/project/edit/:id',
            component: () => import('@/views/project/ProjectEditPage.vue'),
            meta: { authorize: ['ROLE_ADMIN', 'ROLE_MANAGER'] },
        },

        /* 시리즈 관련 */
        {
            path: '/series/new',
            component: () => import('@/views/project/SeriesAddPage.vue'),
            meta: { authorize: ['ROLE_ADMIN', 'ROLE_MANAGER'] },
        },
        /* 이력서 관련 */
        // 내 이력서 목록
        {
            path: '/resume/mine',
            component: () => import('@/views/resume/ResumeMyListPage.vue'),
            meta: { authorize: [] },
        },
        {
            path: '/resume/new',
            component: () => import('@/views/resume/ResumeAddPage.vue'),
            meta: { authorize: [] },
        },
        {
            path: '/resume/mine/edit/:id',
            component: () => import('@/views/resume/ResumeEditPage.vue'),
            meta: { authorize: [] },
        },
        {
            path: '/resume/mine/:id',
            component: () => import('@/views/resume/ResumeViewPage.vue'),
            meta: { authorize: [] },
        },
        //test
        {
            path: '/file',
            component: () => import('@/views/test/FileUpDownload.vue'),
            meta: { authorize: [] },
        },
        {
            path: '/file/download',
            component: () => import('@/views/test/FileDownloadTestPage.vue'),
            meta: { authorize: [] },
        },
        {
            path: '/translator',
            component: () => import('@/views/test/TranslatorPage.vue'),
        },
        // 아래 코드는 차후 수정 요망.
        {
            path: '/main',
            redirect: '/projects',
        },
        // 번역 test
        /*
        {
            path: '/tr/1',
            component: () => import('@/views/test/Translate1.vue'),
        },
        */
        // 프로젝트 test
        /*
        {
            path: '/tr/project',
            component: () => import('@/views/test/ProjectListPageTest.vue'),
        },~/src/views/test/Translate.vue
        */
        {
            path: '/tr/:id',
            component: () => import('@/views/test/Translate.vue'),
        },
    ],
});

router.beforeEach((to, from, next) => {
    // redirect to login page if not logged in and trying to access a restricted page
    const { authorize } = to.meta;
    console.log('loop1');
    const currentAccount = store.getters.getUsername;
    console.log('loop2');

    if (authorize) {
        console.log('authorize');
        if (!currentAccount) {
            console.log('not currentAccount');
            // not logged in so redirect to login page with the return url
            return next({ path: '/signin', query: { returnUrl: to.path } });
        }

        // check if route is restricted by role
        if (authorize.length && !authorize.includes(store.getters.getRole)) {
            console.log('exist currentUser');
            console.log('this role: ' + store.getters.getRole);
            // role not authorised so redirect to home page
            return next({ path: '/' });
        }
    }
    next();
});

export default router;
