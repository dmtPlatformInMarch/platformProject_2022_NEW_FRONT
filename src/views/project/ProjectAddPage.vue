<template>
    <section class="main-content">
        <div class="my-page-wrapper active my-page-caution-container">
            <div class="my-page-title-wrapper my-page-caution-sub-container">
                <div class="my-page-title-wrapper my-page-caution-wrapper">
                    <div class="my-page-title sub-title">
                        <span
                            >프로젝트 생성 시 주의사항<i
                                class="fas fa-exclamation"
                            ></i
                        ></span>
                    </div>
                    <div class="my-page-caution-content">
                        <span>
                            <li>
                                required로 표시된 항목은 전부 기입한 후 생성해
                                주세요.
                            </li>
                            <li>
                                '비공개'로 설정 시 참여자 검색만 가능하며, 외부
                                참여자가 프로젝트에 참여할 수 없습니다.
                            </li>
                        </span>
                    </div>
                </div>
            </div>
        </div>
        <div class="my-page-wrapper active">
            <div class="my-page-title-wrapper">
                <div class="my-page-title">
                    <span>프로젝트 생성</span>
                </div>
            </div>
            <div class="resume-list-container">
                <div class="resume-list-header-wrapper">
                    <label for="" class="custom-label custom-label-bigger"
                        >프로젝트 생성
                        <span>프로젝트를 등록하세요! </span>
                    </label>
                </div>

                <form
                    @submit.prevent="submitProjectForm($event)"
                    class="resume-write-container"
                    enctype="multipart/form-data"
                >
                    <div class="resume-write-wrapper">
                        <div class="resume-write-title">
                            <span>
                                <i class="fas fa-pen-alt"></i>프로젝트 제목<span
                                    class="required"
                                    >required</span
                                ></span
                            >
                            <span
                                >프로젝트를 잘 나타낼 수 있는 제목을 기입해
                                주세요.</span
                            >
                        </div>
                        <div class="resume-write-content">
                            <input
                                type="text"
                                id="resume-title"
                                class="resume-title"
                                v-model="title"
                            />
                            <span class="register-alert"></span>
                        </div>
                    </div>
                    <div class="resume-write-wrapper">
                        <div class="resume-write-title">
                            <span><i class="fas fa-pen-alt"></i>시리즈</span>
                            <span
                                >아래 리스트에서 관련 시리즈를 설정해
                                주세요.</span
                            >
                        </div>
                        <div class="resume-write-content">
                            <div class="selectBox job-select">
                                <select v-model="series" class="select">
                                    <option disabled selected
                                        >--선택하세요--</option
                                    >
                                    <option
                                        v-for="(item, index) in allSeries"
                                        :key="index"
                                        :value="item.id"
                                    >
                                        {{ item.title }}
                                    </option>
                                </select>
                                <span class="icoArrow"
                                    ><i class="fas fa-chevron-down"></i
                                ></span>
                            </div>
                        </div>
                    </div>

                    <div class="resume-write-wrapper">
                        <div class="resume-write-title">
                            <span
                                ><i class="fas fa-pen-alt"></i>카테고리<span
                                    class="required"
                                    >required</span
                                ></span
                            >
                            <span
                                >아래 리스트에서 카테고리를 설정해 주세요.</span
                            >
                        </div>
                        <div class="resume-write-content job-category-pos">
                            <div class="selectBox academy-select">
                                <select
                                    class="select"
                                    v-model="firstField"
                                    @change="changeFirstField($event)"
                                >
                                    <option disabled selected
                                        >--1차 분류--</option
                                    >
                                    <option
                                        v-for="(item, index) in firstFields"
                                        :key="index"
                                        :value="item.id"
                                    >
                                        {{ item.fieldName }}
                                    </option>
                                </select>
                                <span class="icoArrow"
                                    ><i class="fas fa-chevron-down"></i
                                ></span>
                            </div>

                            <div class="selectBox academy-select">
                                <select class="select" v-model="secondField">
                                    <option disabled selected
                                        >--2차 분류--</option
                                    >
                                    <option
                                        v-for="(item, index) in secondFields"
                                        :key="index"
                                        :value="item.id"
                                    >
                                        {{ item.fieldName }}
                                    </option>
                                </select>
                                <span class="icoArrow"
                                    ><i class="fas fa-chevron-down"></i
                                ></span>
                            </div>

                            <div class="selectBox academy-select">
                                <select class="select" v-model="thirdField">
                                    <option disabled selected
                                        >--3차 분류--</option
                                    >
                                    <option
                                        v-for="(item, index) in thirdFields"
                                        :key="index"
                                        :value="item.id"
                                    >
                                        {{ item.fieldName }}
                                    </option>
                                </select>
                                <span class="icoArrow"
                                    ><i class="fas fa-chevron-down"></i
                                ></span>
                            </div>
                        </div>
                    </div>

                    <div class="resume-write-wrapper">
                        <div class="resume-write-title">
                            <span>
                                <i class="fas fa-pen-alt"></i>프로젝트 설명<span
                                    class="required"
                                    >required</span
                                ></span
                            >
                            <span>프로젝트를 소개하는 글을 써 보세요.</span>
                        </div>
                        <div class="resume-write-content job-content">
                            <textarea
                                id="resume-content"
                                cols="30"
                                rows="10"
                                v-model="content"
                            ></textarea>
                        </div>
                    </div>

                    <div class="resume-write-wrapper">
                        <div class="resume-write-title">
                            <span
                                ><i class="fas fa-pen-alt"></i>안내 파일
                                첨부</span
                            >
                            <span>설명하는 파일을 첨부해 주세요.</span>
                        </div>
                        <div class="resume-write-content job-content">
                            <div data-name="" class="file-container">
                                <div
                                    class="file-wrapper"
                                    v-for="(index, item) in files"
                                    :key="item.fileIdx"
                                >
                                    <input
                                        type="text"
                                        class="upload-name"
                                        value="파일 찾기"
                                        readonly
                                        v-bind:id="
                                            'file_label_' + index.fileIdx
                                        "
                                    />
                                    <label
                                        v-bind:for="'file_' + index.fileIdx"
                                        class="control-label"
                                        >찾아보기</label
                                    >
                                    <input
                                        type="file"
                                        name="files"
                                        v-bind:id="'file_' + index.fileIdx"
                                        class="upload-hidden"
                                        @change="changeFilename(index, $event)"
                                    />

                                    <button
                                        type="button"
                                        class="btn btn-bordered btn-xs visible-xs-inline visible-sm-inline visible-md-inline visible-lg-inline"
                                    >
                                        <i
                                            @click="addFile()"
                                            class="fa fa-plus fileI"
                                            aria-hidden="true"
                                        ></i>
                                    </button>
                                    <button
                                        type="button"
                                        class="btn btn-bordered btn-xs visible-xs-inline visible-sm-inline visible-md-inline visible-lg-inline"
                                    >
                                        <i
                                            @click="removeFile(index)"
                                            class="fa fa-minus fileI"
                                            aria-hidden="true"
                                        ></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="resume-write-wrapper">
                        <div class="resume-write-title">
                            <span>
                                <i class="fas fa-pen-alt"></i>프로젝트 기한<span
                                    class="required"
                                    >required</span
                                ></span
                            >
                            <span>프로젝트 기한을 선택하세요.</span>
                        </div>
                        <div class="resume-write-content job-content">
                            <input
                                type="date"
                                id="job-date"
                                v-model="deadline"
                            />
                            <span
                                class="register-alert"
                                v-if="!isDeadlineValid && deadline"
                            >
                                기한은 오늘 이후여야 합니다.
                            </span>
                        </div>
                    </div>

                    <div class="resume-write-wrapper">
                        <div class="resume-write-title">
                            <span>
                                <i class="fas fa-pen-alt"></i>프로젝트 코인<span
                                    class="required"
                                    >required</span
                                ></span
                            >
                            <span>코인을 설정하세요.</span>
                        </div>
                        <div class="resume-write-content job-content">
                            <label class="switch-button3">
                                <input type="checkbox" v-model="paymentType" />
                                <span class="onoff-switch3"></span>
                            </label>
                            <input
                                v-if="!paymentType"
                                type="number"
                                v-model="fixedPayment"
                                id="job-payment"
                                cols="30"
                                rows="10"
                            />
                            <div v-else class="payment-wrapper">
                                <input
                                    type="number"
                                    v-model="fromPayment"
                                    id="job-payment2"
                                    cols="30"
                                    rows="10"
                                />
                                <span> ~ </span>
                                <input
                                    type="number"
                                    v-model="toPayment"
                                    id="job-payment2"
                                    cols="30"
                                    rows="10"
                                />
                            </div>
                            <span
                                class="register-alert"
                                v-if="toPayment && !fromPayment"
                            >
                                둘 다 적어야 합니다.
                            </span>
                        </div>
                    </div>

                    <div class="resume-write-wrapper">
                        <div class="resume-write-title">
                            <span><i class="fas fa-pen-alt"></i>공개 여부</span>
                        </div>
                        <div class="resume-write-content">
                            <label class="switch-button2">
                                <input type="checkbox" v-model="isOpened" />
                                <span class="onoff-switch2"></span>
                            </label>
                        </div>
                    </div>

                    <div class="resume-confirm-wrapper">
                        <button :disabled="!isFormValid" type="submit">
                            프로젝트 생성
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </section>
</template>

<script>
import { fetchSeriesMine, fetchAllField } from '@/api/project';
import { validateDeadline } from '@/utils/validation';
import { createProject } from '@/api/project';
import { uploadFilesAtProject } from '@/api/file';

export default {
    data() {
        return {
            title: '',
            series: '',
            firstField: '',
            secondField: '',
            thirdField: '',
            content: '',
            deadline: '',
            paymentType: false,
            fixedPayment: '',
            toPayment: '',
            fromPayment: '',
            isOpened: false,
            allFields: [],
            allSeries: [],
            createdBy: '',
            firstFields: [],
            secondFields: [],
            thirdFields: [],
            /* file */
            files: [
                {
                    fileIdx: 0, //진짜 index
                    file: '',
                    Idx: 0, //구분하기 위한 index
                    fileName: '',
                },
            ],
            fileIdx: 0,
            Idx: 0,
        };
    },
    created() {
        this.createdBy = this.$store.getters.getUsername;
        this.fetchData();
    },
    computed: {
        isDeadlineValid() {
            return validateDeadline(this.deadline);
        },
        isFormValid() {
            return (
                this.title &&
                this.firstField &&
                this.secondField &&
                this.content &&
                this.isDeadlineValid &&
                (this.fixedPayment || (this.toPayment && this.fromPayment))
            );
        },
    },
    methods: {
        async fetchData() {
            const seriesData = {
                createdBy: this.createdBy,
            };
            try {
                const data1 = await fetchSeriesMine(seriesData);
                this.allSeries = data1.data;
            } catch (error) {
                console.log(error);
            }
            try {
                const data2 = await fetchAllField();
                this.allFields = data2.data;
            } catch (error) {
                console.log(error);
            }
            this.allFields.forEach(element => {
                if (element.depth === 1) {
                    this.firstFields.push(element);
                }
            });
        },
        changeFirstField(event) {
            console.log('event : ' + event.target.value);
            this.secondFields.splice(0);
            this.thirdFields.splice(0);
            this.allFields.forEach(element => {
                if (
                    element.depth === 2 &&
                    element.parentId === event.target.value * 1
                ) {
                    this.secondFields.push(element);
                }

                if (
                    element.depth === 3 &&
                    element.parentId === event.target.value * 1
                ) {
                    this.thirdFields.push(element);
                }
            });
        },
        async submitProjectForm(event) {
            event.preventDefault();
            console.log('form submit event : ' + event);
            console.log('submit project form');
            let projectId;
            try {
                const project = {
                    title: this.title,
                    series: this.series,
                    firstField: this.firstField,
                    secondField: this.secondField,
                    thirdField: this.thirdField,
                    content: this.content,
                    deadline: this.deadline,
                    paymentType: this.paymentType,
                    fixedPayment: this.fixedPayment,
                    toPayment: this.toPayment,
                    fromPayment: this.fromPayment,
                    opened: this.isOpened,
                    createdBy: this.createdBy,
                };
                const { data } = await createProject(project);
                console.log('after register');
                console.log(data);
                projectId = data.id;
                console.log(projectId);
            } catch (error) {
                console.log('error : ' + error);
            }

            try {
                let form = new FormData();
                this.files.forEach(element => {
                    form.append('files', element.file);
                });
                form.append('project', projectId);
                const { data } = await uploadFilesAtProject(form);
                console.log(data);
            } catch (error) {
                console.log(error);
            }
            this.$router.push('/project/mine');
        },
        /* file */
        changeFilename(index, event) {
            console.log('change file name');
            console.log('index : ' + index);
            console.log('event.target : ' + event.target);
            const nameDiv =
                event.target.previousElementSibling.previousElementSibling;
            const file = event.target.files[0];
            const filename = file.name;
            console.log('filename : ' + filename);
            nameDiv.value = filename;
            console.log('this.fileIdx : ' + this.files[index.fileIdx]);
            console.log(this.files[index.fileIdx]);
            this.files[index.fileIdx].file = file;
            this.files[index.fileIdx].fileName = filename;
            console.log('this.fileIdx : ' + this.files[index.fileIdx]);
            console.log(this.files[index.fileIdx]);
        },
        addFile() {
            if (this.fileIdx >= 2) {
                alert('파일은 최대 3개까지 업로드 가능합니다!');
                return false;
            }
            ++this.fileIdx;
            ++this.Idx;
            this.files.push({
                fileIdx: this.fileIdx,
                file: '',
                Idx: this.Idx,
            });
        },
        removeFile(data) {
            console.log(data);
            console.log('fileIdx : ' + data.fileIdx);
            if (this.fileIdx <= 0) return;
            --this.fileIdx;
            console.log(this.files);
            this.files.splice(data.fileIdx, 1);
            console.log(this.files);
            let i = 0;
            this.files.forEach(element => {
                element.fileIdx = i++;
            });
            const nameDiv = document.querySelectorAll('.upload-name');
            let j = 0;
            console.log('files');
            console.log(this.files);
            nameDiv.forEach(element => {
                console.log('element');
                console.log(element);
                console.log('filename');
                console.log(this.files[j].fileName);
                element.value = this.files[j++].fileName;
            });
        },
    },
};
</script>

<style></style>
