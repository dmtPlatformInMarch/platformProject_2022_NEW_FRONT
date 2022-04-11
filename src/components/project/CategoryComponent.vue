<template>
    <section class="category-section">
        <div class="category-section-wrapper">
            <div class="category-section-header">
                <!-- active -->
                <i
                    @click="toggleCategory"
                    class="fas fa-chevron-circle-left category-header-i"
                ></i>
            </div>
            <div class="category-section-menus">
                <div class="category-section-menu-wrapper">
                    <div class="category-section-main-menu">
                        <a href="#">전체</a>
                    </div>
                </div>
                <!--
                <div class="category-section-menu-wrapper">
                    <div class="category-section-main-menu active">
                        <a href="#">번역</a>
                        <i class="fas fa-angle-up"></i>
                    </div>
                    <div class="category-section-sub-menus">
                        <div class="category-section-sub-menu active">
                            <a href="#">프랑스어</a>
                        </div>
                        <div class="category-section-sub-menu">
                            <a href="#">영어</a>
                        </div>
                        <div class="category-section-sub-menu">
                            <a href="#">중국어</a>
                        </div>
                    </div>
                </div>
                -->
                <div
                    v-for="(item, index) in editedCategory"
                    :key="index"
                    class="category-section-menu-wrapper"
                >
                    <div
                        v-for="(items, index) in item"
                        :key="index"
                        v-bind:class="[
                            items.depth == 1
                                ? 'category-section-main-menu'
                                : 'category-section-sub-menu',
                        ]"
                    >
                        <a href="#">{{ items.fieldName }}</a>
                        <i v-if="items.depth == 1" class="fas fa-angle-up"></i>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { fetchAllField } from '@/api/project';

export default {
    data() {
        return {
            category: [],
            editedCategory: [],
        };
    },
    created() {
        this.fetchData();
    },
    methods: {
        toggleCategory() {
            const category = document.querySelector('.category-section');
            const sub = document.querySelector('.category-section-menus');
            const i = document.querySelector('.category-header-i');
            if (!category.classList.contains('active')) {
                category.classList.add('active');
                sub.style = 'display: block;';
                i.classList.add('active');
            } else {
                category.classList.remove('active');
                sub.style = 'display: none;';
                i.classList.remove('active');
            }
        },
        // 카테고리 메뉴에 표시할 정보 가져오기
        async fetchData() {
            try {
                const data1 = await fetchAllField();
                this.category = data1.data; //가공하기 전의 데이터
                console.log('data');
                console.log(data1);
            } catch (error) {
                console.log(error);
            }
            // 카테고리에 표시하기 위한 가공 시작
            let i = 0; // depth 1 필드의 개수

            this.category.forEach(element => {
                if (element.parentId === null) {
                    let a = new Array();
                    a.push(element);
                    this.editedCategory.push(a);
                    i++;
                }
            });

            this.category.forEach(element => {
                if (element.parentId !== null) {
                    for (let j = 0; j < i; j++) {
                        if (
                            element.parentId === this.editedCategory[j][0].id &&
                            element.depth === 2
                        ) {
                            this.editedCategory[j].push(element);
                        }
                    }
                }
            });

            console.log('editedCategory');
            console.log(this.editedCategory);
        },
    },
};
</script>

<style></style>
