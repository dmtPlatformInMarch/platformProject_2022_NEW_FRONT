<template>
    <div>
        <h1>FILE</h1>
        <form
            class="form-horizontal"
            method="post"
            enctype="multipart/form-data"
            @submit.prevent="submitFile($event)"
        >
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
                        v-bind:id="'file_label_' + index.fileIdx"
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
                </div>
            </div>
            <button type="submit">업로드 테스트</button>
        </form>

        <div class="resume-list-wrapper" style="padding-top: 3rem;">
            <div class="resume-list-header my-resume-list-header">
                <span>번호</span>
                <span>ID</span>
                <span>파일 원이름</span>
                <span>등록일</span>
                <span>번역 Page</span>
            </div>
            <div
                v-if="!fileExists"
                class="resume-list-content none-list-content"
            >
                아직 test file이 없습니다.
            </div>
            <div
                v-else
                class="resume-list-content my-resume-list-content"
                v-for="(item, index) in testFiles"
                :key="index"
            >
                <span>{{ index + 1 }}</span>
                <span>{{ item.id }}</span>
                <span>{{ item.originalName }}</span>
                <span>{{ item.createdDate | formatDateShortly }}</span>
                <span
                    ><button @click="routeTrPage(item.id, item.originalName)">
                        번역
                    </button></span
                >
            </div>
        </div>
    </div>
</template>

<script>
import { uploadTrFiles, fetchTestFiles } from '@/api/file';

export default {
    data() {
        return {
            testFiles: [],
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
    computed: {
        fileExists() {
            return this.testFiles.length > 0;
        },
    },
    created() {
        this.getTestFiles();
    },
    methods: {
        async getTestFiles() {
            const { data } = await fetchTestFiles();
            console.log('get test files');
            console.log(data);
            this.testFiles = data;
        },
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
        async submitFile(event) {
            event.preventDefault();
            console.log('submit file');
            let form = new FormData();
            this.files.forEach(element => {
                form.append('files', element.file);
            });
            try {
                /*
                const fileData = {
                    files: this.files,
                    Idx: this.Idx,
                    fileIdx: this.fileIdx,
                };
                */
                const { data } = await uploadTrFiles(form);
                console.log(data);
            } catch (error) {
                console.log(error);
            }
            this.getTestFiles();
        },
        routeTrPage(id, name) {
            console.log(id);
            console.log(name);
            let splited = name.split('.');
            let ext = splited[splited.length - 1];
            console.log(splited);
            console.log(splited[splited.length - 1]);
            if (ext !== 'xlsx') alert('엑셀 파일이 아닙니다!');
            else this.$router.push(`/tr/${id}`);
        },
    },
};
</script>

<style></style>
