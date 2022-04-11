<template>
    <v-app>
        <main-header></main-header>
        <div class="app-content">
            <router-view :key="$route.fullPath" />
        </div>
        <main-footer></main-footer>
    </v-app>
</template>

<script>
import MainHeader from './components/common/MainHeader.vue';
import MainFooter from './components/common/MainFooter.vue';

export default {
    name: 'App',
    components: {
        'main-header': MainHeader,
        'main-footer': MainFooter,
    },
};
</script>

<style>
@import './css/all.css';
</style>
