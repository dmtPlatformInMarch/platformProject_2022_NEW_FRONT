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
            <button type="submit">업로드 테스트</button>
        </form>
    </div>
</template>

<script>
import { uploadFiles } from '@/api/file';

export default {
    data() {
        return {
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
    methods: {
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
                const { data } = await uploadFiles(form);
                console.log(data);
            } catch (error) {
                console.log(error);
            }
        },
    },
};
</script>

<style></style>
