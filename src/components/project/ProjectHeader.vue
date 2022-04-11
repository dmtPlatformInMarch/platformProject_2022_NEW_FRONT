<template>
    <section class="main-content-header-section">
        <div class="main-content-header-wrapper">
            <div class="main-content-header-title">
                전체 작업들
            </div>
            <div class="card-list-category-container">
                <div class="card-list-category-wrapper">
                    <div class="card-list-category-title">
                        View
                    </div>
                    <label class="switch-button">
                        <input type="checkbox" @click="viewToggle" />
                        <span class="onoff-switch"></span>
                    </label>
                </div>

                <div class="card-list-category-wrapper">
                    <div class="card-list-category-title">
                        정렬
                    </div>
                    <div class="dropdown show">
                        <button
                            class="card-list-category-value form-select "
                            type="button"
                            id="dropdownMenuButton3"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="true"
                        >
                            <span>최신 순</span>
                        </button>

                        <div
                            class="dropdown-menu card-list-category-value-down"
                            aria-labelledby="dropdownMenuButton"
                        >
                            <a
                                class="dropdown-item"
                                th:classappend="${#strings.equals(category, 'all')}? active"
                                th:href="@{'/myprojects?status=' + ${status} + '&category=all'}"
                            >
                                최신 순
                            </a>
                            <a class="dropdown-item" href="#">
                                오래된 순
                            </a>
                            <a
                                class="dropdown-item"
                                th:classappend="${#strings.equals(category, 'all')}? active"
                                th:href="@{'/myprojects?status=' + ${status} + '&category=all'}"
                            >
                                즐겨찾는 순
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    methods: {
        viewToggle() {
            console.log('toggle!');
            this.$emit('viewToggle');
        },
    },
};
</script>

<style></style>
